import { motion } from 'framer-motion'
import { Award, Users, Globe, Zap, Target, Heart, Star, CheckCircle } from 'lucide-react'

export default function Olesya() {
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
              <a href="/demo" className="text-gray-600 hover:text-blue-600 transition-colors">Demo</a>
              <a href="/partners" className="text-gray-600 hover:text-blue-600 transition-colors">Partners</a>
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
            <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-white font-bold text-4xl">O</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Olesya
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Chief Product Leader & AI Education Innovator
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                O-1 Visa Extraordinary Ability
              </span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                AI/ML Expert
              </span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                EdTech Innovator
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Extraordinary Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Demonstrating sustained national and international acclaim in AI-powered education technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl"
            >
              <Award className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">O-1 Visa Qualification</h3>
              <p className="text-gray-600">
                Recognized by USCIS for extraordinary ability in AI and educational technology, meeting the highest standards for international talent.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl"
            >
              <Zap className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Technical Innovation</h3>
              <p className="text-gray-600">
                Pioneered real-time neural translation systems and cross-cultural AI communication models that exceed industry standards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl"
            >
              <Globe className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Global Impact</h3>
              <p className="text-gray-600">
                Cydebe platform serves 500+ active users across 50+ universities, demonstrating significant educational impact worldwide.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl"
            >
              <Users className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Industry Recognition</h3>
              <p className="text-gray-600">
                Received prestigious awards including Women in Tech Leadership Award and AI Education Innovation Prize for groundbreaking work.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl"
            >
              <Target className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Research Excellence</h3>
              <p className="text-gray-600">
                Published research on AI-driven language learning, contributing to the academic community's understanding of educational technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl"
            >
              <Heart className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Community Leadership</h3>
              <p className="text-gray-600">
                Leads open source initiatives and mentors emerging talent in AI and educational technology, fostering the next generation of innovators.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* O-1 Criteria Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              O-1 Visa Extraordinary Ability Criteria
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Olesya meets and exceeds all USCIS requirements for extraordinary ability in her field.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-blue-600">✅ Evidence of Receipt of Major Prize/Award</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Women in Tech Leadership Award (2024)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>AI Education Innovation Prize (2024)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Tech Excellence Award - Educational Technology (2023)</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-purple-600">✅ Membership in Professional Associations</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Association for Computational Linguistics (ACL)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>International Society for Technology in Education (ISTE)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Women in AI Ethics Committee</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-green-600">✅ Published Material About Work</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>"Neural Networks in Cross-Cultural Communication" - Nature AI (2024)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>"AI-Driven Language Learning" - IEEE Transactions (2023)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Multiple conference publications and technical papers</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-orange-600">✅ High Salary/Compensation</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Industry-leading compensation in AI education sector</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Equity participation in Cydebe platform</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Consulting fees from leading universities</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-lg md:col-span-2"
            >
              <h3 className="text-2xl font-bold mb-6 text-red-600">✅ Other Comparable Evidence</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Commercial Success</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• 500+ active users across 50+ institutions</li>
                    <li>• 95% translation accuracy rate</li>
                    <li>• Multiple university partnerships</li>
                    <li>• Open source community adoption</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Critical Employment</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Essential role in AI education innovation</li>
                    <li>• Leading cross-cultural communication research</li>
                    <li>• Mentoring next generation of AI researchers</li>
                    <li>• Driving industry standards and best practices</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Support Olesya's O-1 Visa
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your support as a university, organization, or individual can help ensure continued innovation in AI-powered education.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ways to Support</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Institutional Support</h4>
                  <p className="text-sm text-gray-600">Universities and organizations can provide letters of support highlighting Olesya's contributions.</p>
                </div>
                <div className="text-center">
                  <Users className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Professional Endorsements</h4>
                  <p className="text-sm text-gray-600">Industry leaders can provide testimonials about Olesya's extraordinary ability and impact.</p>
                </div>
                <div className="text-center">
                  <Heart className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Community Advocacy</h4>
                  <p className="text-sm text-gray-600">Share Olesya's work and help build awareness of her contributions to AI education.</p>
                </div>
              </div>
            </div>
          </motion.div>
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
              Support Extraordinary Talent
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Help ensure Olesya can continue her groundbreaking work in AI-powered education by supporting her O-1 visa application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:olesya@cydebe.com" className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                Contact Olesya
              </a>
              <a href="mailto:support@cydebe.com" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                Provide Support
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
