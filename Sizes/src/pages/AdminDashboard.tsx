import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const AdminDashboard = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/admin/login')
      } else {
        setUser(user)
      }
      setLoading(false)
    }
    getUser()
  }, [navigate])

  useEffect(() => {
    const fetchUnreadCount = async () => {
      const { count, error } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false)

      if (!error) setUnreadCount(count || 0)
    }
    fetchUnreadCount()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  if (loading) return <div className="py-32 text-center">Loading...</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Link to="/admin/posts" className="block p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-2">Blog Posts</h2>
          <p className="text-gray-600">Manage your blog articles</p>
        </Link>
        <Link to="/admin/projects" className="block p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-2">Portfolio Projects</h2>
          <p className="text-gray-600">Manage your projects</p>
        </Link>
        <Link to="/admin/messages" className="block p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition relative">
          <h2 className="text-2xl font-bold mb-2 flex items-center">
            Contact Messages
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {unreadCount} new
              </span>
            )}
          </h2>
          <p className="text-gray-600">View messages from visitors</p>
        </Link>
      </div>
    </div>
  )
}

export default AdminDashboard
