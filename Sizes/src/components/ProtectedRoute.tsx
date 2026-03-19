import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/admin/login')
      } else {
        setUser(user)
      }
      setLoading(false)
    }
    checkUser()
  }, [navigate])

  if (loading) return <div className="py-32 text-center">Loading...</div>

  return user ? children : null
}

export default ProtectedRoute
