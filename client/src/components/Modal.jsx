import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Modal = ({result, closeModal}) => {

  return (
    <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }} 
    >
      <div className="items-center flex flex-col gap-6 w-full max-w-sm p-8 bg-background/95 rounded-2xl overflow-hidden border border-tertiary transition-all duration-500 ">
        <p>{result}</p>
        <button className='btn-primary' onClick={closeModal}>Okay</button>
      </div>
    </motion.div>
  )
}

export default Modal