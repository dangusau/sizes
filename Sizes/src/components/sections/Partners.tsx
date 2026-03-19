import { motion } from 'framer-motion'

const partners = [
  { name: 'TechCorp', logo: '' },
  { name: 'InnovateLabs', logo: '' },
  { name: 'FutureStack', logo: '' },
  { name: 'CloudNine', logo: '' },
  { name: 'DataFlow', logo: '' },
  { name: 'SmartSys', logo: '' },
  { name: 'WebCraft', logo: '' },
  { name: 'AppWorks', logo: '' },
]

const Partners = () => {
  return (
    <section className="py-20 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Trusted by innovative companies
        </motion.h2>

        <div className="relative overflow-hidden">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Scrolling container */}
          <div className="flex overflow-x-auto scrollbar-hide py-4">
            <div className="flex gap-12 items-center animate-scroll">
              {partners.concat(partners).map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 grayscale hover:grayscale-0 transition duration-300"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partners
