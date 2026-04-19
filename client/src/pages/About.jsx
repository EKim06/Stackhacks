import { useState, useEffect } from 'react'
import { aboutContent } from '../data/content'
import SH from '/SH.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { client } from '../sanityClient';
import { CircularDisplay } from '../components/CircularDisplay';

const About = () => {
  const [founders, setFounders] = useState([]);
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foundersData, aboutData] = await Promise.all([
          client.fetch(`*[_type == "founder"] | order(_createdAt asc) {
            _id,
            name,
            position,
            "image": image.asset->url,
          }`),
          client.fetch(`*[_type == "about"] | order(_createdAt asc) {
            _id,
            title,
            subtitle,
            text,
            "image": image.asset->url,
          }`),
        ]);
        setFounders(foundersData);
        setAbout(aboutData);
      } catch (e) {
        console.error("Failed to fetch data from Sanity: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const explainArray = [
    {
      method: "Monitor Announcements",
      info: "StackHacks mainly uses social media, such as LinkedIn or Instagram. These are where we announce when applications are open for new members, when project teams open up, and when executive board or intern applications open."
    },
    {
      method: "Apply Online",
      info: "When applications open up a Google form will be sent out to students who are interested. Make sure to check your emails for this form.",
    },
    {
      method: "Attend Events",
      info: "Getting involved in StackHacks events allows you to meet with current members to hear about opportunities first hand",
    },
    {
      method: "Check the University Website",
      info: "The university website may also have information and even provide ways to contact the members."
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

    {/* ── About Us (Circular Testimonials) ── */}
    <section className="mb-20">
      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading...</div>
      ) : (
        <div className="flex items-center justify-center">
          <CircularDisplay
            testimonials={about}
            autoplay={true}
            colors={{
              name: "var(--color-primary)",
              designation: "var(--color-primary)",
              testimony: "var(--color-secondary)",
              arrowBackground: "var(--color-background)",
              arrowForeground: "var(--color-secondary)",
              arrowHoverBackground: "var(--color-tertiary)",
            }}
            fontSizes={{
              name: "28px",
              designation: "20px",
              quote: "18px",
            }}
          />
        </div>
      )}
    </section>

      {/* ── Meet the Founders ── */}
      <section className="mb-20">
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading Founders...</div>
        ) : founders.length > 0 ? (
          <>
            <h2 className="pb-4 mb-10">Meet the Founders</h2>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={-50}
              slidesPerView={1}
              loop={true}
              navigation
              pagination
              speed={800}
              autoplay={{ delay: 2000 }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {founders.map((el, i) => (
                <SwiperSlide key={el._id || i}>
                  <div className="bg-tertiary p-6 mb-12 rounded-xl w-[75%] mx-auto">
                    <img
                      src={el.image}
                      alt={el.name}
                      className="w-60 h-64 object-cover rounded-lg mb-4 mx-auto"
                      width={500}
                      height={500}
                    />
                    <h3 className="text-accent text-xl text-center">{el.name}</h3>
                    <p className="text-secondary italic text-center">{el.position}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <div className="text-center text-secondary/50 py-10">
            No founders found.
          </div>
        )}
      </section>

      {/* ── How to Get Involved ── */}
      <section className='bg-tertiary/30 p-10 rounded-2xl mb-10'>
        <h2 className="mb-10 text-3xl font-bold border-b border-tertiary pb-4 text-accent">
          How to Get Involved
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {explainArray.map((el, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <h3 className="text-accent text-2xl font-bold mb-4">{el.method}</h3>
              <p className="text-secondary leading-relaxed text-lg">{el.info}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default About