import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TOP_BANNERS } from '../lib/constants'

export const HeroSlider = () => {
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TOP_BANNERS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[200px] md:h-[400px] rounded-manga overflow-hidden shadow-manga border-4 border-white mb-8">
      <AnimatePresence mode="wait">
        <motion.img
          key={TOP_BANNERS[current].id}
          src={TOP_BANNERS[current].path}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {TOP_BANNERS.map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-primary w-6' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  )
}
