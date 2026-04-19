import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { client } from "../sanityClient";
import { motion, AnimatePresence } from "framer-motion";

function Modal({ member, onClose }) {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-background flex flex-col md:flex-row rounded-2xl overflow-hidden
                   shadow-2xl w-[90vw] max-w-4xl max-h-[90vh]"
        initial={{ opacity: 0, scale: 0.88, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 32 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left — image */}
        <div className="md:w-2/5 w-full shrink-0">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-72 md:h-full object-cover"
          />
        </div>

        {/* Right — details */}
        <div className="flex flex-col justify-center gap-4 p-12 md:w-3/5">
          <h2 className="text-3xl font-bold text-primary">{member.name}</h2>
          <p className="text-accent font-medium text-xl">{member.title}</p>
          <div className="w-12 h-0.5 bg-accent rounded-full" />
          <p className="text-secondary leading-relaxed text-base">
            {member.description || "No description available."}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center
                     rounded-full text-primary text-lg cursor-pointer
                     transition-colors duration-150 hover:text-accent"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

function Card({ image, title, name, onClick }) {
  return (
    <div className="px-3">
      <div
        onClick={onClick}
        className="card flex flex-col items-center gap-3 w-full border border-gray-200
                   rounded-2xl shadow-md p-6 transition-all duration-300
                   hover:scale-103 hover:shadow-2xl hover:border-accent cursor-pointer"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-100 object-cover rounded-lg"
        />
        <h1 className="text-center font-bold text-primary text-2xl">{name}</h1>
        <h2 className="text-accent text-xl">{title}</h2>
      </div>
    </div>
  );
}

const Eboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [slidesToShow, setSlidesToShow] = useState(1);

  const getSlidesToShow = (width) => {
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  };

  useEffect(() => {
    setSlidesToShow(getSlidesToShow(window.innerWidth));
    const handleResize = () => setSlidesToShow(getSlidesToShow(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: events.length > slidesToShow,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    centerMode: slidesToShow === 3,
    centerPadding: "0px",
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await client.fetch(`*[_type == "eboard"] | order(date asc) {
          _id, name, title, description,
          "image": image.asset->url,
        }`);
        setEvents(data);
      } catch (e) {
        console.error("Failed to fetch events from Sanity: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="eboard-slider w-full px-3 sm:px-10 py-20 overflow-hidden">
      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading Eboard...</div>
      ) : events.length > 0 ? (
        <Slider {...settings}>
          {events.map((event) => (
            <Card
              key={event._id}
              title={event.title}
              name={event.name}
              image={event.image}
              description={event.description}
              onClick={() => setSelectedMember(event)}
            />
          ))}
        </Slider>
      ) : (
        <div className="text-center text-gray-500 py-10">No eboard members found.</div>
      )}

      <AnimatePresence>
        {selectedMember && (
          <Modal member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Eboard;