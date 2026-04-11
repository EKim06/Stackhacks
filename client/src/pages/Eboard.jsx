import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { client } from "../sanityClient";
// Eboard

// Separate Card Component
function Card({ image, title, name, description }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="px-3">
      <div
        onClick={() => setExpanded(!expanded)}
        className="card flex flex-col items-center gap-3 w-full border border-gray-200 rounded-2xl shadow-md p-6 transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:border-accent cursor-pointer"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-100 object-cover rounded-lg"
        />
        <h1 className="text-center font-bold">{name}</h1>
        <h2 className="text-accent">{title}</h2>
        {expanded && (
          <p className="text-sm text-gray-600 text-center">
            {description || "[No Description]"}
          </p>
        )}
      </div>
    </div>
  );
}

const Eboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(1);

  const getSlidesToShow = (width) => {
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  };

  useEffect(() => {
    // Set correct value immediately on mount
    setSlidesToShow(getSlidesToShow(window.innerWidth));

    const handleResize = () => {
      setSlidesToShow(getSlidesToShow(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: events.length > slidesToShow,
    speed: 500,
    slidesToShow, // ← driven by state, not slick's responsive
    slidesToScroll: 1,
    centerMode: slidesToShow === 3, // only center on desktop
    centerPadding: "0px",
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = `*[_type == "eboard"] | order(date asc) {
            _id,
            name,
            title,
            description,
            "image": image.asset->url,
          }`;

        const data = await client.fetch(query);
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
        /* IMPORTANT: Put the Slider OUTSIDE the map */
        <Slider {...settings}>
          {events.map((event) => (
            <Card
              key={event._id}
              title={event.title}
              name={event.name}
              image={event.image}
              description={event.description}
            />
          ))}
        </Slider>
      ) : (
        <div className="text-center text-gray-500 py-10">
          No eboard members found.
        </div>
      )}
    </div>
  );
};

export default Eboard;
