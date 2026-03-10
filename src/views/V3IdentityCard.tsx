import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CharacterImageCard } from '../components/CharacterImageCard'
import { SaveFlow } from '../components/SaveFlow'

type Mode = 'text' | 'image' | 'design'
type AppState = 'entry' | 'results'

const AESTHETICS = [
  { label: 'Cinematic', gradient: 'linear-gradient(135deg, #1a1a2e, #4a3050)' },
  { label: 'Ethereal', gradient: 'linear-gradient(135deg, #0d2040, #1a4a7a)' },
  { label: 'Urban', gradient: 'linear-gradient(135deg, #1c1c1c, #3a3a40)' },
  { label: 'Fantasy', gradient: 'linear-gradient(135deg, #1a0a2e, #4a2060)' },
]
const VIBES = ['Mysterious', 'Bold', 'Warm', 'Dark', 'Playful', 'Elegant']

export function V3IdentityCard() {
  const [appState, setAppState] = useState<AppState>('entry')
  const [mode, setMode] = useState<Mode>('text')
  const [text, setText] = useState('')
  const [cardRole, setCardRole] = useState('')
  const [cardOrigin, setCardOrigin] = useState('')
  const [selectedCardResult, setSelectedCardResult] = useState(0)
  const [selVibes, setSelVibes] = useState<string[]>([])
  const [dStep, setDStep] = useState(0)
  const [generating, setGenerating] = useState(false)
  const [extraCards, setExtraCards] = useState<number[]>([])
  const [chatInput, setChatInput] = useState('')
  const [saveIdx, setSaveIdx] = useState<number | null>(null)

  const generate = () => {
    setGenerating(true)
    setTimeout(() => { setGenerating(false); setAppState('results') }, 1400)
  }

  const refine = () => {
    if (!chatInput.trim()) return
    setExtraCards(p => [...p, (p.length + 3) % 5])
    setChatInput('')
  }

  const handleTextChange = (v: string) => {
    setText(v)
    const words = v.trim().split(/\s+/).filter(Boolean)
    if (words.length >= 3) setCardRole(words.slice(0, 2).join(' '))
    if (words.length >= 5) setCardOrigin(words[4] || '')
  }

  const ResultCards = [0, 1, 2, 3, ...extraCards]

  const CARD_GRADIENTS = [
    'linear-gradient(160deg, #2c1810, #5c3a1e, #8b5e3c, #c4956a)',
    'linear-gradient(160deg, #0a0e1a, #1a2340, #2d4a7a, #4a7fa8)',
    'linear-gradient(160deg, #1a0a1e, #3d1a4a, #6b2d7a, #9b4dab)',
    'linear-gradient(160deg, #0d1a0a, #1e3d1a, #3a6b35, #5a9b50)',
    'linear-gradient(160deg, #1a1410, #3d2e1a, #6b5a35, #9b8a5a)',
  ]

  const IDCard = ({ compact = false }: { compact?: boolean }) => (
    <div style={{
      width: compact ? '100%' : 520, maxWidth: '100%',
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 20, display: 'flex', overflow: 'hidden',
      position: 'relative',
      boxShadow: compact ? '0 4px 24px rgba(0,0,0,0.4)' : '0 8px 40px rgba(0,0,0,0.5)',
    }}>
      {/* Shine overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '30%', height: '100%',
        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)',
        animation: 'id-shine 4s ease-in-out infinite',
        pointerEvents: 'none', zIndex: 2,
      }} />

      {/* Portrait slot */}
      <div style={{
        width: compact ? 90 : 120, flexShrink: 0,
        background: appState === 'results'
          ? CARD_GRADIENTS[selectedCardResult % CARD_GRADIENTS.length]
          : 'var(--bg-elevated)',
        borderRight: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6,
        minHeight: compact ? 120 : 160,
        transition: 'background 0.4s ease',
      }}>
        {appState !== 'results' && (
          <>
            <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)', fontSize: 16 }}>+</div>
            <div style={{ fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.08em', textAlign: 'center' }}>PORTRAIT</div>
          </>
        )}
      </div>

      {/* Fields */}
      <div style={{ flex: 1, padding: compact ? '14px 16px' : '20px 22px', display: 'flex', flexDirection: 'column', gap: compact ? 10 : 14 }}>
        <div style={{ fontSize: 9, color: 'var(--accent-pink)', letterSpacing: '0.12em', fontWeight: 600 }}>CHARACTER PROFILE</div>
        {[
          { label: 'NAME', value: '' },
          { label: 'ROLE', value: cardRole },
          { label: 'ORIGIN', value: cardOrigin },
        ].map(f => (
          <div key={f.label}>
            <div style={{ fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.1em', marginBottom: 4 }}>{f.label}</div>
            <div style={{
              height: 2, background: f.value ? 'var(--border-hover)' : 'var(--border)', borderRadius: 1, width: '100%', position: 'relative',
            }}>
              {f.value && (
                <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
                  style={{ position: 'absolute', top: 4, left: 0, fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}
                >{f.value}</motion.div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {saveIdx !== null && <SaveFlow characterIndex={saveIdx} onClose={() => setSaveIdx(null)} />}

      <AnimatePresence mode="wait">

        {appState === 'entry' && (
          <motion.div key="entry"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.97 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 32px', gap: 20, overflowY: 'auto' }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Character Studio — Identity
            </div>

            <IDCard />

            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>How would you like to start?</div>

            <div style={{ display: 'flex', gap: 8 }}>
              {(['text', 'image', 'design'] as Mode[]).map((m, i) => (
                <button key={m} onClick={() => setMode(m)} style={{
                  height: 36, padding: '0 16px', borderRadius: 18, fontSize: 13, cursor: 'pointer',
                  background: mode === m ? 'rgba(251,35,194,0.15)' : 'var(--bg-elevated)',
                  border: mode === m ? '1px solid var(--accent-pink)' : '1px solid var(--border)',
                  color: mode === m ? 'var(--accent-pink-soft)' : 'var(--text-secondary)',
                }}>
                  {['Describe them', 'Upload a photo', 'Build their profile'][i]}
                </button>
              ))}
            </div>

            {mode === 'text' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ width: '100%', maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <textarea value={text} onChange={e => handleTextChange(e.target.value)}
                  placeholder="Describe your character… who they are, where they come from, what drives them..."
                  rows={4}
                  style={{
                    width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14,
                    color: 'var(--text-primary)', fontSize: 14, padding: '16px', outline: 'none', resize: 'none',
                    fontFamily: 'inherit', lineHeight: 1.6,
                  }}
                />
                <button onClick={generate} disabled={generating} style={{
                  height: 46, borderRadius: 23, background: generating ? 'var(--bg-elevated)' : 'var(--accent-green)',
                  border: 'none', color: generating ? 'var(--text-tertiary)' : '#000', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                }}>
                  {generating ? 'Generating...' : 'Generate my character ✦'}
                </button>
              </motion.div>
            )}

            {mode === 'image' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ width: '100%', maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <div style={{
                  height: 160, border: '2px dashed var(--accent-pink)', borderRadius: 16,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer',
                  background: 'rgba(251,35,194,0.03)',
                }}>
                  <div style={{ fontSize: 32 }}>📷</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Upload portrait photo</div>
                </div>
                <button onClick={generate} style={{
                  height: 46, borderRadius: 23, background: 'var(--accent-green)', border: 'none', color: '#000', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                }}>Generate my character ✦</button>
              </motion.div>
            )}

            {mode === 'design' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ width: '100%', maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                <div style={{ display: 'flex', gap: 6 }}>
                  {['Aesthetic', 'Energy', 'Details'].map((s, i) => (
                    <div key={s} style={{ height: 3, flex: 1, borderRadius: 2, background: i <= dStep ? 'var(--accent-pink)' : 'var(--border)', transition: 'background 0.3s' }} />
                  ))}
                </div>

                {dStep === 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>Choose an aesthetic</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {AESTHETICS.map((a) => (
                        <button key={a.label} onClick={() => { setCardRole(a.label); setDStep(1) }} style={{
                          aspectRatio: '2/1', borderRadius: 10, background: a.gradient, border: '2px solid transparent',
                          cursor: 'pointer', display: 'flex', alignItems: 'flex-end', padding: 10,
                        }}>
                          <span style={{ color: '#fff', fontSize: 12, fontWeight: 500 }}>{a.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {dStep === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>Pick their energy <span style={{ fontWeight: 400, fontSize: 12, color: 'var(--text-tertiary)' }}>— choose 2</span></div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {VIBES.map(v => (
                        <button key={v}
                          onClick={() => setSelVibes(p => p.includes(v) ? p.filter(x => x !== v) : p.length < 2 ? [...p, v] : p)}
                          style={{
                            height: 36, padding: '0 16px', borderRadius: 18, fontSize: 12, cursor: 'pointer',
                            background: selVibes.includes(v) ? 'var(--accent-pink)' : 'var(--bg-card)',
                            border: selVibes.includes(v) ? 'none' : '1px solid var(--border)',
                            color: selVibes.includes(v) ? '#fff' : 'var(--text-secondary)',
                          }}>{v}</button>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => setDStep(0)} style={{ height: 40, padding: '0 14px', borderRadius: 20, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer' }}>←</button>
                      <button onClick={() => selVibes.length > 0 && setDStep(2)} style={{ height: 40, flex: 1, borderRadius: 20, background: selVibes.length > 0 ? 'var(--accent-pink)' : 'var(--bg-elevated)', border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Next →</button>
                    </div>
                  </div>
                )}

                {dStep === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>Details</div>
                    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                      {['Teen', 'Young adult', 'Adult', 'Elder'].map(a => (
                        <button key={a} style={{ height: 32, padding: '0 14px', borderRadius: 16, fontSize: 12, cursor: 'pointer', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>{a}</button>
                      ))}
                    </div>
                    <button onClick={generate} style={{
                      height: 44, borderRadius: 22, background: 'var(--accent-green)', border: 'none', color: '#000', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                    }}>Generate my character ✦</button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}

        {appState === 'results' && (
          <motion.div key="results"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ flex: 1, display: 'flex', gap: 0, overflow: 'hidden' }}
          >
            {/* Left: ID card panel */}
            <div style={{
              width: '38%', flexShrink: 0, borderRight: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', padding: '20px 18px', gap: 16, overflow: 'hidden',
            }}>
              <div style={{ fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>SELECTED CHARACTER</div>
              <IDCard compact />
              <button onClick={() => setSaveIdx(selectedCardResult)} style={{
                height: 42, borderRadius: 21, background: 'var(--accent-pink)', border: 'none',
                color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 0 20px rgba(251,35,194,0.3)',
              }}>✦ Use this character</button>
              <button onClick={() => setAppState('entry')} style={{
                height: 36, borderRadius: 18, background: 'none', border: '1px solid var(--border)',
                color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer',
              }}>← Back</button>
            </div>

            {/* Right: results grid */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 18px', gap: 12, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1, overflowY: 'auto', minHeight: 0 }}>
                {ResultCards.map((idx, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}
                    onClick={() => setSelectedCardResult(idx)}
                    style={{ cursor: 'pointer', borderRadius: 12, overflow: 'hidden', border: selectedCardResult === idx ? '2px solid var(--accent-pink)' : '2px solid transparent' }}
                  >
                    <CharacterImageCard index={idx} onSelect={() => setSaveIdx(idx)} />
                  </motion.div>
                ))}
              </div>

              <div style={{
                display: 'flex', gap: 8, alignItems: 'center',
                background: 'var(--bg-card)', borderRadius: 20, padding: '8px 12px',
                border: '1px solid var(--border)',
              }}>
                <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && refine()}
                  placeholder="Refine..."
                  style={{ flex: 1, background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 13, outline: 'none' }}
                />
                <button onClick={refine} style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent-pink)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 12 }}>↑</button>
              </div>

              <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-tertiary)' }}>
                ✦ All creations are saved to your generation history
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
