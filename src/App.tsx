import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ImageFlowModal from './modals/ImageFlowModal'
import TextFlowModal from './modals/TextFlowModal'
import TemplateFlowModal from './modals/TemplateFlowModal'
import './index.css'

type FlowType = 'image' | 'text' | 'template' | null

const flows = [
  {
    id: 'image' as FlowType,
    icon: '🖼',
    title: 'Start from an image',
    subtitle: 'Upload or drag a reference',
    gradient: 'linear-gradient(135deg, #2b292d 0%, #3c1a35 50%, #1a192b 100%)',
    blob: 'radial-gradient(ellipse at 40% 30%, rgba(251,35,194,0.25) 0%, transparent 65%), radial-gradient(ellipse at 70% 70%, rgba(109,82,255,0.2) 0%, transparent 65%)',
    tag: 'Reference-based',
  },
  {
    id: 'text' as FlowType,
    icon: '✍️',
    title: 'Describe your character',
    subtitle: 'Tell me who they are',
    gradient: 'linear-gradient(135deg, #2b292d 0%, #1a2b1e 50%, #2b2a1a 100%)',
    blob: 'radial-gradient(ellipse at 50% 40%, rgba(22,216,102,0.2) 0%, transparent 65%), radial-gradient(ellipse at 30% 70%, rgba(0,162,199,0.15) 0%, transparent 65%)',
    tag: 'Language-first',
  },
  {
    id: 'template' as FlowType,
    icon: '✨',
    title: 'Use a template',
    subtitle: "Let's explore together",
    gradient: 'linear-gradient(135deg, #2b292d 0%, #2b1a3c 50%, #1a2b2b 100%)',
    blob: 'radial-gradient(ellipse at 60% 35%, rgba(214,225,255,0.2) 0%, transparent 65%), radial-gradient(ellipse at 35% 65%, rgba(251,35,194,0.15) 0%, transparent 65%)',
    tag: 'Beginner-friendly',
  },
]

export default function App() {
  const [activeFlow, setActiveFlow] = useState<FlowType>(null)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>
      {/* Background noise */}
      <div style={{
        position: 'fixed', inset: 0, opacity: 0.03,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        pointerEvents: 'none', zIndex: 0
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'fixed', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: '60vw', height: '40vw',
        background: 'radial-gradient(ellipse, rgba(251,35,194,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            borderRadius: 20, padding: '6px 14px', marginBottom: 20
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-pink)', display: 'inline-block' }} />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Character Studio</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 12 }}>
            Create your character
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', fontWeight: 400 }}>
            Three ways to bring them to life
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', width: '100%', maxWidth: 1200 }}>
          {flows.map((flow, i) => (
            <motion.div
              key={flow.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveFlow(flow.id)}
              style={{
                flex: '1 1 300px', maxWidth: 380, minWidth: 260, height: 460,
                background: flow.gradient,
                border: '1px solid var(--border)',
                borderRadius: 20, cursor: 'pointer', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', position: 'relative',
                transition: 'border-color 0.25s, box-shadow 0.25s',
              }}
              onHoverStart={e => {
                const el = e.target as HTMLElement
                el.closest?.('[data-card]')
              }}
            >
              {/* Hover border glow via CSS class workaround */}
              <style>{`
                .flow-card:hover { border-color: rgba(251,35,194,0.5) !important; box-shadow: 0 0 40px rgba(251,35,194,0.1), 0 20px 60px rgba(0,0,0,0.4) !important; }
              `}</style>
              <div className="flow-card" style={{ position: 'absolute', inset: 0, borderRadius: 20, border: '1px solid var(--border)', pointerEvents: 'none', transition: 'border-color 0.25s, box-shadow 0.25s' }} />

              {/* Blob area */}
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: flow.blob }} />
                {/* Decorative icon */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -55%)',
                  fontSize: 56, opacity: 0.6, filter: 'drop-shadow(0 0 20px rgba(251,35,194,0.3))'
                }}>
                  {flow.icon}
                </div>
                {/* Tag */}
                <div style={{
                  position: 'absolute', top: 16, left: 16,
                  background: 'rgba(18,17,19,0.7)', backdropFilter: 'blur(8px)',
                  border: '1px solid var(--border)', borderRadius: 20,
                  padding: '4px 12px', fontSize: 11, color: 'var(--text-tertiary)',
                  letterSpacing: '0.04em', textTransform: 'uppercase'
                }}>
                  {flow.tag}
                </div>
              </div>

              {/* Bottom */}
              <div style={{ padding: '24px 28px', background: 'rgba(18,17,19,0.6)', backdropFilter: 'blur(20px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>{flow.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{flow.subtitle}</p>
                  </div>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'var(--accent-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 16, flexShrink: 0, marginLeft: 12,
                    boxShadow: '0 0 16px rgba(251,35,194,0.4)'
                  }}>
                    →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: 40, fontSize: 13, color: 'var(--text-tertiary)', textAlign: 'center' }}
        >
          All three flows lead to the same result — a character that's <em style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>yours</em>
        </motion.p>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {activeFlow === 'image' && <ImageFlowModal onClose={() => setActiveFlow(null)} />}
        {activeFlow === 'text' && <TextFlowModal onClose={() => setActiveFlow(null)} />}
        {activeFlow === 'template' && <TemplateFlowModal onClose={() => setActiveFlow(null)} />}
      </AnimatePresence>
    </div>
  )
}
