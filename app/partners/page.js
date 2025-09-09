'use client';

import Link from 'next/link';

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Partners
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Collaborating for Better Language Learning
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Technology Partners</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">🎥</div>
                <h3 className="text-lg font-semibold mb-2">Jitsi Meet</h3>
                <p className="text-gray-600 text-sm">
                  Open-source video conferencing platform powering our real-time language practice sessions
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-lg font-semibold mb-2">OpenAI</h3>
                <p className="text-gray-600 text-sm">
                  Advanced AI models providing intelligent translation and language analysis
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold mb-2">Vercel</h3>
                <p className="text-gray-600 text-sm">
                  Global edge network ensuring fast, reliable access to our platform worldwide
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Educational Partners</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Language Institutes</h3>
                <p className="text-gray-600 mb-4">
                  Partnering with leading language schools and universities to provide
                  structured learning paths and certified courses.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Curriculum development</li>
                  <li>• Teacher training programs</li>
                  <li>• Student assessment tools</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Cultural Organizations</h3>
                <p className="text-gray-600 mb-4">
                  Working with cultural institutions to integrate authentic content
                  and real-world language usage scenarios.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Cultural context learning</li>
                  <li>• Authentic media integration</li>
                  <li>• Regional dialect support</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Become a Partner</h2>

            <div className="text-center mb-6">
              <p className="text-gray-600 mb-4">
                Interested in partnering with Cydebe? We're always looking for
                organizations that share our vision of accessible, effective language learning.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold mb-2">Technology Integration</h4>
                <p className="text-sm text-gray-600">API partnerships and platform integrations</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold mb-2">Content Collaboration</h4>
                <p className="text-sm text-gray-600">Educational content and curriculum development</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold mb-2">Research Partnerships</h4>
                <p className="text-sm text-gray-600">Academic research and language learning studies</p>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="mailto:partners@cydebe.com"
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Contact Partnerships
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Partner Benefits</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🌍</div>
                <h4 className="font-semibold mb-1">Global Reach</h4>
                <p className="text-sm text-gray-600">Access to international user base</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold mb-1">Analytics</h4>
                <p className="text-sm text-gray-600">Detailed usage and performance data</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔧</div>
                <h4 className="font-semibold mb-1">Technical Support</h4>
                <p className="text-sm text-gray-600">Dedicated integration assistance</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📈</div>
                <h4 className="font-semibold mb-1">Growth</h4>
                <p className="text-sm text-gray-600">Joint marketing and expansion opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}