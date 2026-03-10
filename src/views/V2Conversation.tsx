import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

type ConvStep = 0 | 1 | 2 | 3 | 4

const charTypes = ['Human', 'Creature', 'Fantasy', 'Sci-Fi']
const vibes = ['Dark & Gritty', 'Hopeful', 'Ethereal', 'Dangerous', 'Wise']

const resultGradients = [
  'linear-gradient(160deg, #2b1a3c 0%, #1a192b 55%, #0d1220 100%)',
  'linear-gradient(160deg, #1a2b1e 0%, #0d1e1a 55%, #12141a 100%)',
]

const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1]

const msgIn = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38, ease: easeCurve },
}

export default function V2Conversation() {
  const [step, setStep] = useState<ConvStep>(0)
  const [selectedType, setSelectedType] = useState<string>('')
  const [userInput, setUserInput] = useState('')
  const [selectedVibe, setSelectedVibe] = useState<string>('')
  const [refineText, setRefineText] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [step])

  const handleTypeSelect = (type: string) => {
    setSelectedType(type)
    setStep(1)
  }

  const handleTextSubmit = () => {
    const words = userInput.trim().split(/\s+/)
    if (words.length < 3) return
    setSelectedType(userInput.trim())
    setStep(1)
    setUserInput('')
  }

  const handleVibeSelect = (vibe: string) => {
    setSelectedVibe(vibe)
    setStep(2)
    setTimeout(() => setStep(3), 1200)
    setTimeout(() => setStep(4), 2800)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'calc(100vh - 52px)',
        position: 'relative',
        overflow: 'hidden',
        padding: '44px 24px 56px',
      }}
    >
      {/* Ambient */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(251,35,194,0.06) 0%, transparent 70%)',
      }} />

      {/* Conversation thread */}
      <div
        ref={scrollRef}
        style={{
          width: '100%',
          maxWidth: 640,
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          position: 'relative',
          zIndex: 1,
          paddingBottom: 8,
        }}
      >
        {/* ── Step 0: Initial AI message ── */}
        <motion.div {...msgIn}>
          <AIBubble>
            <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16, color: 'var(--text-primary)' }}>
              What kind of character are you making?{' '}
              <span style={{ color: 'var(--text-secondary)' }}>
                Pick one to start, or just start typing below.
              </span>
            </p>

            {/* Type chips */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
              {charTypes.map((type) => (
                <motion.button
                  key={type}
                  onClick={() => step === 0 && handleTypeSelect(type)}
                  whileHover={step === 0 ? { scale: 1.04 } : {}}
                  whileTap={step === 0 ? { scale: 0.97 } : {}}
                  style={{
                    padding: '10px 22px',
                    borderRadius: 12,
                    border: selectedType === type
                      ? '1px solid rgba(251,35,194,0.45)'
                      : '1px solid rgba(255,255,255,0.09)',
                    background: selectedType === type
                      ? 'rgba(251,35,194,0.14)'
                      : 'rgba(255,255,255,0.04)',
                    color: selectedType === type ? 'var(--accent-pink-soft)' : 'var(--text-secondary)',
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: 'inherit',
                    cursor: step === 0 ? 'pointer' : 'default',
                    transition: 'all 0.18s',
                  }}
                >
                  {type}
                </motion.button>
              ))}
            </div>

            {/* Free text input — only show on step 0 */}
            {step === 0 && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') { e.preventDefault(); handleTextSubmit() }
                  }}
                  placeholder="…or just describe them"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--border)',
                    padding: '8px 0',
                    fontSize: 14,
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                />
                {userInput.trim().split(/\s+/).length >= 3 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleTextSubmit}
                    style={{
                      width: 32, height: 32,
                      borderRadius: 8,
                      border: 'none',
                      background: 'var(--accent-pink)',
                      color: '#fff',
                      fontSize: 14,
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 2px 12px rgba(251,35,194,0.35)',
                    }}
                  >
                    →
                  </motion.button>
                )}
              </div>
            )}
          </AIBubble>
        </motion.div>

        {/* ── Step 1+: User replied with type ── */}
        {step >= 1 && (
          <motion.div
            {...msgIn}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <UserBubble>{selectedType}</UserBubble>
          </motion.div>
        )}

        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <AIBubble>
              <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 14, color: 'var(--text-primary)' }}>
                What vibe should they have?
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {vibes.map((vibe) => (
                  <motion.button
                    key={vibe}
                    onClick={() => step === 1 && handleVibeSelect(vibe)}
                    whileHover={step === 1 ? { scale: 1.04 } : {}}
                    whileTap={step === 1 ? { scale: 0.97 } : {}}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 20,
                      border: selectedVibe === vibe
                        ? '1px solid rgba(214,225,255,0.38)'
                        : '1px solid rgba(255,255,255,0.09)',
                      background: selectedVibe === vibe
                        ? 'rgba(214,225,255,0.1)'
                        : 'rgba(255,255,255,0.04)',
                      color: selectedVibe === vibe ? 'var(--accent-blue)' : 'var(--text-secondary)',
                      fontSize: 13,
                      fontWeight: 500,
                      fontFamily: 'inherit',
                      cursor: step === 1 ? 'pointer' : 'default',
                      transition: 'all 0.18s',
                    }}
                  >
                    {vibe}
                  </motion.button>
                ))}
              </div>
            </AIBubble>
          </motion.div>
        )}

        {/* ── Step 2+: User replied with vibe ── */}
        {step >= 2 && (
          <motion.div
            {...msgIn}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <UserBubble>{selectedVibe}</UserBubble>
          </motion.div>
        )}

        {/* ── Step 3+: AI generating ── */}
        {step >= 3 && step < 4 && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <AIBubble>
              <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 12 }}>
                Got it. Generating…
              </p>
              <BounceDots />
            </AIBubble>
          </motion.div>
        )}

        {/* ── Step 4: Result ── */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <AIBubble>
              <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 12 }}>
                Here's your character:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                {resultGradients.map((grad, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: 12,
                      aspectRatio: '3/4',
                      background: grad,
                      border: '1px solid rgba(255,255,255,0.06)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      position: 'absolute', bottom: '14%', left: '50%',
                      transform: 'translateX(-50%)', opacity: 0.1,
                    }}>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', margin: '0 auto 3px' }} />
                      <div style={{ width: 30, height: 38, borderRadius: '8px 8px 0 0', background: '#fff', margin: '0 auto' }} />
                    </div>
                  </div>
                ))}
              </div>
              {/* Refine input */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  value={refineText}
                  onChange={(e) => setRefineText(e.target.value)}
                  placeholder="What would you change?"
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: 13,
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                />
                <button
                  style={{
                    width: 34, height: 34,
                    borderRadius: 8,
                    border: 'none',
                    background: 'var(--accent-green)',
                    color: '#0d1a10',
                    fontSize: 14,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 10px rgba(22,216,102,0.2)',
                  }}
                >
                  →
                </button>
              </div>
            </AIBubble>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function AIBubble({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      {/* Avatar orb */}
      <div style={{
        width: 34, height: 34,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #fb23c2 0%, #6d52ff 100%)',
        flexShrink: 0,
        boxShadow: '0 4px 14px rgba(251,35,194,0.3)',
        marginTop: 2,
      }} />
      {/* Glass bubble */}
      <div style={{
        flex: 1,
        background: 'rgba(27,25,28,0.75)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '4px 16px 16px 16px',
        padding: '14px 18px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      }}>
        {children}
      </div>
    </div>
  )
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      maxWidth: '68%',
      padding: '10px 16px',
      borderRadius: '16px 16px 4px 16px',
      background: 'rgba(251,35,194,0.13)',
      border: '1px solid rgba(251,35,194,0.22)',
      fontSize: 14,
      color: 'var(--text-primary)',
      lineHeight: 1.5,
    }}>
      {children}
    </div>
  )
}

function BounceDots() {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 0.65, delay: i * 0.14, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-pink)', opacity: 0.7 }}
        />
      ))}
    </div>
  )
}
