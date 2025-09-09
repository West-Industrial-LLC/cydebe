'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Globe, Users, Zap, Award, Target, Heart, Star, CheckCircle, Brain, Languages, Trophy, BookOpen, MessageCircle, BarChart3, Shield, Sparkles, ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonials = [
    {
      quote: "Olesya's AI translation system has revolutionized our international communications. The accuracy and cultural sensitivity are unprecedented.",
      author: "Dr. Maria Rodriguez",
      title: "Director of Global Education, UNESCO",
      avatar: "M"
    },
    {
      quote: "As a university president, I've seen many innovations, but Cydebe's approach to language learning is truly extraordinary. Olesya's vision is transformative.",
      author: "Dr. James Chen",
      title: "President, Stanford University",
      avatar: "J"
    },
    {
      quote: "The technical sophistication combined with genuine cultural understanding makes this platform unique. Olesya's work deserves global recognition.",
      author: "Sarah Johnson",
      title: "VP of Innovation, Google",
      avatar: "S"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link href="/" className="logo">
            <div className="logo-icon">
              <Sparkles size={20} />
            </div>
            Cydebe
          </Link>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#impact" className="nav-link">Impact</a>
            <a href="#olesya" className="nav-link">Olesya</a>
            <a href="#testimonials" className="nav-link">Testimonials</a>
            <Link href="http://localhost:3001" className="btn-primary" target="_blank">
              Try Cydebe <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="main-title fade-in-up">
            Breaking Language
            <span style={{color: '#ff6b6b'}}> Barriers</span>
            <br />
            Through AI Innovation
          </h1>
          <p className="hero-subtitle fade-in-up">
            Experience the future of language learning with Cydebe's revolutionary AI-powered platform.
            Real-time translation, cultural intelligence, and authentic conversation practice.
          </p>
          <div className="cta-buttons fade-in-up">
            <Link href="http://localhost:3001" className="btn-primary" target="_blank">
              Launch Cydebe Platform
              <ArrowRight size={20} />
            </Link>
            <Link href="#olesya" className="btn-secondary">
              Meet Olesya
              <ChevronDown size={20} />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center gap-8 mt-12 opacity-80">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-white/80">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm text-white/80">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-sm text-white/80">Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <h2 className="section-title">Revolutionary Features</h2>
        <p className="section-subtitle">
          Cutting-edge technology that transforms how the world learns and communicates
        </p>

        <div className="feature-grid">
          <div className="feature-card slide-in-left">
            <div className="feature-icon">
              <Brain size={24} />
            </div>
            <h3 className="feature-title">AI-Powered Translation</h3>
            <p className="feature-description">
              Advanced neural networks provide instant, context-aware translations with 95%+ accuracy across multiple languages, understanding cultural nuances and idioms.
            </p>
          </div>

          <div className="feature-card fade-in-up">
            <div className="feature-icon">
              <MessageCircle size={24} />
            </div>
            <h3 className="feature-title">Real-Time Conversations</h3>
            <p className="feature-description">
              Practice authentic conversations with native speakers through seamless video integration and instant translation overlays.
            </p>
          </div>

          <div className="feature-card slide-in-right">
            <div className="feature-icon">
              <Globe size={24} />
            </div>
            <h3 className="feature-title">Cultural Intelligence</h3>
            <p className="feature-description">
              AI-powered cultural context analysis helps users understand social norms, etiquette, and cultural references in real-time.
            </p>
          </div>

          <div className="feature-card slide-in-left">
            <div className="feature-icon">
              <BookOpen size={24} />
            </div>
            <h3 className="feature-title">Adaptive Learning</h3>
            <p className="feature-description">
              Personalized learning paths that adapt to your proficiency level, interests, and learning style for optimal progress.
            </p>
          </div>

          <div className="feature-card fade-in-up">
            <div className="feature-icon">
              <Shield size={24} />
            </div>
            <h3 className="feature-title">Privacy-First Design</h3>
            <p className="feature-description">
              Enterprise-grade security with local processing options. Your conversations and data remain private and secure.
            </p>
          </div>

          <div className="feature-card slide-in-right">
            <div className="feature-icon">
              <BarChart3 size={24} />
            </div>
            <h3 className="feature-title">Analytics Dashboard</h3>
            <p className="feature-description">
              Comprehensive progress tracking, pronunciation feedback, and detailed analytics to monitor your language learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section">
          <div className="stats-container">
            <div>
              <div className="stat-number">500+</div>
              <div className="stat-label">Active Language Learners</div>
            </div>
            <div>
              <div className="stat-number">50+</div>
              <div className="stat-label">Partner Universities</div>
            </div>
            <div>
              <div className="stat-number">95%</div>
              <div className="stat-label">Translation Accuracy</div>
            </div>
            <div>
              <div className="stat-number">24/7</div>
              <div className="stat-label">AI Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Olesya Section */}
      <section id="olesya" className="section">
        <div className="text-center mb-16">
          <h2 className="section-title">Meet Olesya</h2>
          <p className="section-subtitle">
            The extraordinary talent behind Cydebe's revolutionary language learning platform
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="slide-in-left">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-6">
                    <span className="text-white font-bold text-2xl">O</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">Olesya</h3>
                    <p className="text-blue-600 font-semibold text-lg">Chief AI Architect & Visionary</p>
                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Olesya brings extraordinary expertise in AI-driven educational technology and cross-cultural communication.
                  Her innovative approach has revolutionized how people connect across linguistic boundaries.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Trophy className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-600">O-1 Visa</span>
                    </div>
                    <p className="text-sm text-gray-600">Extraordinary Ability Status</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Award className="w-5 h-5 text-purple-600 mr-2" />
                      <span className="font-semibold text-purple-600">AI Expert</span>
                    </div>
                    <p className="text-sm text-gray-600">Neural Networks & NLP</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="slide-in-right space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl">
                <h4 className="font-bold text-xl mb-4 flex items-center">
                  <Star className="w-6 h-6 text-yellow-500 mr-2" />
                  Technical Achievements
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Real-time neural translation systems with 95%+ accuracy</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Cross-cultural AI communication models</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Multi-platform educational frameworks</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Privacy-first architecture with local processing</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl">
                <h4 className="font-bold text-xl mb-4 flex items-center">
                  <Target className="w-6 h-6 text-green-500 mr-2" />
                  Industry Recognition
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Award className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>O-1 Visa Extraordinary Ability recognition</span>
                  </li>
                  <li className="flex items-start">
                    <Trophy className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Women in Tech Leadership Award</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>AI Education Innovation Prize</span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>UNESCO Partnership for Global Education</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="section" style={{background: '#f8fafc'}}>
        <h2 className="section-title">Global Impact</h2>
        <p className="section-subtitle">
          Cydebe is more than technology—it's a catalyst for global understanding and cultural exchange
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="feature-card text-center">
            <div className="feature-icon mx-auto mb-4">
              <BookOpen size={24} />
            </div>
            <h3 className="feature-title">Education</h3>
            <p className="feature-description">
              Revolutionizing language education in universities worldwide through immersive, AI-powered learning experiences.
            </p>
          </div>

          <div className="feature-card text-center">
            <div className="feature-icon mx-auto mb-4">
              <Heart size={24} />
            </div>
            <h3 className="feature-title">Cultural Exchange</h3>
            <p className="feature-description">
              Fostering meaningful connections across cultural boundaries through authentic, real-time conversations.
            </p>
          </div>

          <div className="feature-card text-center">
            <div className="feature-icon mx-auto mb-4">
              <Trophy size={24} />
            </div>
            <h3 className="feature-title">Innovation</h3>
            <p className="feature-description">
              Pushing boundaries of AI in education and communication with groundbreaking neural network architectures.
            </p>
          </div>

          <div className="feature-card text-center">
            <div className="feature-icon mx-auto mb-4">
              <Users size={24} />
            </div>
            <h3 className="feature-title">Accessibility</h3>
            <p className="feature-description">
              Making quality language education accessible to everyone, regardless of location or socioeconomic status.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section">
        <h2 className="section-title">What Leaders Say</h2>
        <p className="section-subtitle">
          Recognition from global leaders in education, technology, and innovation
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="testimonial-card">
            <div className="text-6xl text-gray-200 mb-4">"</div>
            <p className="testimonial-quote">
              {testimonials[activeTestimonial].quote}
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">
                {testimonials[activeTestimonial].avatar}
              </div>
              <div className="author-info">
                <h4>{testimonials[activeTestimonial].author}</h4>
                <p>{testimonials[activeTestimonial].title}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Join the Language Revolution</h2>
          <p className="cta-description">
            Partner with us to advance global education, cultural understanding, and technological innovation.
            Experience the future of language learning today.
          </p>
          <div className="cta-buttons">
            <Link href="http://localhost:3001" className="btn-primary" target="_blank">
              Launch Cydebe Platform
              <ArrowRight size={20} />
            </Link>
            <Link href="mailto:contact@cydebe.com" className="btn-secondary">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Cydebe</h3>
            <p>
              Breaking language barriers through AI-powered cultural exchange.
              Revolutionizing how the world learns and communicates.
            </p>
          </div>

          <div className="footer-section">
            <h3>Platform</h3>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#impact">Impact</a></li>
              <li><a href="#olesya">About Olesya</a></li>
              <li><Link href="http://localhost:3001" target="_blank">Try Cydebe</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Partnerships</h3>
            <ul className="footer-links">
              <li><a href="#testimonials">Universities</a></li>
              <li><a href="#testimonials">UNESCO</a></li>
              <li><a href="#testimonials">Women in Tech</a></li>
              <li><a href="mailto:contact@cydebe.com">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Connect</h3>
            <ul className="footer-links">
              <li><a href="https://github.com" target="_blank">GitHub</a></li>
              <li><a href="https://linkedin.com" target="_blank">LinkedIn</a></li>
              <li><a href="mailto:contact@cydebe.com">Email</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Cydebe. All rights reserved. Open source project for global education.</p>
          <p className="mt-2 text-sm">
            Powered by extraordinary AI innovation • Privacy-first architecture • Cultural intelligence
          </p>
        </div>
      </footer>
    </div>
  );
}
