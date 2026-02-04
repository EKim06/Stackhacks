import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div >
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center px-4 relative overflow-hidden">
        {/* Background pattern */}
        <div className="pb-60 inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 right-0 h-1/2">
            <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
              <path
                d="M0,200 Q300,100 600,200 T1200,200 L1200,400 L0,400 Z"
                fill="none"
                stroke="#feb23a"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <path
                d="M0,250 Q300,150 600,250 T1200,250 L1200,400 L0,400 Z"
                fill="none"
                stroke="#feb23a"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <path
                d="M0,300 Q300,200 600,300 T1200,300 L1200,400 L0,400 Z"
                fill="none"
                stroke="#feb23a"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary">
            Join StackHacks
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-secondary max-w-2xl mx-auto">
            We are a computer science club where you can build projects, 
            develop professional skills, and network  with other students. 
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className='btn-primary py-2 px-6'>Learn more</button>
            <button className='btn-secondary py-2 px-6'>Contact</button>
          </div>
        </div>

        
        {/* Features <div className="relative z-10  pb-8 text-center">
          <p className="text-accent text-sm md:text-base space-x-4 md:space-x-6">
            <span>No Membership Fees</span>
            <span></span>
            <span>Open to All Skill Levels</span>
            <span></span>
            <span>Real Project Experience</span>
            <span></span>
            <span>Industry Connections</span>
            <span></span>
            <span>Hackathon Opportunities</span>
          </p>
        </div>*/}
      </section> 


    </div>
  )
}

export default Home
