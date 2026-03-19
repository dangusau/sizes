import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

interface Message {
  id: number
  name: string
  email: string
  phone: string
  message: string
  is_read: boolean
  created_at: string
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error) setMessages(data || [])
      setLoading(false)
    }
    fetchMessages()
  }, [])

  const markAsRead = async (id: number) => {
    await supabase.from('messages').update({ is_read: true }).eq('id', id)
    setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m))
  }

  if (loading) return <div className="py-32 text-center">Loading...</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/admin"
          className="inline-flex items-center text-sm text-gray-600 hover:text-black transition"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold">Contact Messages</h1>
      </div>

      <div className="space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`p-4 border rounded-lg ${msg.is_read ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold">{msg.name}</p>
                <p className="text-sm text-gray-600">Email: {msg.email}</p>
                <p className="text-sm text-gray-600">Phone: {msg.phone}</p>
                <p className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleString()}</p>
              </div>
              {!msg.is_read && (
                <button
                  onClick={() => markAsRead(msg.id)}
                  className="text-xs px-2 py-1 bg-black text-white rounded hover:bg-gray-800 transition"
                >
                  Mark as read
                </button>
              )}
            </div>
            <p className="text-gray-700 mt-2">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminMessages
