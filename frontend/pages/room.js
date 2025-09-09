import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import JitsiMeeting to avoid SSR issues
const JitsiMeeting = dynamic(() => import('@jitsi/react-sdk').then(mod => mod.JitsiMeeting), { ssr: false })

const BACKENDS = {
  api: { name: 'External AI', port: 3001 },
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
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (room) {
      console.log('Joined room:', room)
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

  const handleTranslation = async (text) => {
    const port = BACKENDS[backend].port
    try {
      const response = await fetch(`http://localhost:${port}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, fromLang, toLang })
      })
      const data = await response.json()
      setTranslation(data.translation)
    } catch (error) {
      console.error('Translation error:', error)
      setTranslation('Translation failed')
    }
  }

  const handleFeedback = async (conversation) => {
    const port = BACKENDS[backend].port
    try {
      const response = await fetch(`http://localhost:${port}/feedback`, {
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
      const response = await fetch(`http://localhost:${port}/vocabulary`, {
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
      const response = await fetch(`http://localhost:${port}/pronunciation`, {
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
      const response = await fetch(`http://localhost:${port}/grammar`, {
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
      participantId: 'current-user', // In real implementation, get from Jitsi
      data,
      backend: backend
    }
    
    setAnalyticsData(prev => [...prev, analyticsEntry])
    
    // Send to analytics endpoint
    fetch(`http://localhost:${BACKENDS[backend].port}/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(analyticsEntry)
    }).catch(err => console.error('Analytics error:', err))
  }

  const updateTranscript = (participantId, transcript, translation) => {
    setTranscripts(prev => ({
      ...prev,
      [participantId]: {
        transcript,
        translation,
        timestamp: Date.now()
      }
    }))
    
    logAnalytics('translation', { transcript, translation, participantId })
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        {room && (
          <JitsiMeeting
            roomName={room}
            configOverwrite={{
              startWithAudioMuted: true,
              disableModeratorIndicator: true,
              startScreenSharing: false,
              enableEmailInStats: false
            }}
            interfaceConfigOverwrite={{
              DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
            }}
            userInfo={{
              displayName: 'User'
            }}
            onApiReady={(externalApi) => {
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
            getIFrameRef={(iframeRef) => { iframeRef.style.height = '100%'; }}
          />
        )}
        
        {/* Transcript Overlays */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          right: '10px',
          pointerEvents: 'none',
          zIndex: 1000
        }}>
          {Object.entries(transcripts).map(([participantId, data]) => (
            <div key={participantId} style={{
              background: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '8px',
              marginBottom: '8px',
              fontSize: '14px',
              fontFamily: 'Arial, sans-serif',
              maxWidth: '300px',
              wordWrap: 'break-word'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                {participantId === 'current-user' ? 'You' : `Participant ${participantId}`}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>
                "{data.transcript}"
              </div>
              <div style={{ fontSize: '12px', color: '#4CAF50', marginTop: '4px' }}>
                {data.translation}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '1rem', background: '#f0f0f0', borderTop: '1px solid #ccc' }}>
        <h3>Russian-English Learning Assistant</h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <label>Backend: </label>
          <select value={backend} onChange={(e) => setBackend(e.target.value)}>
            {Object.entries(BACKENDS).map(([key, value]) => (
              <option key={key} value={key}>{value.name}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>From Language: </label>
          <select value={fromLang} onChange={(e) => setFromLang(e.target.value)}>
            {Object.entries(LANGUAGES).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
          
          <label style={{ marginLeft: '1rem' }}>To Language: </label>
          <select value={toLang} onChange={(e) => setToLang(e.target.value)}>
            {Object.entries(LANGUAGES).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <button onClick={toggleListening} style={{ background: isListening ? 'red' : 'green', color: 'white' }}>
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </button>
          <p>Transcript: {transcript}</p>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <button onClick={handleManualTranslate} style={{ marginRight: '0.5rem' }}>Translate</button>
          <button onClick={() => handleVocabulary(manualText || transcript)} style={{ marginRight: '0.5rem' }}>Vocabulary</button>
          <button onClick={() => handlePronunciation(manualText || transcript)} style={{ marginRight: '0.5rem' }}>Pronunciation</button>
          <button onClick={() => handleGrammarTip(manualText || transcript)} style={{ marginRight: '0.5rem' }}>Grammar Tip</button>
          <button onClick={handleCommonPhrases}>Common Phrases</button>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <p><strong>Translation:</strong> {translation}</p>
          <p><strong>Vocabulary:</strong> {vocabulary}</p>
          <p><strong>Pronunciation:</strong> {pronunciation}</p>
          <p><strong>Grammar Tip:</strong> {grammarTip}</p>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <p><strong>Common Phrases:</strong></p>
          <ul>
            {commonPhrases.map((phrase, index) => (
              <li key={index}>{phrase}</li>
            ))}
          </ul>
        </div>

        <div>
          <button onClick={() => handleFeedback(transcript || manualText || 'Sample conversation')}>Get Feedback</button>
          <p><strong>Feedback:</strong> {feedback}</p>
        </div>
      </div>
    </div>
  )
}
