import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type CardMode = 'image' | 'describe' | 'guide'
type AppState = 'input' | 'loading' | 'result'

const describePlaceholders = [
  'A mysterious elven archer with silver hair, forest tattoos, and a glowing bow…',
  'A cyberpunk street hacker, neon-lit alleyway, hooded jacket, chrome implants…',
  'A gentle giant warrior, weathered armor, kind eyes, battle scars from old wars…',
]

const vibeChips = [
  { label: 'Confident', bg: 'rgba(251,35,194,0.12)', border: 'rgba(251,35,194,0.28)', text: '#ff82db' },
  { label: 'Mysterious', bg: 'rgba(109,82,255,0.12)', border: 'rgba(109,82,255,0.28)', text: '#b8a4ff' },
  { label: 'Warm', bg: 'rgba(255,160,80,0.12)', border: 'rgba(255,160,80,0.28)', text: '#ffb366' },
  { label: 'Fierce', bg: 'rgba(255,60,60,0.12)', border: 'rgba(255,60,60,0.28)', text: '#ff8080' },
  { label: 'Innocent', bg: 'rgba(214,225,255,0.12)', border: 'rgba(214,225,255,0.28)', text: '#d6e1ff' },
  { label: 'Playful', bg: 'rgba(22,216,102,0.12)', border: 'rgba(22,216,102,0.28)', text: '#5ef09a' },
]

const stylePills = ['Realistic', 'Anime', 'Fantasy']

const resultGradients = [
  'linear-gradient(160deg, #2b1a3c 0%, #1a192b 55%, #0d1220 100%)',
  'linear-gradient(160deg, #1a2b1e 0%, #0d1e1a 55%, #12141a 100%)',
]

const hoverActions = ['More like this', 'Bolder', 'Softer']

export default function V1GlassCard() {
  const [mode, setMode] = useState<CardMode>('image')
  const [appState, setAppState] = useState<AppState>('input')
  const [phIdx, setPhIdx] = useState(0)
  const [phVisible, setPhVisible] = useState(true)
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [hoveredResult, setHoveredResult] = useState<number | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [describeText, setDescribeText] = useState('')

  useEffect(() => {
    if (mode !== 'describe') return
    const id = setInterval(() => {
      setPhVisible(false)
      setTimeout(() => {
        setPhIdx(i => (i + 1) % describePlaceholders.length)
        setPhVisible(true)
      }, 300)
    }, 3000)
    return () => clearInterval(id)
  }, [mode])

  const handleGenerate = () => {
    setAppState('loading')
    setTimeout(() => setAppState('result'), 2000)
  }

  const handleRegenerate = () => {
    setAppState('loading')
    setTimeout(() => setAppState('result'), 1500)
  }

  const switchMode = (m: CardMode) => {
    setMode(m)
    setAppState('input')
    setSelectedVibe(null)
    setSelectedStyle(null)
    setDescribeText('')
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
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 52px)',
        position: 'relative',
        overflow: 'hidden',
        padding: '40px 24px',
      }}
    >
      {/* Ambient glows */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: [
          'radial-gradient(ellipse 70% 55% at 22% 65%, rgba(251,35,194,0.09) 0%, transparent 70%)',
          'radial-gradient(ellipse 60% 45% at 78% 38%, rgba(22,216,102,0.06) 0%, transparent 70%)',
          'radial-gradient(ellipse 45% 40% at 50% 50%, rgba(109,82,255,0.04) 0%, transparent 70%)',
        ].join(', '),
      }} />

      {/* Glass card */}
      <motion.div
        layout
        style={{
          width: '100%',
          maxWidth: 520,
          background: 'rgba(27,25,28,0.75)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 24,
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.03)',
          overflow: 'hidden',
          position: 'relative',
        }}
        transition={{ layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      >
        {/* Shimmer overlay when loading */}
        <AnimatePresence>
          {appState === 'loading' && (
            <motion.div
              key="shimmer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'v1shimmer 1.2s ease-in-out infinite',
              }}
            />
          )}
        </AnimatePresence>

        {/* Mode tabs */}
        <div style={{ padding: '20px 20px 0', display: 'flex', gap: 2 }}>
          {([
            { id: 'image' as CardMode, label: '🖼 Image' },
            { id: 'describe' as CardMode, label: '✍ Describe' },
            { id: 'guide' as CardMode, label: '✨ Guide me' },
          ]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => switchMode(tab.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 500,
                fontFamily: 'inherit',
                background: mode === tab.id ? 'rgba(251,35,194,0.18)' : 'transparent',
                color: mode === tab.id ? 'var(--accent-pink-soft)' : 'var(--text-tertiary)',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px 24px' }}>
          <AnimatePresence mode="wait">
            {appState === 'input' && (
              <motion.div
                key={`input-${mode}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                {mode === 'image' && (
                  <ImageModeContent isDragOver={isDragOver} setIsDragOver={setIsDragOver} />
                )}
                {mode === 'describe' && (
                  <DescribeModeContent
                    text={describeText}
                    setText={setDescribeText}
                    phIdx={phIdx}
                    phVisible={phVisible}
                  />
                )}
                {mode === 'guide' && (
                  <GuideModeContent
                    selectedVibe={selectedVibe}
                    setSelectedVibe={setSelectedVibe}
                    selectedStyle={selectedStyle}
                    setSelectedStyle={setSelectedStyle}
                  />
                )}
                <GenerateButton onClick={handleGenerate} />
              </motion.div>
            )}

            {appState === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: '52px 0' }}
              >
                <LoadingDots />
                <div style={{ marginTop: 14, fontSize: 13, color: 'var(--text-tertiary)' }}>
                  Generating your character…
                </div>
              </motion.div>
            )}

            {appState === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  {resultGradients.map((grad, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredResult(i)}
                      onMouseLeave={() => setHoveredResult(null)}
                      style={{
                        borderRadius: 12,
                        aspectRatio: '3/4',
                        background: grad,
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: '1px solid rgba(255,255,255,0.06)',
                        transition: 'transform 0.2s',
                        transform: hoveredResult === i ? 'scale(1.02)' : 'scale(1)',
                      }}
                    >
                      {/* Silhouette hint */}
                      <div style={{
                        position: 'absolute', bottom: '14%', left: '50%',
                        transform: 'translateX(-50%)', opacity: 0.1,
                      }}>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', margin: '0 auto 4px' }} />
                        <div style={{ width: 40, height: 52, borderRadius: '10px 10px 0 0', background: '#fff', margin: '0 auto' }} />
                      </div>

                      {/* Hover action pills */}
                      <AnimatePresence>
                        {hoveredResult === i && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.18 }}
                            style={{
                              position: 'absolute', bottom: 10, left: '50%',
                              transform: 'translateX(-50%)',
                              display: 'flex', gap: 4,
                              width: 'max-content',
                            }}
                          >
                            {hoverActions.map((action) => (
                              <button
                                key={action}
                                style={{
                                  padding: '4px 9px',
                                  borderRadius: 20,
                                  border: '1px solid rgba(255,255,255,0.15)',
                                  background: 'rgba(18,17,19,0.85)',
                                  backdropFilter: 'blur(8px)',
                                  WebkitBackdropFilter: 'blur(8px)',
                                  color: 'var(--text-primary)',
                                  fontSize: 10,
                                  fontWeight: 500,
                                  fontFamily: 'inherit',
                                  cursor: 'pointer',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {action}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={handleRegenerate}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 13, color: 'var(--text-tertiary)',
                      fontFamily: 'inherit',
                      textDecoration: 'underline',
                      textDecorationColor: 'rgba(124,122,133,0.4)',
                      textUnderlineOffset: 3,
                      padding: 0,
                    }}
                  >
                    Regenerate
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <style>{`
        @keyframes v1shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </motion.div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ImageModeContent({
  isDragOver,
  setIsDragOver,
}: {
  isDragOver: boolean
  setIsDragOver: (v: boolean) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragOver(false) }}
        style={{
          borderRadius: 12,
          border: `1.5px dashed ${isDragOver ? 'rgba(251,35,194,0.6)' : 'rgba(251,35,194,0.22)'}`,
          padding: '32px 20px',
          textAlign: 'center',
          background: isDragOver ? 'rgba(251,35,194,0.07)' : 'rgba(251,35,194,0.025)',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <div style={{ fontSize: 22, marginBottom: 8, opacity: 0.5, color: 'var(--accent-pink-soft)' }}>↑</div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 4, fontWeight: 500 }}>
          Drop reference image
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>or click to browse</div>
      </div>
      <textarea
        rows={2}
        placeholder="What should change?"
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '10px 12px',
          fontSize: 13,
          color: 'var(--text-primary)',
          fontFamily: 'inherit',
          resize: 'none',
          outline: 'none',
          lineHeight: 1.5,
        }}
      />
    </div>
  )
}

function DescribeModeContent({
  text,
  setText,
  phIdx,
  phVisible,
}: {
  text: string
  setText: (v: string) => void
  phIdx: number
  phVisible: boolean
}) {
  return (
    <div style={{ position: 'relative' }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: '100%',
          minHeight: 200,
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid var(--border)',
          padding: '4px 0 16px',
          fontSize: 15,
          lineHeight: 1.65,
          color: 'var(--text-primary)',
          fontFamily: 'inherit',
          resize: 'none',
          outline: 'none',
          display: 'block',
        }}
      />
      {!text && (
        <div
          style={{
            position: 'absolute', top: 4, left: 0, right: 0,
            pointerEvents: 'none',
            fontSize: 15,
            lineHeight: 1.65,
            color: 'var(--text-tertiary)',
            opacity: phVisible ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          {describePlaceholders[phIdx]}
        </div>
      )}
    </div>
  )
}

function GuideModeContent({
  selectedVibe,
  setSelectedVibe,
  selectedStyle,
  setSelectedStyle,
}: {
  selectedVibe: string | null
  setSelectedVibe: (v: string | null) => void
  selectedStyle: string | null
  setSelectedStyle: (v: string | null) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>
          Vibe
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {vibeChips.map((chip) => {
            const active = selectedVibe === chip.label
            return (
              <button
                key={chip.label}
                onClick={() => setSelectedVibe(active ? null : chip.label)}
                style={{
                  height: 52,
                  borderRadius: 10,
                  border: `1px solid ${active ? chip.border : 'var(--border)'}`,
                  background: active ? chip.bg : 'rgba(255,255,255,0.02)',
                  color: active ? chip.text : 'var(--text-secondary)',
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  transition: 'all 0.18s',
                }}
              >
                {chip.label}
              </button>
            )
          })}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>
          Style
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {stylePills.map((style) => {
            const active = selectedStyle === style
            return (
              <button
                key={style}
                onClick={() => setSelectedStyle(active ? null : style)}
                style={{
                  flex: 1,
                  padding: '9px 0',
                  borderRadius: 20,
                  border: `1px solid ${active ? 'rgba(251,35,194,0.4)' : 'var(--border)'}`,
                  background: active ? 'rgba(251,35,194,0.12)' : 'rgba(255,255,255,0.025)',
                  color: active ? 'var(--accent-pink-soft)' : 'var(--text-secondary)',
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  transition: 'all 0.18s',
                }}
              >
                {style}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function GenerateButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        width: '100%',
        padding: '13px',
        marginTop: 18,
        borderRadius: 12,
        border: 'none',
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 600,
        fontFamily: 'inherit',
        background: 'var(--accent-green)',
        color: '#0d1a10',
        letterSpacing: '-0.01em',
        boxShadow: '0 4px 20px rgba(22,216,102,0.22)',
      }}
    >
      Generate Character
    </motion.button>
  )
}

function LoadingDots() {
  return (
    <div style={{ display: 'flex', gap: 7, justifyContent: 'center' }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 0.7, delay: i * 0.14, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-pink)' }}
        />
      ))}
    </div>
  )
}
