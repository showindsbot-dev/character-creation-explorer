import { motion } from 'framer-motion'

interface GenerateButtonProps {
  onClick: () => void
  loading?: boolean
  label?: string
  fullWidth?: boolean
}

export default function GenerateButton({ onClick, loading, label = 'Generate Character', fullWidth }: GenerateButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={loading}
      style={{
        width: fullWidth ? '100%' : 'auto',
        padding: '14px 28px',
        background: loading ? 'var(--bg-hover)' : 'var(--accent-green)',
        color: loading ? 'var(--text-secondary)' : '#000',
        border: 'none', borderRadius: 12, cursor: loading ? 'not-allowed' : 'pointer',
        fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: 8,
        boxShadow: loading ? 'none' : '0 0 24px rgba(22,216,102,0.3)',
        transition: 'background 0.2s, box-shadow 0.2s',
        fontFamily: 'inherit',
      }}
    >
      {loading ? (
        <>
          <div style={{
            width: 16, height: 16, border: '2px solid var(--text-tertiary)',
            borderTopColor: 'var(--text-primary)', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
          Generating...
        </>
      ) : (
        <>
          <span>✦</span>
          {label}
        </>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </motion.button>
  )
}
