import React, { useState, useRef } from 'react' // 1. Added useRef
import { motion } from "framer-motion"
import SyncLoader from "react-spinners/SyncLoader";
import { ChevronDown } from "lucide-react"; // 2. Added ChevronDown
import Modal from '../components/Modal';
import FAQ from '../components/FAQ';

const Contact = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  
  // 3. Create a ref for the FAQ section
  const faqRef = useRef(null);

  const scrollToFAQ = () => {
    faqRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    <div>
      <div className="px-4 flex flex-col items-center justify-center">
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
              Leave a message for StackHacks and our team will get back to you as soon as possible. Our E-mail: stackhacks@binghamton.edu
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

        {/* THE TRANSITION ARROW */}
        <motion.div 
          onClick={scrollToFAQ}
          className="cursor-pointer flex flex-col items-center gap-2 pb-12 group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-secondary text-xs font-medium uppercase tracking-widest group-hover:text-primary transition-colors pt-8">
            Frequently Asked Questions
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }} // The bounce animation
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="text-secondary group-hover:text-primary transition-colors" size={28} />
          </motion.div>
        </motion.div>
      </div>

      {/* --- 5. FAQ SECTION WRAPPER WITH REF --- */}
      <div ref={faqRef} className="border-t border-tertiary">
        <FAQ />
      </div>
    </div> 
  )
}

export default Contact