import { motion } from 'framer-motion'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import GrainBackground from '../components/ui/GrainBackground'
import FloatingElements from '../components/ui/FloatingElements'
import SEO from '../components/seo/SEO'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const { error } = await supabase
      .from('messages')
      .insert([formData])

    if (error) {
      console.error(error)
      setStatus('error')
    } else {
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <SEO
        title="Contact"
        description="Get in touch with SIZES. We'd love to hear about your project."
        canonical="/contact"
      />
      <GrainBackground />
      <FloatingElements />

      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in touch</h1>
        <p className="text-xl text-gray-600 mb-12">
          Have a project in mind or just want to say hello? We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact info</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <span className="font-medium text-black">Email:</span><br />
                <a href="mailto:hello@sizes.com" className="hover:underline">sizesnigeria.vercel.app</a>
              </p>
              <p>
                <span className="font-medium text-black">Phone:</span><br />
                <a href="tel:+1234567890" className="hover:underline">+(234) 81555555</a>
              </p>
              <p>
                <span className="font-medium text-black">Office:</span><br />
                Kano, Nigeria
              </p>
            </div>

            <div className="mt-8">
              <h3 className="font-medium mb-2">Follow us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-black transition">Twitter</a>
                <a href="#" className="text-gray-500 hover:text-black transition">LinkedIn</a>
                <a href="#" className="text-gray-500 hover:text-black transition">GitHub</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message *</label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Send message'}
              </button>
              {status === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">✓ Message sent successfully!</p>
                  <p className="text-sm text-green-600 mt-1">We'll get back to you soon.</p>
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-medium">✗ Something went wrong.</p>
                  <p className="text-sm text-red-600 mt-1">Please try again or contact us directly.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Contact
