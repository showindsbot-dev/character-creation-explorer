import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ModalWrapper from '../components/ModalWrapper'
import GenerateButton from '../components/GenerateButton'
import ResultCard from '../components/ResultCard'

interface Props { onClose: () => void }

const placeholders = [
  'A mysterious hacker girl with silver hair and glowing tattoos...',
  'A wise old wizard with kind eyes and a weather-beaten cloak...',
  'An energetic street dancer from Neo Tokyo, always smiling...',
  'A cold-blooded assassin hiding warmth behind a stoic mask...',
]

const detectedTags = [
  { label: 'Female', type: 'gender' },
  { label: 'Cyberpunk', type: 'style' },
  { label: 'Mysterious', type: 'mood' },
]

const refineChips = ['Silver hair ×', 'Cyberpunk ✓', 'Female ✓', 'Mysterious ✓']

export default function TextFlowModal({ onClose }: Props) {
  const [text, setText] = useState('')
  const [placeholderIdx, setPlaceholderIdx] = useState(0)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(false)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [showTags, setShowTags] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setPlaceholderIdx(i => (i + 1) % placeholders.length), 3000)
    return () => clearInterval(interval)
  }, [])

  const handleTextChange = (val: string) => {
    setText(val)
    if (val.split(' ').length >= 2 && !showTags) setShowTags(true)
  }

  const handleGenerate = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setResults(true) }, 1600)
  }

  if (!results) {
    return (
      <ModalWrapper onClose={onClose}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 40px', gap: 32 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', width: '100%', maxWidth: 700 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 24 }}>✍️</span>
              <h2 style={{ fontSize: 22, fontWeight: 600 }}>Describe your character</h2>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 32 }}>Write freely — the more vivid, the better</p>

            {/* Textarea with cycling placeholder */}
            <div style={{ position: 'relative', width: '100%' }}>
              <textarea
                value={text}
                onChange={e => handleTextChange(e.target.value)}
                style={{
                  width: '100%', minHeight: 140, background: 'transparent',
                  border: 'none', borderBottom: '2px solid var(--border)',
                  color: 'var(--text-primary)', fontSize: 20, fontWeight: 300,
                  lineHeight: 1.6, fontFamily: 'inherit', resize: 'none',
                  outline: 'none', padding: '0 0 16px', transition: 'border-color 0.3s',
                }}
                onFocus={e => e.target.style.borderBottomColor = 'var(--accent-pink)'}
                onBlur={e => e.target.style.borderBottomColor = 'var(--border)'}
              />
              {!text && (
                <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', overflow: 'hidden', width: '100%', height: 140 }}>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={placeholderIdx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4 }}
                      style={{ fontSize: 20, fontWeight: 300, color: 'var(--text-tertiary)', lineHeight: 1.6, fontStyle: 'italic' }}
                    >
                      {placeholders[placeholderIdx]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Floating detected tags */}
            <AnimatePresence>
              {showTags && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {detectedTags.map((tag, i) => (
                    <motion.div
                      key={tag.label} initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                      style={{
                        background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                        borderRadius: 20, padding: '5px 14px', fontSize: 12,
                        color: 'var(--text-secondary)', display: 'flex', gap: 6, alignItems: 'center'
                      }}
                    >
                      <span style={{ fontSize: 9, color: 'var(--accent-pink)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{tag.type}</span>
                      {tag.label}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ marginTop: 40 }}>
              <GenerateButton onClick={handleGenerate} loading={loading} label="Generate Character" />
            </div>
          </motion.div>
        </div>
      </ModalWrapper>
    )
  }

  // Results view
  return (
    <ModalWrapper onClose={onClose}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left - results */}
        <div style={{ flex: '0 0 58%', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Based on: <em style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{text.slice(0, 60)}..."</em></p>
          </div>
          <div style={{ flex: 1, padding: 20, overflow: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {[0, 1, 2].map(i => (
                <ResultCard key={i} index={i} selected={selectedCard === i} onSelect={() => setSelectedCard(i)} />
              ))}
            </div>
          </div>
        </div>

        {/* Right - refine */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>Keep refining</h3>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>What would you change?</p>
          </div>
          <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
            <textarea
              placeholder="Make the hair more silver... add neon glow to the tattoos..."
              style={{
                width: '100%', minHeight: 100, background: 'var(--bg-elevated)',
                border: '1px solid var(--border)', borderRadius: 10,
                color: 'var(--text-primary)', fontSize: 14, padding: '12px 14px',
                resize: 'none', fontFamily: 'inherit', outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(251,35,194,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <div>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Detected traits</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {refineChips.map(chip => (
                  <button key={chip} style={{
                    background: chip.includes('×') ? 'rgba(251,35,194,0.1)' : 'var(--bg-elevated)',
                    border: chip.includes('×') ? '1px solid rgba(251,35,194,0.4)' : '1px solid var(--border)',
                    borderRadius: 20, padding: '5px 12px', fontSize: 12,
                    color: chip.includes('×') ? 'var(--accent-pink-soft)' : 'var(--text-secondary)',
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    {chip}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 'auto' }}>
              <GenerateButton onClick={handleGenerate} loading={loading} label="Regenerate" fullWidth />
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}
