// src/components/ConfirmDialog.jsx
// T5.2 — Small confirm modal for destructive actions. Esc / click-outside /
// Cancel all bail out; the destructive button is visually the dangerous one.

import { useEffect } from 'react'

export default function ConfirmDialog({
  title,
  body,
  confirmLabel = 'Confirm',
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-20 flex items-center justify-center bg-stage/80 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm space-y-4 rounded-xl border border-line bg-surface p-5"
      >
        <div className="space-y-1">
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          <p className="text-sm leading-relaxed text-muted">{body}</p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            autoFocus
            className="rounded-lg border border-line bg-raised px-4 py-2 text-sm text-muted transition-colors hover:text-ink"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-over px-4 py-2 text-sm font-medium text-ink transition-colors hover:brightness-110"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}