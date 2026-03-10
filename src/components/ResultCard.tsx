import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ResultCardProps {
  index: number
  selected?: boolean
  onSelect?: () => void
}

const gradients = [
  'linear-gradient(160deg, #3c1a35 0%, #1a192b 40%, #2b1a3c 100%)',
  'linear-gradient(160deg, #1a2b3c 0%, #2b1a1a 50%, #1a3c2b 100%)',
  'linear-gradient(160deg, #2b2a1a 0%, #1a1a3c 50%, #3c1a1a 100%)',
  'linear-gradient(160deg, #1a3c1a 0%, #3c2b1a 50%, #1a1a2b 100%)',
]

const silhouettes = [
  '👤', '🧑‍🎨', '🦸', '🧙'
]

const quickActions = [
  { label: 'More like this', dir: '→' },
  { label: 'More edgy', dir: '↗' },
  { label: 'Softer', dir: '↙' },
]

export default function ResultCard({ index, selected, onSelect }: ResultCardProps) {
  const [hovered, setHovered] = useState(false)
  const gradient = gradients[index % gradients.length]
  const silhouette = silhouettes[index % silhouettes.length]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={onSelect}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative', borderRadius: 16, overflow: 'hidden',
        aspectRatio: '3/4', cursor: 'pointer',
        background: gradient,
        border: selected ? '2px solid var(--accent-pink)' : '1px solid var(--border)',
        boxShadow: selected ? '0 0 24px rgba(251,35,194,0.3)' : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      {/* Silhouette */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 64, opacity: 0.3
      }}>
        {silhouette}
      </div>

      {/* Inner glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 30%, rgba(251,35,194,0.1) 0%, transparent 60%)'
      }} />

      {/* Selected badge */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'absolute', top: 10, right: 10,
              background: 'var(--accent-pink)', color: '#fff',
              borderRadius: 20, padding: '4px 10px',
              fontSize: 11, fontWeight: 600
            }}
          >
            ✓ Selected
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              padding: 16, gap: 8,
            }}
          >
            {quickActions.map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={(e) => { e.stopPropagation() }}
                style={{
                  background: 'rgba(18,17,19,0.8)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,130,219,0.3)', borderRadius: 20,
                  color: 'var(--accent-pink-soft)', fontSize: 12, fontWeight: 500,
                  padding: '6px 12px', cursor: 'pointer', textAlign: 'left',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontFamily: 'inherit',
                }}
              >
                {action.label} <span>{action.dir}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
