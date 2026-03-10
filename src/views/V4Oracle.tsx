import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CharacterImageCard } from '../components/CharacterImageCard'
import { SaveFlow } from '../components/SaveFlow'

type Mode = 'text' | 'image' | 'design'
type AppState = 'entry' | 'creation' | 'results'

const VIBES = ['Mysterious', 'Bold', 'Warm', 'Dark', 'Playful', 'Elegant']

export function V4Oracle() {
  const [appState, setAppState] = useState<AppState>('entry')
  const [mode, setMode] = useState<Mode>('text')
  const [text, setText] = useState('')
  const [dStep, setDStep] = useState(0)
  const [selVibes, setSelVibes] = useState<string[]>([])
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
    setExtraCards(p => [...p, (p.length + 2) % 5])
    setChatInput('')
  }

  const ResultCards = [0, 1, 2, 3, ...extraCards]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {saveIdx !== null && <SaveFlow characterIndex={saveIdx} onClose={() => setSaveIdx(null)} />}

      <AnimatePresence mode="wait">

        {appState === 'entry' && (
          <motion.div key="entry"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '40px 48px' }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Character Studio
            </div>

            {/* The Orb */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Rotating border */}
              <motion.div
                animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  width: 180, height: 180, borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, transparent 0%, var(--accent-pink) 20%, transparent 40%, var(--accent-pink-soft) 60%, transparent 80%)',
                  opacity: 0.4,
                }}
              />
              {/* Outer glow */}
              <div style={{
                position: 'absolute',
                width: 174, height: 174, borderRadius: '50%',
                background: 'var(--bg-base)',
              }} />
              {/* Orb itself */}
              <motion.button
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
                onClick={() => setAppState('creation')}
                style={{
                  position: 'relative',
                  width: 160, height: 160, borderRadius: '50%', cursor: 'pointer',
                  background: 'radial-gradient(circle at 35% 35%, rgba(100,0,75,0.8) 0%, rgba(20,18,22,1) 70%)',
                  border: 'none',
                  boxShadow: '0 0 60px rgba(251,35,194,0.3), inset 0 0 30px rgba(251,35,194,0.1)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                  zIndex: 1,
                }}
              >
                <span style={{ fontSize: 28, color: 'var(--accent-pink-soft)' }}>✦</span>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.04em' }}>Create</span>
              </motion.button>
            </div>

            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textAlign: 'center', lineHeight: 1.8 }}>
              or start with{' '}
              {(['text', 'image', 'design'] as Mode[]).map((m, i) => (
                <span key={m}>
                  <button onClick={() => { setMode(m); setAppState('creation') }} style={{
                    background: 'none', border: 'none', color: 'var(--accent-pink-soft)', cursor: 'pointer', fontSize: 11,
                    textDecoration: 'underline', padding: 0,
                  }}>
                    {['a description', 'a photo', 'step by step'][i]}
                  </button>
                  {i < 2 && <span style={{ color: 'var(--text-tertiary)' }}> · </span>}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {appState === 'creation' && (
          <motion.div key="creation"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '28px 40px', gap: 16, overflowY: 'auto' }}
          >
            <button onClick={() => setAppState('entry')} style={{
              background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 13, alignSelf: 'flex-start',
            }}>← Back</button>

            {/* Mode pills */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              {(['text', 'image', 'design'] as Mode[]).map((m, i) => (
                <button key={m} onClick={() => setMode(m)} style={{
                  height: 32, padding: '0 16px', borderRadius: 16, fontSize: 12, cursor: 'pointer',
                  background: mode === m ? 'var(--accent-pink)' : 'var(--bg-elevated)',
                  border: mode === m ? 'none' : '1px solid var(--border)',
                  color: mode === m ? '#fff' : 'var(--text-secondary)',
                }}>
                  {['Text', 'Image', 'Design'][i]}
                </button>
              ))}
            </div>

            {mode === 'text' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                <textarea value={text} onChange={e => setText(e.target.value)}
                  placeholder="Describe your character..."
                  autoFocus
                  style={{
                    flex: 1, minHeight: 160, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16,
                    color: 'var(--text-primary)', fontSize: 15, padding: '20px', outline: 'none', resize: 'none',
                    fontFamily: 'inherit', lineHeight: 1.6,
                  }}
                />
                <button style={{
                  background: 'none', border: 'none', color: 'var(--accent-pink-soft)', cursor: 'pointer', fontSize: 13, alignSelf: 'flex-start',
                }}>+ Add reference image</button>
              </motion.div>
            )}

            {mode === 'image' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                <div style={{
                  flex: 1, minHeight: 200, border: '2px dashed var(--accent-pink)', borderRadius: 20,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer',
                  background: 'rgba(251,35,194,0.03)',
                }}>
                  <div style={{ fontSize: 40 }}>📷</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Upload reference photo</div>
                </div>
              </motion.div>
            )}

            {mode === 'design' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                <div style={{ display: 'flex', gap: 6 }}>
                  {['Look', 'Energy', 'Details'].map((s, i) => (
                    <div key={s} style={{ height: 3, flex: 1, borderRadius: 2, background: i <= dStep ? 'var(--accent-pink)' : 'var(--border)', transition: 'background 0.3s' }} />
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  {dStep === 0 && (
                    <motion.div key="od0" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                      style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}
                    >
                      <div style={{ fontSize: 17, fontWeight: 500 }}>Choose an aesthetic</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {[
                          { label: 'Cinematic', g: 'linear-gradient(135deg, #1a1a2e, #4a3050)' },
                          { label: 'Ethereal', g: 'linear-gradient(135deg, #0d2040, #1a4a7a)' },
                          { label: 'Urban', g: 'linear-gradient(135deg, #1c1c1c, #3a3a40)' },
                          { label: 'Fantasy', g: 'linear-gradient(135deg, #1a0a2e, #4a2060)' },
                        ].map(a => (
                          <motion.button key={a.label} onClick={() => setDStep(1)}
                            whileHover={{ scale: 1.03, borderColor: 'var(--accent-pink)' }}
                            style={{
                              aspectRatio: '2/1', borderRadius: 12, background: a.g, border: '2px solid transparent',
                              cursor: 'pointer', display: 'flex', alignItems: 'flex-end', padding: 10,
                            }}>
                            <span style={{ color: '#fff', fontSize: 12, fontWeight: 500 }}>{a.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {dStep === 1 && (
                    <motion.div key="od1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                      style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}
                    >
                      <div style={{ fontSize: 17, fontWeight: 500 }}>Energy <span style={{ fontWeight: 400, fontSize: 12, color: 'var(--text-tertiary)' }}>— pick 2</span></div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {VIBES.map(v => (
                          <motion.button key={v} whileHover={{ scale: 1.04 }}
                            onClick={() => setSelVibes(p => p.includes(v) ? p.filter(x => x !== v) : p.length < 2 ? [...p, v] : p)}
                            style={{
                              height: 38, padding: '0 18px', borderRadius: 19, fontSize: 13, cursor: 'pointer',
                              background: selVibes.includes(v) ? 'var(--accent-pink)' : 'var(--bg-card)',
                              border: selVibes.includes(v) ? 'none' : '1px solid var(--border)',
                              color: selVibes.includes(v) ? '#fff' : 'var(--text-secondary)',
                            }}>{v}</motion.button>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => setDStep(0)} style={{ height: 40, padding: '0 14px', borderRadius: 20, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer' }}>←</button>
                        <button onClick={() => setDStep(2)} style={{ height: 40, flex: 1, borderRadius: 20, background: 'var(--accent-pink)', border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Next →</button>
                      </div>
                    </motion.div>
                  )}
                  {dStep === 2 && (
                    <motion.div key="od2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                      style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}
                    >
                      <div style={{ fontSize: 17, fontWeight: 500 }}>Details</div>
                      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                        {['Teen', 'Young adult', 'Adult', 'Elder'].map(a => (
                          <button key={a} style={{ height: 32, padding: '0 14px', borderRadius: 16, fontSize: 12, cursor: 'pointer', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>{a}</button>
                        ))}
                      </div>
                      <button onClick={generate} style={{ height: 44, borderRadius: 22, background: 'var(--accent-green)', border: 'none', color: '#000', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 'auto' }}>Generate my character ✦</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {mode !== 'design' && (
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={generate} disabled={generating}
                style={{
                  height: 48, borderRadius: 24,
                  background: generating ? 'var(--bg-elevated)' : 'var(--accent-pink)',
                  border: 'none', color: generating ? 'var(--text-tertiary)' : '#fff',
                  fontSize: 15, fontWeight: 600, cursor: 'pointer',
                  boxShadow: generating ? 'none' : '0 0 30px rgba(251,35,194,0.35)',
                }}
              >
                {generating ? 'Generating...' : 'Bring them to life ✦'}
              </motion.button>
            )}
          </motion.div>
        )}

        {appState === 'results' && (
          <motion.div key="results"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 24px', gap: 14, overflow: 'hidden' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: 1, overflowY: 'auto', minHeight: 0 }}>
              {ResultCards.map((idx, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22, delay: i * 0.1 }}
                >
                  <CharacterImageCard index={idx} onSelect={() => setSaveIdx(idx)}
                    style={{ borderRadius: 20, boxShadow: '0 0 24px rgba(251,35,194,0.1)' }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Orb-style chat input */}
            <div style={{
              display: 'flex', gap: 8, alignItems: 'center',
              background: 'var(--bg-card)', borderRadius: 28, padding: '10px 16px',
              border: '1px solid var(--border)',
              boxShadow: '0 0 20px rgba(251,35,194,0.06)',
            }}>
              <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && refine()}
                placeholder="Direct them further..."
                style={{ flex: 1, background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 13, outline: 'none' }}
              />
              <motion.button onClick={refine} whileHover={{ scale: 1.1 }} style={{
                width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-pink)',
                border: 'none', color: '#fff', cursor: 'pointer', fontSize: 13,
                boxShadow: '0 0 12px rgba(251,35,194,0.5)',
              }}>✦</motion.button>
            </div>

            <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-tertiary)', paddingBottom: 2 }}>
              ✦ All creations are saved to your generation history
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
