import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, AlertCircle } from 'lucide-react'

const Modal = ({ result, closeModal }) => {
  const isSuccess = result?.toLowerCase().includes('sent') || result?.toLowerCase().includes('success')

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeModal}
    >
      <motion.div
        className="relative w-full max-w-sm p-8 bg-[#141416] rounded-2xl border border-white/15 shadow-2xl flex flex-col items-center text-center gap-4"
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`p-3 rounded-full ${isSuccess ? 'bg-accent/15 text-accent' : 'bg-red-500/15 text-red-400'}`}>
          {isSuccess ? <CheckCircle2 className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
        </div>

        <h3 className="text-xl font-semibold text-primary">
          {isSuccess ? 'Message Received' : 'Notice'}
        </h3>

        <p className="text-sm text-secondary leading-relaxed">
          {result}
        </p>

        <button
          type="button"
          onClick={closeModal}
          className="btn-primary w-full mt-2"
        >
          Acknowledge
        </button>
      </motion.div>
    </motion.div>
  )
}

export default Modal