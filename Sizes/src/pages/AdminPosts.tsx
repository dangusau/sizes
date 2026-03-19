import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

interface Post {
  id: number
  title: string
  slug: string
  published: boolean
  created_at: string
}

const AdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, slug, published, created_at')
        .order('created_at', { ascending: false })

      if (!error) setPosts(data || [])
      setLoading(false)
    }
    fetchPosts()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return
    await supabase.from('posts').delete().eq('id', id)
    setPosts(posts.filter(p => p.id !== id))
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
          <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
        </div>
        <Link
          to="/admin/posts/new"
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          New Post
        </Link>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left py-2">Title</th>
            <th className="text-left py-2">Slug</th>
            <th className="text-left py-2">Status</th>
            <th className="text-left py-2">Date</th>
            <th className="text-left py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} className="border-b border-gray-200">
              <td className="py-3">{post.title}</td>
              <td className="py-3">{post.slug}</td>
              <td className="py-3">{post.published ? 'Published' : 'Draft'}</td>
              <td className="py-3">{new Date(post.created_at).toLocaleDateString()}</td>
              <td className="py-3">
                <Link to={`/admin/posts/edit/${post.id}`} className="text-blue-600 hover:underline mr-3">Edit</Link>
                <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminPosts
