import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [roomName, setRoomName] = useState('')
  const [backend, setBackend] = useState('api')

  const joinRoom = () => {
    if (roomName) {
      router.push(`/room?room=${roomName}&backend=${backend}`)
    }
  }

  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Cydebe</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '600px' }}>
        AI-powered Russian-English language learning assistant. 
        Practice conversations with real-time translation, vocabulary building, and pronunciation guidance.
      </p>
      
        <div style={{ 
          background: 'rgba(255,255,255,0.1)', 
          padding: '2rem', 
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          width: '100%'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Select AI Backend:</label>
            <select 
              value={backend} 
              onChange={(e) => setBackend(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                borderRadius: '5px',
                border: 'none',
                fontSize: '1rem'
              }}
            >
              <option value="api">External AI (OpenAI, etc.)</option>
              <option value="network">Local Network AI</option>
              <option value="device">Local Device AI</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Room Name:</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name for practice"
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                borderRadius: '5px',
                border: 'none',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <button 
            onClick={joinRoom}
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => e.target.style.background = '#45a049'}
            onMouseOut={(e) => e.target.style.background = '#4CAF50'}
          >
            Start Russian-English Practice
          </button>
        </div>      <footer style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.8 }}>
        <p>Learn Russian and English together with AI assistance</p>
        <p>
          <a href="/analytics" style={{ color: '#4CAF50', textDecoration: 'none' }}>
            📊 Analytics Dashboard
          </a>
        </p>
      </footer>
    </div>
  )
}
