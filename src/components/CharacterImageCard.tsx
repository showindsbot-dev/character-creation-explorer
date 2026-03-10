import { useState } from 'react'

const CARD_GRADIENTS = [
  'linear-gradient(160deg, #2c1810, #5c3a1e, #8b5e3c, #c4956a)',
  'linear-gradient(160deg, #0a0e1a, #1a2340, #2d4a7a, #4a7fa8)',
  'linear-gradient(160deg, #1a0a1e, #3d1a4a, #6b2d7a, #9b4dab)',
  'linear-gradient(160deg, #0d1a0a, #1e3d1a, #3a6b35, #5a9b50)',
  'linear-gradient(160deg, #1a1410, #3d2e1a, #6b5a35, #9b8a5a)',
]
const FACE_RADIAL = 'radial-gradient(ellipse 60% 80% at 50% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)'

interface Props {
  index: number
  onSelect?: () => void
  size?: 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
}

export function CharacterImageCard({ index, onSelect, size = 'lg', style }: Props) {
  const [hovered, setHovered] = useState(false)
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length]
  const radius = size === 'sm' ? 10 : 16

  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '3/4',
        borderRadius: radius,
        background: gradient,
        overflow: 'hidden',
        cursor: 'pointer',
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'absolute', inset: 0, background: FACE_RADIAL }} />

      {hovered && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
          padding: size === 'sm' ? '10px' : '16px', gap: size === 'sm' ? 5 : 8,
          animation: 'card-reveal 0.15s ease',
        }}>
          <button
            onClick={e => { e.stopPropagation(); }}
            style={{
              position: 'absolute', top: 10, right: 10,
              width: 30, height: 30, borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', cursor: 'pointer', fontSize: 13,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >↓</button>

          <button
            onClick={e => { e.stopPropagation(); onSelect?.() }}
            style={{
              background: 'var(--accent-pink)', color: '#fff', border: 'none',
              borderRadius: 18, height: size === 'sm' ? 30 : 36,
              padding: size === 'sm' ? '0 14px' : '0 20px',
              fontSize: size === 'sm' ? 11 : 13, fontWeight: 600, cursor: 'pointer', width: '100%',
            }}
          >✦ Select this character</button>

          {size !== 'sm' && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['More like this', 'Bolder', 'Younger'].map(chip => (
                <button key={chip} style={{
                  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)',
                  color: '#fff', borderRadius: 12, height: 26, padding: '0 10px', fontSize: 11, cursor: 'pointer',
                }}>{chip}</button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
