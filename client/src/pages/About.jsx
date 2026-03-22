
import {useState, useEffect} from 'react'
import Image from "../data/img";
import { aboutContent } from '../data/content'
import SH from '/SH.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';              
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { client } from '../sanityClient';


const About = () => {
  const [aboutUs, setAboutUs] = useState([]);
  const [founders, setFounders] = useState([]);
  const [involvement, setInvolvement] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH EVENTS
  useEffect(() => {
    // const fetchAbout = async () => {
    //   try {
    //     const query = `*[_type == "about"] | order(date asc) {
    //       _id,
    //       description
    //     }`;

    //     const data = await client.fetch(query);
    //     setAboutUs(data);
    //   } catch (e) {
    //     console.error("Failed to fetch about from Sanity: ", e);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const fetchFounders = async () => {
      try {
        const query = `*[_type == "founder"] | order(_createdAt asc) {
          _id,
          name,
          position,
          "image": image.asset->url,
        }`;

        const data = await client.fetch(query);
        setFounders(data);
      } catch (e) {
        console.error("Failed to fetch about from Sanity: ", e);
      } finally {
        setLoading(false);
      }
    };
    // const fetchInvolvement = async () => {
    //   try {
    //     const query = `*[_type == "involvement"] | order(date asc) {
    //       _id,
    //       title,
    //       description
    //     }`;

    //     const data = await client.fetch(query);
    //     setInvolvement(data);
    //   } catch (e) {
    //     console.error("Failed to fetch about from Sanity: ", e);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    //fetchAbout();
    fetchFounders();
    //fetchInvolvement();
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

      {/* ── About Us ── */}
      <section className="mb-20">
        <h1 className='text-center my-10 text-accent'>About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          <img
            src={SH}
            alt='StackHacks Logo'
            className='col-span-1 mx-auto w-3/4 md:w-full h-auto'
          />
          <p className='col-span-2 mx-auto text-justify'>
            Welcome to <span className='text-accent font-bold'>StackHacks</span>, we are an organization
            geared towards project development. Our mission is to expand coding skills, tackle practical
            technology challenges, and support the educational and professional advancement of
            underrepresented communities in technology. {aboutContent.description}
          </p>
        </div>
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
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                navigation
                pagination
                autoplay={{ delay: 2000 }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {founders.map((el, i) => (
                  <SwiperSlide key={el._id || i} >
                    <div className="bg-tertiary p-6 rounded-xl">
                      <img
                        src={el.image} 
                        alt={el.name}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                        width={500}
                        height={500}
                      />
                      <h3 className="text-accent text-xl">{el.name}</h3>
                      <p className="text-secondary italic">{el.position}</p>
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