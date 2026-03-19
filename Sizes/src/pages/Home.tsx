import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import GrainBackground from '../components/ui/GrainBackground'
import FloatingElements from '../components/ui/FloatingElements'
import Hero from '../components/sections/Hero'
import Interests from '../components/sections/Interests'
import Work from '../components/sections/Work'
import BlogPreview from '../components/sections/BlogPreview'
import SEO from '../components/seo/SEO'
import StructuredData from '../components/seo/StructuredData'
import { SITE_URL } from '../lib/config'

const Home = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SIZES",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "sameAs": [
      "https://twitter.com/yourhandle",
      "https://linkedin.com/company/sizes"
    ],
    "description": "SIZES is a creative agency blending design and development to create memorable digital products.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "addressCountry": "US"
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
        title="Home"
        description="SIZES is a creative agency blending design and development to create memorable digital products."
        canonical="/"
      />
      <StructuredData data={organizationSchema} />
      <GrainBackground />
      <FloatingElements />

      <Hero />
      <Interests />
      <Work />
      <BlogPreview />
      {/* <Partners /> */}

      {/* CTA Section */}
      <section className="py-32 text-center relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to start your project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Let's collaborate and build something amazing together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/contact" className="inline-block px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition">
              Get in touch
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Home
