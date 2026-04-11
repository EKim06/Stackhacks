import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { FaCode, FaUsers, FaRocket } from 'react-icons/fa'
import { LogoCloud } from '@/components/ui/logo-cloud-3'
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero'
import { cn } from '@/lib/utils'
import logoGtis from '@/img/Orgs/gtis.avif'
import logoBloomberg from '@/img/Orgs/bloomberg.png'
import logoIntel from '@/img/Orgs/intel.png'
import logoOracle from '@/img/Orgs/orcale.png'
import logoCapitalOne from '@/img/Orgs/captial.jpeg'
import logoAmazon from '@/img/Orgs/amazon.png'
import logoCiti from '@/img/Orgs/citi.png'
import logoInfosys from '@/img/Orgs/infosys.jpeg'
import logoJaneStreet from '@/img/Orgs/jane.png'
import logoNasa from '@/img/Orgs/nasa.jpeg'
import logoRre from '@/img/Orgs/rre ventures.jpeg'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

/** Local org logos (`src/img/Orgs`). Full-color assets — no invert filter. */
const partnerLogos = [
  { src: logoGtis, alt: 'GTIS Partners', monochrome: false },
  { src: logoBloomberg, alt: 'Bloomberg', monochrome: false },
  { src: logoIntel, alt: 'Intel', monochrome: false },
  { src: logoOracle, alt: 'Oracle', monochrome: false },
  { src: logoCapitalOne, alt: 'Capital One', monochrome: false },
  { src: logoAmazon, alt: 'Amazon', monochrome: false },
  { src: logoCiti, alt: 'Citi', monochrome: false },
  { src: logoInfosys, alt: 'Infosys', monochrome: false },
  { src: logoJaneStreet, alt: 'Jane Street', monochrome: false },
  { src: logoNasa, alt: 'NASA', monochrome: false },
  { src: logoRre, alt: 'RRE Ventures', monochrome: false },
]

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
     className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-tertiary rounded-full p-3 shadow-lg hover:bg-accent hover:text-black transition-all -mr-4 md:-mr-12"
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
     className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-tertiary rounded-full p-3 shadow-lg hover:bg-accent hover:text-black transition-all -ml-4 md:-ml-12"
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
  const [showHeroOverlay, setShowHeroOverlay] = useState(true)
  const [heroFadingOut, setHeroFadingOut] = useState(false)
  const [pageFadingIn, setPageFadingIn] = useState(false)

  const beginIntroExit = useCallback(() => {
    setPageFadingIn(true)
    setHeroFadingOut(true)
    window.setTimeout(() => {
      setShowHeroOverlay(false)
      window.scrollTo(0, 0)
    }, 750)
  }, [])

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

  const pageBody = (
    <div className="bg-background text-primary">
      <section className="px-4 py-14 text-center sm:px-6">
        <h2 className="mb-4 text-4xl font-bold text-primary md:text-5xl">What we do</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-secondary">
          We are a computer science club where you can build projects, learn new skills, and connect
          with other students.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/projects" className="btn-primary transition-all">
            View Projects
          </Link>
          <Link to="/contact" className="btn-secondary transition-all">
            Get in touch
          </Link>
        </div>
      </section>

     <section id="what-we-do" className="pt-6 pb-16 sm:pt-8 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-background">
       <div className="max-w-7xl mx-auto flex flex-col items-center">
         <h3 className="mb-8 w-full max-w-4xl text-center text-2xl font-semibold text-primary md:text-3xl">
           Project team
         </h3>
         <div className="relative pb-12 w-full max-w-4xl px-4 md:px-8 flex justify-center">
           <div className="w-full">
           <Slider {...whatWeDoSettings}>
            {whatWeDo.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="px-3 pt-4 h-full">
                  <div className="flex h-full min-h-[260px] flex-col bg-neutral-800 border border-white/15 p-8 rounded-2xl hover:border-white/25 transition-all duration-300 hover:-translate-y-1 group">
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
           <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
             Team
           </h2>
           <p className="text-xl text-secondary max-w-2xl mx-auto">
             Meet the people behind StackHacks
           </p>
         </div>
         <div className="relative px-8 md:px-16 pb-12">
           <Slider {...teamSettings}>
             {teamMembers.map((card, index) => (
               <div key={index} className="px-3">
                 <div className="bg-tertiary border border-white/15 rounded-2xl p-8 flex flex-col items-center text-center hover:border-white/25 transition-colors min-h-[220px]">
                   {card.img && (
                     <img
                       src={card.img}
                       alt=""
                       className="w-16 h-16 rounded-full object-cover mb-4 "
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

     <section className="relative bg-background px-4 py-16 sm:px-6 lg:px-8">
       <div
         aria-hidden="true"
         className={cn(
           'pointer-events-none absolute -top-1/2 left-1/2 -z-10 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-b-full',
           'bg-[radial-gradient(ellipse_at_center,rgba(242,240,239,0.08),transparent_50%)]',
           'blur-[30px]'
         )}
       />
       <div className="relative mx-auto max-w-3xl">
         <h2 className="mb-5 text-center text-lg font-medium leading-snug tracking-tight text-foreground md:text-2xl">
           <span className="text-muted-foreground">
             StackHacks members and alumni have professional experience with:
           </span>
         </h2>
         <LogoCloud logos={partnerLogos} />
       </div>
     </section>

     <style>{`
       #what-we-do .slick-track {
         display: flex !important;
         align-items: stretch;
       }
       #what-we-do .slick-slide {
         height: auto;
         display: flex !important;
       }
       #what-we-do .slick-slide > div {
         height: 100%;
         width: 100%;
       }
       .slick-dots li button:before {
         font-size: 12px;
         color: #feb23a;
       }
       .slick-dots li.slick-active button:before {
         color: #feb23a;
         opacity: 1;
       }
     `}</style>
    </div>
  )

  return (
    <div className="relative min-h-[100dvh] bg-background">
      <div
        className={cn(
          'transition-opacity duration-700 ease-out',
          pageFadingIn ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        {pageBody}
      </div>
      {showHeroOverlay && (
        <div
          className={cn(
            'fixed inset-0 z-40 transition-opacity duration-700 ease-out',
            heroFadingOut ? 'pointer-events-none opacity-0' : 'opacity-100'
          )}
        >
          <ScrollExpandMedia
            mediaType="image"
            mediaSrc="/SH.png"
            title="S H"
            date="StackHacks"
            scrollToExpand="Scroll to explore"
            onIntroComplete={beginIntroExit}
          >
            {null}
          </ScrollExpandMedia>
        </div>
      )}
    </div>
  )
}


export default Home



