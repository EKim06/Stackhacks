import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { client } from '../sanityClient'
import { CircularDisplay } from '../components/CircularDisplay'
import { ArrowLeft, ArrowRight, Bell, FileText, Calendar, Globe } from 'lucide-react'

const getInvolvedSteps = [
  {
    step: "01",
    icon: Bell,
    title: "Monitor Announcements",
    description: "StackHacks regularly posts updates via LinkedIn and Instagram when applications open for general membership, project teams, and executive internships."
  },
  {
    step: "02",
    icon: FileText,
    title: "Apply Online",
    description: "When applications open at the start of each semester, a simple online interest form is sent to students to match your interests with our active tracks."
  },
  {
    step: "03",
    icon: Calendar,
    title: "Attend Events",
    description: "Participate in hands-on workshops, tech talks, and open project demo days to meet current team leads and experience our development culture."
  },
  {
    step: "04",
    icon: Globe,
    title: "Check Campus Portal",
    description: "Watson College bulletins and Binghamton University student organization portals provide additional ways to connect with active e-board officers."
  }
]

const fallbackAbout = [
  {
    _id: "about-1",
    title: "About Us",
    subtitle: "Who We Are",
    text: "StackHacks is a project-driven computer science club at Binghamton University's Thomas J. Watson College of Engineering and Applied Science. We welcome members of all backgrounds and experience levels, creating an collaborative space where everyone learns, builds, and grows together.",
    image: "/SH.png"
  }
]

const About = () => {
  const [founders, setFounders] = useState([])
  const [about, setAbout] = useState([])
  const [loading, setLoading] = useState(true)

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
        ])
        setFounders(foundersData || [])
        setAbout(aboutData?.length ? aboutData : fallbackAbout)
      } catch (e) {
        console.error("Failed to fetch data from Sanity: ", e)
        setAbout(fallbackAbout)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-24">

      {/* ── About Us (Circular Showcase) ── */}
      <section>
        {loading ? (
          <div className="text-center text-secondary/50 py-16">Loading Story...</div>
        ) : (
          <CircularDisplay testimonials={about} autoplay={true} />
        )}
      </section>

      {/* ── Meet the Founders ── */}
      <section className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-5"
        >
          <div>
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-accent mb-1">
              Origins
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary">
              Meet the Founders
            </h2>
          </div>

          {/* Dedicated External Carousel Navigation */}
          {founders.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                id="founders-prev"
                type="button"
                aria-label="Previous slide"
                className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.03] text-primary flex items-center justify-center hover:border-accent/60 hover:text-accent hover:bg-white/[0.06] transition-all duration-200 cursor-pointer disabled:opacity-30"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                id="founders-next"
                type="button"
                aria-label="Next slide"
                className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.03] text-primary flex items-center justify-center hover:border-accent/60 hover:text-accent hover:bg-white/[0.06] transition-all duration-200 cursor-pointer disabled:opacity-30"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>

        {loading ? (
          <div className="text-center text-secondary/50 py-16">Loading Founders...</div>
        ) : founders.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={founders.length > 3}
            navigation={{
              prevEl: '#founders-prev',
              nextEl: '#founders-next',
            }}
            pagination={{ clickable: true }}
            speed={600}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {founders.map((founder, i) => (
              <SwiperSlide key={founder._id || i}>
                <div className="tech-card group p-5 flex flex-col items-center gap-4 cursor-pointer transition-all duration-300 hover:border-accent/50 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-white/[0.04]">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="text-center w-full space-y-1">
                    <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">
                      {founder.name}
                    </h3>
                    <span className="inline-block text-xs font-medium uppercase tracking-wider text-accent/90">
                      {founder.position}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center text-secondary/50 py-12">
            No founders registered currently.
          </div>
        )}
      </section>

      {/* ── How to Get Involved ── */}
      <section className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-accent mb-1">
            Join the Community
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary">
            How to Get Involved
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {getInvolvedSteps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.step}
                className="tech-card p-6 flex flex-col justify-between space-y-5 hover:border-accent/40 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-secondary/40">
                    {step.step}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

    </div>
  )
}

export default About