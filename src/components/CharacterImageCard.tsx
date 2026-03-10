import { useState } from 'react'

export const PORTRAITS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=533&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=533&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=533&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=533&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=533&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&h=533&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=533&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=533&fit=crop&crop=face",
]

interface Props {
  index: number
  onSelect?: () => void
  size?: 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
}

export function CharacterImageCard({ index, onSelect, size = 'lg', style }: Props) {
  const [hovered, setHovered] = useState(false)
  const radius = size === 'sm' ? 10 : 16

  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '3/4',
        borderRadius: radius,
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#111',
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={PORTRAITS[index % PORTRAITS.length]}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

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
