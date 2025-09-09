'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Nielsen's UX: Consistent Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link href="/" className="logo">
            <div className="logo-icon">C</div>
            <span>Cydebe</span>
          </Link>
          <div className="nav-links">
            <a href="#mission" className="nav-link">Mission</a>
            <a href="#cyrano" className="nav-link">Inspiration</a>
            <a href="#team" className="nav-link">Team</a>
            <a href="#solution" className="nav-link">Solution</a>
            <Link href="/demo" className="nav-link">Demo</Link>
            <Link href="https://frontend-eight-sepia-28.vercel.app/room" className="btn-primary">
              Launch Platform
            </Link>
          </div>
        </div>
      </nav>

      {/* Nielsen's UX: Clear Visual Hierarchy - Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 mb-6">
              <p className="text-white/80 italic text-sm font-serif">
                "A great nose may be an index of a great soul..."
              </p>
              <p className="text-white/60 text-xs mt-1">— Cyrano de Bergerac</p>
            </div>
          </div>

          <h1 className="main-title fade-in-up">
            Bridging Cultures,<br />
            <span style={{background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
              Building Peace
            </span>
          </h1>
          <p className="hero-subtitle fade-in-up">
            Cydebe revolutionizes cross-cultural communication through AI-powered language learning,
            fostering understanding between Russian and English-speaking communities to create lasting global peace.
          </p>

          {/* Nielsen's UX: Clear Call-to-Action */}
          <div className="cta-buttons fade-in-up">
            <Link href="https://frontend-eight-sepia-28.vercel.app/room" className="btn-primary">
              <span>🚀</span>
              Experience Cydebe
            </Link>
            <Link href="/demo" className="btn-secondary">
              <span>▶️</span>
              Watch Demo
            </Link>
          </div>

          {/* Nielsen's UX: Recognition Rather Than Recall - Stats */}
          <div className="stats-section" style={{marginTop: '4rem'}}>
            <div className="stats-container">
              <div className="fade-in-up">
                <div className="stat-number">50M+</div>
                <div className="stat-label">Potential Users</div>
              </div>
              <div className="fade-in-up">
                <div className="stat-number">2</div>
                <div className="stat-label">Cultures United</div>
              </div>
              <div className="fade-in-up">
                <div className="stat-number">AI</div>
                <div className="stat-label">Powered Learning</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Museum-Style Cyrano Inspiration Section */}
      <section id="cyrano" className="section" style={{background: 'linear-gradient(135deg, var(--sunset-pink) 0%, var(--desert-tan) 100%)'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title fade-in-up" style={{fontFamily: "'Libre Baskerville', serif", color: 'var(--utah-navy)'}}>
              Literary Inspiration
            </h2>
            <p className="section-subtitle fade-in-up" style={{fontFamily: "'Crimson Text', serif", color: 'var(--rocky-brown)'}}>
              Drawing wisdom from the timeless words of Cyrano de Bergerac
            </p>
            <div className="mt-8 flex justify-center">
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-var(--utah-gold)">
                <span className="text-sm font-medium" style={{color: 'var(--utah-navy)'}}>✨ Museum Exhibit</span>
              </div>
            </div>
          </div>

          {/* Featured Exhibit - Main Quote */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-4 p-12 relative overflow-hidden" style={{borderColor: 'var(--utah-gold)'}}>
              {/* Decorative Border */}
              <div className="absolute top-0 left-0 w-full h-2" style={{background: 'linear-gradient(90deg, var(--utah-crimson), var(--utah-gold), var(--aspen-orange))'}}></div>

              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-gradient-to-br from-utah-gold/20 to-aspen-orange/20 rounded-full mb-6">
                  <span className="text-6xl">📜</span>
                </div>
                <h3 className="text-3xl font-bold mb-4" style={{fontFamily: "'Libre Baskerville', serif", color: 'var(--utah-navy)'}}>
                  Featured Exhibit
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <blockquote className="text-2xl leading-relaxed italic text-center p-8 rounded-xl border-l-4" style={{
                    fontFamily: "'Crimson Text', serif",
                    color: 'var(--rocky-brown)',
                    borderColor: 'var(--utah-crimson)',
                    background: 'linear-gradient(135deg, rgba(245, 222, 179, 0.3), rgba(244, 164, 96, 0.1))'
                  }}>
                    "A great nose may be an index<br />
                    of a great soul..."
                  </blockquote>
                  <div className="text-center">
                    <p className="text-lg font-semibold" style={{color: 'var(--utah-crimson)'}}>
                      — Cyrano de Bergerac
                    </p>
                    <p className="text-sm mt-2" style={{color: 'var(--rocky-brown)'}}>
                      Act I, Scene I
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-bold" style={{fontFamily: "'Libre Baskerville', serif", color: 'var(--utah-navy)'}}>
                    Exhibit Notes
                  </h4>
                  <div className="bg-gradient-to-br p-6 rounded-lg" style={{background: 'linear-gradient(135deg, var(--desert-tan), var(--sunset-pink))'}}>
                    <p className="text-sm leading-relaxed" style={{color: 'var(--rocky-brown)'}}>
                      This iconic line captures Cyrano's wit and self-awareness. Like Cyrano's nose,
                      our platform serves as a bridge between cultures, helping people see beyond
                      surface differences to the beauty within.
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <span className="px-3 py-1 rounded-full" style={{backgroundColor: 'var(--utah-gold)', color: 'var(--utah-navy)'}}>
                      📚 Literature
                    </span>
                    <span className="px-3 py-1 rounded-full" style={{backgroundColor: 'var(--aspen-orange)', color: 'white'}}>
                      🎭 Theater
                    </span>
                    <span className="px-3 py-1 rounded-full" style={{backgroundColor: 'var(--sage-green)', color: 'white'}}>
                      🌍 Culture
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery of Quotes */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border-2 hover:shadow-2xl transition-all duration-300" style={{borderColor: 'var(--sunset-pink)'}}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl" style={{backgroundColor: 'var(--fall-yellow)'}}>
                  🎭
                </div>
                <h4 className="font-bold text-lg" style={{fontFamily: "'Libre Baskerville', serif", color: 'var(--utah-navy)'}}>
                  The Power of Words
                </h4>
              </div>
              <blockquote className="text-center italic mb-4" style={{fontFamily: "'Crimson Text', serif", color: 'var(--rocky-brown)'}}>
                "I would die at the stake rather than change a semi-colon!"
              </blockquote>
              <p className="text-xs text-center" style={{color: 'var(--utah-crimson)'}}>
                — Cyrano de Bergerac
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border-2 hover:shadow-2xl transition-all duration-300" style={{borderColor: 'var(--sage-green)'}}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl" style={{backgroundColor: 'var(--sky-blue)'}}>
                  👁️
                </div>
                <h4 className="font-bold text-lg" style={{fontFamily: "'Libre Baskerville', serif", color: 'var(--utah-navy)'}}>
                  Soul's Reflection
                </h4>
              </div>
              <blockquote className="text-center italic mb-4" style={{fontFamily: "'Crimson Text', serif", color: 'var(--rocky-brown)'}}>
                "All our souls are written in our eyes."
              </blockquote>
              <p className="text-xs text-center" style={{color: 'var(--utah-crimson)'}}>
                — Cyrano de Bergerac
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border-2 hover:shadow-2xl transition-all duration-300" style={{borderColor: 'var(--mountain-red)'}}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl" style={{backgroundColor: 'var(--utah-gold)'}}>
                  ✨
                </div>
                <h4 className="font-bold text-lg" style={{fontFamily: "'Libre Baskerville', serif", color: 'var(--utah-navy)'}}>
                  Dreams & Vision
                </h4>
              </div>
              <blockquote className="text-center italic mb-4" style={{fontFamily: "'Crimson Text', serif", color: 'var(--rocky-brown)'}}>
                "The dream, alone, is of interest. What is life without a dream?"
              </blockquote>
              <p className="text-xs text-center" style={{color: 'var(--utah-crimson)'}}>
                — Cyrano de Bergerac
              </p>
            </div>
          </div>

          {/* Connection to Mission */}
          <div className="mt-16 text-center">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-4xl mx-auto border-2" style={{borderColor: 'var(--utah-gold)'}}>
              <h4 className="text-2xl font-bold mb-4" style={{fontFamily: "'Libre Baskerville', serif", color: 'var(--utah-navy)'}}>
                Our Connection to Cyrano
              </h4>
              <p className="text-lg leading-relaxed mb-6" style={{fontFamily: "'Crimson Text', serif", color: 'var(--rocky-brown)'}}>
                Just as Cyrano used his wit and words to bridge social divides, Cydebe uses AI and technology
                to bridge cultural divides. We believe in the power of eloquent communication to foster
                understanding and create lasting peace between communities.
              </p>
              <div className="flex justify-center space-x-8 text-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">🌉</div>
                  <p style={{color: 'var(--utah-crimson)'}}>Bridge Builder</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">💬</div>
                  <p style={{color: 'var(--utah-crimson)'}}>Wordsmith</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🤝</div>
                  <p style={{color: 'var(--utah-crimson)'}}>Peace Maker</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nielsen's UX: Clear Information Architecture - Mission Section */}
      <section className="section">
        <div className="container mx-auto px-4">
          <h2 className="section-title fade-in-up">Our Mission</h2>
          <p className="section-subtitle fade-in-up">
            To bridge the cultural divide between Russian and English-speaking communities through
            innovative AI technology, fostering mutual understanding and lasting peace.
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="slide-in-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
                The Global Challenge
              </h3>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg leading-relaxed">
                  In an increasingly interconnected world, language barriers continue to divide communities
                  and hinder global collaboration. The American-Russian cultural divide represents one of
                  the most significant geopolitical challenges of our time.
                </p>
                <p className="text-lg leading-relaxed">
                  Traditional language learning methods are slow, expensive, and often fail to capture
                  the nuances of cultural context that are essential for meaningful cross-cultural communication.
                </p>
              </div>
            </div>
            <div className="slide-in-right">
              <div className="feature-card" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white'}}>
                <h4 className="text-2xl font-bold mb-4" style={{fontFamily: "'Playfair Display', serif"}}>Our Vision</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-white mr-3 text-xl">✓</span>
                    <span>Break down language barriers through AI innovation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-3 text-xl">✓</span>
                    <span>Foster cultural understanding and empathy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-3 text-xl">✓</span>
                    <span>Build bridges between communities worldwide</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-3 text-xl">✓</span>
                    <span>Create lasting peace through mutual understanding</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nielsen's UX: Recognition Rather Than Recall - Team Section */}
      <section className="section" style={{background: '#f8fafc'}}>
        <div className="container mx-auto px-4">
          <h2 className="section-title fade-in-up">Meet Our Team</h2>
          <p className="section-subtitle fade-in-up">
            Visionary leaders and AI experts dedicated to transforming cross-cultural communication
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Jensen */}
            <div className="testimonial-card slide-in-left">
              <div className="flex items-center mb-6">
                <div className="author-avatar" style={{background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>
                  <span className="text-white font-bold text-2xl">J</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>Jensen</h3>
                  <p className="text-blue-600 font-semibold">Chief Operating Officer</p>
                  <p className="text-sm text-gray-600">An upcoming leader in the field of AI delivery</p>
                </div>
              </div>
              <p className="testimonial-quote">
                "Jensen brings decades of experience in scaling technology companies and building
                global teams. His vision for Cydebe stems from a deep commitment to using technology
                for social good and fostering international understanding."
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Leadership</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Strategy</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Global Expansion</span>
              </div>
            </div>

            {/* Olesya */}
            <div className="testimonial-card slide-in-right" style={{border: '2px solid #f093fb'}}>
              <div className="flex items-center mb-6">
                <div className="author-avatar" style={{background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)'}}>
                  <span className="text-white font-bold text-2xl">O</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>Olesya</h3>
                  <p className="text-purple-600 font-semibold">Chief Product Officer</p>
                  <p className="text-sm text-gray-600">A rising innovator in the removal of cultural barriers</p>
                </div>
              </div>
              <p className="testimonial-quote">
                "Olesya is a brilliant AI researcher and cultural bridge-builder whose groundbreaking
                work in cross-cultural AI communication has earned her recognition as an O-1 Visa
                Extraordinary Ability candidate. Her unique perspective as a Russian woman in tech
                drives our mission to improve relationships between American and Russian women."
              </p>
              <div className="bg-pink-50 p-4 rounded-lg mt-4" style={{border: '1px solid #f093fb'}}>
                <p className="text-pink-800 font-semibold text-sm">
                  🎯 O-1 Visa Extraordinary Ability Candidate - Recognized for outstanding contributions
                  in AI-driven cross-cultural communication and peace-building technology.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">AI Research</span>
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">Cultural Bridge</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Innovation</span>
              </div>
            </div>
          </div>

          {/* Backers/Advisors */}
          <div className="text-center fade-in-up">
            <h3 className="text-2xl font-bold text-gray-900 mb-8" style={{fontFamily: "'Playfair Display', serif"}}>Strategic Backers & Advisors</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="feature-card">
                <div className="feature-icon" style={{background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>
                  <span className="text-2xl">💼</span>
                </div>
                <h4 className="feature-title">Angel Investors</h4>
                <p className="feature-description">Supporting our mission to bridge cultural divides</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon" style={{background: 'linear-gradient(135deg, #f093fb, #f5576c)'}}>
                  <span className="text-2xl">🧠</span>
                </div>
                <h4 className="feature-title">Tech Advisors</h4>
                <p className="feature-description">AI and education technology experts</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon" style={{background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)'}}>
                  <span className="text-2xl">🌍</span>
                </div>
                <h4 className="feature-title">Cultural Experts</h4>
                <p className="feature-description">Cross-cultural communication specialists</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nielsen's UX: Visual Feedback and Affordances - Solution Section */}
      <section className="section">
        <div className="container mx-auto px-4">
          <h2 className="section-title fade-in-up">Our Revolutionary Solution</h2>
          <p className="section-subtitle fade-in-up">
            Cydebe combines cutting-edge AI with cultural intelligence to create the most effective
            cross-cultural language learning platform ever built.
          </p>

          <div className="feature-grid">
            <div className="feature-card fade-in-up">
              <div className="feature-icon">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="feature-title">AI-Powered Learning</h3>
              <p className="feature-description">
                Advanced neural networks provide personalized learning paths adapted to each user's
                cultural background and learning style.
              </p>
            </div>

            <div className="feature-card fade-in-up">
              <div className="feature-icon" style={{background: 'linear-gradient(135deg, #f093fb, #f5576c)'}}>
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="feature-title">Cultural Intelligence</h3>
              <p className="feature-description">
                Our platform understands cultural context, providing nuanced translations and
                culturally appropriate communication guidance.
              </p>
            </div>

            <div className="feature-card fade-in-up">
              <div className="feature-icon" style={{background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)'}}>
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="feature-title">Live Collaboration</h3>
              <p className="feature-description">
                Connect with native speakers worldwide through integrated video calls,
                real-time translation, and cultural exchange.
              </p>
            </div>
          </div>

          {/* Nielsen's UX: Clear Call-to-Action */}
          <div className="cta-section" style={{marginTop: '6rem'}}>
            <div className="cta-content">
              <h3 className="cta-title">Join the Peace-Building Revolution</h3>
              <p className="cta-description">
                Be part of the movement to bridge cultural divides and create lasting global peace
                through technology and human connection.
              </p>
              <div className="cta-buttons">
                <Link href="https://frontend-eight-sepia-28.vercel.app/room" className="btn-primary">
                  <span>🚀</span>
                  Start Learning Today
                </Link>
                <Link href="https://github.com/West-Industrial-LLC/cydebe" className="btn-secondary">
                  <span>📖</span>
                  View on GitHub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nielsen's UX: Help and Documentation - Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <Link href="/" className="logo" style={{marginBottom: '1.5rem'}}>
              <div className="logo-icon">C</div>
              <span>Cydebe</span>
            </Link>
            <p>
              Bridging cultures, building peace through AI-powered language learning.
            </p>
            <div className="mt-4 text-xs text-gray-400 italic">
              "Inspired by Cyrano's eloquence and vision"
            </div>
          </div>
          <div className="footer-section">
            <h3>Platform</h3>
            <ul className="footer-links">
              <li><Link href="https://frontend-eight-sepia-28.vercel.app/room">Launch App</Link></li>
              <li><Link href="/demo">Demo</Link></li>
              <li><a href="#solution">Features</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Company</h3>
            <ul className="footer-links">
              <li><a href="#mission">Mission</a></li>
              <li><a href="#cyrano">Inspiration</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="mailto:contact@cydebe.com">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect</h3>
            <ul className="footer-links">
              <li><a href="https://github.com/West-Industrial-LLC/cydebe">GitHub</a></li>
              <li><a href="mailto:contact@cydebe.com">Email</a></li>
              <li><span>Open Source Project</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Cydebe. Building bridges, fostering peace. Open source for global education.</p>
          <p className="text-xs text-gray-500 mt-2 italic">
            "Words are the most powerful drug used by mankind." — Rudyard Kipling
          </p>
        </div>
      </footer>
    </div>
  );
}
