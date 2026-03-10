import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HoverActions from '../components/HoverActions'

const GRADIENTS = [
  'linear-gradient(160deg, #2c1810 0%, #5c3a1e 30%, #8b5e3c 60%, #c4956a 100%)',
  'linear-gradient(160deg, #0a0e1a 0%, #1a2340 30%, #2d4a7a 60%, #4a7fa8 100%)',
  'linear-gradient(160deg, #1a0a1e 0%, #3d1a4a 35%, #6b2d7a 65%, #9b4dab 100%)',
]
const OVERLAY = 'radial-gradient(ellipse 60% 80% at 50% 35%, rgba(255,255,255,0.07) 0%, transparent 60%)'

const DIRECTION_CHIPS = ['Give them a backstory', 'Make more cinematic', 'Change the era', 'Add a trait']

interface ResultV3Props {
  onBack: () => void
}

export default function ResultV3({ onBack }: ResultV3Props) {
  const [inputFocused, setInputFocused] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        height: 0,
        position: 'relative',
      }}
    >
      {/* Film grain SVG filter (invisible) */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="film-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
        </defs>
      </svg>

      {/* Subtle header */}
      <div style={{
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <p style={{
          fontSize: 12,
          color: 'var(--text-tertiary)',
          letterSpacing: '0.04em',
        }}>
          Your protagonist is ready
        </p>
      </div>

      {/* Poster grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 10,
        padding: '0 16px 16px',
        minHeight: 0,
        paddingBottom: 68,
      }}>
        {/* Left hero - spans 2 rows */}
        <div
          style={{ gridRow: '1 / 3', position: 'relative', borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }}
          onMouseEnter={() => setHovered(0)}
          onMouseLeave={() => setHovered(null)}
        >
          <div style={{
            position: 'absolute', inset: 0,
            background: GRADIENTS[0],
          }} />
          <div style={{ position: 'absolute', inset: 0, background: OVERLAY }} />
          {/* Film grain overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
            backgroundSize: '256px 256px',
            pointerEvents: 'none',
            opacity: 0.5,
            mixBlendMode: 'overlay',
          }} />
          {/* Vignette */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)',
            pointerEvents: 'none',
          }} />
          {/* Credit block */}
          <div style={{
            position: 'absolute', bottom: 20, left: 20, right: 20, zIndex: 3,
          }}>
            <div style={{
              fontSize: 13, fontWeight: 700, color: '#fff',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontVariant: 'small-caps',
              marginBottom: 4,
            }}>
              UNKNOWN PROTAGONIST
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
              A character by you
            </div>
          </div>
          <HoverActions visible={hovered === 0} />
        </div>

        {/* Right top */}
        <div
          style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }}
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(null)}
        >
          <div style={{ position: 'absolute', inset: 0, background: GRADIENTS[1] }} />
          <div style={{ position: 'absolute', inset: 0, background: OVERLAY }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)',
            pointerEvents: 'none',
          }} />
          <HoverActions visible={hovered === 1} />
        </div>

        {/* Right bottom */}
        <div
          style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }}
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(null)}
        >
          <div style={{ position: 'absolute', inset: 0, background: GRADIENTS[2] }} />
          <div style={{ position: 'absolute', inset: 0, background: OVERLAY }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)',
            pointerEvents: 'none',
          }} />
          <HoverActions visible={hovered === 2} />
        </div>
      </div>

      {/* Floating bottom bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 52,
        background: 'rgba(18,17,19,0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
        zIndex: 10,
      }}>
        {/* Chips above bar */}
        <AnimatePresence>
          {inputFocused && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              style={{
                position: 'absolute',
                bottom: '100%',
                left: 0, right: 0,
                padding: '10px 16px 8px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 7,
                background: 'rgba(18,17,19,0.88)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderTop: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {DIRECTION_CHIPS.map((chip, i) => (
                <motion.button
                  key={chip}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setInputValue(chip)}
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    borderRadius: 20, padding: '4px 11px',
                    fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  {chip}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI orb */}
        <div style={{
          width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #fb23c2 0%, #ff82db 100%)',
        }} />

        {/* Input */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setTimeout(() => setInputFocused(false), 200)}
          placeholder="Write your next direction..."
          style={{
            flex: 1,
            background: 'transparent', border: 'none', outline: 'none',
            fontSize: 14, color: 'var(--text-primary)',
            fontFamily: 'inherit',
            caretColor: 'var(--accent-pink)',
          }}
        />

        {/* Actions right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button
            onClick={onBack}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              borderRadius: 7, padding: '5px 12px',
              fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Save all
          </button>
          <button style={{
            background: 'var(--accent-pink)',
            border: 'none', color: '#fff',
            borderRadius: 7, padding: '5px 14px',
            fontSize: 13, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 0 14px rgba(251,35,194,0.4)',
          }}>
            Cast this character
          </button>
        </div>
      </div>
    </motion.div>
  )
}
