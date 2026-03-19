import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import {
  GlobeAltIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  GiftIcon,
} from '@heroicons/react/24/outline';

// ===== ADJUSTABLE HERO PARAMETERS =====
const HERO_MIN_HEIGHT = '70vh';
const VERTICAL_PADDING = 'py-12';
const GRID_GAP = 'gap-8';
const RIGHT_BOX_MAX_WIDTH = 'md:max-w-md';
// =======================================

// ===== TYPEWRITER SETTINGS =====
const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_BEFORE_DELETE = 1500;   // pause after typing a subtitle
const PAUSE_BEFORE_NEXT = 500;      // pause after delete before typing next
// ================================

// ===== PHASES =====
const phases = [
  {
    headline: 'We build',
    subtitles: ['websites', 'mobile apps', 'business softwares'],
  },
  {
    headline: 'We analyze',
    subtitles: ['Sales Data ', 'Performance Data', 'Marketing Data', 'Financial Data', 'And Other Metrics.'],
  },
];
// ===================

// Typewriter component that cycles through a list and calls onComplete when the list is exhausted
const SubtitleTypewriter = ({ subtitles, onListComplete }: { subtitles: string[]; onListComplete: () => void }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const currentSubtitle = subtitles[index];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, PAUSE_BEFORE_DELETE);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, DELETING_SPEED);
      } else {
        // Finished deleting current subtitle
        setIsDeleting(false);
        if (index < subtitles.length - 1) {
          // Move to next subtitle
          setIndex(prev => prev + 1);
        } else {
          // Completed the entire list
          onListComplete();
        }
      }
    } else {
      // typing
      if (text.length < currentSubtitle.length) {
        timeout = setTimeout(() => {
          setText(currentSubtitle.slice(0, text.length + 1));
        }, TYPING_SPEED);
      } else {
        // Finished typing – wait before delete
        setIsWaiting(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, isWaiting, index, subtitles, currentSubtitle, onListComplete]);

  return (
    <span className="inline-block text-3xl md:text-4xl text-gray-600">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const messages = [
  {
    text: 'Every brand, every dream. Go global.',
    icon: GlobeAltIcon,
  },
  {
    text: 'Beyond social media. Own your space.',
    icon: ChartBarIcon,
  },
  {
    text: 'Everything included. One price. No recurring fees.',
    icon: GiftIcon,
  },
  {
    text: 'Build once. Go global. Forever.',
    icon: RocketLaunchIcon,
  },
];

const RotatingMessages = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const Icon = messages[index].icon;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
        >
          <Icon className="w-16 h-16 mb-4 text-gray-700" />
          <p className="text-xl md:text-2xl font-medium text-gray-800 max-w-sm">
            {messages[index].text}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Hero = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const currentPhase = phases[phaseIndex];

  const handleListComplete = () => {
    // Move to next phase, loop back to first if at end
    setPhaseIndex((prev) => (prev + 1) % phases.length);
  };

  return (
    <section className={`flex items-center relative ${HERO_MIN_HEIGHT}`}>
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 ${VERTICAL_PADDING} w-full`}>
        <div className={`grid md:grid-cols-2 items-center ${GRID_GAP}`}>
          {/* Left column – text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Big headline with phase transition */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={phaseIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-5xl md:text-7xl font-bold leading-tight mb-2"
              >
                {currentPhase.headline}
              </motion.h1>
            </AnimatePresence>

            {/* Subtitle typewriter */}
            <div className="h-16 md:h-20"> {/* Fixed height to prevent layout shift */}
              <SubtitleTypewriter
                key={phaseIndex} // force re-mount when phase changes to reset internal state
                subtitles={currentPhase.subtitles}
                onListComplete={handleListComplete}
              />
            </div>

            <p className="text-lg text-gray-600 mb-6 max-w-md mt-4">
              SIZES build modern digital products. from E-commerce to Business pages, from Blogs to Portfolios. 
            </p>
            <div className="flex gap-3">
              <a
                href="/portfolio"
                className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition flex items-center gap-2 text-sm"
              >
                View our work
              </a>
              <a
                href="/contact"
                className="px-6 py-2 border border-black text-black rounded-full hover:bg-black hover:text-white transition text-sm"
              >
                Get in touch
              </a>
            </div>
          </motion.div>

          {/* Right column – rotating messages */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl overflow-hidden aspect-square ${RIGHT_BOX_MAX_WIDTH} mx-auto md:mx-0`}
          >
            <RotatingMessages />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-black/5 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-black/5 rounded-full blur-2xl" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <a href="#work" className="flex flex-col items-center text-gray-400 hover:text-black transition">
            <span className="text-sm mb-2">Scroll</span>
            <ArrowDownIcon className="w-4 h-4 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
