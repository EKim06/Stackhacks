import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { FaCode, FaUsers, FaRocket } from 'react-icons/fa'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const whatWeDo = [
  { icon: FaCode, title: 'Web Development', description: 'juhiuu' },
  { icon: FaUsers, title: 'AI', description: 'jiknjn' },
  { icon: FaRocket, title: 'Cybersecurity', description: 'ijnjknj' },
]

const teamMembers = [
  { title: 'TBD', text: 'Core team add your execs here once you have them.', img: null },
  { title: 'TBD', text: 'Core team add your execs here once you have them.', img: null },
  { title: 'TBD', text: 'Core team add your execs here once you have them.', img: null },
  { title: 'TBD', text: 'Core team add your execs here once you have them.', img: null },
  { title: 'TBD', text: 'Core team add your execs here once you have them.', img: null }

]


function NextArrow(props) {
 const { onClick } = props
 return (
   <button
     type="button"
     onClick={onClick}
     className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-accent hover:text-black transition-all -mr-4 md:-mr-12"
     aria-label="Next slide"
   >
     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
     </svg>
   </button>
 )
}


function PrevArrow(props) {
 const { onClick } = props
 return (
   <button
     type="button"
     onClick={onClick}
     className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-accent hover:text-black transition-all -ml-4 md:-ml-12"
     aria-label="Previous slide"
   >
     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
     </svg>
   </button>
 )
}


const defaultSliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  dotsClass: 'slick-dots !bottom-[-40px]',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

const Home = () => {
  const whatWeDoSettings = {
    ...defaultSliderSettings,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }
  const teamSettings = {
    ...defaultSliderSettings,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }


 return (
   <div className="min-h-screen">
     {/* Hero Section */}
     <section className="min-h-screen flex flex-col items-center justify-center px-4">
       <div className="text-center max-w-4xl">
         <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary">
           Join StackHacks
         </h1>
        
         <p className="text-xl md:text-2xl mb-10 text-primary/90 max-w-2xl mx-auto">
           We are a computer science club where you can build projects,
           learn new skills, and connect with other students.
         </p>


         <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
           <Link
             to="/contact"
             className="bg-accent text-black px-8 py-4 rounded-lg font-semibold text-lg hover:brightness-110 transition-all"
           >
             Join us
           </Link>
           <Link
             to="/contact"
             className="border-2 border-accent text-accent px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent/10 transition-all"
           >
             Get in touch
           </Link>
         </div>
       </div>
     </section>


     <section id="what-we-do" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
       <div className="max-w-7xl mx-auto flex flex-col items-center">
         <div className="text-center mb-16 w-full">
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
             What we do
           </h2>
           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
             jknkljkmnkj m
           </p>
         </div>
         <div className="relative pb-12 w-full max-w-4xl px-4 md:px-8 flex justify-center">
           <div className="w-full">
           <Slider {...whatWeDoSettings}>
             {whatWeDo.map((item, index) => {
               const Icon = item.icon
               return (
                 <div key={index} className="px-3">
                   <div className="bg-neutral-800 border border-white/15 p-8 rounded-2xl hover:border-white/25 transition-all duration-300 hover:-translate-y-1 group h-full">
                     <div className="bg-accent/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                       <Icon className="text-accent group-hover:text-black transition-colors w-8 h-8" />
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-3">
                       {item.title}
                     </h3>
                     <p className="text-gray-400 leading-relaxed">
                       {item.description}
                     </p>
                   </div>
                 </div>
               )
             })}
           </Slider>
           </div>
         </div>
       </div>
     </section>


     {/* Team Section */}
     <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
       <div className="max-w-7xl mx-auto">
         <div className="text-center mb-16">
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
             Team
           </h2>
           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
             Meet the people behind StackHacks
           </p>
         </div>
         <div className="relative px-8 md:px-16 pb-12">
           <Slider {...teamSettings}>
             {teamMembers.map((card, index) => (
               <div key={index} className="px-3">
                 <div className="bg-neutral-800 border border-white/15 rounded-2xl p-8 flex flex-col items-center text-center hover:border-white/25 transition-colors min-h-[220px]">
                   {card.img && (
                     <img
                       src={card.img}
                       alt=""
                       className="w-16 h-16 rounded-full object-cover mb-4 bg-neutral-600"
                     />
                   )}
                   <h3 className="font-bold text-white text-xl mb-3">{card.title}</h3>
                   <p className="text-gray-300 text-base leading-relaxed max-w-sm">{card.text}</p>
                 </div>
               </div>
             ))}
           </Slider>
         </div>
       </div>
     </section>

     <style>{` .slick-dots li button:before {
     font-size: 12px;
     color: #feb23a;
     }
     
     .slick-dots li.slick-active button:before {
     color: #feb23a;
     opacity: 1;
     } `
     }
     
     </style>

     {/*Next Section Here*/}

   </div>
 )
}


export default Home



