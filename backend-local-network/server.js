const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

// Placeholder for local network AI endpoint
app.post('/translate', async (req, res) => {
  const { text, fromLang, toLang } = req.body;
  // Simulate local AI call with language support
  res.json({ translation: `[Local Network] Translated: "${text}" from ${fromLang} to ${toLang}` });
});

// Vocabulary suggestions
app.post('/vocabulary', async (req, res) => {
  const { text, fromLang, toLang } = req.body;
  res.json({ vocabulary: `[Local Network] Key words from "${text}": Hello (Привет), Thank you (Спасибо), Please (Пожалуйста)` });
});

// Pronunciation guide
app.post('/pronunciation', async (req, res) => {
  const { text, fromLang, toLang } = req.body;
  res.json({ pronunciation: `[Local Network] For "${text}": Focus on rolling 'r' sounds and soft consonants in Russian.` });
});

// Grammar tips
app.post('/grammar', async (req, res) => {
  const { text, fromLang, toLang } = req.body;
  res.json({ grammar: `[Local Network] Russian has six cases - practice nominative, genitive, dative, accusative, instrumental, and prepositional.` });
});

// Common phrases
app.post('/phrases', async (req, res) => {
  const { fromLang, toLang } = req.body;
  res.json({ phrases: [
    'Hello - Привет',
    'How are you? - Как дела?',
    'Thank you - Спасибо',
    'Please - Пожалуйста',
    'Goodbye - До свидания'
  ] });
});

// Analytics endpoint
app.post('/analytics', (req, res) => {
  const analyticsData = req.body;
  console.log('[Local Network] Analytics:', analyticsData);
  res.json({ status: 'Local network analytics received' });
});
