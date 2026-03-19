import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import GrainBackground from '../components/ui/GrainBackground'
import FloatingElements from '../components/ui/FloatingElements'
import SEO from '../components/seo/SEO'

interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  featured_image: string
  created_at: string
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, slug, excerpt, featured_image, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (!error) setPosts(data || [])
      setLoading(false)
    }
    fetchPosts()
  }, [])

  if (loading) return <div className="py-32 text-center">Loading posts...</div>

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <SEO
        title="Blog"
        description="Insights, ideas, and stories from our team."
        canonical="/blog"
      />
      <GrainBackground />
      <FloatingElements />

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog</h1>
        <p className="text-xl text-gray-600 mb-16 max-w-3xl">
          Insights, ideas, and stories from our team.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="overflow-hidden rounded-2xl mb-5 aspect-video">
                  <img
                    src={post.featured_image || 'https://picsum.photos/id/100/600/400'}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm text-gray-400 mb-2">
                  {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <h2 className="text-2xl font-bold mb-3 group-hover:underline">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                <span className="inline-flex items-center text-sm font-medium border-b border-black pb-0.5 group-hover:opacity-70 transition">
                  Read more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Blog
