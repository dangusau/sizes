import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  HomeIcon,
  BriefcaseIcon,
  Squares2X2Icon,
  NewspaperIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline'
import HeaderLogo from '../ui/HeaderLogo'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/services', label: 'Services', icon: BriefcaseIcon },
    { path: '/portfolio', label: 'Portfolio', icon: Squares2X2Icon },
    { path: '/blog', label: 'Blog', icon: NewspaperIcon },
    { path: '/contact', label: 'Contact', icon: EnvelopeIcon },
  ]

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="hover:opacity-80 transition">
          <HeaderLogo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative py-2 text-sm font-medium transition-colors hover:text-black flex items-center gap-1.5 ${
                  location.pathname === item.path ? 'text-black' : 'text-gray-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
                {location.pathname === item.path && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-black"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <span className="sr-only">Menu</span>
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-black transform transition ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-black transition ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-black transform transition ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={{
            open: { opacity: 1, y: 0 },
            closed: { opacity: 0, y: -20 }
          }}
          className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 md:hidden"
        >
          <nav className="flex flex-col p-6 space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`py-2 text-lg font-medium flex items-center gap-3 ${
                    location.pathname === item.path ? 'text-black' : 'text-gray-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </motion.div>
      </div>
    </header>
  )
}

export default Header
