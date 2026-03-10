import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CharacterImageCard, PORTRAITS } from '../components/CharacterImageCard'
import { SaveFlow } from '../components/SaveFlow'

type Mode = 'text' | 'image' | 'design'
type AppState = 'entry' | 'modes' | 'creation' | 'results'

const VIBES = ['Mysterious', 'Bold', 'Warm', 'Dark', 'Playful']

const PARTICLES = [
  { left: '18%', top: '22%', delay: '0s', dur: '3.2s' },
  { left: '78%', top: '35%', delay: '1.1s', dur: '4s' },
  { left: '55%', top: '68%', delay: '0.5s', dur: '2.8s' },
  { left: '30%', top: '78%', delay: '1.7s', dur: '3.5s' },
  { left: '85%', top: '15%', delay: '0.8s', dur: '3.8s' },
  { left: '12%', top: '55%', delay: '2.2s', dur: '4.5s' },
]

function HumanSilhouette({ scale = 1 }: { scale?: number }) {
  const s = scale
  return (
    <motion.div
      animate={{ scale: [1, 1.015, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 120 * s, height: 200 * s }}
    >
      {/* Head */}
      <div style={{
        width: 52 * s, height: 52 * s, borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(180deg, rgba(251,35,194,0.18) 0%, rgba(100,0,75,0.10) 100%)',
        border: '1px solid rgba(251,35,194,0.12)',
      }} />
      {/* Neck */}
      <div style={{
        width: 14 * s, height: 16 * s, flexShrink: 0,
        background: 'linear-gradient(180deg, rgba(251,35,194,0.13) 0%, rgba(100,0,75,0.08) 100%)',
      }} />
      {/* Torso / shoulders */}
      <div style={{
        width: 110 * s, height: 100 * s, flexShrink: 0,
        borderRadius: '50% 50% 10% 10%',
        background: 'linear-gradient(180deg, rgba(251,35,194,0.15) 0%, rgba(100,0,75,0.08) 100%)',
        boxShadow: '0 0 40px rgba(251,35,194,0.12)',
        border: '1px solid rgba(251,35,194,0.08)',
      }} />
    </motion.div>
  )
}

export function V2Spotlight() {
  const [appState, setAppState] = useState<AppState>('entry')
  const [mode, setMode] = useState<Mode>('text')
  const [text, setText] = useState('')
  const [tags, setTags] = useState<string[]>([])
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
    setExtraCards(p => [...p, (p.length + 1) % 5])
    setChatInput('')
  }

  const handleTextChange = (v: string) => {
    setText(v)
    const words = v.trim().split(/\s+/).filter(Boolean)
    if (words.length >= 3 && tags.length === 0) setTags(['Mysterious', 'Female', 'Fantasy'])
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: '#0a090b' }}>
      {saveIdx !== null && <SaveFlow characterIndex={saveIdx} onClose={() => setSaveIdx(null)} />}

      {/* Background portrait atmosphere */}
      <img src={PORTRAITS[0]} alt="" style={{
        position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
        width: 200, height: 300, objectFit: 'cover',
        filter: 'blur(40px) saturate(0.3)', opacity: 0.12, pointerEvents: 'none', zIndex: 0,
      }} />
      <img src={PORTRAITS[1]} alt="" style={{
        position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
        width: 200, height: 300, objectFit: 'cover',
        filter: 'blur(40px) saturate(0.3)', opacity: 0.12, pointerEvents: 'none', zIndex: 0,
      }} />
      <img src={PORTRAITS[2]} alt="" style={{
        position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)',
        width: 200, height: 300, objectFit: 'cover',
        filter: 'blur(40px) saturate(0.3)', opacity: 0.12, pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Radial dark vignette overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.4) 100%)',
      }} />

      {/* Spotlight cone */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '50%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)',
        zIndex: 0,
      }} />

      {/* Particles */}
      {PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: p.left, top: p.top,
          width: 3, height: 3, borderRadius: '50%',
          background: 'var(--accent-pink-soft)', pointerEvents: 'none', zIndex: 0,
          opacity: 0.4,
          animation: `float-particle ${p.dur} ${p.delay} ease-in-out infinite`,
        }} />
      ))}

      <AnimatePresence mode="wait">

        {appState === 'entry' && (
          <motion.div key="entry"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'flex-start', paddingTop: '10%', paddingBottom: '18%',
              gap: 24, zIndex: 1, padding: '10% 48px 18%',
            }}
          >
            <HumanSilhouette />

            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 26, fontWeight: 300, letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
                Who will they be?
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => setAppState('modes')}
                style={{
                  background: 'var(--accent-pink)', color: '#fff', border: 'none',
                  borderRadius: 22, height: 44, padding: '0 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                  boxShadow: '0 0 30px rgba(251,35,194,0.4)',
                }}
              >Begin ✦</motion.button>
            </div>
          </motion.div>
        )}

        {appState === 'modes' && (
          <motion.div key="modes"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'flex-start', gap: 24, zIndex: 1, padding: '10% 48px 18%',
            }}
          >
            <HumanSilhouette scale={0.72} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 340 }}>
              {[
                { m: 'text' as Mode, label: 'Write their story' },
                { m: 'image' as Mode, label: 'Show me a photo' },
                { m: 'design' as Mode, label: 'Design from scratch' },
              ].map(({ m, label }, i) => (
                <motion.button key={m}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, borderColor: 'var(--accent-pink)' }}
                  onClick={() => { setMode(m); setAppState('creation') }}
                  style={{
                    height: 52, borderRadius: 26, fontSize: 14, fontWeight: 500, cursor: 'pointer',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-primary)', backdropFilter: 'blur(10px)',
                  }}
                >{label}</motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {appState === 'creation' && (
          <motion.div key="creation"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '28px 40px', gap: 16, zIndex: 1, overflowY: 'auto' }}
          >
            <button onClick={() => setAppState('modes')} style={{
              background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 13, alignSelf: 'flex-start',
            }}>← Back</button>

            {mode === 'text' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <textarea value={text} onChange={e => handleTextChange(e.target.value)}
                    placeholder="Describe them... their look, their world, their story..."
                    style={{
                      width: '100%', height: '100%', minHeight: 200, background: 'none', border: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.12)',
                      color: 'var(--text-primary)', fontSize: 16, padding: '0 0 16px', outline: 'none',
                      resize: 'none', fontFamily: 'inherit', lineHeight: 1.7,
                    }}
                  />
                  {tags.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}
                    >
                      {tags.map(t => (
                        <div key={t} style={{
                          height: 26, padding: '0 12px', borderRadius: 13, fontSize: 11,
                          background: 'rgba(251,35,194,0.15)', border: '1px solid rgba(251,35,194,0.3)',
                          color: 'var(--accent-pink-soft)', display: 'flex', alignItems: 'center',
                        }}>✦ {t}</div>
                      ))}
                    </motion.div>
                  )}
                </div>
                <button onClick={generate} disabled={generating} style={{
                  height: 46, borderRadius: 23, background: generating ? 'rgba(255,255,255,0.06)' : 'var(--accent-pink)',
                  border: 'none', color: generating ? 'var(--text-tertiary)' : '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  boxShadow: generating ? 'none' : '0 0 30px rgba(251,35,194,0.35)',
                }}>
                  {generating ? 'Generating...' : 'Bring them to life ✦'}
                </button>
              </div>
            )}

            {mode === 'image' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{
                  flex: 1, minHeight: 200, border: '1px solid rgba(251,35,194,0.4)', borderRadius: 20,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer',
                  background: 'rgba(251,35,194,0.03)',
                }}>
                  <div style={{ fontSize: 36 }}>📷</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Upload reference photo</div>
                  <div style={{
                    height: 26, padding: '0 14px', borderRadius: 13, fontSize: 11,
                    background: 'rgba(251,35,194,0.15)', border: '1px solid rgba(251,35,194,0.3)',
                    color: 'var(--accent-pink-soft)',
                  }}>This character will look like your photo</div>
                </div>
                <button onClick={generate} style={{
                  height: 46, borderRadius: 23, background: 'var(--accent-pink)', border: 'none',
                  color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}>Bring them to life ✦</button>
              </div>
            )}

            {mode === 'design' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['Look', 'Energy', 'Details'].map((s, i) => (
                    <div key={s} style={{
                      height: 3, flex: 1, borderRadius: 2,
                      background: i <= dStep ? 'var(--accent-pink)' : 'rgba(255,255,255,0.08)', transition: 'background 0.3s',
                    }} />
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  {dStep === 0 && (
                    <motion.div key="ds0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}
                    >
                      <div style={{ fontSize: 18, fontWeight: 300, letterSpacing: '0.03em' }}>What do they look like?</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {[
                          { label: 'Cinematic', g: 'linear-gradient(135deg, #1a1a2e, #4a3050)' },
                          { label: 'Ethereal', g: 'linear-gradient(135deg, #0d2040, #1a4a7a)' },
                          { label: 'Gritty', g: 'linear-gradient(135deg, #1a1a1a, #3a3a3a)' },
                          { label: 'Mythic', g: 'linear-gradient(135deg, #1a0a2e, #4a2060)' },
                        ].map(a => (
                          <button key={a.label} onClick={() => setDStep(1)} style={{
                            aspectRatio: '2/1', borderRadius: 12, background: a.g, border: '2px solid transparent',
                            cursor: 'pointer', display: 'flex', alignItems: 'flex-end', padding: 10,
                          }}>
                            <span style={{ color: '#fff', fontSize: 12, fontWeight: 500 }}>{a.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {dStep === 1 && (
                    <motion.div key="ds1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}
                    >
                      <div style={{ fontSize: 18, fontWeight: 300, letterSpacing: '0.03em' }}>What's their energy?</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {VIBES.map(v => (
                          <button key={v}
                            onClick={() => setSelVibes(p => p.includes(v) ? p.filter(x => x !== v) : p.length < 2 ? [...p, v] : p)}
                            style={{
                              height: 38, padding: '0 18px', borderRadius: 19, fontSize: 13, cursor: 'pointer',
                              background: selVibes.includes(v) ? 'var(--accent-pink)' : 'rgba(255,255,255,0.05)',
                              border: selVibes.includes(v) ? 'none' : '1px solid rgba(255,255,255,0.1)',
                              color: selVibes.includes(v) ? '#fff' : 'var(--text-secondary)',
                            }}>{v}</button>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => setDStep(0)} style={{ height: 40, padding: '0 16px', borderRadius: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', cursor: 'pointer' }}>←</button>
                        <button onClick={() => setDStep(2)} style={{ height: 40, flex: 1, borderRadius: 20, background: 'var(--accent-pink)', border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Next →</button>
                      </div>
                    </motion.div>
                  )}
                  {dStep === 2 && (
                    <motion.div key="ds2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}
                    >
                      <div style={{ fontSize: 18, fontWeight: 300 }}>Any specifics?</div>
                      {[['AGE', ['Teen', 'Young adult', 'Adult', 'Elder']]].map(([label, opts]) => (
                        <div key={label as string}>
                          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', marginBottom: 8 }}>{label as string}</div>
                          <div style={{ display: 'flex', gap: 7 }}>
                            {(opts as string[]).map(o => (
                              <button key={o} style={{ height: 32, padding: '0 14px', borderRadius: 16, fontSize: 12, cursor: 'pointer', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>{o}</button>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button onClick={generate} style={{
                        height: 44, borderRadius: 22, background: 'var(--accent-pink)', border: 'none',
                        color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 'auto',
                        boxShadow: '0 0 30px rgba(251,35,194,0.3)',
                      }}>Bring them to life ✦</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}

        {appState === 'results' && (
          <motion.div key="results"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 24px', gap: 14, overflow: 'hidden', zIndex: 1 }}
          >
            {/* Cinematic layout: 1 large + 2 stacked */}
            <div style={{ flex: 1, display: 'flex', gap: 10, minHeight: 0, overflow: 'hidden' }}>
              <motion.div style={{ flex: '0 0 55%' }}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 }}
              >
                <CharacterImageCard index={0} onSelect={() => setSaveIdx(0)}
                  style={{ height: '100%', width: '100%', aspectRatio: 'unset', borderRadius: 16 }}
                />
              </motion.div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[1, 2, ...extraCards].map((idx, i) => (
                  <motion.div key={i} style={{ flex: 1 }}
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12 + i * 0.08 }}
                  >
                    <CharacterImageCard index={idx} onSelect={() => setSaveIdx(idx)}
                      style={{ height: '100%', width: '100%', aspectRatio: 'unset', borderRadius: 12 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{
              display: 'flex', gap: 8, alignItems: 'center',
              background: 'rgba(255,255,255,0.04)', borderRadius: 24, padding: '8px 14px',
              border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
            }}>
              <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && refine()}
                placeholder="Direct them further..."
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
