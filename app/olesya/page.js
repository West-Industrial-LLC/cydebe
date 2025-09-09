'use client';

import Link from 'next/link';

export default function OlesyaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Olesya
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your AI Language Learning Companion
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="w-48 h-48 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-6xl text-white">👩‍💼</span>
                </div>
              </div>
              <div className="md:w-2/3 md:pl-8">
                <h2 className="text-2xl font-semibold mb-4">Your Personal Language Coach</h2>
                <p className="text-gray-600 mb-4">
                  Olesya is your intelligent language learning companion, designed to make
                  learning Russian and English engaging, personalized, and effective.
                </p>
                <p className="text-gray-600">
                  With advanced AI capabilities, Olesya adapts to your learning style,
                  provides real-time feedback, and helps you practice with native speakers
                  through our integrated video platform.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-pink-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">🎯 Personalized Learning</h3>
                <p className="text-gray-600">Adaptive lessons based on your progress and preferences</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">🗣️ Pronunciation Coaching</h3>
                <p className="text-gray-600">Real-time feedback on your speaking and pronunciation</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">📚 Cultural Context</h3>
                <p className="text-gray-600">Learn language through cultural insights and real-world scenarios</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">🎮 Gamified Experience</h3>
                <p className="text-gray-600">Earn points, unlock achievements, and track your progress</p>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/demo"
                className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors mr-4"
              >
                Try Demo
              </Link>
              <Link
                href="/app/room"
                className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Start Learning
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Olesya?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🤖</div>
                <h3 className="font-semibold mb-2">AI-Powered</h3>
                <p className="text-sm text-gray-600">Advanced machine learning for personalized learning</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🌍</div>
                <h3 className="font-semibold mb-2">Global Community</h3>
                <p className="text-sm text-gray-600">Connect with learners worldwide</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">📈</div>
                <h3 className="font-semibold mb-2">Proven Results</h3>
                <p className="text-sm text-gray-600">Track your improvement with detailed analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}