'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

// A sheet of paper tossed onto the desk: springs in tilted, tips away on
// close. Closes on the x, a backdrop click, or Escape; the page underneath
// never scrolls while it's open. Callers hand focus back to their trigger.
export default function Modal({
  open,
  onClose,
  labelledBy,
  className = 'max-w-[680px]',
  children,
}: {
  open: boolean
  onClose: () => void
  labelledBy: string
  className?: string
  children: ReactNode
}) {
  const closeBtn = useRef<HTMLButtonElement>(null)
  // portal target only exists in the browser; wait for mount to avoid a hydration mismatch
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeBtn.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.05 } }}
        >
          {/* backdrop */}
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 bg-sb-ink/55 backdrop-blur-[3px] cursor-default"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            className={`relative w-full ${className}`}
            initial={{ opacity: 0, y: 80, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -1 }}
            exit={{ opacity: 0, y: 60, scale: 0.92, rotate: 4, transition: { duration: 0.22, ease: 'easeIn' } }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <motion.button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              aria-label="Close"
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="absolute -top-4 -right-3 sm:-right-4 z-20 w-11 h-11 rounded-full bg-sb-tomato border-[2.5px] border-sb-ink shadow-[3px_3px_0_#1A1410] flex items-center justify-center text-2xl font-bold leading-none text-sb-ink"
            >
              ×
            </motion.button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
