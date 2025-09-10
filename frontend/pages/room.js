'use client';

import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios'

// Dynamically import JitsiMeeting to avoid SSR issues
const JitsiMeeting = dynamic(() => import('@jitsi/react-sdk').then(mod => mod.JitsiMeeting), { ssr: false })

const BACKENDS = {
  api: { name: 'External AI', port: 3004, url: 'https://cydebe-backend-api.vercel.app' },
  network: { name: 'Local Network', port: 3002 },
  device: { name: 'Local Device', port: 3003 }
}

const LANGUAGES = {
  en: 'English',
  ru: 'Russian'
}

export default function Room() {
  const router = useRouter()
  const { room, backend: queryBackend } = router.query
  const [translation, setTranslation] = useState('')
  const [feedback, setFeedback] = useState('')
  const [backend, setBackend] = useState(queryBackend || 'api')
  const [fromLang, setFromLang] = useState('en')
  const [toLang, setToLang] = useState('ru')
  const [isListening, setIsListening] = useState(false)
  const [participants, setParticipants] = useState({})
  const [transcripts, setTranscripts] = useState({})
  const [analyticsData, setAnalyticsData] = useState([])
  const [transcript, setTranscript] = useState('')
  const [vocabulary, setVocabulary] = useState('')
  const [pronunciation, setPronunciation] = useState('')
  const [grammarTip, setGrammarTip] = useState('')
  const [commonPhrases, setCommonPhrases] = useState([])
  const [manualText, setManualText] = useState('')
  const [jitsiConfig, setJitsiConfig] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [viewMode, setViewMode] = useState('video') // 'video' or 'transcript'
  const [realTimeTranscript, setRealTimeTranscript] = useState('')
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [microphonePermission, setMicrophonePermission] = useState('unknown')
  const recognitionRef = useRef(null)
  const jitsiApiRef = useRef(null)
  const transcriptTimeoutRef = useRef(null)

  useEffect(() => {
    // Check device type
    const checkDevice = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  useEffect(() => {
    if (room) {
      console.log('Joined room:', room)
      initializeJitsiRoom()
    }
  }, [room])

  useEffect(() => {
    // Check speech recognition support
    if (typeof window !== 'undefined') {
      setSpeechSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
    }

    // Check microphone permission
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'microphone' }).then(result => {
        setMicrophonePermission(result.state)
      })
    }
  }, [])

  useEffect(() => {
    if (room && speechSupported) {
      initializeSpeechRecognition()
    }
  }, [room, fromLang, speechSupported])

  const initializeSpeechRecognition = () => {
    if (typeof window === 'undefined') return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = fromLang === 'ru' ? 'ru-RU' : 'en-US'
    recognition.maxAlternatives = 1

    let finalTranscript = ''
    let interimTranscript = ''

    recognition.onstart = () => {
      console.log('Speech recognition started')
      setIsListening(true)
      setIsTranscribing(true)
      setMicrophonePermission('granted')
    }

    recognition.onresult = async (event) => {
      interimTranscript = ''
      finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }

      // Update real-time transcript
      const currentTranscript = finalTranscript + interimTranscript
      setRealTimeTranscript(currentTranscript)
      setTranscript(finalTranscript)

      // Show interim results in overlay
      if (interimTranscript) {
        updateTranscript('current-user', currentTranscript, '...translating...')
      }

      // Process final results
      if (finalTranscript && finalTranscript.trim().length > 0) {
        try {
          const translation = await handleTranslation(finalTranscript.trim())
          updateTranscript('current-user', finalTranscript.trim(), translation)

          // Log analytics
          logAnalytics('speech_transcribed', {
            originalText: finalTranscript.trim(),
            translatedText: translation,
            fromLang,
            toLang
          })

          // Clear real-time transcript after processing
          setTimeout(() => {
            setRealTimeTranscript('')
          }, 2000)

        } catch (error) {
          console.error('Translation error:', error)
          updateTranscript('current-user', finalTranscript.trim(), 'Translation failed')
        }
      }
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
      setIsTranscribing(false)

      if (event.error === 'not-allowed') {
        setMicrophonePermission('denied')
        alert('Microphone access denied. Please allow microphone access to use speech recognition.')
      } else if (event.error === 'no-speech') {
        // Restart recognition for continuous listening
        setTimeout(() => {
          if (recognitionRef.current && isListening) {
            recognitionRef.current.start()
          }
        }, 1000)
      }
    }

    recognition.onend = () => {
      console.log('Speech recognition ended')
      setIsListening(false)
      setIsTranscribing(false)

      // Auto-restart if we're supposed to be listening
      if (isListening) {
        setTimeout(() => {
          if (recognitionRef.current) {
            recognitionRef.current.start()
          }
        }, 500)
      }
    }

    recognitionRef.current = recognition
  }

  const initializeJitsiRoom = async () => {
    try {
      console.log('Initializing Jitsi room for:', room);
      console.log('Backend URL:', `${BACKENDS[backend].url}/jitsi/create-room`);

      const response = await axios.post(`${BACKENDS[backend].url}/jitsi/create-room`, {
        roomName: room,
        usePlatformKey: true // Always use platform key
      });

      console.log('Jitsi room creation response:', response.data);

      if (response.data.success) {
        setJitsiConfig(response.data.roomConfig);
        console.log('Jitsi config set successfully:', response.data.roomConfig);
      } else {
        console.error('Failed to create room:', response.data);
        alert('Failed to create Jitsi room. Please check your configuration.');
      }
    } catch (error) {
      console.error('Failed to initialize Jitsi room:', error);
      console.error('Error details:', error.response?.data || error.message);

      // Fallback configuration for 8x8 VPAAS
      const fallbackConfig = {
        domain: '8x8.vc',
        roomName: room,
        configOverwrite: {
          startWithAudioMuted: true,
          startWithVideoMuted: false,
          prejoinPageEnabled: false
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          DEFAULT_BACKGROUND: '#1a1a1a'
        },
        jwt: null // Will work without JWT for basic functionality
      };

      console.log('Using fallback Jitsi configuration:', fallbackConfig);
      setJitsiConfig(fallbackConfig);
    }
  }

  const handleTranslation = async (text) => {
    const port = BACKENDS[backend].port
    try {
      const response = await fetch(`${BACKENDS[backend].url}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, fromLang, toLang })
      })
      const data = await response.json()
      setTranslation(data.translation)
      return data.translation
    } catch (error) {
      console.error('Translation error:', error)
      setTranslation('Translation failed')
      return 'Translation failed'
    }
  }

  const handleFeedback = async (conversation) => {
    const port = BACKENDS[backend].port
    try {
      const response = await fetch(`${BACKENDS[backend].url}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation })
      })
      const data = await response.json()
      setFeedback(data.feedback)
    } catch (error) {
      console.error('Feedback error:', error)
      setFeedback('Feedback failed')
    }
  }

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach(track => track.stop())
      setMicrophonePermission('granted')
      return true
    } catch (error) {
      console.error('Microphone permission error:', error)
      setMicrophonePermission('denied')
      return false
    }
  }

  const startListening = async () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.')
      return
    }

    if (microphonePermission === 'denied') {
      alert('Microphone access is blocked. Please enable microphone access in your browser settings.')
      return
    }

    if (microphonePermission === 'unknown' || microphonePermission === 'prompt') {
      const granted = await requestMicrophonePermission()
      if (!granted) return
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Error starting speech recognition:', error)
        // Try to restart if already started
        if (error.name === 'InvalidStateError') {
          setTimeout(() => startListening(), 1000)
        }
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
    setIsTranscribing(false)
    setRealTimeTranscript('')
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const handleVocabulary = async (text) => {
    const port = BACKENDS[backend].port
    try {
      const response = await fetch(`${BACKENDS[backend].url}/vocabulary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, fromLang, toLang })
      })
      const data = await response.json()
      setVocabulary(data.vocabulary)
    } catch (error) {
      console.error('Vocabulary error:', error)
      setVocabulary('Vocabulary suggestions unavailable')
    }
  }

  const handlePronunciation = async (text) => {
    const port = BACKENDS[backend].port
    try {
      const response = await fetch(`${BACKENDS[backend].url}/pronunciation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, fromLang, toLang })
      })
      const data = await response.json()
      setPronunciation(data.pronunciation)
    } catch (error) {
      console.error('Pronunciation error:', error)
      setPronunciation('Pronunciation guide unavailable')
    }
  }

  const handleGrammarTip = async (text) => {
    const port = BACKENDS[backend].port
    try {
      const response = await fetch(`${BACKENDS[backend].url}/grammar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, fromLang, toLang })
      })
      const data = await response.json()
      setGrammarTip(data.grammar)
    } catch (error) {
      console.error('Grammar error:', error)
      setGrammarTip('Grammar tips unavailable')
    }
  }

  const logAnalytics = (eventType, data) => {
    const analyticsEntry = {
      timestamp: new Date().toISOString(),
      roomId: room,
      eventType,
      participantId: 'current-user',
      data,
      backend: backend
    }

    setAnalyticsData(prev => [...prev, analyticsEntry])

    fetch(`${BACKENDS[backend].url}/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(analyticsEntry)
    }).catch(err => console.error('Analytics error:', err))
  }

  const handleManualTranslate = async () => {
    if (manualText) {
      await handleTranslation(manualText)
    }
  }

  const handleCommonPhrases = async () => {
    const port = BACKENDS[backend].port
    try {
      const response = await fetch(`${BACKENDS[backend].url}/phrases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromLang, toLang })
      })
      const data = await response.json()
      setCommonPhrases(data.phrases || [])
    } catch (error) {
      console.error('Common phrases error:', error)
      setCommonPhrases(['Common phrases unavailable'])
    }
  }

  const updateTranscript = (participantId, transcript, translation) => {
    setTranscripts(prev => ({
      ...prev,
      [participantId]: { transcript, translation, timestamp: Date.now() }
    }))

    // Auto-remove old transcripts after 30 seconds for better visibility
    setTimeout(() => {
      setTranscripts(prev => {
        const updated = { ...prev }
        delete updated[participantId]
        return updated
      })
    }, 30000)
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#f5f5f5'
    }}>
      {/* Mobile/Tablet Header */}
      {(isMobile || isTablet) && (
        <div style={{
          background: 'white',
          padding: '10px 15px',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            Cydebe Room
          </h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '5px'
            }}
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
        </div>
      )}

      <div style={{
        flex: 1,
        display: 'flex',
        position: 'relative',
        flexDirection: isMobile || isTablet ? 'column' : 'row'
      }}>
        {/* Jitsi Container */}
        <div style={{
          flex: isMobile || isTablet ? (viewMode === 'video' ? 1 : 0) : 0.6,
          position: 'relative',
          transition: 'flex 0.3s ease',
          display: isMobile || isTablet && viewMode !== 'video' ? 'none' : 'block'
        }}>
          {room && jitsiConfig && (
            <JitsiMeeting
              roomName={jitsiConfig.roomName}
              domain={jitsiConfig.domain}
              configOverwrite={{
                ...jitsiConfig.configOverwrite,
                startWithAudioMuted: true,
                startWithVideoMuted: false,
                prejoinPageEnabled: false
              }}
              interfaceConfigOverwrite={jitsiConfig.interfaceConfigOverwrite}
              userInfo={{
                displayName: 'Cydebe User',
                email: 'user@cydebe.com'
              }}
              jwt={jitsiConfig.jwt}
              onApiReady={(externalApi) => {
                jitsiApiRef.current = externalApi
                externalApi.addEventListener('videoConferenceJoined', () => {
                  console.log('Joined conference')
                  logAnalytics('conference_joined', { roomName: room })
                })

                externalApi.addEventListener('participantJoined', (participant) => {
                  logAnalytics('participant_joined', { participantId: participant.id })
                })

                externalApi.addEventListener('participantLeft', (participant) => {
                  logAnalytics('participant_left', { participantId: participant.id })
                })
              }}
              getIFrameRef={(iframeRef) => {
                if (iframeRef) {
                  iframeRef.style.width = '100%'
                  iframeRef.style.height = '100%'
                  iframeRef.style.border = 'none'
                }
              }}
            />
          )}

          {/* Listening Indicator */}
          {isListening && (
            <div style={{
              position: 'absolute',
              top: isMobile ? '10px' : '20px',
              right: isMobile ? '10px' : '20px',
              zIndex: 1001,
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(220, 53, 69, 0.9)',
              color: 'white',
              padding: isMobile ? '6px 10px' : '8px 12px',
              borderRadius: '20px',
              fontSize: isMobile ? '12px' : '14px',
              fontWeight: 'bold',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                background: '#ff4757',
                borderRadius: '50%',
                marginRight: '8px',
                animation: 'pulse 1.5s infinite'
              }}></div>
              🎤 Listening...
            </div>
          )}

          {/* Real-time Transcript Display */}
          {realTimeTranscript && (
            <div style={{
              position: 'absolute',
              bottom: isMobile ? '80px' : '100px',
              left: isMobile ? '10px' : '20px',
              right: isMobile ? '10px' : '20px',
              zIndex: 1001,
              background: 'rgba(0, 123, 255, 0.9)',
              color: 'white',
              padding: isMobile ? '8px 12px' : '12px 16px',
              borderRadius: '12px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: 'bold',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              maxHeight: '100px',
              overflowY: 'auto'
            }}>
              <div style={{ marginBottom: '4px', opacity: 0.8 }}>
                Real-time: "{realTimeTranscript}"
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', opacity: 0.7 }}>
                Processing speech...
              </div>
            </div>
          )}

          {/* Debug Info - Remove this in production */}
          {process.env.NODE_ENV === 'development' && (
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              zIndex: 1002,
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              <div>Room: {room}</div>
              <div>Backend: {BACKENDS[backend].url}</div>
              <div>Jitsi: {jitsiConfig ? `${jitsiConfig.domain}/${jitsiConfig.roomName}` : 'Not loaded'}</div>
              <div>Listening: {isListening ? 'Yes' : 'No'}</div>
            </div>
          )}

          {/* Transcript Overlays */}
          <div style={{
            position: 'absolute',
            top: isMobile ? '60px' : '10px',
            left: isMobile ? '5px' : '10px',
            right: isMobile ? '5px' : '10px',
            pointerEvents: 'none',
            zIndex: 1000
          }}>
            {Object.entries(transcripts).map(([participantId, data]) => (
              <div key={participantId} style={{
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: isMobile ? '6px 8px' : '8px 12px',
                borderRadius: '8px',
                marginBottom: '8px',
                fontSize: isMobile ? '12px' : '14px',
                fontFamily: 'Arial, sans-serif',
                maxWidth: isMobile ? '250px' : '300px',
                wordWrap: 'break-word',
                backdropFilter: 'blur(10px)',
                border: data.translation === '...translating...' ? '2px solid #ffc107' : 'none'
              }}>
                <div style={{
                  fontWeight: 'bold',
                  marginBottom: '4px',
                  fontSize: isMobile ? '11px' : '12px'
                }}>
                  {participantId === 'current-user' ? 'You' : `Participant ${participantId}`}
                </div>
                <div style={{
                  fontSize: isMobile ? '11px' : '12px',
                  opacity: 0.9,
                  marginBottom: '4px'
                }}>
                  "{data.transcript}"
                </div>
                <div style={{
                  fontSize: isMobile ? '11px' : '12px',
                  color: data.translation === '...translating...' ? '#ffc107' : '#4CAF50',
                  fontWeight: 'bold'
                }}>
                  {data.translation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transcript Panel - Desktop Only */}
        {!isMobile && !isTablet && (
          <div style={{
            flex: 0.4,
            background: 'white',
            borderLeft: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #e0e0e0',
              background: '#f8f9fa'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Live Transcripts
              </h3>
            </div>
            <div style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto'
            }}>
              {Object.entries(transcripts).length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  color: '#666',
                  fontStyle: 'italic',
                  marginTop: '40px'
                }}>
                  No transcripts yet. Start speaking to see live translations.
                </div>
              ) : (
                Object.entries(transcripts).map(([participantId, data]) => (
                  <div key={participantId} style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: '15px',
                    borderRadius: '12px',
                    marginBottom: '15px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    border: data.translation === '...translating...' ? '2px solid #ffc107' : 'none'
                  }}>
                    <div style={{
                      fontWeight: 'bold',
                      marginBottom: '8px',
                      fontSize: '14px',
                      color: '#333'
                    }}>
                      {participantId === 'current-user' ? 'You' : `Participant ${participantId}`}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      marginBottom: '8px',
                      color: '#555',
                      lineHeight: '1.4'
                    }}>
                      "{data.transcript}"
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: data.translation === '...translating...' ? '#ffc107' : '#4CAF50',
                      fontWeight: 'bold',
                      fontStyle: data.translation === '...translating...' ? 'italic' : 'normal'
                    }}>
                      {data.translation}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Sidebar */}
        <div style={{
          width: isMobile ? '100%' : isTablet ? '350px' : '400px',
          background: 'white',
          borderLeft: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column',
          transform: isMobile || isTablet ? (sidebarOpen ? 'translateX(0)' : 'translateX(100%)') : 'none',
          position: isMobile || isTablet ? 'absolute' : 'relative',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 1001,
          transition: 'transform 0.3s ease',
          boxShadow: isMobile || isTablet ? '-2px 0 10px rgba(0, 0, 0, 0.1)' : 'none'
        }}>
          {/* Mobile/Tablet View Mode Controls */}
          {(isMobile || isTablet) && (
            <div style={{
              padding: '15px',
              borderBottom: '1px solid #e0e0e0',
              background: '#f8f9fa',
              display: 'flex',
              gap: '10px'
            }}>
              <button
                onClick={() => setViewMode('video')}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: viewMode === 'video' ? '#007bff' : '#e9ecef',
                  color: viewMode === 'video' ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                📹 Video
              </button>
              <button
                onClick={() => setViewMode('transcript')}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: viewMode === 'transcript' ? '#007bff' : '#e9ecef',
                  color: viewMode === 'transcript' ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                💬 Transcripts
              </button>
            </div>
          )}

          <div style={{
            padding: isMobile ? '15px' : '20px',
            flex: 1,
            overflowY: 'auto'
          }}>
            {/* Mobile/Tablet Transcript View */}
            {(isMobile || isTablet) && viewMode === 'transcript' && (
              <div>
                <h3 style={{
                  marginBottom: '20px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Live Transcripts
                </h3>
                {Object.entries(transcripts).length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    color: '#666',
                    fontStyle: 'italic',
                    marginTop: '40px',
                    padding: '20px'
                  }}>
                    No transcripts yet. Switch to Video view and start speaking to see live translations.
                  </div>
                ) : (
                  Object.entries(transcripts).map(([participantId, data]) => (
                    <div key={participantId} style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      padding: '15px',
                      borderRadius: '12px',
                      marginBottom: '15px',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                      border: data.translation === '...translating...' ? '2px solid #ffc107' : 'none'
                    }}>
                      <div style={{
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        fontSize: '14px',
                        color: '#333'
                      }}>
                        {participantId === 'current-user' ? 'You' : `Participant ${participantId}`}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        marginBottom: '8px',
                        color: '#555',
                        lineHeight: '1.4'
                      }}>
                        "{data.transcript}"
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: data.translation === '...translating...' ? '#ffc107' : '#4CAF50',
                        fontWeight: 'bold',
                        fontStyle: data.translation === '...translating...' ? 'italic' : 'normal'
                      }}>
                        {data.translation}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Language Learning Controls */}
            {(!(isMobile || isTablet) || viewMode === 'video') && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: isMobile ? '15px' : '20px',
              borderRadius: '12px',
              marginBottom: '20px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                marginBottom: '15px',
                fontSize: isMobile ? '18px' : '20px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Language Learning Assistant
              </h3>

              <div style={{ marginBottom: '15px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '14px' : '16px'
                }}>
                  Backend:
                </label>
                <select
                  value={backend}
                  onChange={(e) => setBackend(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: isMobile ? '14px' : '16px'
                  }}
                >
                  {Object.entries(BACKENDS).map(([key, value]) => (
                    <option key={key} value={key}>{value.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '14px' : '16px'
                }}>
                  From Language:
                </label>
                <select
                  value={fromLang}
                  onChange={(e) => setFromLang(e.target.value)}
                  style={{
                    width: '48%',
                    padding: '8px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: isMobile ? '14px' : '16px',
                    marginRight: '4%'
                  }}
                >
                  {Object.entries(LANGUAGES).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </select>

                <select
                  value={toLang}
                  onChange={(e) => setToLang(e.target.value)}
                  style={{
                    width: '48%',
                    padding: '8px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: isMobile ? '14px' : '16px'
                  }}
                >
                  {Object.entries(LANGUAGES).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '14px' : '16px'
                }}>
                  Manual Text:
                </label>
                <input
                  type="text"
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  placeholder="Enter text to translate"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: isMobile ? '14px' : '16px'
                  }}
                />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)',
                gap: '8px',
                marginBottom: '15px'
              }}>
                <button
                  onClick={handleManualTranslate}
                  style={{
                    padding: '8px',
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: isMobile ? '12px' : '14px',
                    cursor: 'pointer'
                  }}
                >
                  Translate
                </button>
                <button
                  onClick={() => handleVocabulary(manualText || transcript)}
                  style={{
                    padding: '8px',
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: isMobile ? '12px' : '14px',
                    cursor: 'pointer'
                  }}
                >
                  Vocabulary
                </button>
                <button
                  onClick={() => handlePronunciation(manualText || transcript)}
                  style={{
                    padding: '8px',
                    background: '#ffc107',
                    color: 'black',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: isMobile ? '12px' : '14px',
                    cursor: 'pointer'
                  }}
                >
                  Pronunciation
                </button>
                <button
                  onClick={() => handleGrammarTip(manualText || transcript)}
                  style={{
                    padding: '8px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: isMobile ? '12px' : '14px',
                    cursor: 'pointer'
                  }}
                >
                  Grammar
                </button>
                <button
                  onClick={handleCommonPhrases}
                  style={{
                    padding: '8px',
                    background: '#6f42c1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: isMobile ? '12px' : '14px',
                    cursor: 'pointer'
                  }}
                >
                  Phrases
                </button>
                <button
                  onClick={toggleListening}
                  style={{
                    padding: '8px',
                    background: isListening ? '#dc3545' : '#17a2b8',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: isMobile ? '12px' : '14px',
                    cursor: 'pointer'
                  }}
                >
                  {isListening ? 'Stop' : 'Listen'}
                </button>
              </div>

              {/* Results Display */}
              <div style={{ marginTop: '15px' }}>
                {translation && (
                  <div style={{
                    marginBottom: '10px',
                    padding: '10px',
                    background: '#f8f9fa',
                    borderRadius: '4px',
                    fontSize: isMobile ? '14px' : '16px'
                  }}>
                    <strong>Translation:</strong> {translation}
                  </div>
                )}

                {vocabulary && (
                  <div style={{
                    marginBottom: '10px',
                    padding: '10px',
                    background: '#d4edda',
                    borderRadius: '4px',
                    fontSize: isMobile ? '14px' : '16px'
                  }}>
                    <strong>Vocabulary:</strong> {vocabulary}
                  </div>
                )}

                {pronunciation && (
                  <div style={{
                    marginBottom: '10px',
                    padding: '10px',
                    background: '#fff3cd',
                    borderRadius: '4px',
                    fontSize: isMobile ? '14px' : '16px'
                  }}>
                    <strong>Pronunciation:</strong> {pronunciation}
                  </div>
                )}

                {grammarTip && (
                  <div style={{
                    marginBottom: '10px',
                    padding: '10px',
                    background: '#f8d7da',
                    borderRadius: '4px',
                    fontSize: isMobile ? '14px' : '16px'
                  }}>
                    <strong>Grammar:</strong> {grammarTip}
                  </div>
                )}

                {commonPhrases.length > 0 && (
                  <div style={{
                    marginBottom: '10px',
                    padding: '10px',
                    background: '#e2e3e5',
                    borderRadius: '4px'
                  }}>
                    <strong>Common Phrases:</strong>
                    <ul style={{
                      margin: '5px 0',
                      paddingLeft: '20px',
                      fontSize: isMobile ? '14px' : '16px'
                    }}>
                      {commonPhrases.map((phrase, index) => (
                        <li key={index}>{phrase}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
