import { motion } from 'framer-motion';
import {
  PaintBrushIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  CpuChipIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const interests = [
  {
    title: 'Web Design',
    description: 'Responsive, modern interfaces crafted for exceptional user experiences.',
    icon: PaintBrushIcon,
  },
  {
    title: 'Business Software',
    description: 'Custom point-of-sale systems, inventory management, and operational tools tailored to your workflow.',
    icon: CodeBracketIcon,
  },
  {
    title: 'Mobile Apps',
    description: 'Native Android and iOS applications that deliver seamless performance and engagement.',
    icon: DevicePhoneMobileIcon,
  },
  {
    title: 'Data Analytics',
    description: 'Actionable insights from sales, finance, marketing, and research data to drive informed decisions.',
    icon: ChartBarIcon,
  },
  {
    title: 'Machine Learning',
    description: 'Predictive algorithms and AI models that uncover patterns and automate complex processes.',
    icon: CpuChipIcon,
  },
  {
    title: 'Digital Strategy',
    description: 'Comprehensive planning to establish your brand’s global online presence and scale with confidence.',
    icon: GlobeAltIcon,
  },
];

const Interests = () => {
  return (
    <section className="py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-12"
        >
          What we do
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {interests.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group p-8 border border-gray-200 rounded-2xl hover:shadow-xl transition-all bg-white/50 backdrop-blur-sm"
            >
              <item.icon className="w-12 h-12 mb-4 text-gray-700 group-hover:text-black transition-colors" />
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interests;
