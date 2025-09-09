import { motion } from 'framer-motion'
import { Award, Users, Globe, Zap, Target, Heart, Star } from 'lucide-react'

export default function Partners() {
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
              <a href="#opportunities" className="text-gray-600 hover:text-blue-600 transition-colors">Opportunities</a>
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
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Partner with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Join universities, international organizations, and tech leaders in supporting groundbreaking AI education innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section id="opportunities" className="py-20 bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Partnership Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to collaborate and support Cydebe's mission of revolutionizing global language education.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Academic Partnerships</h3>
              <p className="text-gray-600 mb-6">
                Integrate Cydebe into language curricula, conduct joint research, and provide students with cutting-edge learning tools.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Curriculum integration</li>
                <li>• Joint research programs</li>
                <li>• Student access licensing</li>
                <li>• Faculty training programs</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl"
            >
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">International Organizations</h3>
              <p className="text-gray-600 mb-6">
                Support UN Sustainable Development Goals through accessible education and cultural exchange initiatives.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• SDG 4 Education support</li>
                <li>• Cultural preservation</li>
                <li>• Global accessibility programs</li>
                <li>• Multilingual policy development</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl"
            >
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Women in Tech</h3>
              <p className="text-gray-600 mb-6">
                Empower women in technology through leadership opportunities, mentorship, and representation in AI education.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Leadership development</li>
                <li>• Mentorship programs</li>
                <li>• STEM education advocacy</li>
                <li>• Diversity initiatives</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl"
            >
              <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Technology Partners</h3>
              <p className="text-gray-600 mb-6">
                Collaborate on AI development, cloud infrastructure, and technical innovation for educational technology.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• AI/ML development</li>
                <li>• Cloud infrastructure</li>
                <li>• API integrations</li>
                <li>• Technical consulting</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl"
            >
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Corporate Sponsors</h3>
              <p className="text-gray-600 mb-6">
                Support educational innovation through sponsorship, providing resources for research and development.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Research funding</li>
                <li>• Development resources</li>
                <li>• Brand partnership</li>
                <li>• Employee volunteering</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl"
            >
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Community Partners</h3>
              <p className="text-gray-600 mb-6">
                Join the open source community in developing and improving educational technology for global benefit.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Open source contributions</li>
                <li>• Community events</li>
                <li>• Localization efforts</li>
                <li>• User feedback programs</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20 bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Measurable Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your partnership directly contributes to transforming global education and cultural understanding.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Students Impacted</div>
              <div className="text-sm text-gray-500 mt-2">Across partner institutions</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Partner Universities</div>
              <div className="text-sm text-gray-500 mt-2">Leading educational institutions</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Translation Accuracy</div>
              <div className="text-sm text-gray-500 mt-2">Industry-leading performance</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">AI Learning Support</div>
              <div className="text-sm text-gray-500 mt-2">Always available assistance</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Partnership Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from organizations that have partnered with Cydebe to advance educational innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mr-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Harvard University</h3>
                  <p className="text-blue-600">Academic Partner</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Cydebe has transformed our Russian language program. Students are now engaging in authentic conversations with native speakers, achieving fluency levels 40% faster than traditional methods."
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span>40% improvement in learning outcomes</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mr-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">UNESCO</h3>
                  <p className="text-purple-600">International Partner</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Cydebe directly supports our mission to provide quality education worldwide. The platform's ability to connect learners across cultural boundaries is unprecedented."
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span>Supporting SDG 4: Quality Education</span>
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
              Become a Cydebe Partner
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join leading organizations in supporting Olesya's extraordinary work in AI-powered education. Your partnership will help shape the future of global language learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:olesya@cydebe.com" className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                Contact Olesya Directly
              </a>
              <a href="mailto:partnerships@cydebe.com" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                Partnership Inquiry
              </a>
            </div>
            <div className="mt-8 text-lg">
              <p className="mb-2">📧 <strong>Olesya:</strong> olesya@cydebe.com</p>
              <p>📧 <strong>Partnerships:</strong> partnerships@cydebe.com</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
