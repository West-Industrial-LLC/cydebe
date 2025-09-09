'use client';

import Link from 'next/link';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cydebe Demo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Experience our language learning platform in action
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Interactive Demo</h2>
            <p className="text-gray-600 mb-6">
              Try our real-time language learning features with Jitsi video integration,
              speech recognition, and AI-powered translation.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Video Learning</h3>
                <p className="text-gray-600">Connect with native speakers via Jitsi Meet</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Speech Recognition</h3>
                <p className="text-gray-600">Real-time speech-to-text in multiple languages</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">AI Translation</h3>
                <p className="text-gray-600">Instant translation with OpenAI integration</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
                <p className="text-gray-600">Monitor your learning journey with analytics</p>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="https://frontend-eight-sepia-28.vercel.app/room"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Demo Session
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Backend Options</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 text-center">
                <h3 className="font-semibold mb-2">External AI</h3>
                <p className="text-sm text-gray-600">OpenAI-powered translation</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <h3 className="font-semibold mb-2">Local Network</h3>
                <p className="text-sm text-gray-600">Network-based processing</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <h3 className="font-semibold mb-2">Local Device</h3>
                <p className="text-sm text-gray-600">On-device processing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}