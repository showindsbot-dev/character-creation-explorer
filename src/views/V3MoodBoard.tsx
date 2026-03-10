import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MoodTile {
  name: string
  gradient: string
  accent: string
}

const moodTiles: MoodTile[] = [
  { name: 'Neon Nights',  gradient: 'linear-gradient(135deg, #00d4cc 0%, #7b2ff7 100%)', accent: '#00d4cc' },
  { name: 'Golden Hour',  gradient: 'linear-gradient(135deg, #f7b733 0%, #fc4a1a 100%)', accent: '#f7b733' },
  { name: 'Deep Forest',  gradient: 'linear-gradient(135deg, #1a472a 0%, #0d1b2a 100%)', accent: '#2a7a4a' },
  { name: 'Arctic',       gradient: 'linear-gradient(135deg, #d8eef8 0%, #88c5e0 100%)', accent: '#88c5e0' },
  { name: 'Sakura',       gradient: 'linear-gradient(135deg, #ffb3d1 0%, #c9a7eb 100%)', accent: '#ffb3d1' },
  { name: 'Volcanic',     gradient: 'linear-gradient(135deg, #6b1515 0%, #f7600a 100%)', accent: '#f7600a' },
  { name: 'Shadow',       gradient: 'linear-gradient(135deg, #0a0a0f 0%, #2d1b4e 100%)', accent: '#4a2a7a' },
  { name: 'Celestial',    gradient: 'linear-gradient(135deg, #0f3460 0%, #6a0572 100%)', accent: '#6a4aaa' },
  { name: 'Rust',         gradient: 'linear-gradient(135deg, #c1440e 0%, #7b4f3a 100%)', accent: '#c1440e' },
  { name: 'Mint Fresh',   gradient: 'linear-gradient(135deg, #00b4db 0%, #7ec8a4 100%)', accent: '#7ec8a4' },
  { name: 'Noir',         gradient: 'linear-gradient(135deg, #444 0%, #1a1a1a 100%)',    accent: '#888' },
  { name: 'Dreamcore',    gradient: 'linear-gradient(135deg, #ffb3d1 0%, #b3d9ff 40%, #d4b3ff 70%, #b3ffda 100%)', accent: '#d4b3ff' },
]

function getPreviewGradient(selected: string[]): string {
  if (selected.length === 0) {
    return 'radial-gradient(ellipse at 50% 40%, #1e1b24 0%, #121113 100%)'
  }
  const tiles = selected.slice(0, 3).map(name => moodTiles.find(t => t.name === name)!)
  const accents = tiles.map(t => t.accent)
  if (accents.length === 1) {
    return `radial-gradient(ellipse at 40% 35%, ${accents[0]}44 0%, #121113 70%)`
  }
  if (accents.length === 2) {
    return `radial-gradient(ellipse at 30% 35%, ${accents[0]}44 0%, transparent 60%), radial-gradient(ellipse at 70% 65%, ${accents[1]}44 0%, #121113 70%)`
  }
  return `radial-gradient(ellipse at 25% 30%, ${accents[0]}44 0%, transparent 55%), radial-gradient(ellipse at 75% 35%, ${accents[1]}44 0%, transparent 55%), radial-gradient(ellipse at 50% 75%, ${accents[2]}33 0%, #121113 70%)`
}

export default function V3MoodBoard() {
  const [selected, setSelected] = useState<string[]>([])
  const [detailText, setDetailText] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleTile = (name: string) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    )
  }

  const handleGenerate = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowResult(true)
    }, 2000)
  }

  const previewGradient = getPreviewGradient(selected)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      style={{
        flex: 1,
        minHeight: 'calc(100vh - 52px)',
        position: 'relative',
        overflowX: 'hidden',
        paddingBottom: 100,
      }}
    >
      {/* ── Top section: character preview ── */}
      <div style={{
        minHeight: '38vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '40px 24px 32px',
        gap: 16,
      }}>
        {/* Preview frame */}
        <motion.div
          animate={{ background: previewGradient }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 32,
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          {/* CSS character silhouette */}
          <div style={{
            position: 'absolute',
            bottom: '16%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: 0.18,
          }}>
            {/* Head */}
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', marginBottom: 4 }} />
            {/* Shoulders / torso */}
            <div style={{
              width: 54, height: 60,
              borderRadius: '14px 14px 0 0',
              background: '#fff',
            }} />
          </div>

          {/* Glow overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.4) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
        </motion.div>

        {/* Selected mood tags */}
        <div style={{
          display: 'flex', gap: 8, flexWrap: 'wrap',
          justifyContent: 'center',
          minHeight: 30,
          maxWidth: 480,
        }}>
          <AnimatePresence>
            {selected.map((name) => {
              const tile = moodTiles.find(t => t.name === name)!
              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.7, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.6, y: -4 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 20,
                    background: `${tile.accent}22`,
                    border: `1px solid ${tile.accent}55`,
                    color: tile.accent,
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  onClick={() => toggleTile(name)}
                >
                  {name} ×
                </motion.div>
              )
            })}
          </AnimatePresence>
          {selected.length === 0 && (
            <div style={{ fontSize: 13, color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
              Pick moods below to shape your character
            </div>
          )}
        </div>
      </div>

      {/* ── Mood tile grid ── */}
      <div style={{
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: 10,
        maxWidth: 1000,
        margin: '0 auto',
      }}>
        {moodTiles.map((tile) => {
          const isSelected = selected.includes(tile.name)
          return (
            <motion.button
              key={tile.name}
              onClick={() => toggleTile(tile.name)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                height: 100,
                borderRadius: 16,
                border: isSelected
                  ? '2px solid rgba(251,35,194,0.7)'
                  : '1px solid rgba(255,255,255,0.06)',
                background: tile.gradient,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '10px 12px',
                boxShadow: isSelected
                  ? '0 0 20px rgba(251,35,194,0.2), 0 8px 24px rgba(0,0,0,0.3)'
                  : '0 4px 16px rgba(0,0,0,0.2)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            >
              {/* Name */}
              <span style={{
                fontSize: 12,
                fontWeight: 600,
                fontFamily: 'inherit',
                color: 'rgba(255,255,255,0.9)',
                textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                textAlign: 'left',
              }}>
                {tile.name}
              </span>

              {/* Selected badge */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    style={{
                      position: 'absolute', top: 8, right: 8,
                      width: 20, height: 20,
                      borderRadius: '50%',
                      background: 'var(--accent-pink)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, color: '#fff',
                      boxShadow: '0 2px 8px rgba(251,35,194,0.5)',
                    }}
                  >
                    ✓
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Vignette */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
                pointerEvents: 'none',
              }} />
            </motion.button>
          )
        })}
      </div>

      {/* ── Fixed bottom input bar ── */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        padding: '16px 24px',
        background: 'rgba(18,17,19,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 50,
      }}>
        <div style={{
          width: '100%',
          maxWidth: 520,
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}>
          <input
            value={detailText}
            onChange={(e) => setDetailText(e.target.value)}
            placeholder="Add any details… (optional)"
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '11px 16px',
              fontSize: 14,
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
              outline: 'none',
            }}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGenerate}
            style={{
              padding: '11px 22px',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'inherit',
              background: 'var(--accent-green)',
              color: '#0d1a10',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 18px rgba(22,216,102,0.25)',
            }}
          >
            Generate
          </motion.button>
        </div>
      </div>

      {/* ── Fullscreen result overlay ── */}
      <AnimatePresence>
        {(loading || showResult) && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(18,17,19,0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget && showResult) setShowResult(false)
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                maxWidth: 480,
                background: 'rgba(27,25,28,0.82)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 24,
                boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                overflow: 'hidden',
                padding: 24,
              }}
            >
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ display: 'flex', gap: 7, justifyContent: 'center', marginBottom: 14 }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -9, 0] }}
                        transition={{ duration: 0.7, delay: i * 0.14, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-pink)' }}
                      />
                    ))}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>
                    Generating your character…
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
                      Your character
                    </h3>
                    <button
                      onClick={() => setShowResult(false)}
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid var(--border)',
                        borderRadius: 8,
                        width: 30, height: 30,
                        cursor: 'pointer',
                        color: 'var(--text-tertiary)',
                        fontSize: 14,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'inherit',
                      }}
                    >
                      ×
                    </button>
                  </div>

                  {/* Result cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                    {[
                      'linear-gradient(160deg, #2b1a3c 0%, #1a192b 55%, #0d1220 100%)',
                      'linear-gradient(160deg, #1a2b1e 0%, #0d1e1a 55%, #12141a 100%)',
                    ].map((grad, i) => (
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
                          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', margin: '0 auto 3px' }} />
                          <div style={{ width: 32, height: 42, borderRadius: '8px 8px 0 0', background: '#fff', margin: '0 auto' }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Refine row */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => { setShowResult(false); handleGenerate() }}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: 10,
                        border: '1px solid var(--border)',
                        background: 'rgba(255,255,255,0.04)',
                        color: 'var(--text-secondary)',
                        fontSize: 13,
                        fontFamily: 'inherit',
                        cursor: 'pointer',
                      }}
                    >
                      Regenerate
                    </button>
                    <button
                      onClick={() => setShowResult(false)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: 10,
                        border: 'none',
                        background: 'var(--accent-green)',
                        color: '#0d1a10',
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: 'inherit',
                        cursor: 'pointer',
                      }}
                    >
                      Use this
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
