import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { client } from '../sanityClient';

const Projects = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH EVENTS
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = `*[_type == "project"] | order(_createdAt asc) {
          _id,
          title,
          date,
          description,
          "image": image.asset->url,
          sections
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
      <h1 className='text-center py-5 text-4xl font-bold text-primary uppercase tracking-wider'>Projects</h1>
      
      {/* --- PROJECTS LIST --- */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 max-w-5xl mx-auto gap-6 px-4 pb-20'>

        {loading ? ( 
            /* IF LOADING */
            <div className="text-center text-secondary/50 py-10"> Loading Projects... </div>
        ) : events.length > 0 ? (
          
          /* IF DONE LOADING, AND PROJECTS EXIST */
          events.map((event, index) => (
            <div key={event._id || index} className="relative group/wrapper">
              {/* The Actual Card Component */}
              <ProjectCard 
                title={event.title} 
                date={event.date} 
                image={event.image}
                index={index}
              > 
                <p>{event.description}</p>
                {event.sections.map((section, i) => (
                <div key={i}>
                  <h4>{section.heading}</h4>
                  <p>{section.body}</p>
                </div> ))}
              </ProjectCard>
            </div> 
          ))
        ) : (
          /* IF DONE LOADING, AND NO PROJECTS */
          <div className="text-center text-secondary/50 py-10"> No projects found. Please try again. </div>
        )}
      </div>
    </div>
  );
}

export default Projects;