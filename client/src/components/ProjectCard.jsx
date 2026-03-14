import {useState, useRef, useEffect, useId} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "lucide-react";

const ProjectCard = ({ title, date, image, children, className, index = 0 }) => {
  const [active, setActive] = useState(false);
  const cardRef = useRef(null);
  const id = useId();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActive(false);
    };
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) setActive(false);
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* Expanded Modal */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100] sm:mt-16">
            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={cardRef}
              className="w-full max-w-[850px] h-full flex flex-col overflow-auto [scrollbar-width:none] sm:rounded-t-3xl bg-primary/5 backdrop-blur-sm border border-primary/10 relative"
            >
              {/* Expanded Image */}
              <motion.div layoutId={`image-${title}-${id}`}>
                <div className="relative before:absolute before:inset-x-0 before:bottom-[-1px] before:h-[70px] before:z-50 before:bg-gradient-to-t before:from-black/30">
                  {image ? (
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-80 object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-80 bg-gradient-to-br from-accent/30 to-black flex items-center justify-center">
                      <Calendar className="w-16 h-16 text-accent/50" />
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Expanded Content */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <motion.p
                      layoutId={`date-${date}-${id}`}
                      className="text-secondary text-sm mb-1"
                    >
                      {date}
                    </motion.p>
                    <motion.h3
                      layoutId={`title-${title}-${id}`}
                      className="text-4xl font-bold text-primary"
                    >
                      {title}
                    </motion.h3>
                  </div>

                  {/* Close Button */}
                  <motion.button
                    aria-label="Close card"
                    layoutId={`button-${title}-${id}`}
                    onClick={() => setActive(false)}
                    className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full border border-primary/20 text-primary hover:border-accent/50 hover:text-accent transition-colors duration-300 focus:outline-none"
                  >
                    <motion.div animate={{ rotate: active ? 45 : 0 }} transition={{ duration: 0.4 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </motion.div>
                  </motion.button>
                </div>

                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-secondary text-sm flex flex-col gap-4 pb-10 [&_h4]:text-primary"
                >
                  {children}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Collapsed Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group"
      >
        <motion.div
          layoutId={`card-${title}-${id}`}
          onClick={() => setActive(true)}
          className={`bg-primary/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/10 hover:border-accent/50 transition-all duration-500 cursor-pointer ${className || ""}`}
        >
          {/* Image */}
          <motion.div layoutId={`image-${title}-${id}`} className="relative h-48 overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent/30 to-black flex items-center justify-center">
                <Calendar className="w-16 h-16 text-accent/50" />
              </div>
            )}
          </motion.div>

          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <motion.h3
                  layoutId={`title-${title}-${id}`}
                  className="text-xl font-bold mb-3 text-primary group-hover:text-accent transition-colors"
                >
                  {title}
                </motion.h3>
                <motion.p
                  layoutId={`date-${date}-${id}`}
                  className="text-secondary text-sm"
                >
                  {date}
                </motion.p>
              </div>

              {/* Open Button */}
              <motion.button
                aria-label="Open card"
                layoutId={`button-${title}-${id}`}
                className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full border border-primary/20 text-primary hover:border-accent/50 hover:text-accent transition-colors duration-300 focus:outline-none"
              >
                <motion.div animate={{ rotate: active ? 45 : 0 }} transition={{ duration: 0.4 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProjectCard;