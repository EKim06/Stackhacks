import React, { useState } from 'react'
import { motion } from "framer-motion"
import SyncLoader from "react-spinners/SyncLoader";
import Modal from '../components/Modal';

const Contact = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const submitForm = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    formData.append("access_key", "a47c824e-36f7-494b-aca9-73233e59fff7");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setResult(data.success ? "Message Sent!" : "Error sending message. Please try again.");

    setLoading(false);
    setOpen(true);
    event.target.reset();
  };

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
        <form className="flex flex-col gap-4" onSubmit={submitForm}>
          <div className='grid md:grid-cols-2 gap-4'>
            <input required
              className="input text-sm"
              name="name"
              type="text"
              placeholder="Enter your name"
            />
            <input required
              className="input text-sm"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <textarea required
            className="input resize-none text-sm"
            name="message"
            placeholder="Enter your message"
            rows="6"
          />

          <div className='flex flex row'>
            <button type="submit" className="btn-primary w-full md:w-auto m-0">
              Submit
            </button>
            {loading && <SyncLoader className="px-3 pt-2" color="var(--color-secondary)" size={4} speedMultiplier={0.7}/>}
          </div>
          
          {open && <Modal result={result} closeModal={() => setOpen(false)}/>}
        </form>

      </div>
    </div>
  )
}

export default Contact
