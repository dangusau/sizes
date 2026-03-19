import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

interface Project {
  id: number
  title: string
  category: string
  description: string
  image_url: string
  project_url: string
}

const Work = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('order', { ascending: true })
        .limit(4)

      if (!error) setProjects(data || [])
      setLoading(false)
    }
    fetchProjects()
  }, [])

  if (loading) return <div className="py-32 text-center">Loading projects...</div>

  return (
    <section id="work" className="py-32 bg-gray-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-12"
        >
          Recent work
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <Link to={`/portfolio/${project.id}`} className="block">
                <div className="overflow-hidden rounded-2xl mb-4 relative aspect-video">
                  <img
                    src={project.image_url || 'https://picsum.photos/id/1/600/400'}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Simple overlay with title on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 pointer-events-none">
                    <h3 className="text-white text-xl font-bold text-center">{project.title}</h3>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1 group-hover:underline">{project.title}</h3>
                <p className="text-gray-600">{project.category}</p>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/portfolio" className="inline-flex items-center text-lg font-medium border-b-2 border-black pb-1 hover:opacity-70 transition">
            View all projects
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Work
