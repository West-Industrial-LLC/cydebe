'use client';

import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios'

// Dynamically import JitsiMeeting to avoid SSR issues
const JitsiMeeting = dynamic(() => import('@jitsi/react-sdk').then(mod => mod.JitsiMeeting), { ssr: false })

const BACKENDS = {
  api: { name: 'External AI', port: 3004, url: 'http://localhost:3004' },
  network: { name: 'Local Network', port: 3002 },
  device: { name: 'Local Device', port: 3003 }
}

const LANGUAGES = {
  en: 'English',
  ru: 'Russian'
}

const JITSI_OPTIONS = {
  free: {
    name: 'Free Tier',
    description: 'Basic features, 60min limit',
    features: ['Basic video calls', 'Screen sharing', 'Chat'],
    limitations: ['60 minute limit', 'Max 4 participants'],
    cost: 0
  },
  platform: {
    name: 'Platform Premium',
    description: 'Unlimited calls, advanced features',
    features: ['Unlimited duration', 'Up to 100 participants', 'Recording', 'Advanced features'],
    cost: 0.01,
    currency: 'USD'
  },
  user: {
    name: 'Your API Key',
    description: 'Use your own Jitsi configuration',
    features: ['Your own Jitsi configuration', 'Custom domain support', 'Full control'],
    cost: 0,
    requirements: ['Valid Jitsi API key']
  }
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
  const [jitsiOptions, setJitsiOptions] = useState(JITSI_OPTIONS)
  const [selectedJitsiOption, setSelectedJitsiOption] = useState('free')
  const [userApiKey, setUserApiKey] = useState('')
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const recognitionRef = useRef(null)
  const jitsiApiRef = useRef(null)

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
    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = fromLang === 'ru' ? 'ru-RU' : 'en-US'

      recognition.onresult = (event) => {
        let finalTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript)
          handleTranslation(finalTranscript).then(translation => {
            updateTranscript('current-user', finalTranscript, translation)
          })
        }
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [fromLang])

  const initializeJitsiRoom = async () => {
    try {
      const response = await axios.post(`${BACKENDS[backend].url}/jitsi/create-room`, {
        roomName: room,
        userApiKey: selectedJitsiOption === 'user' ? userApiKey : null,
        usePlatformKey: selectedJitsiOption === 'platform'
      })

      if (response.data.success) {
        setJitsiConfig(response.data.roomConfig)
      }
    } catch (error) {
      console.error('Failed to initialize Jitsi room:', error)
      // Fallback to basic configuration
      setJitsiConfig({
        domain: 'meet.jit.si',
        roomName: room,
        configOverwrite: {
          startWithAudioMuted: true,
          startWithVideoMuted: false
        }
      })
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

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      recognitionRef.current?.start()
      setIsListening(true)
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

    // Auto-remove old transcripts after 10 seconds
    setTimeout(() => {
      setTranscripts(prev => {
        const updated = { ...prev }
        delete updated[participantId]
        return updated
      })
    }, 10000)
  }

  const handleJitsiOptionChange = (option) => {
    setSelectedJitsiOption(option)
    setShowApiKeyInput(option === 'user')
    if (room) {
      initializeJitsiRoom()
    }
  }

  const renderJitsiOptions = () => (
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
        Choose Your Jitsi Experience
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)',
        gap: '15px'
      }}>
        {Object.entries(jitsiOptions).map(([key, option]) => (
          <div
            key={key}
            onClick={() => handleJitsiOptionChange(key)}
            style={{
              padding: '15px',
              border: `2px solid ${selectedJitsiOption === key ? '#007bff' : '#e0e0e0'}`,
              borderRadius: '8px',
              background: selectedJitsiOption === key ? '#f8f9ff' : 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <h4 style={{
              marginBottom: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              {option.name}
            </h4>
            <p style={{
              marginBottom: '10px',
              fontSize: '14px',
              color: '#666'
            }}>
              {option.description}
            </p>

            {option.cost > 0 && (
              <div style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#28a745',
                marginBottom: '8px'
              }}>
                ${option.cost}/min
              </div>
            )}

            <div style={{ fontSize: '12px', color: '#666' }}>
              <strong>Features:</strong>
              <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                {option.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              {option.limitations && (
                <>
                  <strong>Limitations:</strong>
                  <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                    {option.limitations.map((limitation, index) => (
                      <li key={index} style={{ color: '#dc3545' }}>{limitation}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {showApiKeyInput && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            Your Jitsi API Key:
          </label>
          <input
            type="password"
            value={userApiKey}
            onChange={(e) => setUserApiKey(e.target.value)}
            placeholder="Enter your Jitsi API key"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <p style={{
            marginTop: '8px',
            fontSize: '12px',
            color: '#666'
          }}>
            Your API key is stored locally and never sent to our servers.
          </p>
        </div>
      )}
    </div>
  )

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
        position: 'relative'
      }}>
        {/* Jitsi Container */}
        <div style={{
          flex: isMobile || isTablet ? (sidebarOpen ? 0 : 1) : 1,
          position: 'relative',
          transition: 'flex 0.3s ease'
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
                backdropFilter: 'blur(10px)'
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
                  color: '#4CAF50',
                  fontWeight: 'bold'
                }}>
                  {data.translation}
                </div>
              </div>
            ))}
          </div>
        </div>

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
          <div style={{
            padding: isMobile ? '15px' : '20px',
            flex: 1,
            overflowY: 'auto'
          }}>
            {/* Jitsi Options */}
            {renderJitsiOptions()}

            {/* Language Learning Controls */}
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
          </div>
        </div>
      </div>
    </div>
  )
}
