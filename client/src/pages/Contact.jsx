import React from 'react'
import { motion } from "framer-motion"

const Contact = () => {
  return (
    <div className="pt-4 px-4 flex justify-center">
      <div className="min-h-[calc(80vh)] w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        
        {/* Left: Copy */}
        <motion.div 
          className="text-center md:text-left group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }} 
        >
          <h1 className="mb-4">
            Any questions for us?
          </h1>
          <p className="text-secondary">
            Leave a message for StackHacks and our team will get back to you as soon as possible. Don't forget to introduce yourself in your message!
          </p>
        </motion.div>

        {/* Right: Form */}
        <form className="flex flex-col gap-4">
          <div className='grid grid-cols-2 gap-4'>
            <input
              className="input text-sm"
              name="name"
              type="text"
              placeholder="Enter your name"
            />
            <input
              className="input text-sm"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <textarea
            className="input resize-none text-sm"
            name="message"
            placeholder="Enter your message"
            rows="6"
          />

          <button className="btn btn-primary self-start m-0">
            Submit
          </button>
        </form>

      </div>
    </div>
  )
}

export default Contact
