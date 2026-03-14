import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import { client } from '../sanityClient';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH EVENTS
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = `*[_type == "event"] | order(date asc) {
          _id,
          title,
          date,
          "image": image.asset->url,
          description
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
    <div>
      <h1 className='text-center py-5 text-4xl font-bold text-primary tracking-wider uppercase'>Events</h1>
      
      {/* --- EVENTS LIST --- */}
      <div className='flex flex-col max-w-5xl mx-auto gap-6 px-4 pb-20'>

        {loading ? ( 
            /* IF LOADING */
            <div className="text-center text-secondary/50 py-10"> Loading Events... </div>
        ) : events.length > 0 ? (
          
          /* IF DONE LOADING, AND EVENTS EXIST */
          events.map((event, index) => (
            <div key={event._id || index} className="relative group/wrapper">
              {/* The Actual Card Component */}
              <EventCard 
                title={event.title} 
                date={event.date} 
                image={event.image}
                index={index}
              > 
                <p>{event.description}</p> 
              </EventCard>
            </div> 
          ))
        ) : (
          /* IF DONE LOADING, AND NO EVENTS */
          <div className="text-center text-secondary/50 py-10"> No events found. Please try again. </div>
        )}
      </div>
    </div>
  );
}

export default Events;