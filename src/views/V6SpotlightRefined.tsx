import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CharacterImageCard, PORTRAITS } from '../components/CharacterImageCard'
import { SaveFlow } from '../components/SaveFlow'

type Mode = 'text' | 'image' | 'design'
type AppState = 'entry' | 'modes' | 'creation' | 'results'

const PARTICLES = [
  { left: '18%', top: '22%', delay: '0s', dur: '3.2s' },
  { left: '78%', top: '35%', delay: '1.1s', dur: '4s' },
  { left: '55%', top: '68%', delay: '0.5s', dur: '2.8s' },
  { left: '30%', top: '78%', delay: '1.7s', dur: '3.5s' },
  { left: '85%', top: '15%', delay: '0.8s', dur: '3.8s' },
  { left: '12%', top: '55%', delay: '2.2s', dur: '4.5s' },
]

function HumanSilhouette() {
  const gradient = 'linear-gradient(180deg, rgba(251,35,194,0.2) 0%, rgba(100,0,75,0.1) 100%)'
  return (
    <motion.div
      animate={{ scale: [1, 1.015, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 140, height: 220, flexShrink: 0 }}
    >
      <div style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0, background: gradient, border: '1px solid rgba(251,35,194,0.12)' }} />
      <div style={{ width: 12, height: 12, flexShrink: 0, background: gradient }} />
      <div style={{ width: 130, height: 90, flexShrink: 0, borderRadius: '65px 65px 20px 20px', background: gradient, boxShadow: '0 0 30px rgba(251,35,194,0.15)' }} />
      <div style={{ width: 60, height: 60, flexShrink: 0, borderRadius: 10, background: gradient, marginTop: 4 }} />
    </motion.div>
  )
}

export function V6SpotlightRefined() {
  const [appState, setAppState] = useState<AppState>('entry')
  const [mode, setMode] = useState<Mode>('text')
  const [text, setText] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [generating, setGenerating] = useState(false)
  const [saveIdx, setSaveIdx] = useState<number | null>(null)
  const [textFocused, setTextFocused] = useState(false)
  const [dStep, setDStep] = useState(0)

  // Result page state
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [refineText, setRefineText] = useState('')
  const [extraCards, setExtraCards] = useState<number[]>([])
  const [briefExpanded, setBriefExpanded] = useState(false)
  const [editInput, setEditInput] = useState('')

  const generate = () => {
    setGenerating(true)
    setEditInput(text)
    setTimeout(() => { setGenerating(false); setAppState('results') }, 1400)
  }

  const handleTextChange = (v: string) => {
    setText(v)
    const words = v.trim().split(/\s+/).filter(Boolean)
    if (words.length >= 3 && tags.length === 0) setTags(['Mysterious', 'Female', 'Fantasy'])
  }

  const allCards = [0, 1, 2, ...extraCards]

  const addMoreCards = () => {
    if (allCards.length < 6) {
      const next = allCards.length % PORTRAITS.length
      setExtraCards(p => [...p, next + 1])
    }
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: '#0a090b' }}>
      {saveIdx !== null && <SaveFlow characterIndex={saveIdx} onClose={() => setSaveIdx(null)} />}

      {/* Atmospheric backdrop */}
      <img src={PORTRAITS[0]} alt="" style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 200, height: 300, objectFit: 'cover', filter: 'blur(40px) saturate(0.3)', opacity: 0.18, pointerEvents: 'none', zIndex: 0 }} />
      <img src={PORTRAITS[1]} alt="" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: 200, height: 300, objectFit: 'cover', filter: 'blur(40px) saturate(0.3)', opacity: 0.18, pointerEvents: 'none', zIndex: 0 }} />
      <img src={PORTRAITS[2]} alt="" style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: 200, height: 300, objectFit: 'cover', filter: 'blur(40px) saturate(0.3)', opacity: 0.18, pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.4) 100%)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 400, height: 300, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(251,35,194,0.04) 0%, transparent 100%)' }} />

      {PARTICLES.map((p, i) => (
        <div key={i} style={{ position: 'absolute', left: p.left, top: p.top, width: 3, height: 3, borderRadius: '50%', background: 'var(--accent-pink-soft)', pointerEvents: 'none', zIndex: 0, opacity: 0.4, animation: `float-particle ${p.dur} ${p.delay} ease-in-out infinite` }} />
      ))}

      <AnimatePresence mode="wait">

        {/* ── ENTRY ── */}
        {appState === 'entry' && (
          <motion.div key="entry"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 24, zIndex: 1, padding: '8% 48px 14%' }}
          >
            <HumanSilhouette />
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 26, fontWeight: 300, letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
                Who do you want to bring to life?
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => setAppState('modes')}
                style={{ display: 'block', width: 180, height: 48, background: 'var(--accent-pink)', color: '#fff', border: 'none', borderRadius: 24, fontSize: 15, fontWeight: 600, cursor: 'pointer', margin: '0 auto', boxShadow: '0 0 20px rgba(251,35,194,0.4), 0 4px 16px rgba(0,0,0,0.3)' }}
              >Begin ✦</motion.button>
            </div>
          </motion.div>
        )}

        {/* ── MODES ── */}
        {appState === 'modes' && (
          <motion.div key="modes"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, zIndex: 1, padding: '10% 48px' }}
          >
            {[
              { m: 'text' as Mode, icon: '✍', label: 'Describe their look', sub: 'Tell me how they appear' },
              { m: 'image' as Mode, icon: '⬆', label: 'Upload their photo', sub: 'Show me who they are' },
              { m: 'design' as Mode, icon: '✦', label: 'Build their style', sub: 'Choose their attributes' },
            ].map(({ m, icon, label, sub }, i) => (
              <motion.button key={m}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ borderColor: 'rgba(251,35,194,0.4)', boxShadow: '0 0 16px rgba(251,35,194,0.12)' }}
                onClick={() => { setMode(m); setAppState('creation') }}
                style={{ width: 280, borderRadius: 26, fontSize: 14, fontWeight: 500, cursor: 'pointer', background: 'rgba(30,28,32,0.8)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-primary)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', flexShrink: 0 }}
              >
                <span style={{ width: 20, textAlign: 'center', color: 'var(--accent-pink-soft)', fontSize: 16, flexShrink: 0 }}>{icon}</span>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{sub}</div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* ── CREATION ── */}
        {appState === 'creation' && (
          <motion.div key="creation"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '28px 40px', gap: 16, zIndex: 1, overflowY: 'auto' }}
          >
            <button onClick={() => setAppState('modes')} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 13, alignSelf: 'flex-start' }}>← Back</button>

            {mode === 'text' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600, width: '100%', alignSelf: 'center' }}>
                <textarea
                  value={text}
                  onChange={e => handleTextChange(e.target.value)}
                  onFocus={() => setTextFocused(true)}
                  onBlur={() => setTextFocused(false)}
                  placeholder="How do they look? Describe their appearance..."
                  style={{ width: '100%', minHeight: 120, background: 'none', border: 'none', borderBottom: textFocused ? '2px solid var(--accent-pink)' : '2px solid rgba(255,255,255,0.08)', color: 'var(--text-primary)', fontSize: 20, fontWeight: 300, padding: '0 0 16px', outline: 'none', resize: 'none', fontFamily: 'inherit', lineHeight: 1.7, boxShadow: textFocused ? '0 2px 16px rgba(251,35,194,0.15)' : 'none', transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box' }}
                />
                {tags.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}
                  >
                    {tags.map(t => (
                      <div key={t} style={{ height: 26, padding: '0 12px', borderRadius: 13, fontSize: 11, background: 'rgba(251,35,194,0.15)', border: '1px solid rgba(251,35,194,0.3)', color: 'var(--accent-pink-soft)', display: 'flex', alignItems: 'center' }}>✦ {t}</div>
                    ))}
                  </motion.div>
                )}
                <button style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 12, alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 15 }}>+</span> Add reference images
                </button>
                <button onClick={generate} disabled={generating} style={{ width: 220, height: 46, borderRadius: 23, background: generating ? 'rgba(255,255,255,0.06)' : 'var(--accent-pink)', border: 'none', color: generating ? 'var(--text-tertiary)' : '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', margin: '8px auto 0', display: 'block', boxShadow: generating ? 'none' : '0 0 20px rgba(251,35,194,0.35)' }}>
                  {generating ? 'Generating...' : 'Generate ✦'}
                </button>
              </div>
            )}

            {mode === 'image' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
                <div style={{ width: '100%', maxWidth: 400, height: 260, border: '2px dashed rgba(251,35,194,0.4)', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', background: 'rgba(251,35,194,0.03)', flexShrink: 0 }}>
                  <div style={{ fontSize: 32, color: 'var(--text-secondary)', lineHeight: 1 }}>↑</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 16, fontWeight: 500 }}>Upload their photo</div>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: 13 }}>or browse files</div>
                </div>
                <textarea placeholder="Any notes? (optional)" rows={1} style={{ width: '100%', maxWidth: 400, background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', fontSize: 14, padding: '8px 0', outline: 'none', resize: 'none', fontFamily: 'inherit' }} />
                <button onClick={generate} style={{ width: 220, height: 46, borderRadius: 23, background: 'var(--accent-pink)', border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 0 20px rgba(251,35,194,0.35)' }}>Generate ✦</button>
              </div>
            )}

            {mode === 'design' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600, width: '100%', alignSelf: 'center' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['Look', 'Energy', 'Details'].map((s, i) => (
                    <div key={s} style={{ height: 3, flex: 1, borderRadius: 2, background: i <= dStep ? 'var(--accent-pink)' : 'rgba(255,255,255,0.08)', transition: 'background 0.3s' }} />
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  {dStep === 0 && (
                    <motion.div key="ds0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <div style={{ fontSize: 18, fontWeight: 300 }}>What do they look like?</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {[{ label: 'Cinematic', g: 'linear-gradient(135deg, #1a1a2e, #4a3050)' }, { label: 'Ethereal', g: 'linear-gradient(135deg, #0d2040, #1a4a7a)' }, { label: 'Gritty', g: 'linear-gradient(135deg, #1a1a1a, #3a3a3a)' }, { label: 'Mythic', g: 'linear-gradient(135deg, #1a0a2e, #4a2060)' }].map(a => (
                          <button key={a.label} onClick={() => setDStep(1)} style={{ aspectRatio: '2/1', borderRadius: 12, background: a.g, border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'flex-end', padding: 10 }}>
                            <span style={{ color: '#fff', fontSize: 12, fontWeight: 500 }}>{a.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {dStep === 1 && (
                    <motion.div key="ds1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <div style={{ fontSize: 18, fontWeight: 300 }}>What's their energy?</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {['Dark & Gritty', 'Hopeful', 'Ethereal', 'Dangerous', 'Wise'].map(v => (
                          <button key={v} onClick={() => setDStep(2)} style={{ height: 38, padding: '0 18px', borderRadius: 19, fontSize: 13, cursor: 'pointer', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>{v}</button>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => setDStep(0)} style={{ height: 40, padding: '0 16px', borderRadius: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', cursor: 'pointer' }}>←</button>
                        <button onClick={() => setDStep(2)} style={{ height: 40, flex: 1, borderRadius: 20, background: 'var(--accent-pink)', border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Next →</button>
                      </div>
                    </motion.div>
                  )}
                  {dStep === 2 && (
                    <motion.div key="ds2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <div style={{ fontSize: 18, fontWeight: 300 }}>Any specifics?</div>
                      <div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', marginBottom: 8 }}>AGE</div>
                        <div style={{ display: 'flex', gap: 7 }}>
                          {['Teen', 'Young adult', 'Adult', 'Elder'].map(o => (
                            <button key={o} style={{ height: 32, padding: '0 14px', borderRadius: 16, fontSize: 12, cursor: 'pointer', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>{o}</button>
                          ))}
                        </div>
                      </div>
                      <button onClick={generate} style={{ width: 220, height: 44, borderRadius: 22, background: 'var(--accent-pink)', border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', margin: 'auto auto 0', display: 'block', boxShadow: '0 0 20px rgba(251,35,194,0.35)' }}>Generate ✦</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}

        {/* ── RESULTS ── */}
        {appState === 'results' && (
          <motion.div key="results"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px', gap: 10, overflow: 'hidden', zIndex: 1 }}
          >
            {/* Zone 1: Input Context Bar */}
            <div>
              <AnimatePresence mode="wait">
                {!briefExpanded ? (
                  <motion.div key="collapsed"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setBriefExpanded(true)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '7px 16px', fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer', maxWidth: '100%' }}
                  >
                    <span>📝</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 260 }}>
                      {editInput ? (editInput.length > 45 ? editInput.slice(0, 45) + '...' : editInput) : 'Your appearance description'}
                    </span>
                    <span style={{ color: 'var(--accent-pink-soft)', flexShrink: 0 }}>· ✎ Edit</span>
                  </motion.div>
                ) : (
                  <motion.div key="expanded"
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}
                  >
                    <textarea
                      value={editInput}
                      onChange={e => setEditInput(e.target.value)}
                      rows={2}
                      style={{ background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', fontSize: 13, outline: 'none', resize: 'none', fontFamily: 'inherit', lineHeight: 1.6, width: '100%', padding: '0 0 8px' }}
                    />
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <button onClick={() => { setText(editInput); setBriefExpanded(false); generate() }} style={{ height: 34, padding: '0 16px', borderRadius: 17, background: 'var(--accent-pink)', border: 'none', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Update →</button>
                      <button onClick={() => setBriefExpanded(false)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: 12, cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Zone 2: Image grid */}
            <div style={{ flex: 1, display: 'flex', gap: 10, minHeight: 0, overflow: 'hidden' }}>
              {/* Hero — 55% */}
              <motion.div
                style={{ flex: '0 0 55%', position: 'relative', cursor: 'pointer' }}
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.05, type: 'spring', stiffness: 280, damping: 24 }}
                onClick={() => setSelectedIdx(selectedIdx === 0 ? null : 0)}
              >
                <div style={{ height: '100%', borderRadius: 16, overflow: 'hidden', outline: selectedIdx === 0 ? '2.5px solid var(--accent-pink)' : 'none', outlineOffset: 3, transition: 'outline 0.15s' }}>
                  <CharacterImageCard index={0} style={{ height: '100%', width: '100%', aspectRatio: 'unset', borderRadius: 16 }} />
                </div>
                {selectedIdx === 0 && <Checkmark />}
              </motion.div>

              {/* Right column */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[1, 2, ...extraCards].slice(0, 4).map((idx, i) => (
                  <motion.div key={i}
                    style={{ flex: 1, position: 'relative', cursor: 'pointer' }}
                    initial={{ opacity: 0, scale: 0.92, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, type: 'spring', stiffness: 280, damping: 24 }}
                    onClick={() => setSelectedIdx(selectedIdx === idx ? null : idx)}
                  >
                    <div style={{ height: '100%', borderRadius: 12, overflow: 'hidden', outline: selectedIdx === idx ? '2.5px solid var(--accent-pink)' : 'none', outlineOffset: 3, transition: 'outline 0.15s' }}>
                      <CharacterImageCard index={idx} style={{ height: '100%', width: '100%', aspectRatio: 'unset', borderRadius: 12 }} />
                    </div>
                    {selectedIdx === idx && <Checkmark />}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Zone 3: Action bar */}
            <AnimatePresence mode="wait">
              {selectedIdx === null ? (
                <motion.div key="no-selection"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                >
                  <button onClick={addMoreCards} disabled={allCards.length >= 6} style={{ width: '100%', height: 46, borderRadius: 23, background: allCards.length >= 6 ? 'rgba(255,255,255,0.06)' : 'var(--accent-pink)', border: 'none', color: allCards.length >= 6 ? 'var(--text-tertiary)' : '#fff', fontSize: 14, fontWeight: 600, cursor: allCards.length >= 6 ? 'default' : 'pointer', boxShadow: allCards.length >= 6 ? 'none' : '0 0 16px rgba(251,35,194,0.3)' }}>
                    {allCards.length >= 6 ? '6 variations shown' : 'Generate 4 more →'}
                  </button>
                  <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-tertiary)', marginTop: 5 }}>Using your original description</div>
                </motion.div>
              ) : (
                <motion.div key="with-selection"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                >
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: 28, padding: '7px 7px 7px 10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {/* Selected image thumbnail */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={PORTRAITS[selectedIdx % PORTRAITS.length]} alt="" style={{ width: 40, height: 52, borderRadius: 8, objectFit: 'cover', display: 'block' }} />
                      <button onClick={() => setSelectedIdx(null)} style={{ position: 'absolute', top: -5, right: -5, width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'var(--text-secondary)', fontSize: 9, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>×</button>
                    </div>
                    <input value={refineText} onChange={e => setRefineText(e.target.value)} placeholder="Refine this character..." style={{ flex: 1, background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 13, outline: 'none' }} />
                    <button style={{ height: 38, padding: '0 18px', borderRadius: 19, background: 'var(--accent-pink)', border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0, boxShadow: '0 0 12px rgba(251,35,194,0.35)', whiteSpace: 'nowrap' }}>Refine this →</button>
                  </div>
                  <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-tertiary)', marginTop: 5 }}>This image will be used as your reference</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}

function Checkmark() {
  return (
    <div style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', background: 'var(--accent-pink)', color: '#fff', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '0 2px 8px rgba(251,35,194,0.5)' }}>✓</div>
  )
}
