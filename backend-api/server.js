const express = require('express');
const axios = require('axios');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3004;

// Jitsi configuration
const JITSI_CONFIG = {
  domain: process.env.JITSI_DOMAIN || 'meet.jit.si',
  appId: process.env.JITSI_APP_ID,
  appSecret: process.env.JITSI_APP_SECRET,
  platformApiKey: process.env.PLATFORM_JITSI_API_KEY
};

// Example endpoint for translation using OpenAI
app.post('/translate', async (req, res) => {
  const { text, fromLang, toLang } = req.body;
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Translate "${text}" from ${fromLang} to ${toLang}` }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.json({ translation: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Translation failed' });
  }
});

// Endpoint for vocabulary suggestions
app.post('/vocabulary', async (req, res) => {
  const { text, fromLang, toLang } = req.body;
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `For the text "${text}", suggest 3-5 key vocabulary words in ${fromLang} with their ${toLang} translations and usage examples for language learning.` }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.json({ vocabulary: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Vocabulary suggestions failed' });
  }
});

// Endpoint for pronunciation guide
app.post('/pronunciation', async (req, res) => {
  const { text, fromLang, toLang } = req.body;
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Provide pronunciation guide for "${text}" in ${fromLang} using phonetic spelling and stress marks. Also include common mistakes to avoid.` }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.json({ pronunciation: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Pronunciation guide failed' });
  }
});

// Endpoint for grammar tips
app.post('/grammar', async (req, res) => {
  const { text, fromLang, toLang } = req.body;
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Analyze the grammar in "${text}" (${fromLang}) and provide learning tips, including common mistakes and how to improve.` }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.json({ grammar: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Grammar tips failed' });
  }
});

// Endpoint for common phrases
app.post('/phrases', async (req, res) => {
  const { fromLang, toLang } = req.body;
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Provide 5 useful conversation phrases in ${fromLang} with their ${toLang} translations for language learners.` }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.json({ phrases: response.data.choices[0].message.content.split('\n').filter(p => p.trim()) });
  } catch (error) {
    res.status(500).json({ error: 'Common phrases failed' });
  }
});

// Jitsi room creation endpoint
app.post('/jitsi/create-room', async (req, res) => {
  const { roomName, userApiKey, usePlatformKey = false } = req.body;

  try {
    let jitsiConfig = {
      domain: JITSI_CONFIG.domain,
      roomName: roomName || `cydebe-${Date.now()}`,
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: false,
        disableModeratorIndicator: true,
        startScreenSharing: false,
        enableEmailInStats: false,
        prejoinPageEnabled: false,
        disableDeepLinking: true,
        hideConferenceSubject: true,
        hideConferenceTimer: true,
        hideParticipantsStats: true,
        toolbarButtons: [
          'microphone', 'camera', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'profile', 'chat',
          'recording', 'livestreaming', 'etherpad', 'sharedvideo',
          'settings', 'raisehand', 'videoquality', 'filmstrip',
          'invite', 'feedback', 'stats', 'shortcuts',
          'tileview', 'select-background', 'download', 'help'
        ]
      },
      interfaceConfigOverwrite: {
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        DEFAULT_BACKGROUND: '#1a1a1a',
        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'profile', 'chat',
          'recording', 'livestreaming', 'etherpad', 'sharedvideo',
          'settings', 'raisehand', 'videoquality', 'filmstrip',
          'invite', 'feedback', 'stats', 'shortcuts',
          'tileview', 'select-background', 'download', 'help'
        ]
      }
    };

    // Handle API key selection
    if (usePlatformKey && JITSI_CONFIG.platformApiKey) {
      // Use platform's API key - would integrate with billing system
      jitsiConfig.jwt = await generateJWT(roomName, 'platform-user', JITSI_CONFIG.platformApiKey);
      jitsiConfig.billingInfo = {
        provider: 'platform',
        costPerMinute: 0.01, // Example billing rate
        currency: 'USD'
      };
    } else if (userApiKey) {
      // Use user's own API key
      jitsiConfig.jwt = await generateJWT(roomName, 'user', userApiKey);
      jitsiConfig.billingInfo = {
        provider: 'user',
        costPerMinute: 0,
        currency: 'USD'
      };
    } else {
      // Free tier - no JWT, limited features
      jitsiConfig.billingInfo = {
        provider: 'free',
        costPerMinute: 0,
        currency: 'USD',
        limitations: ['60min limit', 'max 4 participants']
      };
    }

    res.json({
      success: true,
      roomConfig: jitsiConfig,
      roomUrl: `https://${JITSI_CONFIG.domain}/${jitsiConfig.roomName}`
    });

  } catch (error) {
    console.error('Jitsi room creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create Jitsi room',
      details: error.message
    });
  }
});

// Generate JWT for Jitsi authentication
async function generateJWT(roomName, userId, apiKey) {
  try {
    if (!JITSI_CONFIG.appId || !JITSI_CONFIG.appSecret) {
      // Fallback to basic JWT structure if secrets not configured
      const header = {
        alg: 'HS256',
        typ: 'JWT'
      };

      const payload = {
        iss: JITSI_CONFIG.appId || 'cydebe-jitsi',
        sub: JITSI_CONFIG.domain,
        aud: JITSI_CONFIG.domain,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
        nbf: Math.floor(Date.now() / 1000) - 10,
        room: roomName,
        context: {
          user: {
            id: userId,
            name: userId,
            email: `${userId}@cydebe.com`,
            avatar: '',
            moderator: true
          }
        }
      };

      // Mock JWT creation - in production use proper JWT library
      const mockJWT = btoa(JSON.stringify(header)) + '.' + btoa(JSON.stringify(payload)) + '.signature';
      return mockJWT;
    }

    // Use proper JWT library if secrets are configured
    const payload = {
      iss: JITSI_CONFIG.appId,
      sub: JITSI_CONFIG.domain,
      aud: JITSI_CONFIG.domain,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
      nbf: Math.floor(Date.now() / 1000) - 10,
      room: roomName,
      context: {
        user: {
          id: userId,
          name: userId,
          email: `${userId}@cydebe.com`,
          avatar: '',
          moderator: true
        }
      }
    };

    return jwt.sign(payload, JITSI_CONFIG.appSecret, { algorithm: 'HS256' });
  } catch (error) {
    console.error('JWT generation error:', error);
    throw new Error('Failed to generate authentication token');
  }
}

// Get Jitsi configuration options
app.get('/jitsi/config', (req, res) => {
  res.json({
    domain: JITSI_CONFIG.domain,
    availableOptions: {
      free: {
        name: 'Free Tier',
        features: ['Basic video calls', 'Screen sharing', 'Chat'],
        limitations: ['60 minute limit', 'Max 4 participants'],
        cost: 0
      },
      platform: {
        name: 'Platform Premium',
        features: ['Unlimited duration', 'Up to 100 participants', 'Recording', 'Advanced features'],
        cost: 0.01, // per minute
        currency: 'USD'
      },
      user: {
        name: 'Your API Key',
        features: ['Your own Jitsi configuration', 'Custom domain support', 'Full control'],
        cost: 0,
        requirements: ['Valid Jitsi API key']
      }
    }
  });
});

// Analytics endpoint for data collection
app.post('/analytics', async (req, res) => {
  const analyticsData = req.body;
  console.log('Analytics received:', analyticsData);

  // In production, this would save to a database
  // For now, just acknowledge receipt
  res.json({ status: 'Analytics data received', data: analyticsData });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      jitsi: JITSI_CONFIG.domain ? 'configured' : 'not configured',
      openai: process.env.OPENAI_API_KEY ? 'configured' : 'not configured'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Cydebe Backend API running on port ${PORT}`);
  console.log(`Jitsi Domain: ${JITSI_CONFIG.domain}`);
});
