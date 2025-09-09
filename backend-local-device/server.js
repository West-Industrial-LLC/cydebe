const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3003;

// Simple local device AI simulation
app.post('/translate', (req, res) => {
  const { text, fromLang, toLang } = req.body;
  // Basic translation simulation with language support
  res.json({ translation: `[Local Device] Translated: "${text}" from ${fromLang} to ${toLang}` });
});

// Vocabulary suggestions
app.post('/vocabulary', (req, res) => {
  const { text, fromLang, toLang } = req.body;
  res.json({ vocabulary: `[Local Device] Basic words: I (я), You (ты), We (мы), They (они)` });
});

// Pronunciation guide
app.post('/pronunciation', (req, res) => {
  const { text, fromLang, toLang } = req.body;
  res.json({ pronunciation: `[Local Device] Practice: 'zh' as in pleasure, 'sh' as in ship, 'щ' as in fresh` });
});

// Grammar tips
app.post('/grammar', (req, res) => {
  const { text, fromLang, toLang } = req.body;
  res.json({ grammar: `[Local Device] Russian verbs conjugate by person and tense. Practice present tense endings.` });
});

// Common phrases
app.post('/phrases', (req, res) => {
  const { fromLang, toLang } = req.body;
  res.json({ phrases: [
    'Good morning - Доброе утро',
    'What\'s your name? - Как вас зовут?',
    'Nice to meet you - Приятно познакомиться',
    'I don\'t understand - Я не понимаю',
    'Can you help me? - Вы можете мне помочь?'
  ] });
});

// Analytics endpoint
app.post('/analytics', (req, res) => {
  const analyticsData = req.body;
  console.log('[Local Device] Analytics:', analyticsData);
  res.json({ status: 'Local device analytics received' });
});
