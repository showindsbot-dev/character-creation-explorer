import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CharacterImageCard } from '../components/CharacterImageCard'
import { SaveFlow } from '../components/SaveFlow'

type Mode = 'text' | 'image' | 'design'
type AppState = 'entry' | 'creation' | 'results'

const AESTHETICS = [
  { label: 'Cinematic', gradient: 'linear-gradient(135deg, #1a1a2e, #4a3050)' },
  { label: 'Ethereal', gradient: 'linear-gradient(135deg, #0d2040, #1a4a7a)' },
  { label: 'Urban', gradient: 'linear-gradient(135deg, #1a1a1a, #3a3a40)' },
  { label: 'Fantasy', gradient: 'linear-gradient(135deg, #1a0a2e, #4a2060)' },
]
const VIBES = ['Mysterious', 'Bold', 'Warm', 'Dark', 'Playful', 'Elegant']
const GRID = [0, 1, 2, 3, 'plus' as const, 4, 0, 1, 2]

export function V1CastingWall() {
  const [appState, setAppState] = useState<AppState>('entry')
  const [mode, setMode] = useState<Mode>('text')
  const [text, setText] = useState('')
  const [dStep, setDStep] = useState(0)
  const [selAesthetic, setSelAesthetic] = useState<number | null>(null)
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
    setExtraCards(p => [...p, (p.length + 2) % 5, (p.length + 3) % 5])
    setChatInput('')
  }

  const ResultCards = [...[0, 1, 2, 3], ...extraCards]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {saveIdx !== null && <SaveFlow characterIndex={saveIdx} onClose={() => setSaveIdx(null)} />}

      <AnimatePresence mode="wait">

        {appState === 'entry' && (
          <motion.div key="entry"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.96 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 28px', gap: 16, overflow: 'hidden' }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textAlign: 'center', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Character Studio — Casting Wall
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, flex: 1, minHeight: 0 }}>
              {GRID.map((item, i) =>
                item === 'plus' ? (
                  <motion.div key="plus" whileHover={{ scale: 1.04 }}
                    style={{
                      aspectRatio: '3/4', borderRadius: 12, cursor: 'pointer',
                      background: 'var(--bg-card)', border: '2px solid var(--accent-pink)',
                      animation: 'pulse-ring 2.5s ease infinite',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                    }}
                  >
                    <span style={{ fontSize: 26, color: 'var(--accent-pink)' }}>+</span>
                    <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>Your character</span>
                  </motion.div>
                ) : (
                  <div key={i} style={{ aspectRatio: '3/4', borderRadius: 12, overflow: 'hidden' }}>
                    <CharacterImageCard index={item as number} size="sm" style={{ height: '100%', width: '100%' }} />
                  </div>
                )
              )}
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {(['text', 'image', 'design'] as Mode[]).map((m, i) => (
                <button key={m}
                  onClick={() => { setMode(m); setAppState('creation') }}
                  style={{
                    height: 38, padding: '0 18px', borderRadius: 19, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                    background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)',
                  }}
                >
                  {['✍ From text', '📷 From image', '✨ Design step by step'][i]}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {appState === 'creation' && (
          <motion.div key="creation"
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 36px', gap: 16, overflowY: 'auto' }}
          >
            <button onClick={() => setAppState('entry')} style={{
              background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 13, alignSelf: 'flex-start',
            }}>← Back</button>

            <div style={{ display: 'flex', gap: 8 }}>
              {(['text', 'image', 'design'] as Mode[]).map(m => (
                <button key={m} onClick={() => setMode(m)} style={{
                  height: 30, padding: '0 14px', borderRadius: 15, fontSize: 12, cursor: 'pointer',
                  background: mode === m ? 'var(--accent-pink)' : 'var(--bg-elevated)',
                  border: mode === m ? 'none' : '1px solid var(--border)',
                  color: mode === m ? '#fff' : 'var(--text-secondary)',
                }}>
                  {m === 'text' ? 'From text' : m === 'image' ? 'From image' : 'Design'}
                </button>
              ))}
            </div>

            {mode === 'text' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                <textarea value={text} onChange={e => setText(e.target.value)}
                  placeholder="Describe your character… A mysterious detective in a neon-lit future city, sharp eyes that see through lies..."
                  style={{
                    flex: 1, minHeight: 140, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14,
                    color: 'var(--text-primary)', fontSize: 14, padding: '18px', outline: 'none', resize: 'none',
                    fontFamily: 'inherit', lineHeight: 1.6,
                  }}
                />
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Add reference images (optional)</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: 68, height: 68, borderRadius: 10, border: '2px dashed var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)', fontSize: 18, cursor: 'pointer',
                    }}>+</div>
                  ))}
                </div>
              </div>
            )}

            {mode === 'image' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{
                  flex: 1, minHeight: 180, border: '2px dashed var(--accent-pink)', borderRadius: 18,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer',
                }}>
                  <div style={{ fontSize: 36 }}>📷</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Drop an image or click to upload</div>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>PNG · JPG · WEBP</div>
                </div>
                <textarea placeholder="Optional notes..." rows={3} style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12,
                  color: 'var(--text-primary)', fontSize: 13, padding: '12px 14px', outline: 'none', resize: 'none', fontFamily: 'inherit',
                }} />
              </div>
            )}

            {mode === 'design' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['Aesthetic', 'Energy', 'Details'].map((s, i) => (
                    <div key={s} style={{
                      height: 3, flex: 1, borderRadius: 2,
                      background: i <= dStep ? 'var(--accent-pink)' : 'var(--border)', transition: 'background 0.3s',
                    }} />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {dStep === 0 && (
                    <motion.div key="d0" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}
                    >
                      <div style={{ fontSize: 17, fontWeight: 600 }}>Choose an aesthetic</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {AESTHETICS.map((a, i) => (
                          <button key={a.label} onClick={() => setSelAesthetic(i)} style={{
                            aspectRatio: '3/2', borderRadius: 12, background: a.gradient,
                            border: selAesthetic === i ? '2px solid var(--accent-pink)' : '2px solid transparent',
                            cursor: 'pointer', display: 'flex', alignItems: 'flex-end', padding: 10,
                            boxShadow: selAesthetic === i ? '0 0 18px rgba(251,35,194,0.3)' : 'none',
                          }}>
                            <span style={{ color: '#fff', fontSize: 12, fontWeight: 500 }}>{a.label}</span>
                          </button>
                        ))}
                      </div>
                      <button onClick={() => selAesthetic !== null && setDStep(1)} style={{
                        height: 42, borderRadius: 21, background: selAesthetic !== null ? 'var(--accent-pink)' : 'var(--bg-elevated)',
                        border: selAesthetic !== null ? 'none' : '1px solid var(--border)',
                        color: selAesthetic !== null ? '#fff' : 'var(--text-tertiary)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                      }}>Next →</button>
                    </motion.div>
                  )}

                  {dStep === 1 && (
                    <motion.div key="d1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}
                    >
                      <div style={{ fontSize: 17, fontWeight: 600 }}>
                        Pick their energy <span style={{ fontWeight: 400, fontSize: 13, color: 'var(--text-tertiary)' }}>— choose 2</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {VIBES.map(v => (
                          <button key={v}
                            onClick={() => setSelVibes(p => p.includes(v) ? p.filter(x => x !== v) : p.length < 2 ? [...p, v] : p)}
                            style={{
                              height: 38, padding: '0 18px', borderRadius: 19, fontSize: 13, cursor: 'pointer',
                              background: selVibes.includes(v) ? 'var(--accent-pink)' : 'var(--bg-card)',
                              border: selVibes.includes(v) ? 'none' : '1px solid var(--border)',
                              color: selVibes.includes(v) ? '#fff' : 'var(--text-secondary)',
                            }}>{v}</button>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
                        <button onClick={() => setDStep(0)} style={{
                          height: 42, padding: '0 18px', borderRadius: 21, background: 'var(--bg-elevated)',
                          border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer',
                        }}>←</button>
                        <button onClick={() => selVibes.length > 0 && setDStep(2)} style={{
                          height: 42, flex: 1, borderRadius: 21,
                          background: selVibes.length > 0 ? 'var(--accent-pink)' : 'var(--bg-elevated)',
                          border: selVibes.length > 0 ? 'none' : '1px solid var(--border)',
                          color: selVibes.length > 0 ? '#fff' : 'var(--text-tertiary)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                        }}>Next →</button>
                      </div>
                    </motion.div>
                  )}

                  {dStep === 2 && (
                    <motion.div key="d2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}
                    >
                      <div style={{ fontSize: 17, fontWeight: 600 }}>Details</div>
                      {[['GENDER', ['Feminine', 'Masculine', 'Androgynous']], ['AGE', ['Teen', 'Young adult', 'Adult', 'Elder']]].map(([label, opts]) => (
                        <div key={label as string}>
                          <div style={{ fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.08em', marginBottom: 8 }}>{label as string}</div>
                          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                            {(opts as string[]).map(o => (
                              <button key={o} style={{
                                height: 32, padding: '0 14px', borderRadius: 16, fontSize: 12, cursor: 'pointer',
                                background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)',
                              }}>{o}</button>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button onClick={generate} style={{
                        height: 44, borderRadius: 22, background: 'var(--accent-green)', border: 'none',
                        color: '#000', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 'auto',
                      }}>Generate my character ✦</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {mode !== 'design' && (
              <button onClick={generate} disabled={generating} style={{
                height: 46, borderRadius: 23,
                background: generating ? 'var(--bg-elevated)' : 'var(--accent-green)',
                border: 'none', color: generating ? 'var(--text-tertiary)' : '#000',
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
              }}>
                {generating ? 'Generating...' : 'Generate my character ✦'}
              </button>
            )}
          </motion.div>
        )}

        {appState === 'results' && (
          <motion.div key="results"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 22px', gap: 14, overflow: 'hidden' }}
          >
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
              flex: 1, overflowY: 'auto', minHeight: 0,
            }}>
              {ResultCards.map((idx, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <CharacterImageCard index={idx} onSelect={() => setSaveIdx(idx)} />
                </motion.div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setAppState('entry')} style={{
                height: 38, padding: '0 14px', borderRadius: 19, background: 'var(--bg-elevated)',
                border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 13,
              }}>← Back</button>
              <button style={{
                height: 38, padding: '0 14px', borderRadius: 19, background: 'var(--bg-elevated)',
                border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 13,
              }}>Generate more</button>
              <div style={{ flex: 1 }} />
            </div>

            <div style={{
              display: 'flex', gap: 8, alignItems: 'center',
              background: 'var(--bg-card)', borderRadius: 22, padding: '8px 14px',
              border: '1px solid var(--border)',
            }}>
              <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && refine()}
                placeholder="Refine your character..."
                style={{ flex: 1, background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 13, outline: 'none' }}
              />
              <button onClick={refine} style={{
                width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-pink)',
                border: 'none', color: '#fff', cursor: 'pointer', fontSize: 13,
              }}>↑</button>
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
