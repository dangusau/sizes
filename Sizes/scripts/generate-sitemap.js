import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Load environment variables manually because dotenv might not be available in production build
// But we have dotenv installed, so we can import it.
import 'dotenv/config'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const SITE_URL = process.env.VITE_SITE_URL || 'http://localhost:5173'

// Static routes
const staticRoutes = [
  '',
  '/services',
  '/portfolio',
  '/blog',
  '/contact',
]

async function generateSitemap() {
  console.log('Fetching blog posts...')
  // For posts, we have updated_at, but fallback to created_at if not present
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('slug, updated_at, created_at')
    .eq('published', true)

  if (postsError) {
    console.error('Error fetching posts:', postsError)
    process.exit(1)
  }

  console.log('Fetching projects...')
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('id, created_at')
    .eq('published', true)

  if (projectsError) {
    console.error('Error fetching projects:', projectsError)
    process.exit(1)
  }

  const urls = []

  // Add static routes
  staticRoutes.forEach(route => {
    urls.push({
      loc: `${SITE_URL}${route}`,
      changefreq: 'weekly',
      priority: route === '' ? '1.0' : '0.8',
    })
  })

  // Add blog posts
  posts.forEach(post => {
    const lastmod = post.updated_at || post.created_at
    urls.push({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: lastmod,
      changefreq: 'monthly',
      priority: '0.6',
    })
  })

  // Add projects
  projects.forEach(project => {
    urls.push({
      loc: `${SITE_URL}/portfolio/${project.id}`,
      lastmod: project.created_at,
      changefreq: 'monthly',
      priority: '0.6',
    })
  })

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `    <lastmod>${url.lastmod}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  const outputPath = path.join(__dirname, '../dist/sitemap.xml')
  writeFileSync(outputPath, sitemap)
  console.log(`✅ Sitemap generated at ${outputPath} with ${urls.length} URLs`)
}

generateSitemap()
