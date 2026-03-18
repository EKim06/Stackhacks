import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { client } from "../sanityClient";

// Separate Card Component
function Card({ image, title, name, description }) {
  return (
    <div className="px-3">
      <div className="card flex flex-col items-center gap-3 w-full border border-gray-200 rounded-2xl shadow-md p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-accent cursor-pointer">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <h1 className="font-bold text-xl">{title}</h1>
        <h3 className="text-accent text-center">{name}</h3>
        <p className="text-sm text-gray-600 text-center">
          {description || "[No Description]"}
        </p>
      </div>
    </div>
  );
}

const Eboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: events.length > 3, // Only infinite if there are enough items
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
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
    <div className="w-full px-10 py-10">
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
