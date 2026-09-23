"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function calculateGap(width) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 50;
  const maxGap = 80;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularDisplay = ({
  testimonials = [],
  autoplay = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1000);
  const imageContainerRef = useRef(null);
  const autoplayIntervalRef = useRef(null);

  const testimonialsLength = useMemo(() => (testimonials?.length || 0), [testimonials]);
  const activeTestimonial = useMemo(() => {
    if (!testimonials || testimonials.length === 0) return null;
    return testimonials[activeIndex] || testimonials[0];
  }, [activeIndex, testimonials]);

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (autoplay && testimonialsLength > 1) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 6000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  const handleNext = useCallback(() => {
    if (testimonialsLength <= 1) return;
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    if (testimonialsLength <= 1) return;
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  if (!testimonials || testimonials.length === 0 || !activeTestimonial) {
    return null;
  }

  function getImageStyle(index) {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.7;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.8,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.88) rotateY(12deg)`,
        transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.8,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.88) rotateY(-12deg)`,
        transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transform: `translateX(0px) translateY(0px) scale(0.7)`,
      transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
    };
  }

  const quoteWords = activeTestimonial.text ? activeTestimonial.text.split(" ") : [];

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* 3D Stacking Image Showcase */}
        <div className="md:col-span-6">
          <div
            className="relative w-full h-80 sm:h-96 [perspective:1000px] flex items-center justify-center"
            ref={imageContainerRef}
          >
            {testimonials.map((testimonial, index) => (
              <img
                key={testimonial.image || index}
                src={testimonial.image}
                alt={testimonial.title}
                className="absolute w-64 sm:w-72 h-80 sm:h-88 object-cover rounded-2xl border border-white/15 shadow-2xl"
                style={getImageStyle(index)}
              />
            ))}
          </div>
        </div>

        {/* Testimonial / Story Content */}
        <div className="md:col-span-6 flex flex-col justify-between space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-1.5 text-accent">
                <Quote className="w-5 h-5 opacity-70" />
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {activeTestimonial.subtitle || "Who We Are"}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary">
                {activeTestimonial.title}
              </h2>

              <p className="text-secondary text-sm sm:text-base leading-relaxed">
                {quoteWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.2,
                      delay: Math.min(0.015 * i, 0.4),
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Sleek Navigation Controls */}
          {testimonialsLength > 1 && (
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous story"
                className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.03] text-primary flex items-center justify-center hover:border-accent/60 hover:text-accent hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next story"
                className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.03] text-primary flex items-center justify-center hover:border-accent/60 hover:text-accent hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 ml-3">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      idx === activeIndex ? "w-6 bg-accent" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CircularDisplay;