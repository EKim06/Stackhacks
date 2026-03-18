
import React from 'react'
import Image from "../data/img";
import { aboutContent } from '../data/content'
import SH from '/SH.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';              // ✅ FIX 2: Added missing base Swiper CSS import
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const About = () => {
  const founderArray = [
    { name: "David Ponce",           position: "Chief Executive Officer",               images: Image.David_Ponce },
    { name: "Jack Hunter",           position: "Chief Technology Officer",              images: Image.Jack_Hunter },
    { name: "Angelina Ponce",        position: "Chief Marketing Officer",               images: Image.Angelina_Ponce },
    { name: "Aditya Kapoor",         position: "Chief Financial Officer",               images: Image.Aditya_Kapoor },
    { name: "Shahida Chowdhury",     position: "Chief Operating Officer",               images: Image.Shahida_Chowdhury },
    { name: "Hilary Rojas Rosales",  position: "Director of Professional Development", images: Image.Hilary_Rojas_Rosales },
    { name: "Erika Nelson",          position: "Director of Communications",            images: Image.Erika_Nelson },
    { name: "Ryan Gallego",          position: "Director of Events and Community Engagement", images: Image.Ryan_Gallego },
    { name: "Elizabeth Tirado",      position: "Director of Team Excellence",           images: Image.Elizabeth_Tirado },
  ]

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
        <h2 className="border-b border-tertiary pb-4 mb-10">Meet the Founders</h2>

        {/* ✅ FIX 1: Removed the stray <div key={i}> wrapper — Swiper's direct children must be <SwiperSlide> */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className='pb-12'
        >
          {founderArray.map((el, i) => (
            <SwiperSlide key={i}>
              {/* ✅ FIX 3: Removed duplicate key={i} from inner div */}
              <div className="bg-tertiary p-6 rounded-xl transition hover:scale-105 duration-300">
                <img
                  src={el.images}
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
      </section>

      {/* ── How to Get Involved ── */}
      {/* ✅ FIX 4: Restructured JSX — all sections now properly nested inside the single root <div> */}
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

      <div>
        <button className="btn-primary">View Current Projects</button>
        <button className="btn-secondary ml-4">Contact Us</button>
      </div>

    </div>
  )
}

export default About