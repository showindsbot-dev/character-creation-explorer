import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ModalWrapper from '../components/ModalWrapper'
import GenerateButton from '../components/GenerateButton'
import ResultCard from '../components/ResultCard'

interface Props { onClose: () => void }

const steps = ['Style', 'Vibe', 'Build', 'Preview']

const styles = [
  { id: 'photorealistic', label: 'Photorealistic', gradient: 'linear-gradient(135deg, #3b2a1a 0%, #5c3d28 50%, #2a2018 100%)', icon: '📸' },
  { id: 'anime', label: 'Anime / Illustrated', gradient: 'linear-gradient(135deg, #1a1a3c 0%, #2d1a4a 50%, #3c1a2d 100%)', icon: '🌸' },
  { id: 'darkfantasy', label: 'Dark Fantasy', gradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2d 50%, #0d0a12 100%)', icon: '🌑' },
  { id: 'scifi', label: 'Futuristic / Sci-Fi', gradient: 'linear-gradient(135deg, #0a1a2d 0%, #0d2a1a 50%, #1a0d2d 100%)', icon: '⚡' },
]

const vibes = [
  { id: 'confident', label: 'Confident & Bold', color: '#fb23c2' },
  { id: 'mysterious', label: 'Mysterious & Cool', color: '#6e56cf' },
  { id: 'warm', label: 'Warm & Friendly', color: '#ffc53d' },
  { id: 'fierce', label: 'Fierce & Intense', color: '#e54d2e' },
  { id: 'innocent', label: 'Innocent & Pure', color: '#86ead4' },
  { id: 'playful', label: 'Playful & Chaotic', color: '#16d866' },
]

const genders = ['Feminine', 'Masculine', 'Androgynous']
const ages = ['Teen', '20s–30s', 'Mature', 'Elder']

export default function TemplateFlowModal({ onClose }: Props) {
  const [step, setStep] = useState(0)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [selectedVibes, setSelectedVibes] = useState<string[]>([])
  const [selectedGender, setSelectedGender] = useState<string | null>(null)
  const [selectedAge, setSelectedAge] = useState<string | null>(null)
  const [feature, setFeature] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(false)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)

  const toggleVibe = (id: string) => {
    setSelectedVibes(v => v.includes(id) ? v.filter(x => x !== id) : v.length < 2 ? [...v, id] : v)
  }

  const handleGenerate = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setResults(true) }, 1600)
  }

  const canNext = [
    !!selectedStyle,
    selectedVibes.length > 0,
    !!selectedGender && !!selectedAge,
    true,
  ][step]

  const styleObj = styles.find(s => s.id === selectedStyle)
  const vibeObjs = vibes.filter(v => selectedVibes.includes(v.id))

  if (results) {
    return (
      <ModalWrapper onClose={onClose}>
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <div style={{ flex: '0 0 60%', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              {styleObj && <span style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 20, padding: '3px 12px', fontSize: 12, color: 'var(--text-secondary)' }}>{styleObj.icon} {styleObj.label}</span>}
              {vibeObjs.map(v => <span key={v.id} style={{ background: 'var(--bg-elevated)', border: `1px solid ${v.color}44`, borderRadius: 20, padding: '3px 12px', fontSize: 12, color: v.color }}>{v.label}</span>)}
            </div>
            <div style={{ flex: 1, padding: 20, overflow: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[0, 1, 2, 3].map(i => <ResultCard key={i} index={i} selected={selectedCard === i} onSelect={() => setSelectedCard(i)} />)}
              </div>
            </div>
          </div>
          <div style={{ flex: 1, padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600 }}>Your selections</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px' }}>
                <p style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Style</p>
                <p style={{ fontSize: 14, color: 'var(--text-primary)' }}>{styleObj?.icon} {styleObj?.label}</p>
              </div>
              <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px' }}>
                <p style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Vibe</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {vibeObjs.map(v => <span key={v.id} style={{ fontSize: 13, color: v.color }}>{v.label}</span>)}
                </div>
              </div>
              <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px' }}>
                <p style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Build</p>
                <p style={{ fontSize: 13, color: 'var(--text-primary)' }}>{selectedGender} · {selectedAge}</p>
              </div>
            </div>
            <button onClick={() => { setResults(false); setStep(0) }} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 13, textAlign: 'left', fontFamily: 'inherit', padding: 0 }}>
              ← Go back and change
            </button>
            <div style={{ marginTop: 'auto' }}>
              <GenerateButton onClick={handleGenerate} loading={loading} label="Regenerate" fullWidth />
            </div>
          </div>
        </div>
      </ModalWrapper>
    )
  }

  return (
    <ModalWrapper onClose={onClose}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Step indicator */}
        <div style={{ padding: '20px 32px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
              <button
                onClick={() => i < step && setStep(i)}
                style={{
                  border: 'none', cursor: i < step ? 'pointer' : 'default',
                  padding: '4px 12px', borderRadius: 20, fontFamily: 'inherit',
                  fontSize: 13, fontWeight: i === step ? 600 : 400,
                  color: i === step ? 'var(--accent-pink)' : i < step ? 'var(--text-secondary)' : 'var(--text-tertiary)',
                  background: i === step ? 'rgba(251,35,194,0.1)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {s}
              </button>
              {i < steps.length - 1 && <span style={{ color: 'var(--border-hover)', margin: '0 4px', fontSize: 12 }}>→</span>}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '32px 40px' }}>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>What's their aesthetic?</h2>
                <p style={{ color: 'var(--text-tertiary)', marginBottom: 28, fontSize: 14 }}>Choose the visual style that feels right</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, maxWidth: 900 }}>
                  {styles.map(s => (
                    <motion.div
                      key={s.id} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedStyle(s.id)}
                      style={{
                        height: 240, borderRadius: 16, cursor: 'pointer', overflow: 'hidden',
                        background: s.gradient, position: 'relative',
                        border: selectedStyle === s.id ? '2px solid var(--accent-pink)' : '1px solid var(--border)',
                        boxShadow: selectedStyle === s.id ? '0 0 20px rgba(251,35,194,0.25)' : 'none',
                        transition: 'border 0.2s, box-shadow 0.2s',
                      }}
                    >
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', fontSize: 40, opacity: 0.5 }}>{s.icon}</div>
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}>
                        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{s.label}</p>
                      </div>
                      {selectedStyle === s.id && (
                        <div style={{ position: 'absolute', top: 12, right: 12, width: 24, height: 24, background: 'var(--accent-pink)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#fff' }}>✓</div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>What's their energy?</h2>
                <p style={{ color: 'var(--text-tertiary)', marginBottom: 28, fontSize: 14 }}>Pick up to 2 vibes</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, maxWidth: 700 }}>
                  {vibes.map(v => {
                    const sel = selectedVibes.includes(v.id)
                    return (
                      <motion.button
                        key={v.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        onClick={() => toggleVibe(v.id)}
                        style={{
                          padding: '18px 20px', borderRadius: 12, cursor: 'pointer',
                          background: sel ? `${v.color}22` : 'var(--bg-elevated)',
                          border: sel ? `2px solid ${v.color}` : '1px solid var(--border)',
                          color: sel ? v.color : 'var(--text-secondary)',
                          fontSize: 14, fontWeight: sel ? 600 : 400,
                          textAlign: 'left', fontFamily: 'inherit',
                          transition: 'all 0.2s',
                        }}
                      >
                        {v.label}
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>A few quick details</h2>
                <p style={{ color: 'var(--text-tertiary)', marginBottom: 32, fontSize: 14 }}>Final touches before we generate</p>

                <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 280 }}>
                    <div style={{ marginBottom: 28 }}>
                      <p style={{ fontSize: 12, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Gender expression</p>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {genders.map(g => (
                          <button key={g} onClick={() => setSelectedGender(g)} style={{
                            padding: '10px 20px', borderRadius: 20, cursor: 'pointer', fontFamily: 'inherit',
                            background: selectedGender === g ? 'rgba(251,35,194,0.15)' : 'var(--bg-elevated)',
                            border: selectedGender === g ? '2px solid var(--accent-pink)' : '1px solid var(--border)',
                            color: selectedGender === g ? 'var(--accent-pink-soft)' : 'var(--text-secondary)',
                            fontSize: 13, fontWeight: selectedGender === g ? 600 : 400, transition: 'all 0.2s',
                          }}>{g}</button>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginBottom: 28 }}>
                      <p style={{ fontSize: 12, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Age range</p>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {ages.map(a => (
                          <button key={a} onClick={() => setSelectedAge(a)} style={{
                            padding: '10px 20px', borderRadius: 20, cursor: 'pointer', fontFamily: 'inherit',
                            background: selectedAge === a ? 'rgba(251,35,194,0.15)' : 'var(--bg-elevated)',
                            border: selectedAge === a ? '2px solid var(--accent-pink)' : '1px solid var(--border)',
                            color: selectedAge === a ? 'var(--accent-pink-soft)' : 'var(--text-secondary)',
                            fontSize: 13, fontWeight: selectedAge === a ? 600 : 400, transition: 'all 0.2s',
                          }}>{a}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p style={{ fontSize: 12, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Any specific features? <span style={{ color: 'var(--bg-hover)', fontStyle: 'normal' }}>(optional)</span></p>
                      <input value={feature} onChange={e => setFeature(e.target.value)} placeholder="e.g. scar on left cheek, green eyes..." style={{ width: '100%', maxWidth: 360, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-primary)', fontSize: 13, padding: '10px 14px', fontFamily: 'inherit', outline: 'none' }} onFocus={e => e.target.style.borderColor = 'rgba(251,35,194,0.4)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                    </div>
                  </div>

                  {/* Summary side */}
                  <div style={{ flex: '0 0 220px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 16, padding: 20, height: 'fit-content' }}>
                    <p style={{ fontSize: 12, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>So far</p>
                    {styleObj && <div style={{ marginBottom: 10 }}><span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>STYLE</span><p style={{ fontSize: 13, color: 'var(--text-primary)', marginTop: 2 }}>{styleObj.icon} {styleObj.label}</p></div>}
                    {vibeObjs.length > 0 && <div><span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>VIBE</span>{vibeObjs.map(v => <p key={v.id} style={{ fontSize: 13, color: v.color, marginTop: 2 }}>{v.label}</p>)}</div>}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Ready to generate</h2>
                <p style={{ color: 'var(--text-tertiary)', marginBottom: 32, fontSize: 14 }}>Here's what we'll create</p>
                <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 16, padding: 28, maxWidth: 500 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {[
                      { label: 'Style', value: `${styleObj?.icon} ${styleObj?.label}`, color: 'var(--text-primary)' },
                      { label: 'Vibe', value: vibeObjs.map(v => v.label).join(' + ') || '—', color: vibeObjs[0]?.color || 'var(--text-primary)' },
                      { label: 'Gender', value: selectedGender || '—', color: 'var(--text-primary)' },
                      { label: 'Age', value: selectedAge || '—', color: 'var(--text-primary)' },
                      ...(feature ? [{ label: 'Feature', value: feature, color: 'var(--text-secondary)' }] : []),
                    ].map(item => (
                      <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                        <span style={{ fontSize: 12, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</span>
                        <span style={{ fontSize: 14, color: item.color, fontWeight: 500 }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 24 }}>
                    <GenerateButton onClick={handleGenerate} loading={loading} label="Generate Character" fullWidth />
                    <button onClick={() => setStep(0)} style={{ width: '100%', marginTop: 12, background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', padding: '8px 0' }}>
                      ← Change selections
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer nav */}
        {step < 3 && (
          <div style={{ padding: '16px 40px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
            <motion.button
              whileHover={{ scale: canNext ? 1.02 : 1 }}
              whileTap={{ scale: canNext ? 0.98 : 1 }}
              onClick={() => canNext && setStep(s => s + 1)}
              style={{
                padding: '12px 28px', borderRadius: 10, fontFamily: 'inherit',
                background: canNext ? 'var(--accent-pink)' : 'var(--bg-elevated)',
                border: 'none', color: canNext ? '#fff' : 'var(--text-tertiary)',
                fontSize: 14, fontWeight: 600, cursor: canNext ? 'pointer' : 'not-allowed',
                boxShadow: canNext ? '0 0 16px rgba(251,35,194,0.3)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              Next →
            </motion.button>
          </div>
        )}
      </div>
    </ModalWrapper>
  )
}
