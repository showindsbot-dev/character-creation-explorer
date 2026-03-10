import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CARD_GRADIENTS = [
  'linear-gradient(160deg, #2c1810, #5c3a1e, #8b5e3c, #c4956a)',
  'linear-gradient(160deg, #0a0e1a, #1a2340, #2d4a7a, #4a7fa8)',
  'linear-gradient(160deg, #1a0a1e, #3d1a4a, #6b2d7a, #9b4dab)',
  'linear-gradient(160deg, #0d1a0a, #1e3d1a, #3a6b35, #5a9b50)',
  'linear-gradient(160deg, #1a1410, #3d2e1a, #6b5a35, #9b8a5a)',
]

interface Props {
  characterIndex: number
  onClose: () => void
}

export function SaveFlow({ characterIndex, onClose }: Props) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [story, setStory] = useState('')
  const [saved, setSaved] = useState(false)
  const gradient = CARD_GRADIENTS[characterIndex % CARD_GRADIENTS.length]

  const handleSave = () => {
    setSaved(true)
    setTimeout(onClose, 1800)
  }

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(12,11,13,0.97)', backdropFilter: 'blur(24px)',
      zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '32px 40px', borderRadius: 24, overflowY: 'auto',
    }}>
      <button onClick={onClose} style={{
        position: 'absolute', top: 20, right: 20, background: 'none', border: 'none',
        color: 'var(--text-tertiary)', fontSize: 22, cursor: 'pointer', lineHeight: 1,
      }}>×</button>

      {/* Step dots */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 36 }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{
            height: 6, borderRadius: 3,
            width: i === step ? 24 : 6,
            background: i === step ? 'var(--accent-pink)' : i < step ? 'rgba(251,35,194,0.4)' : 'var(--border)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {saved ? (
          <motion.div key="saved"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', paddingTop: 40 }}
          >
            <div style={{ fontSize: 52, marginBottom: 16, color: 'var(--accent-pink)' }}>✦</div>
            <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent-green)' }}>Character saved!</div>
            <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 8 }}>
              {name ? `${name} is in your collection.` : 'Added to your collection.'}
            </div>
          </motion.div>

        ) : step === 0 ? (
          <motion.div key="s0" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '100%' }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Main image confirmed</div>
            <div style={{
              width: 180, aspectRatio: '3/4', borderRadius: 16, background: gradient,
              boxShadow: '0 0 0 2px var(--accent-pink), 0 0 50px rgba(251,35,194,0.25)',
            }} />
            <button onClick={() => setStep(1)} style={{
              background: 'var(--accent-pink)', color: '#fff', border: 'none',
              borderRadius: 22, height: 44, padding: '0 36px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>Continue →</button>
          </motion.div>

        ) : step === 1 ? (
          <motion.div key="s1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%', maxWidth: 440 }}
          >
            <div style={{ fontSize: 20, fontWeight: 600, textAlign: 'center' }}>Want a full turnaround?</div>
            <div style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: 14, lineHeight: 1.5 }}>
              Generate side &amp; back views to complete your character sheet.
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              {['Front', 'Side', 'Back'].map((v, i) => (
                <div key={v} style={{
                  width: 90, aspectRatio: '3/4', borderRadius: 12,
                  background: i === 0 ? gradient : 'var(--bg-card)',
                  border: i > 0 ? '2px dashed var(--border)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6,
                }}>
                  {i > 0 && <>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: 20 }}>+</span>
                    <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{v}</span>
                  </>}
                </div>
              ))}
            </div>
            <button onClick={() => setStep(2)} style={{
              background: 'var(--accent-pink)', color: '#fff', border: 'none',
              borderRadius: 22, height: 44, padding: '0 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 4,
            }}>Generate turnaround ✦</button>
            <button onClick={() => setStep(2)} style={{
              background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline',
            }}>Skip</button>
          </motion.div>

        ) : step === 2 ? (
          <motion.div key="s2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%', maxWidth: 400 }}
          >
            <div style={{ fontSize: 20, fontWeight: 600 }}>Name your character</div>
            <input
              value={name} onChange={e => setName(e.target.value)}
              placeholder="Give them a name..."
              autoFocus
              style={{
                background: 'none', border: 'none', borderBottom: '1px solid var(--border)',
                color: 'var(--text-primary)', fontSize: 26, fontWeight: 300, letterSpacing: '0.02em',
                padding: '8px 0', width: '100%', outline: 'none', textAlign: 'center',
              }}
            />
            <button onClick={() => setStep(3)} style={{
              background: 'var(--accent-pink)', color: '#fff', border: 'none',
              borderRadius: 22, height: 44, padding: '0 36px', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 12,
            }}>Continue →</button>
          </motion.div>

        ) : step === 3 ? (
          <motion.div key="s3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%', maxWidth: 460 }}
          >
            <div style={{ fontSize: 20, fontWeight: 600 }}>Background story</div>
            <textarea
              value={story} onChange={e => setStory(e.target.value)}
              placeholder="Write their story..."
              rows={5}
              style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14,
                color: 'var(--text-primary)', fontSize: 14, padding: '16px', width: '100%',
                outline: 'none', resize: 'none', fontFamily: 'inherit', lineHeight: 1.6,
              }}
            />
            <button style={{
              background: 'none', border: '1px solid var(--border)', color: 'var(--accent-pink-soft)',
              borderRadius: 20, height: 36, padding: '0 20px', fontSize: 12, cursor: 'pointer',
            }}>Let AI draft one ✦</button>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(4)} style={{
                background: 'var(--accent-pink)', color: '#fff', border: 'none',
                borderRadius: 22, height: 44, padding: '0 32px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>Continue →</button>
              <button onClick={() => setStep(4)} style={{
                background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline',
              }}>Skip</button>
            </div>
          </motion.div>

        ) : (
          <motion.div key="s4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%', maxWidth: 360 }}
          >
            <div style={{ fontSize: 20, fontWeight: 600 }}>Ready to save</div>
            <div style={{ width: 110, aspectRatio: '3/4', borderRadius: 12, background: gradient, boxShadow: '0 0 30px rgba(251,35,194,0.2)' }} />
            {name && <div style={{ fontSize: 18, fontWeight: 500, color: 'var(--text-primary)' }}>{name}</div>}
            <button onClick={handleSave} style={{
              background: 'var(--accent-green)', color: '#000', border: 'none',
              borderRadius: 22, height: 48, padding: '0 44px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
            }}>✦ Save to my characters</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
