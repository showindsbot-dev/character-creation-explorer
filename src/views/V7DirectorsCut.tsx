import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CharacterImageCard, PORTRAITS } from '../components/CharacterImageCard'
import { SaveFlow } from '../components/SaveFlow'

type Mode = 'text' | 'image' | 'design'
type AppState = 'entry' | 'creation' | 'results'

const VIBES = ['Mysterious', 'Bold', 'Warm', 'Dark', 'Playful', 'Elegant']

function SprocketRow() {
  return (
    <div style={{ display: 'flex', gap: 0, height: 20, alignItems: 'center', padding: '0 10px', background: 'rgba(0,0,0,0.4)', justifyContent: 'space-around', flexShrink: 0 }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} style={{ width: 12, height: 10, borderRadius: 3, background: 'var(--bg-base)', border: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }} />
      ))}
    </div>
  )
}

function LetterIcon({ letter }: { letter: string }) {
  return (
    <div style={{ width: 28, height: 28, borderRadius: 6, flexShrink: 0, border: '1.5px solid rgba(251,35,194,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-pink)', fontWeight: 700, fontSize: 18 }}>{letter}</div>
  )
}

function SliderIcon() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
      <div style={{ width: 20, height: 2, background: 'var(--accent-pink)', borderRadius: 1 }} />
      <div style={{ width: 14, height: 2, background: 'var(--accent-pink)', borderRadius: 1 }} />
      <div style={{ width: 20, height: 2, background: 'var(--accent-pink)', borderRadius: 1 }} />
    </div>
  )
}

const TAKE_PORTRAITS = [PORTRAITS[0], PORTRAITS[1], PORTRAITS[2]]

function TakeCard({ num, iconEl, title, sub, portraitSrc, onSelect }: {
  num: string; iconEl: React.ReactNode; title: string; sub: string; portraitSrc: string; onSelect: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <motion.button
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{ y: isHovered ? -3 : 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      style={{ flex: 1, minWidth: 0, background: 'rgba(0,0,0,0.6)', border: isHovered ? '1px solid rgba(251,35,194,0.4)' : '1px solid var(--border)', borderRadius: 16, padding: '16px', cursor: 'pointer', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', overflow: 'hidden', height: 160, boxShadow: isHovered ? '0 12px 32px rgba(0,0,0,0.4)' : 'none' }}
    >
      <img src={portraitSrc} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: isHovered ? 0.42 : 0.32, transition: 'opacity 0.2s ease' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 100%)' }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 8, height: '100%', justifyContent: 'center' }}>
        <div style={{ fontSize: 10, color: 'var(--accent-pink)', letterSpacing: '0.12em', fontWeight: 600 }}>TAKE {num}</div>
        {iconEl}
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.4 }}>{sub}</div>
      </div>
      <div style={{ position: 'absolute', bottom: 12, right: 14, fontSize: 16, color: 'var(--accent-pink)', opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s ease', zIndex: 1 }}>→</div>
    </motion.button>
  )
}

export function V7DirectorsCut() {
  const [appState, setAppState] = useState<AppState>('entry')
  const [mode, setMode] = useState<Mode>('text')
  const [text, setText] = useState('')
  const [dStep, setDStep] = useState(0)
  const [selVibes, setSelVibes] = useState<string[]>([])
  const [generating, setGenerating] = useState(false)
  const [extraCards, setExtraCards] = useState<number[]>([])
  const [directorInput, setDirectorInput] = useState('')
  const [saveIdx, setSaveIdx] = useState<number | null>(null)
  const [activeCard, setActiveCard] = useState(0)
  const [selectedTakeIdx, setSelectedTakeIdx] = useState<number | null>(null)
  const [briefExpanded, setBriefExpanded] = useState(false)
  const [editBrief, setEditBrief] = useState('')
  const stripRef = useRef<HTMLDivElement>(null)

  const generate = () => {
    setGenerating(true)
    setEditBrief(text)
    setTimeout(() => { setGenerating(false); setAppState('results') }, 1400)
  }

  const shootMore = () => {
    if (ResultCards.length < 8) {
      setExtraCards(p => [...p, (p.length + 3) % 5])
    }
  }

  const ResultCards = [0, 1, 2, 3, ...extraCards]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {saveIdx !== null && <SaveFlow characterIndex={saveIdx} onClose={() => setSaveIdx(null)} />}

      <AnimatePresence mode="wait">

        {/* ── ENTRY ── */}
        {appState === 'entry' && (
          <motion.div key="entry"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            <SprocketRow />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 24px 20px', gap: 16, justifyContent: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.14em', textAlign: 'center', marginBottom: 4 }}>SCENE 01</div>
                <div style={{ fontSize: 26, fontWeight: 300, textAlign: 'center', letterSpacing: '0.04em', marginBottom: 20 }}>CAST YOUR CHARACTER</div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <TakeCard num="01" iconEl={<LetterIcon letter="T" />} title="Describe their look" sub="Write their appearance" portraitSrc={TAKE_PORTRAITS[0]} onSelect={() => { setMode('text'); setAppState('creation') }} />
                <TakeCard num="02" iconEl={<LetterIcon letter="I" />} title="Upload their photo" sub="Show who they are" portraitSrc={TAKE_PORTRAITS[1]} onSelect={() => { setMode('image'); setAppState('creation') }} />
                <TakeCard num="03" iconEl={<SliderIcon />} title="Build their style" sub="Choose their attributes" portraitSrc={TAKE_PORTRAITS[2]} onSelect={() => { setMode('design'); setAppState('creation') }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textAlign: 'center', marginTop: 8 }}>All character generations are saved. No pressure.</div>
            </div>
            <SprocketRow />
          </motion.div>
        )}

        {/* ── CREATION ── */}
        {appState === 'creation' && (
          <motion.div key="creation"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            <SprocketRow />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 28px', gap: 16, overflowY: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={() => setAppState('entry')} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 13 }}>← Back</button>
                <div style={{ fontSize: 11, color: 'var(--accent-pink)', letterSpacing: '0.12em', fontWeight: 600 }}>
                  {mode === 'text' ? 'TAKE 01 — DESCRIBE THEIR APPEARANCE' : mode === 'image' ? 'TAKE 02 — UPLOAD THEIR PHOTO' : 'TAKE 03 — BUILD THEIR STYLE'}
                </div>
              </div>

              {mode === 'text' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ fontSize: 10, color: 'var(--accent-pink)', letterSpacing: '0.12em', fontVariant: 'small-caps' }}>DESCRIBE THEIR APPEARANCE</div>
                  <textarea value={text} onChange={e => setText(e.target.value)}
                    placeholder="How they look, their features, their energy..."
                    style={{ flex: 1, minHeight: 140, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--text-primary)', fontSize: 14, padding: '16px', outline: 'none', resize: 'none', fontFamily: 'inherit', lineHeight: 1.7 }}
                  />
                  <div style={{ fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.12em' }}>REFERENCE IMAGES (OPTIONAL)</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{ width: 60, height: 60, borderRadius: 8, border: '2px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)', fontSize: 18, cursor: 'pointer' }}>+</div>
                    ))}
                  </div>
                </div>
              )}

              {mode === 'image' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.12em' }}>THEIR PHOTO</div>
                  <div style={{ flex: 1, minHeight: 200, border: '2px solid var(--border)', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', position: 'relative', overflow: 'hidden', padding: 8 }}>
                    <div style={{ position: 'absolute', inset: 8, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, pointerEvents: 'none' }} />
                    {([[-1,-1],[1,-1],[-1,1],[1,1]] as [number,number][]).map(([sx,sy], i) => (
                      <div key={i} style={{ position: 'absolute', ...(sy === -1 ? { top: 10 } : { bottom: 10 }), ...(sx === -1 ? { left: 10 } : { right: 10 }), width: 20, height: 20, borderTop: sy === -1 ? '2px solid var(--accent-pink)' : 'none', borderBottom: sy === 1 ? '2px solid var(--accent-pink)' : 'none', borderLeft: sx === -1 ? '2px solid var(--accent-pink)' : 'none', borderRight: sx === 1 ? '2px solid var(--accent-pink)' : 'none' }} />
                    ))}
                    <div style={{ fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.14em', position: 'absolute', top: 18 }}>REFERENCE FRAME</div>
                    <div style={{ fontSize: 28, color: 'var(--text-tertiary)', marginTop: 12 }}>↑</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Drop their photo here</div>
                  </div>
                  <textarea placeholder="Character notes (optional)..." rows={2} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 13, padding: '10px 12px', outline: 'none', resize: 'none', fontFamily: 'inherit' }} />
                </div>
              )}

              {mode === 'design' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[{ scene: '01', label: 'Aesthetic' }, { scene: '02', label: 'Energy' }, { scene: '03', label: 'Details' }].map((s, i) => (
                      <div key={s.label} style={{ flex: 1 }}>
                        <div style={{ fontSize: 9, color: i <= dStep ? 'var(--accent-pink)' : 'var(--text-tertiary)', letterSpacing: '0.1em', marginBottom: 4 }}>SCENE {s.scene} · {s.label}</div>
                        <div style={{ height: 2, borderRadius: 1, background: i <= dStep ? 'var(--accent-pink)' : 'var(--border)', transition: 'background 0.3s' }} />
                      </div>
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    {dStep === 0 && (
                      <motion.div key="fd0" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '0.06em' }}>SCENE 01 · AESTHETIC</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                          {[{ label: 'Cinematic', g: 'linear-gradient(135deg, #1a1a2e, #4a3050)' }, { label: 'Ethereal', g: 'linear-gradient(135deg, #0d2040, #1a4a7a)' }, { label: 'Urban', g: 'linear-gradient(135deg, #1c1c1c, #3a3a40)' }, { label: 'Fantasy', g: 'linear-gradient(135deg, #1a0a2e, #4a2060)' }].map(a => (
                            <button key={a.label} onClick={() => setDStep(1)} style={{ aspectRatio: '2/1', borderRadius: 10, background: a.g, border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'flex-end', padding: 8 }}>
                              <span style={{ color: '#fff', fontSize: 11, fontWeight: 500 }}>{a.label}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    {dStep === 1 && (
                      <motion.div key="fd1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '0.06em' }}>SCENE 02 · ENERGY</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {VIBES.map(v => (
                            <button key={v} onClick={() => setSelVibes(p => p.includes(v) ? p.filter(x => x !== v) : p.length < 2 ? [...p, v] : p)} style={{ height: 36, padding: '0 16px', borderRadius: 18, fontSize: 12, cursor: 'pointer', background: selVibes.includes(v) ? 'var(--accent-pink)' : 'var(--bg-card)', border: selVibes.includes(v) ? 'none' : '1px solid var(--border)', color: selVibes.includes(v) ? '#fff' : 'var(--text-secondary)' }}>{v}</button>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => setDStep(0)} style={{ height: 38, padding: '0 14px', borderRadius: 19, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 11, letterSpacing: '0.06em' }}>← CUT</button>
                          <button onClick={() => setDStep(2)} style={{ height: 38, flex: 1, borderRadius: 19, background: 'var(--accent-pink)', border: 'none', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em' }}>NEXT SCENE →</button>
                        </div>
                      </motion.div>
                    )}
                    {dStep === 2 && (
                      <motion.div key="fd2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '0.06em' }}>SCENE 03 · DETAILS</div>
                        {([['AGE', ['Teen', 'Young adult', 'Adult', 'Elder']], ['GENDER', ['Feminine', 'Masculine', 'Androgynous']]] as [string, string[]][]).map(([label, opts]) => (
                          <div key={label}>
                            <div style={{ fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.1em', marginBottom: 6 }}>{label}</div>
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                              {opts.map(o => (
                                <button key={o} style={{ height: 30, padding: '0 12px', borderRadius: 15, fontSize: 11, cursor: 'pointer', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>{o}</button>
                              ))}
                            </div>
                          </div>
                        ))}
                        <button onClick={generate} disabled={generating} style={{ height: 44, borderRadius: 22, background: generating ? 'var(--bg-elevated)' : 'var(--accent-pink)', border: 'none', color: generating ? 'var(--text-tertiary)' : '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em', marginTop: 'auto' }}>
                          {generating ? 'SHOOTING...' : 'ACTION — GENERATE ✦'}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {mode !== 'design' && (
                <button onClick={generate} disabled={generating} style={{ height: 46, borderRadius: 23, background: generating ? 'var(--bg-elevated)' : 'var(--accent-pink)', border: 'none', color: generating ? 'var(--text-tertiary)' : '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em', boxShadow: generating ? 'none' : '0 0 20px rgba(251,35,194,0.35)' }}>
                  {generating ? 'SHOOTING...' : 'Generate character ✦'}
                </button>
              )}
            </div>
            <SprocketRow />
          </motion.div>
        )}

        {/* ── RESULTS ── */}
        {appState === 'results' && (
          <motion.div key="results"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            <SprocketRow />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px 20px 10px', gap: 8, overflow: 'hidden' }}>

              {/* Header + Brief bar */}
              <div>
                <div style={{ fontSize: 11, color: 'var(--accent-pink)', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 4 }}>TAKE 04 — RESULTS</div>
                <AnimatePresence mode="wait">
                  {!briefExpanded ? (
                    <motion.div key="brief-collapsed"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onClick={() => setBriefExpanded(true)}
                      style={{ fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.08em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>BRIEF:</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                        {editBrief ? (editBrief.length > 50 ? editBrief.slice(0, 50) + '...' : editBrief) : 'Your appearance description'}
                      </span>
                      <span style={{ color: 'var(--accent-pink)', flexShrink: 0 }}>· ✎ EDIT</span>
                    </motion.div>
                  ) : (
                    <motion.div key="brief-expanded"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '8px 10px', display: 'flex', gap: 8, alignItems: 'flex-start' }}
                    >
                      <textarea value={editBrief} onChange={e => setEditBrief(e.target.value)} rows={2}
                        style={{ flex: 1, background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 11, outline: 'none', resize: 'none', fontFamily: 'inherit', letterSpacing: '0.06em' }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
                        <button onClick={() => setBriefExpanded(false)} style={{ height: 26, padding: '0 10px', borderRadius: 13, background: 'var(--accent-pink)', border: 'none', color: '#fff', fontSize: 10, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>UPDATE →</button>
                        <button onClick={() => setBriefExpanded(false)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: 10, cursor: 'pointer', textAlign: 'center' }}>CANCEL</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Film strip */}
              <div ref={stripRef} style={{ flex: 1, display: 'flex', gap: 10, overflowX: 'auto', alignItems: 'center', scrollSnapType: 'x mandatory', minHeight: 0, paddingBottom: 8, paddingTop: 4 }}>
                {ResultCards.map((idx, i) => (
                  <div key={i} style={{ flexShrink: 0, width: 240, scrollSnapAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: i === activeCard ? 1.1 : 0.92 }}
                      transition={{ delay: i * 0.07, type: 'spring', stiffness: 300, damping: 24 }}
                      onClick={() => setActiveCard(i)}
                      style={{ borderRadius: 8, overflow: 'hidden', borderBottom: i === activeCard ? '3px solid var(--accent-pink)' : '2px solid transparent', boxShadow: i === activeCard ? '0 0 24px rgba(251,35,194,0.3)' : 'none', transition: 'border-color 0.25s ease, box-shadow 0.25s ease' }}
                    >
                      <CharacterImageCard index={idx} onSelect={() => setSaveIdx(idx)}
                        style={{ height: '100%', width: '100%', aspectRatio: '3/4', borderRadius: 6 }}
                      />
                    </motion.div>
                    {/* USE THIS TAKE / SELECTED indicator */}
                    {i === activeCard && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ textAlign: 'center' }}
                      >
                        {selectedTakeIdx === i ? (
                          <span style={{ fontSize: 9, color: 'var(--accent-pink)', letterSpacing: '0.1em', fontWeight: 600 }}>✓ SELECTED</span>
                        ) : (
                          <button onClick={() => setSelectedTakeIdx(i)} style={{ background: 'none', border: 'none', color: 'var(--accent-pink)', fontSize: 9, letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'inherit' }}>USE THIS TAKE</button>
                        )}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              {/* Director input bar */}
              <AnimatePresence mode="wait">
                {selectedTakeIdx === null ? (
                  <motion.div key="bar-default"
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                    style={{ display: 'flex', gap: 8, alignItems: 'center', height: 52, background: 'rgba(20,18,24,0.8)', borderRadius: 26, padding: '0 8px 0 10px', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', flexShrink: 0 }}
                  >
                    <button onClick={shootMore} style={{ height: 36, padding: '0 14px', borderRadius: 18, border: '1px solid var(--accent-pink)', background: 'transparent', color: 'var(--accent-pink)', fontSize: 11, letterSpacing: '0.06em', cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap', fontFamily: 'inherit' }}>SHOOT MORE TAKES →</button>
                    <input value={directorInput} onChange={e => setDirectorInput(e.target.value)}
                      placeholder="Direct further..."
                      style={{ flex: 1, background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 13, outline: 'none' }}
                    />
                    <button style={{ height: 36, padding: '0 14px', borderRadius: 18, background: 'var(--accent-pink)', border: 'none', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em', flexShrink: 0, boxShadow: '0 0 10px rgba(251,35,194,0.3)' }}>DIRECT →</button>
                  </motion.div>
                ) : (
                  <motion.div key="bar-take-selected"
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                    style={{ display: 'flex', gap: 8, alignItems: 'center', height: 52, background: 'rgba(20,18,24,0.8)', borderRadius: 26, padding: '0 8px 0 8px', border: '1px solid rgba(251,35,194,0.25)', backdropFilter: 'blur(12px)', flexShrink: 0 }}
                  >
                    {/* Take thumbnail */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={PORTRAITS[ResultCards[selectedTakeIdx] % PORTRAITS.length]} alt="" style={{ width: 36, height: 46, borderRadius: 6, objectFit: 'cover', display: 'block' }} />
                      <div style={{ position: 'absolute', bottom: 2, left: 0, right: 0, textAlign: 'center', fontSize: 7, color: 'var(--accent-pink)', letterSpacing: '0.06em', fontWeight: 700 }}>TAKE 0{selectedTakeIdx + 1}</div>
                      <button onClick={() => setSelectedTakeIdx(null)} style={{ position: 'absolute', top: -5, right: -5, width: 14, height: 14, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'var(--text-secondary)', fontSize: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                    </div>
                    <input value={directorInput} onChange={e => setDirectorInput(e.target.value)}
                      placeholder="Direction for this take..."
                      style={{ flex: 1, background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 13, outline: 'none' }}
                    />
                    <button style={{ height: 36, padding: '0 14px', borderRadius: 18, background: 'var(--accent-pink)', border: 'none', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em', flexShrink: 0, boxShadow: '0 0 14px rgba(251,35,194,0.4)' }}>DIRECT →</button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
            <SprocketRow />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
