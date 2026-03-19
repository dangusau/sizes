import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

interface Project {
  id: number
  title: string
  category: string
  published: boolean
}

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, category, published')
        .order('order', { ascending: true })

      if (!error) setProjects(data || [])
      setLoading(false)
    }
    fetchProjects()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return
    await supabase.from('projects').delete().eq('id', id)
    setProjects(projects.filter(p => p.id !== id))
  }

  if (loading) return <div className="py-32 text-center">Loading...</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            to="/admin"
            className="inline-flex items-center text-sm text-gray-600 hover:text-black transition"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Manage Projects</h1>
        </div>
        <Link
          to="/admin/projects/new"
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          New Project
        </Link>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left py-2">Title</th>
            <th className="text-left py-2">Category</th>
            <th className="text-left py-2">Status</th>
            <th className="text-left py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id} className="border-b border-gray-200">
              <td className="py-3">{project.title}</td>
              <td className="py-3">{project.category}</td>
              <td className="py-3">{project.published ? 'Published' : 'Draft'}</td>
              <td className="py-3">
                <Link to={`/admin/projects/edit/${project.id}`} className="text-blue-600 hover:underline mr-3">Edit</Link>
                <button onClick={() => handleDelete(project.id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminProjects
