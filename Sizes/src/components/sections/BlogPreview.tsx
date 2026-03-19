import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  featured_image: string
  created_at: string
}

const BlogPreview = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, slug, excerpt, featured_image, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3)

      if (!error) setPosts(data || [])
      setLoading(false)
    }
    fetchPosts()
  }, [])

  if (loading) return <div className="py-32 text-center">Loading posts...</div>

  return (
    <section className="py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-12"
        >
          Latest from the blog
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="overflow-hidden rounded-2xl mb-4 aspect-video">
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
                <h3 className="text-xl font-bold mb-2 group-hover:underline">{post.title}</h3>
                <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                <span className="inline-block mt-4 text-sm font-medium border-b border-black pb-0.5 group-hover:opacity-70 transition">
                  Read more
                </span>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog" className="inline-flex items-center text-lg font-medium border-b-2 border-black pb-1 hover:opacity-70 transition">
            View all posts
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogPreview
