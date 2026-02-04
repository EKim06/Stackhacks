import React from 'react'
import { aboutContent } from '../data/content'
import SH from '/SH.png'

const About = () => {
  return (
    <div>
      <h1 className='text-center my-10'>About Us</h1>
      <div className='w-full grid grid-cols-1 md:grid-cols-3 mx-auto items-center max-w-7xl'>
        <img src={SH} alt='logo' className='col-span-1 mx-auto w-[75%]'/>
        <p className='col-span-2 mx-auto'>{aboutContent.description}</p>
      </div>
    </div>
  )
}

export default About