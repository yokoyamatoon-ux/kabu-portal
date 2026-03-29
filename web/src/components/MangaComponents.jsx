import React from 'react'
import { motion } from 'framer-motion'

export const MangaCard = ({ children, className = '', hover = true, ...props }) => (
  <motion.div
    whileHover={hover ? { y: -8, scale: 1.02 } : {}}
    className={`bg-white rounded-manga p-4 shadow-manga border border-gray-100 ${className}`}
    {...props}
  >
    {children}
  </motion.div>
)

export const CharacterSpeech = ({ chara, text, color = '#FFF0F0' }) => (
  <div className="flex items-end gap-3 my-6">
    <img src={chara} alt="character" className="w-16 h-16 object-contain shrink-0" />
    <div 
      className="manga-bubble p-4 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm relative"
      style={{ backgroundColor: color }}
    >
      <div dangerouslySetInnerHTML={{ __html: text }} className="text-sm font-bold text-text" />
      <div 
        className="absolute bottom-0 -left-2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[15px] border-r-white"
        style={{ borderRightColor: color }}
      ></div>
    </div>
  </div>
)

export const SectionHeader = ({ title, icon }) => (
  <div className="section-title border-b-4 border-secondary/50 pb-2 mb-6">
    <span className="text-2xl">{icon}</span>
    <span>{title}</span>
  </div>
)
