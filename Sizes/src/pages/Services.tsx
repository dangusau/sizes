import { motion } from 'framer-motion'
import {
  PaintBrushIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  CpuChipIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'
import GrainBackground from '../components/ui/GrainBackground'
import FloatingElements from '../components/ui/FloatingElements'
import SEO from '../components/seo/SEO'
import StructuredData from '../components/seo/StructuredData'
import { SITE_URL } from '../lib/config'

const services = [
  {
    title: 'Web Design',
    description: 'We craft responsive, modern websites that captivate users and deliver exceptional experiences. Our design process blends aesthetics with functionality, ensuring every interface is intuitive, accessible, and aligned with your brand identity. From wireframes to high-fidelity prototypes, we create designs that engage and convert.',
    icon: PaintBrushIcon,
  },
  {
    title: 'Business Software',
    description: 'Custom software solutions tailored to your operations—point-of-sale systems, inventory management, CRM, and more. We build robust, scalable applications that streamline workflows, reduce manual work, and provide real-time insights. Whether you need a simple dashboard or an enterprise-grade platform, we deliver reliable, secure, and user-friendly tools.',
    icon: CodeBracketIcon,
  },
  {
    title: 'Mobile Apps',
    description: 'Native Android and iOS applications that put your business in your customers’ pockets. We develop high-performance, feature-rich mobile experiences—from consumer apps to enterprise tools—designed to engage users and drive loyalty. Our apps are built with clean architecture, offline capabilities, and seamless backend integration.',
    icon: DevicePhoneMobileIcon,
  },
  {
    title: 'Data Analytics',
    description: 'Turn raw data into actionable insights. We help you understand sales trends, customer behavior, marketing performance, and operational efficiency through custom dashboards and reporting tools. Our analytics solutions empower you to make data-driven decisions, identify opportunities, and optimize every aspect of your business.',
    icon: ChartBarIcon,
  },
  {
    title: 'Machine Learning',
    description: 'Leverage AI to predict outcomes, automate processes, and uncover hidden patterns. We build machine learning models tailored to your needs—recommendation engines, demand forecasting, anomaly detection, and more. Our team handles everything from data preprocessing to deployment, ensuring models are accurate, explainable, and continuously improving.',
    icon: CpuChipIcon,
  },
  {
    title: 'Digital Strategy',
    description: 'Comprehensive planning to establish and scale your online presence. We work with you to define your brand’s digital roadmap—from website architecture and content strategy to SEO, social media, and paid campaigns. Our goal is to align your digital efforts with business objectives, ensuring long-term growth and measurable ROI.',
    icon: GlobeAltIcon,
  },
]

const Services = () => {
  const serviceSchemas = services.map(service => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "SIZES",
      "url": SITE_URL
    }
  }))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <SEO
        title="Services"
        description="We offer web design, business software, mobile apps, data analytics, machine learning, and digital strategy to help you build, grow, and scale your online presence."
        canonical="/services"
      />
      {serviceSchemas.map((schema, index) => (
        <StructuredData key={index} data={schema} />
      ))}
      <GrainBackground />
      <FloatingElements />

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
        <p className="text-xl text-gray-600 mb-16 max-w-3xl">
          We offer a comprehensive range of digital services to help you build, grow, and scale your online presence.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group p-8 border border-gray-200 rounded-2xl hover:shadow-xl transition-all bg-white/50 backdrop-blur-sm"
              >
                <Icon className="w-12 h-12 mb-4 text-gray-700 group-hover:text-black transition-colors" />
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            )
          })}
        </div>

        <section className="mt-32 text-center bg-gray-50/80 backdrop-blur-sm rounded-3xl p-16">
          <h2 className="text-4xl font-bold mb-4">Not sure what you need?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We're happy to discuss your project and recommend the best approach.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
          >
            Contact us
          </a>
        </section>
      </div>
    </motion.div>
  )
}

export default Services
