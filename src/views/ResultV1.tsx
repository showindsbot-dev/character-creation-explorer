import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HoverActions from '../components/HoverActions'

const BASE_GRADIENTS = [
  'linear-gradient(160deg, #2c1810 0%, #5c3a1e 30%, #8b5e3c 60%, #c4956a 100%)',
  'linear-gradient(160deg, #0a0e1a 0%, #1a2340 30%, #2d4a7a 60%, #4a7fa8 100%)',
  'linear-gradient(160deg, #1a0a1e 0%, #3d1a4a 35%, #6b2d7a 65%, #9b4dab 100%)',
  'linear-gradient(160deg, #0d1a0a 0%, #1e3d1a 35%, #3a6b35 65%, #5a9b50 100%)',
]
const EXTRA_GRADIENTS = [
  'linear-gradient(160deg, #1a1020 0%, #2d1a40 30%, #5c3a7a 60%, #8b5eab 100%)',
  'linear-gradient(160deg, #201008 0%, #402010 30%, #7a4020 60%, #ab6e3c 100%)',
]
const OVERLAY = 'radial-gradient(ellipse 60% 80% at 50% 35%, rgba(255,255,255,0.07) 0%, transparent 60%)'

const REFINE_CHIPS = ['More dramatic', 'Younger', 'Add accessories', 'Different setting']

function CardImage({ gradient, selected, onClick }: { gradient: string; selected: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
        aspectRatio: '3/4',
        cursor: 'pointer',
        border: selected ? '2px solid #fb23c2' : '2px solid transparent',
        boxShadow: selected ? '0 0 30px rgba(251,35,194,0.25)' : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        background: gradient,
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: OVERLAY,
      }} />
      <HoverActions visible={hovered} />
    </motion.div>
  )
}

interface ResultV1Props {
  onBack: () => void
}

export default function ResultV1({ onBack }: ResultV1Props) {
  const [selected, setSelected] = useState(0)
  const [cards, setCards] = useState(BASE_GRADIENTS)
  const [refineValue, setRefineValue] = useState('')
  const [chipsVisible, setChipsVisible] = useState(false)
  const [sending, setSending] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  function handleSend() {
    if (!refineValue.trim() || sending) return
    setSending(true)
    setTimeout(() => {
      setCards((prev) => [...prev, ...EXTRA_GRADIENTS])
      setRefineValue('')
      setSending(false)
    }, 800)
  }

  function handleChip(chip: string) {
    setRefineValue(chip)
    inputRef.current?.focus()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: 0,
        minHeight: '100%',
      }}
    >
      {/* Header */}
      <div style={{
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
        position: 'relative',
        paddingLeft: 64,
      }}>
        <span style={{ fontSize: 11, color: 'var(--text-tertiary)', position: 'absolute', left: 20 }}>
          Your character
        </span>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
          Director Cut
        </span>
      </div>

      {/* Image grid */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: 20,
      }}>
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
          }}
        >
          <AnimatePresence>
            {cards.map((grad, i) => (
              <CardImage
                key={i}
                gradient={grad}
                selected={selected === i}
                onClick={() => setSelected(i)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom action bar */}
      <div style={{
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        background: 'rgba(18,17,19,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--border)',
        flexShrink: 0,
        gap: 10,
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent', border: 'none',
            color: 'var(--text-secondary)', fontSize: 14,
            cursor: 'pointer', fontFamily: 'inherit', padding: '6px 12px',
          }}
        >
          Back
        </button>
        <button style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          color: 'var(--text-primary)',
          borderRadius: 8, padding: '7px 16px',
          fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Generate more
        </button>
        <button style={{
          background: 'var(--accent-pink)',
          border: 'none',
          color: '#fff',
          borderRadius: 8, padding: '7px 16px',
          fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          boxShadow: '0 2px 14px rgba(251,35,194,0.35)',
        }}>
          Use this character
        </button>
      </div>

      {/* Chat refine bar */}
      <div style={{
        background: 'rgba(18,17,19,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}>
        {/* Chips (above input, show on focus) */}
        <AnimatePresence>
          {chipsVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', gap: 7, padding: '10px 14px 0', flexWrap: 'wrap' }}>
                {REFINE_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleChip(chip)}
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      borderRadius: 20, padding: '4px 11px',
                      fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px 12px',
        }}>
          <textarea
            ref={inputRef}
            value={refineValue}
            onChange={(e) => setRefineValue(e.target.value)}
            onFocus={() => setChipsVisible(true)}
            onBlur={() => setTimeout(() => setChipsVisible(false), 200)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
            }}
            placeholder="Refine your character... try adding a hood or changing her age"
            rows={1}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              resize: 'none', fontSize: 14, color: 'var(--text-primary)',
              fontFamily: 'inherit', lineHeight: 1.5,
              caretColor: 'var(--accent-pink)',
            }}
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={!refineValue.trim() || sending}
            style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: refineValue.trim() ? 'var(--accent-pink)' : 'var(--bg-elevated)',
              border: 'none', color: '#fff', cursor: refineValue.trim() ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, transition: 'background 0.2s',
            }}
          >
            ↑
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
