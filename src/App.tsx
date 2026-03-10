import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { V1CastingWall } from './views/V1CastingWall'
import { V2Spotlight } from './views/V2Spotlight'
import { V3IdentityCard } from './views/V3IdentityCard'
import { V4Oracle } from './views/V4Oracle'
import { V5FilmStrip } from './views/V5FilmStrip'
import './index.css'

type Version = 'V1' | 'V2' | 'V3' | 'V4' | 'V5'

const TABS: { id: Version; label: string; desc: string }[] = [
  { id: 'V1', label: 'V1', desc: 'Casting Wall' },
  { id: 'V2', label: 'V2', desc: 'Spotlight' },
  { id: 'V3', label: 'V3', desc: 'Identity Card' },
  { id: 'V4', label: 'V4', desc: 'Oracle' },
  { id: 'V5', label: 'V5', desc: 'Film Strip' },
]

function ProductBg() {
  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', pointerEvents: 'none', zIndex: 0 }}>
      <div style={{ width: 60, background: 'rgba(0,0,0,0.55)', flexShrink: 0 }}>
        <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.04)' }} />
          ))}
        </div>
      </div>
      <div style={{ flex: 1, background: '#0e0d0f' }}>
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ height: 32, width: 180, borderRadius: 6, background: 'rgba(255,255,255,0.03)' }} />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} style={{ width: 120, height: 160, borderRadius: 10, background: 'rgba(255,255,255,0.02)' }} />
            ))}
          </div>
        </div>
      </div>
      <div style={{ width: 220, background: 'rgba(0,0,0,0.4)', borderLeft: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ height: 60, borderRadius: 8, background: 'rgba(255,255,255,0.025)' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [version, setVersion] = useState<Version>('V1')

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <ProductBg />

      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        gap: 12,
      }}>
        {/* Top nav */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: 'rgba(14,13,15,0.75)', backdropFilter: 'blur(16px)',
          borderRadius: 12, padding: '4px 5px',
          border: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0,
        }}>
          {TABS.map(tab => (
            <motion.button key={tab.id} onClick={() => setVersion(tab.id)}
              whileTap={{ scale: 0.94 }}
              style={{
                height: 32, padding: '0 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', border: 'none', fontFamily: 'inherit',
                background: version === tab.id ? 'var(--accent-pink)' : 'transparent',
                color: version === tab.id ? '#fff' : 'var(--text-tertiary)',
                display: 'flex', alignItems: 'center', gap: 5,
                boxShadow: version === tab.id ? '0 2px 16px rgba(251,35,194,0.4)' : 'none',
                transition: 'background 0.15s, color 0.15s, box-shadow 0.15s',
              }}
            >
              <span>{tab.label}</span>
              {version === tab.id && (
                <span style={{ fontSize: 10, fontWeight: 400, opacity: 0.8 }}>· {tab.desc}</span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Modal */}
        <div style={{
          width: 880, maxWidth: 'calc(100vw - 32px)',
          height: '90vh', maxHeight: 760,
          borderRadius: 24,
          background: 'rgba(14,13,15,0.92)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.7)',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <AnimatePresence mode="wait">
            <motion.div key={version}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              style={{ position: 'absolute', inset: 0 }}
            >
              {version === 'V1' && <V1CastingWall />}
              {version === 'V2' && <V2Spotlight />}
              {version === 'V3' && <V3IdentityCard />}
              {version === 'V4' && <V4Oracle />}
              {version === 'V5' && <V5FilmStrip />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
