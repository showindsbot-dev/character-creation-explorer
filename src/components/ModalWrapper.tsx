import { motion } from 'framer-motion'
import { useEffect } from 'react'

interface ModalWrapperProps {
  onClose: () => void
  children: React.ReactNode
}

export default function ModalWrapper({ onClose, children }: ModalWrapperProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '95vw', maxWidth: 1200, height: '88vh', maxHeight: 800,
          background: 'var(--bg-base)',
          border: '1px solid var(--border)',
          borderRadius: 24, overflow: 'hidden',
          position: 'relative', display: 'flex', flexDirection: 'column',
          boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 20, right: 20, zIndex: 10,
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            color: 'var(--text-secondary)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, transition: 'all 0.2s',
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.background = 'var(--bg-hover)'; (e.target as HTMLElement).style.color = 'var(--text-primary)' }}
          onMouseLeave={e => { (e.target as HTMLElement).style.background = 'var(--bg-elevated)'; (e.target as HTMLElement).style.color = 'var(--text-secondary)' }}
        >
          ×
        </button>
        {children}
      </motion.div>
    </motion.div>
  )
}
