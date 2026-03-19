import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import GrainBackground from '../components/ui/GrainBackground'
import FloatingElements from '../components/ui/FloatingElements'
import SEO from '../components/seo/SEO'

interface Project {
  id: number
  title: string
  category: string
  description: string
  image_url: string
  project_url: string
}

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('order', { ascending: true })

      if (!error) setProjects(data || [])
      setLoading(false)
    }
    fetchProjects()
  }, [])

  if (loading) return <div className="py-32 text-center">Loading projects...</div>

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <SEO
        title="Portfolio"
        description="A selection of our favorite projects. Each one is a unique collaboration with our clients."
        canonical="/portfolio"
      />
      <GrainBackground />
      <FloatingElements />

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Work</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          A selection of our favorite projects. Each one is a unique collaboration with our clients.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <Link to={`/portfolio/${project.id}`}>
                <div className="overflow-hidden rounded-2xl mb-4 relative aspect-video">
                  <img
                    src={project.image_url || 'https://picsum.photos/id/1/600/400'}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {project.description && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 pointer-events-none">
                      <p className="text-white text-center text-sm">{project.description}</p>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-1 group-hover:underline">{project.title}</h3>
                <p className="text-gray-600">{project.category}</p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Portfolio
