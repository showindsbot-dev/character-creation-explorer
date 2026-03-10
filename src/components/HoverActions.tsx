import { motion, AnimatePresence } from 'framer-motion'

const PILLS = ['More mysterious', 'Younger', 'Bolder look']

interface HoverActionsProps {
  visible: boolean
}

export default function HoverActions({ visible }: HoverActionsProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          style={{
            position: 'absolute', inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: 'inherit',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)',
          }} />

          {/* Download button top-right */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 }}
            onClick={(e) => { e.stopPropagation(); alert('Downloading...') }}
            style={{
              position: 'absolute', top: 10, right: 10,
              width: 30, height: 30, borderRadius: '50%',
              background: 'rgba(20,19,22,0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              pointerEvents: 'auto',
              fontSize: 13,
            }}
          >
            ↓
          </motion.button>

          {/* Pills bottom */}
          <div style={{
            position: 'absolute', bottom: 10, left: 10, right: 10,
            display: 'flex', flexWrap: 'wrap', gap: 5,
            pointerEvents: 'auto',
          }}>
            {PILLS.map((pill, i) => (
              <motion.button
                key={pill}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
                style={{
                  background: 'rgba(20,19,22,0.85)',
                  border: '1px solid rgba(255,130,219,0.3)',
                  color: '#ff82db',
                  fontSize: 12,
                  borderRadius: 20,
                  padding: '5px 12px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {pill}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
