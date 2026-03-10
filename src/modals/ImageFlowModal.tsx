import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ModalWrapper from '../components/ModalWrapper'
import GenerateButton from '../components/GenerateButton'
import ResultCard from '../components/ResultCard'

interface Props { onClose: () => void }

const aiTags = ['Dark aesthetic detected', 'Confident gaze', 'Urban style']
const chips = ['More edgy', 'Softer look', 'Different hairstyle', 'Add accessories', 'Change age', 'Bolder colors']

export default function ImageFlowModal({ onClose }: Props) {
  const [uploaded, setUploaded] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(false)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file)
    setImageSrc(url)
    setTimeout(() => setUploaded(true), 200)
  }

  const handleGenerate = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setResults(true) }, 1600)
  }

  return (
    <ModalWrapper onClose={onClose}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left panel */}
        <div style={{ flex: '0 0 55%', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '28px 32px 20px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>🖼</span>
              <h2 style={{ fontSize: 18, fontWeight: 600 }}>Start from an image</h2>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 4 }}>Upload a reference — AI will read and interpret it</p>
          </div>

          <div style={{ flex: 1, padding: 24, overflow: 'auto' }}>
            {!results ? (
              /* Upload zone */
              <motion.div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
                animate={{ borderColor: dragging ? 'var(--accent-pink)' : uploaded ? 'rgba(251,35,194,0.5)' : 'rgba(251,35,194,0.25)' }}
                style={{
                  border: '2px dashed',
                  borderRadius: 16, cursor: 'pointer',
                  overflow: 'hidden', position: 'relative',
                  height: imageSrc ? 'auto' : 360,
                  minHeight: 200,
                  background: dragging ? 'rgba(251,35,194,0.05)' : 'var(--bg-elevated)',
                  transition: 'background 0.2s',
                }}
              >
                <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />

                {imageSrc ? (
                  <div style={{ position: 'relative' }}>
                    <img src={imageSrc} alt="Reference" style={{ width: '100%', display: 'block', maxHeight: 340, objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,17,19,0.8) 0%, transparent 60%)' }} />
                    <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
                      <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Click to replace ↑</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 40, gap: 12 }}>
                    <div style={{ fontSize: 40, opacity: 0.4 }}>⬆</div>
                    <p style={{ fontSize: 16, color: 'var(--text-secondary)', fontWeight: 500 }}>Drop your reference image here</p>
                    <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>or click to browse</p>
                  </div>
                )}
              </motion.div>
            ) : (
              /* Results grid */
              <div>
                <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 16 }}>Generated from your reference · Hover to refine</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[0, 1, 2, 3].map(i => (
                    <ResultCard key={i} index={i} selected={selectedCard === i} onSelect={() => setSelectedCard(i)} />
                  ))}
                </div>
              </div>
            )}

            {/* AI tags */}
            <AnimatePresence>
              {uploaded && !results && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <p style={{ width: '100%', fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 4 }}>AI detected:</p>
                  {aiTags.map((tag, i) => (
                    <motion.div
                      key={tag} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.15 }}
                      style={{
                        background: 'var(--accent-pink-bg)', border: '1px solid rgba(251,35,194,0.3)',
                        borderRadius: 20, padding: '4px 12px', fontSize: 12, color: 'var(--accent-pink-soft)'
                      }}
                    >
                      {tag}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '28px 28px 20px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Refine with words</h3>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Natural language adjustments</p>
          </div>

          <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 20, overflow: 'auto' }}>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Make her more edgy... add cyberpunk elements... younger face..."
              style={{
                width: '100%', minHeight: 120, background: 'var(--bg-elevated)',
                border: '1px solid var(--border)', borderRadius: 12,
                color: 'var(--text-primary)', fontSize: 14, padding: '14px 16px',
                resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6,
                outline: 'none', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(251,35,194,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />

            <div>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick adjustments</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {chips.map(chip => (
                  <motion.button
                    key={chip} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    onClick={() => setPrompt(p => p ? p + ', ' + chip.toLowerCase() : chip.toLowerCase())}
                    style={{
                      background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                      borderRadius: 20, padding: '6px 14px', fontSize: 13,
                      color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'inherit',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget).style.borderColor = 'var(--accent-pink)'; (e.currentTarget).style.color = 'var(--accent-pink-soft)' }}
                    onMouseLeave={e => { (e.currentTarget).style.borderColor = 'var(--border)'; (e.currentTarget).style.color = 'var(--text-secondary)' }}
                  >
                    {chip}
                  </motion.button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <GenerateButton
                onClick={handleGenerate}
                loading={loading}
                label={results ? 'Regenerate' : 'Generate Character'}
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}
