const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3004;

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

// Analytics endpoint for data collection
app.post('/analytics', async (req, res) => {
  const analyticsData = req.body;
  console.log('Analytics received:', analyticsData);
  
  // In production, this would save to a database
  // For now, just acknowledge receipt
  res.json({ status: 'Analytics data received', data: analyticsData });
});
