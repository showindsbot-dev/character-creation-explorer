import { useState, useRef, forwardRef } from 'react'
import { motion } from 'framer-motion'

const CHIPS = [
  { label: 'Mysterious & Cool', seed: 'A mysterious and cool character with an enigmatic aura, deep eyes, and an air of quiet confidence.' },
  { label: 'Fierce & Bold', seed: 'A fierce and bold character with intense energy, strong presence, and an unyielding spirit.' },
  { label: 'Warm & Gentle', seed: 'A warm and gentle character with a kind face, soft smile, and an approachable, nurturing presence.' },
  { label: 'Dark & Complex', seed: 'A dark and complex character with layered motivations, haunted eyes, and a morally ambiguous past.' },
  { label: 'Playful & Free', seed: 'A playful and free-spirited character full of energy, a mischievous grin, and boundless creativity.' },
  { label: 'Elegant & Cold', seed: 'An elegant and cold character with sharp features, impeccable style, and a calculating gaze.' },
]

interface ConversationStartProps {
  onDone: () => void
}

const TextareaField = forwardRef<HTMLTextAreaElement, {
  value: string
  onChange: (v: string) => void
  disabled?: boolean
}>(({ value, onChange, disabled }, ref) => {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{
      borderBottom: focused ? '2px solid var(--accent-pink)' : '2px solid transparent',
      transition: 'border-color 0.2s',
      paddingBottom: 4,
    }}>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        placeholder="Describe your character in detail..."
        rows={4}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          resize: 'none',
          fontSize: 18,
          color: 'var(--text-primary)',
          fontFamily: 'inherit',
          lineHeight: 1.55,
          caretColor: 'var(--accent-pink)',
        }}
      />
    </div>
  )
})

export default function ConversationStart({ onDone }: ConversationStartProps) {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [dotFrame, setDotFrame] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleGenerate() {
    if (loading) return
    setLoading(true)
    let frame = 0
    const interval = setInterval(() => {
      frame = (frame + 1) % 4
      setDotFrame(frame)
    }, 350)
    setTimeout(() => {
      clearInterval(interval)
      onDone()
    }, 1500)
  }

  const dots = ['', '.', '..', '...'][dotFrame]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        minHeight: 0,
      }}
    >
      <div style={{ width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* AI message bubble */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #fb23c2 0%, #ff82db 100%)',
            boxShadow: '0 0 12px rgba(251,35,194,0.4)',
          }} />
          <div style={{
            background: 'rgba(30,28,32,0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--border)',
            borderRadius: '4px 16px 16px 16px',
            padding: '14px 18px',
            fontSize: 15,
            color: 'var(--text-primary)',
            lineHeight: 1.5,
          }}>
            Tell me about your character. Who are they?
          </div>
        </div>

        {/* Textarea */}
        <TextareaField
          ref={textareaRef}
          value={value}
          onChange={setValue}
          disabled={loading}
        />

        {/* Quick-start chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CHIPS.map((chip) => (
            <motion.button
              key={chip.label}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setValue(chip.seed)
                textareaRef.current?.focus()
              }}
              disabled={loading}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                borderRadius: 20,
                padding: '6px 14px',
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'border-color 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget
                t.style.borderColor = 'var(--border-hover)'
                t.style.color = 'var(--text-primary)'
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget
                t.style.borderColor = 'var(--border)'
                t.style.color = 'var(--text-secondary)'
              }}
            >
              {chip.label}
            </motion.button>
          ))}
        </div>

        {/* Generate */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleGenerate}
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? 'rgba(22,216,102,0.7)' : 'var(--accent-green)',
            color: '#000',
            border: 'none',
            borderRadius: 12,
            padding: '14px 0',
            fontSize: 15,
            fontWeight: 600,
            fontFamily: 'inherit',
            cursor: loading ? 'default' : 'pointer',
            transition: 'background 0.2s',
            letterSpacing: '-0.01em',
          }}
        >
          {loading ? `Generating${dots}` : 'Generate character'}
        </motion.button>
      </div>
    </motion.div>
  )
}
