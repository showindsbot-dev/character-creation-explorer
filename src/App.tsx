import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import V1GlassCard from './views/V1GlassCard'
import V2Conversation from './views/V2Conversation'
import V3MoodBoard from './views/V3MoodBoard'
import './index.css'

type Version = 'V1' | 'V2' | 'V3'

export default function App() {
  const [active, setActive] = useState<Version>('V1')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(18,17,19,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        height: 52,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px',
        flexShrink: 0,
      }}>
        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--accent-pink)',
            display: 'inline-block',
            boxShadow: '0 0 8px rgba(251,35,194,0.7)',
            flexShrink: 0,
          }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
            Character Studio
          </span>
        </div>

        {/* Version pills */}
        <div style={{
          display: 'flex', gap: 3,
          background: 'var(--bg-elevated)',
          borderRadius: 22, padding: 3,
          border: '1px solid var(--border)',
        }}>
          {(['V1', 'V2', 'V3'] as Version[]).map((v) => (
            <motion.button
              key={v}
              onClick={() => setActive(v)}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '5px 20px',
                borderRadius: 18,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
                fontFamily: 'inherit',
                background: active === v ? 'var(--accent-pink)' : 'transparent',
                color: active === v ? '#fff' : 'var(--text-secondary)',
                transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                boxShadow: active === v ? '0 2px 14px rgba(251,35,194,0.4)' : 'none',
              }}
            >
              {v}
            </motion.button>
          ))}
        </div>

        {/* OpenArt */}
        <span style={{ fontSize: 13, color: 'var(--text-tertiary)', fontWeight: 500, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
          OpenArt
        </span>
      </nav>

      {/* Page content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">
          {active === 'V1' && <V1GlassCard key="v1" />}
          {active === 'V2' && <V2Conversation key="v2" />}
          {active === 'V3' && <V3MoodBoard key="v3" />}
        </AnimatePresence>
      </div>
    </div>
  )
}
