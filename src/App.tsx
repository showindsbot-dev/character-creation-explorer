import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ConversationStart from './views/ConversationStart'
import ResultV1 from './views/ResultV1'
import ResultV2 from './views/ResultV2'
import ResultV3 from './views/ResultV3'
import './index.css'

type Version = 'V1' | 'V2' | 'V3'

export default function App() {
  const [active, setActive] = useState<Version>('V1')
  const [conversationDone, setConversationDone] = useState(false)

  function handleTabSwitch(v: Version) {
    setActive(v)
  }

  function handleDone() {
    setConversationDone(true)
  }

  function handleBack() {
    setConversationDone(false)
  }

  return (
    <div style={{
      height: '100vh',
      background: 'var(--bg-base)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Top nav */}
      <nav style={{
        position: 'relative', zIndex: 100,
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
              onClick={() => handleTabSwitch(v)}
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
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
        <AnimatePresence mode="wait">
          {!conversationDone ? (
            <ConversationStart key="conversation" onDone={handleDone} />
          ) : active === 'V1' ? (
            <ResultV1 key="result-v1" onBack={handleBack} />
          ) : active === 'V2' ? (
            <ResultV2 key="result-v2" onBack={handleBack} />
          ) : (
            <ResultV3 key="result-v3" onBack={handleBack} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
