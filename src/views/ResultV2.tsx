import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HoverActions from '../components/HoverActions'

const GRADIENTS = [
  'linear-gradient(160deg, #2c1810 0%, #5c3a1e 30%, #8b5e3c 60%, #c4956a 100%)',
  'linear-gradient(160deg, #0a0e1a 0%, #1a2340 30%, #2d4a7a 60%, #4a7fa8 100%)',
  'linear-gradient(160deg, #1a0a1e 0%, #3d1a4a 35%, #6b2d7a 65%, #9b4dab 100%)',
  'linear-gradient(160deg, #0d1a0a 0%, #1e3d1a 35%, #3a6b35 65%, #5a9b50 100%)',
]
const OVERLAY = 'radial-gradient(ellipse 60% 80% at 50% 35%, rgba(255,255,255,0.07) 0%, transparent 60%)'

const REFINE_CHIPS = ['More confident', 'Softer', 'Darker', 'Younger']

interface ResultV2Props {
  onBack: () => void
}

export default function ResultV2({ onBack }: ResultV2Props) {
  const [heroIdx, setHeroIdx] = useState(0)
  const [heroHovered, setHeroHovered] = useState(false)
  const [refineValue, setRefineValue] = useState('')

  const sideCards = GRADIENTS.filter((_, i) => i !== heroIdx)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        flex: 1,
        display: 'flex',
        minHeight: 0,
        height: 0,
      }}
    >
      {/* LEFT PANEL - hero */}
      <div style={{
        flex: '0 0 62%',
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        gap: 14,
        borderRight: '1px solid var(--border)',
        minHeight: 0,
      }}>
        {/* Hero image */}
        <div
          style={{
            flex: 1,
            borderRadius: 16,
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
            minHeight: 0,
          }}
          onMouseEnter={() => setHeroHovered(true)}
          onMouseLeave={() => setHeroHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute', inset: 0,
                background: GRADIENTS[heroIdx],
              }}
            />
          </AnimatePresence>
          <div style={{ position: 'absolute', inset: 0, background: OVERLAY, zIndex: 1 }} />
          <HoverActions visible={heroHovered} />
          {/* Character label */}
          <div style={{
            position: 'absolute', bottom: 16, left: 16, zIndex: 3,
            color: '#fff', fontSize: 13, fontWeight: 600,
            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
          }}>
            Character #{heroIdx + 1}
          </div>
        </div>

        {/* Use button */}
        <button style={{
          background: 'var(--accent-pink)',
          border: 'none', color: '#fff',
          borderRadius: 10, padding: '11px 0',
          fontSize: 14, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit',
          boxShadow: '0 2px 14px rgba(251,35,194,0.35)',
        }}>
          Use this character
        </button>

        <button
          onClick={onBack}
          style={{
            background: 'transparent', border: 'none',
            color: 'var(--text-tertiary)', fontSize: 13,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          ← Back
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div style={{
        flex: '0 0 38%',
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        overflowY: 'auto',
        gap: 14,
        minHeight: 0,
      }}>
        <p style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
          Other versions
        </p>

        {/* Small cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sideCards.map((grad, i) => {
            const origIdx = GRADIENTS.indexOf(grad)
            return (
              <SideCard
                key={origIdx}
                gradient={grad}
                onClick={() => setHeroIdx(origIdx)}
                index={i}
              />
            )
          })}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />

        {/* Refine section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 24, height: 24, borderRadius: '50%',
            background: 'linear-gradient(135deg, #fb23c2 0%, #ff82db 100%)',
            flexShrink: 0,
          }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Refine</span>
        </div>

        <textarea
          value={refineValue}
          onChange={(e) => setRefineValue(e.target.value)}
          placeholder="What would you change?"
          rows={3}
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '10px 12px',
            fontSize: 14,
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
            resize: 'none',
            outline: 'none',
            caretColor: 'var(--accent-green)',
          }}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {REFINE_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => setRefineValue(chip)}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                borderRadius: 20, padding: '5px 12px',
                fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        <button style={{
          background: 'var(--accent-green)',
          border: 'none', color: '#000',
          borderRadius: 8, padding: '10px 0',
          fontSize: 14, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit',
          width: '100%',
        }}>
          Generate
        </button>
      </div>
    </motion.div>
  )
}

function SideCard({ gradient, onClick, index }: { gradient: string; onClick: () => void; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        maxHeight: 140,
        aspectRatio: '3/4',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        background: gradient,
        transition: 'opacity 0.2s',
        opacity: hovered ? 0.85 : 1,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: OVERLAY }} />
      {/* Download on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => { e.stopPropagation(); alert('Downloading...') }}
            style={{
              position: 'absolute', top: 8, right: 8,
              width: 26, height: 26, borderRadius: '50%',
              background: 'rgba(20,19,22,0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff', fontSize: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 2,
            }}
          >
            ↓
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
