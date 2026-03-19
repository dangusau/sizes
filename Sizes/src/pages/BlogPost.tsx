import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'
import GrainBackground from '../components/ui/GrainBackground'
import FloatingElements from '../components/ui/FloatingElements'
import SEO from '../components/seo/SEO'
import StructuredData from '../components/seo/StructuredData'
import { SITE_URL } from '../lib/config'

interface Post {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string
  created_at: string
  updated_at: string
}

const BlogPost = () => {
  const { slug } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (error) {
        setError(error.message)
      } else {
        setPost(data)
      }
      setLoading(false)
    }
    fetchPost()
  }, [slug])

  if (loading) return <div className="py-32 text-center">Loading post...</div>
  if (error) return <div className="py-32 text-center text-red-600">Error: {error}</div>
  if (!post) return <div className="py-32 text-center">Post not found</div>

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featured_image.startsWith('http') ? post.featured_image : `${SITE_URL}${post.featured_image}`,
    "datePublished": post.created_at,
    "dateModified": post.updated_at,
    "author": {
      "@type": "Organization",
      "name": "SIZES",
      "url": SITE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": "SIZES",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`
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
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        image={post.featured_image}
        type="article"
        publishedTime={post.created_at}
        author="SIZES Team"
      />
      <StructuredData data={articleSchema} />
      <GrainBackground />
      <FloatingElements />

      <div className="max-w-3xl mx-auto px-6 py-20 relative z-10">
        <Link to="/blog" className="inline-flex items-center text-sm mb-8 hover:underline">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to blog
        </Link>

        {post.featured_image && (
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-2xl mb-8"
          />
        )}

        <p className="text-sm text-gray-400 mb-2">
          {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          {post.updated_at !== post.created_at && ' (updated)'}
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

        <div className="prose prose-lg max-w-none" style={{ whiteSpace: 'pre-wrap' }}>
          {post.content}
        </div>
      </div>
    </motion.article>
  )
}

export default BlogPost
