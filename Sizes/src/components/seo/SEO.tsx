import { Helmet } from 'react-helmet-async'
import { SITE_URL } from '../../lib/config'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  author?: string
}

const SEO = ({
  title,
  description,
  canonical,
  image = `${SITE_URL}/default-og-image.jpg`,
  type = 'website',
  publishedTime,
  author = 'SIZES',
}: SEOProps) => {
  const fullCanonical = canonical ? `${SITE_URL}${canonical}` : SITE_URL
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{title} | SIZES</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="SIZES" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
    </Helmet>
  )
}

export default SEO
