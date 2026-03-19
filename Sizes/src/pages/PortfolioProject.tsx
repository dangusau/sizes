import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'
import GrainBackground from '../components/ui/GrainBackground'
import FloatingElements from '../components/ui/FloatingElements'
import SEO from '../components/seo/SEO'
import StructuredData from '../components/seo/StructuredData'
import { SITE_URL } from '../lib/config'

interface Project {
  id: number
  title: string
  category: string
  description: string
  image_url: string
  project_url: string
  created_at: string
}

const PortfolioProject = () => {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single()

      if (error) {
        setError(error.message)
      } else {
        setProject(data)
      }
      setLoading(false)
    }
    fetchProject()
  }, [id])

  if (loading) return <div className="py-32 text-center">Loading project...</div>
  if (error) return <div className="py-32 text-center text-red-600">Error: {error}</div>
  if (!project) return <div className="py-32 text-center">Project not found</div>

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "image": project.image_url.startsWith('http') ? project.image_url : `${SITE_URL}${project.image_url}`,
    "url": project.project_url || `${SITE_URL}/portfolio/${project.id}`,
    "dateCreated": project.created_at,
    "creator": {
      "@type": "Organization",
      "name": "SIZES",
      "url": SITE_URL
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <SEO
        title={project.title}
        description={project.description.substring(0, 160)}
        canonical={`/portfolio/${project.id}`}
        image={project.image_url}
        type="article"
      />
      <StructuredData data={projectSchema} />
      <GrainBackground />
      <FloatingElements />

      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <Link to="/portfolio" className="inline-flex items-center text-sm mb-8 hover:underline">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to portfolio
        </Link>

        {project.image_url && (
          <div className="overflow-hidden rounded-2xl mb-8 aspect-video">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
          {project.project_url && (
            <a
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition whitespace-nowrap"
            >
              Live Demo
            </a>
          )}
        </div>

        <p className="text-gray-600 mb-2">{project.category}</p>

        <div className="prose prose-lg max-w-none mt-8">
          <p className="text-gray-700">{project.description}</p>
        </div>
      </div>
    </motion.article>
  )
}

export default PortfolioProject
