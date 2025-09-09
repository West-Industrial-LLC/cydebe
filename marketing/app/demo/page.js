import { motion } from 'framer-motion'
import { CheckCircle, Star, Award, Users, Globe, Zap } from 'lucide-react'

export default function Demo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-max">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">Cydebe</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Experience Cydebe
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Live</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              See how our AI-powered platform transforms language learning through real-time translation and cultural exchange.
            </p>
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
              <div className="aspect-video bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive Demo Coming Soon</p>
                  <p className="text-sm text-gray-500 mt-2">Real-time language learning experience</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Live Conversations</h3>
                  <p className="text-sm text-gray-600">Connect with native speakers worldwide</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Real-Time Translation</h3>
                  <p className="text-sm text-gray-600">Instant, accurate language conversion</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Cultural Learning</h3>
                  <p className="text-sm text-gray-600">Context-aware cultural insights</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Revolutionary Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology meets educational innovation to create the future of language learning.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl"
            >
              <CheckCircle className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Neural Translation</h3>
              <p className="text-gray-600">
                State-of-the-art AI provides context-aware translations with industry-leading accuracy rates.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl"
            >
              <CheckCircle className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Cultural Intelligence</h3>
              <p className="text-gray-600">
                AI understands cultural nuances, idioms, and social contexts for authentic communication.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl"
            >
              <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Real-Time Learning</h3>
              <p className="text-gray-600">
                Instant feedback and learning suggestions help users improve their language skills rapidly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl"
            >
              <CheckCircle className="w-8 h-8 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Multi-Platform Support</h3>
              <p className="text-gray-600">
                Seamless experience across desktop, mobile, and tablet devices with offline capabilities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl"
            >
              <CheckCircle className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Privacy-First Design</h3>
              <p className="text-gray-600">
                Enterprise-grade security with local processing options for sensitive educational environments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl"
            >
              <CheckCircle className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Open Source Innovation</h3>
              <p className="text-gray-600">
                Transparent development with community contributions driving continuous improvement and innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Voices of Innovation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from leaders in education, technology, and international relations about Cydebe's impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
              <p className="text-gray-600 mb-6">
                "Cydebe represents the future of language education. The combination of AI translation and cultural intelligence is unprecedented."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">U</span>
                </div>
                <div>
                  <div className="font-semibold">Dr. Maria Rodriguez</div>
                  <div className="text-sm text-gray-500">Dean of Languages, Harvard University</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
              <p className="text-gray-600 mb-6">
                "The cultural sensitivity and accuracy of Cydebe's AI systems are remarkable. This technology bridges communication gaps worldwide."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-bold">UN</span>
                </div>
                <div>
                  <div className="font-semibold">Ambassador Sarah Chen</div>
                  <div className="text-sm text-gray-500">UNESCO Representative</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
              <p className="text-gray-600 mb-6">
                "Olesya's leadership in AI education is extraordinary. Cydebe demonstrates the power of combining technical excellence with educational vision."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">W</span>
                </div>
                <div>
                  <div className="font-semibold">Dr. Jennifer Walsh</div>
                  <div className="text-sm text-gray-500">President, Women in Tech Global</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Education?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join leading universities, international organizations, and tech innovators in supporting Cydebe's mission to revolutionize global language education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:olesya@cydebe.com" className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                Partner with Olesya
              </a>
              <a href="mailto:support@cydebe.com" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                Schedule Demo
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
