import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export const FAQ_Tabs = ({ 
  title = "",
  subtitle = "",
  categories,
  faqData,
  className = "",
  ...props 
}) => {
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);

  return (
    <section 
      className={`relative w-full max-w-6xl mx-auto py-24 px-4 ${className}`}
      {...props}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Left Column: Header & Tabs (Matching your Contact "Copy" side) */}
        <div className="md:col-span-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-secondary text-sm font-medium tracking-widest uppercase">
              {subtitle}
            </span>
            <h2 className="text-4xl font-bold mt-2">{title}</h2>
          </motion.div>

          <FAQTabs 
            categories={categories}
            selected={selectedCategory} 
            setSelected={setSelectedCategory} 
          />
        </div>

        {/* Right Column: The Accordion List (Matching your Form width/alignment) */}
        <div className="md:col-span-2">
          <FAQList 
            faqData={faqData}
            selected={selectedCategory} 
          />
        </div>
      </div>
    </section>
  );
};

const FAQTabs = ({ categories, selected, setSelected }) => (
  <div className="flex flex-col gap-2">
    {Object.entries(categories).map(([key, label]) => (
      <button
        key={key}
        onClick={() => setSelected(key)}
        className={`text-left px-4 py-3 rounded-lg border transition-all duration-300 text-sm font-medium ${
          selected === key
            ? "bg-primary/10 border-accent text-primary"
            : "bg-black/20 border-primary/10 text-secondary hover:border-primary/30 hover:text-white"
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

const FAQList = ({ faqData, selected }) => (
  <div className="w-full">
    <AnimatePresence mode="wait">
      <motion.div
        key={selected}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        {faqData[selected]?.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </motion.div>
    </AnimatePresence>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-xl border transition-all duration-300 ${
        isOpen ? "bg-black/40 border-primary/30" : "bg-black/20 border-primary/10"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className={`font-medium transition-colors ${isOpen ? "text-primary" : "text-white"}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus size={20} className={isOpen ? "text-primary" : "text-secondary"} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-secondary text-sm leading-relaxed border-t border-primary/5 pt-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

