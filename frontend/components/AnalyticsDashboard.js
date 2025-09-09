import { useState, useEffect } from 'react'

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState([])
  const [metrics, setMetrics] = useState({
    totalSessions: 0,
    averageTranslationTime: 0,
    accuracyRate: 0,
    userRetention: 0
  })

  useEffect(() => {
    // In a real implementation, this would fetch from a database
    // For now, we'll simulate analytics data
    const mockData = [
      {
        timestamp: '2025-09-09T10:00:00Z',
        eventType: 'translation',
        participantId: 'user1',
        data: { transcript: 'Hello', translation: 'Привет' },
        backend: 'api'
      },
      {
        timestamp: '2025-09-09T10:05:00Z',
        eventType: 'conference_joined',
        participantId: 'user2',
        data: { roomName: 'practice-room' },
        backend: 'network'
      }
    ]
    
    setAnalyticsData(mockData)
    calculateMetrics(mockData)
  }, [])

  const calculateMetrics = (data) => {
    const sessions = data.filter(item => item.eventType === 'conference_joined').length
    const translations = data.filter(item => item.eventType === 'translation').length
    
    setMetrics({
      totalSessions: sessions,
      averageTranslationTime: 1.2, // Mock value in seconds
      accuracyRate: 94.5, // Mock accuracy percentage
      userRetention: 78.3 // Mock retention percentage
    })
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Cydebe Analytics Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
          <h3>Total Sessions</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{metrics.totalSessions}</p>
        </div>
        
        <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
          <h3>Average Translation Time</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{metrics.averageTranslationTime}s</p>
        </div>
        
        <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
          <h3>Accuracy Rate</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: metrics.accuracyRate > 90 ? 'green' : 'orange' }}>
            {metrics.accuracyRate}%
          </p>
        </div>
        
        <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
          <h3>User Retention</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{metrics.userRetention}%</p>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Recent Activity</h2>
        <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Time</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Event</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Participant</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Backend</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.slice(0, 10).map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {item.eventType.replace('_', ' ').toUpperCase()}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {item.participantId}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {item.backend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2>Platform Health</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'white', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>Backend Performance</h3>
            <ul>
              <li>API Backend: <span style={{ color: 'green' }}>Healthy</span></li>
              <li>Local Network: <span style={{ color: 'green' }}>Healthy</span></li>
              <li>Local Device: <span style={{ color: 'green' }}>Healthy</span></li>
            </ul>
          </div>
          
          <div style={{ background: 'white', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>Accuracy Trends</h3>
            <p>Last 7 days: <strong>+2.1%</strong></p>
            <p>Last 30 days: <strong>+5.3%</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
}
