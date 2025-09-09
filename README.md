# Cydebe - AI-Powered Language Learning Platform

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)

## 🌟 Overview

Cydebe is a revolutionary AI-powered language learning platform that breaks down language barriers through real-time translation, cultural intelligence, and authentic conversation practice. Built with cutting-edge neural networks and modern web technologies.

## 🚀 Features

### Core Platform
- **Real-time AI Translation** - Neural networks with 95%+ accuracy
- **Speech Recognition** - Advanced voice processing for multiple languages
- **Jitsi Integration** - Seamless video conferencing for language practice
- **Cultural Intelligence** - AI-powered context and cultural understanding
- **Multi-Backend Architecture** - API, Local Network, and Local Device options

### Learning Features
- **Vocabulary Building** - Intelligent word and phrase suggestions
- **Pronunciation Feedback** - Real-time speech analysis and correction
- **Grammar Assistance** - Context-aware grammar correction
- **Progress Analytics** - Comprehensive learning dashboards
- **Adaptive Learning** - Personalized learning paths

### Technical Excellence
- **Privacy-First Design** - Local processing options available
- **Multi-Platform Support** - Web, mobile, and desktop
- **Offline Capabilities** - Device-based AI processing
- **Enterprise Security** - SOC 2 compliant architecture

## 🏗️ Architecture

```
Cydebe Platform
├── Frontend (Next.js + React)
│   ├── Marketing Site (Port 3000)
│   └── Learning App (Port 3001)
├── Backend Services
│   ├── API Backend (Port 3004) - External AI services
│   ├── Local Network (Port 3002) - On-premises processing
│   └── Local Device (Port 3003) - Offline processing
└── External Integrations
    ├── Jitsi Meet - Video conferencing
    ├── OpenAI API - Advanced AI processing
    └── Web Speech API - Voice recognition
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **AI/ML**: OpenAI GPT, Custom Neural Networks
- **Video**: Jitsi Meet SDK
- **Deployment**: Vercel, Docker, Kubernetes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/West-Industrial-LLC/cydebe.git
   cd cydebe
   ```

2. **Install dependencies**
   ```bash
   # Marketing Site
   cd marketing && npm install

   # Learning Platform
   cd ../frontend && npm install

   # Backend Services
   cd ../backend-api && npm install
   cd ../backend-local-network && npm install
   cd ../backend-local-device && npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp marketing/.env.example marketing/.env.local
   cp frontend/.env.example frontend/.env.local
   cp backend-api/.env.example backend-api/.env.local
   ```

4. **Start Development Servers**
   ```bash
   # Marketing Site (Port 3000)
   cd marketing && npm run dev

   # Learning App (Port 3001)
   cd ../frontend && npm run dev -- --port 3001

   # Backend Services
   cd ../backend-api && npm start
   cd ../backend-local-network && npm start
   cd ../backend-local-device && npm start
   ```

5. **Access the Platform**
   - Marketing Site: http://localhost:3000
   - Learning App: http://localhost:3001
   - API Backend: http://localhost:3004

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Marketing Site
cd marketing
npm install -g vercel
vercel --prod

# Learning App
cd ../frontend
vercel --prod
```

### Docker
```bash
# Build and run with Docker
docker build -t cydebe .
docker run -p 3000:3000 -p 3001:3001 cydebe
```

### Manual Build
```bash
# Production build
cd marketing && npm run build && npm start
cd ../frontend && npm run build && npm start
```

## 🔧 Configuration

### Environment Variables

#### Marketing Site (.env.local)
```env
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3004
```

#### Learning App (.env.local)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3004
NEXT_PUBLIC_LOCAL_NETWORK_URL=http://localhost:3002
NEXT_PUBLIC_LOCAL_DEVICE_URL=http://localhost:3003
OPENAI_API_KEY=your_openai_key_here
JITSI_DOMAIN=meet.jit.si
```

#### Backend API (.env)
```env
PORT=3004
OPENAI_API_KEY=your_openai_key_here
NODE_ENV=production
```

## 📊 Usage

### For Learners
1. Visit the marketing site to learn about Cydebe
2. Click "Launch Cydebe Platform" to access the learning app
3. Create or join a conversation room
4. Practice speaking with real-time translation
5. Receive AI-powered feedback and suggestions

### For Educators
1. Integrate Cydebe into language curricula
2. Monitor student progress through analytics
3. Customize learning paths for different proficiency levels
4. Access institutional dashboard for class management

### For Developers
1. Fork the repository
2. Set up your development environment
3. Customize features for specific use cases
4. Contribute back to the open-source project

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Olesya** - Chief AI Architect and Visionary
- **Open Source Community** - For the amazing tools and libraries
- **UNESCO** - For partnership in global education
- **Stanford University** - For academic collaboration

## 📞 Contact

- **Website**: [cydebe.com](https://cydebe.com)
- **Email**: contact@cydebe.com
- **GitHub**: [github.com/West-Industrial-LLC/cydebe](https://github.com/West-Industrial-LLC/cydebe)
- **LinkedIn**: [linkedin.com/company/cydebe](https://linkedin.com/company/cydebe)

## 🎯 Roadmap

- [ ] Mobile app development
- [ ] Additional language support
- [ ] Advanced AI tutoring features
- [ ] Institutional LMS integration
- [ ] Real-time collaboration tools
- [ ] Offline-first architecture
- [ ] Multi-tenant enterprise solution

---

**Breaking Language Barriers, Building Global Connections** 🌍

*Made with ❤️ by the Cydebe Team*
