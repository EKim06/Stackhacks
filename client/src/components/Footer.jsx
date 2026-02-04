import React from 'react'
import { Link } from 'react-router-dom'
import SH from '/SH.png'

const Footer = () => {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 items-center border-t border-t-tertiary'>
      
      <div className='col-start-1 p-8 max-w-[75%]'>
        <div className='flex flex-row items-center'> 
          <img src={SH} alt='logo' className='w-8 m-1 ml-0'/>
          <p className='text-accent'>StackHacks</p>
        </div>
        <p className='ml-1 text-secondary'>Empowering students to create, collaborate, and innovate through code. Join our community of passionate developers and makers.</p>
      </div>
      

      {/* 1x2 Grid inside the right column of the parent 1x2 grid */}
      <div className='grid grid-cols-1 xl:grid-cols-2 text-secondary px-8 items-center'> 

        <div className='flex flex-col xl:col-start-1'>
            <p className='text-primary'>Quick Links</p>
            <Link to='/about'>About</Link>
            <Link to='/'>Home</Link>
            <Link to='/contact'>Contact</Link>
        </div>

        <div className='flex flex-col xl:col-start-2 pt-4 xl:pt-0'>
          <p className='text-primary'>Connect</p>
          <a href='https://www.linkedin.com/company/stackhacks/posts/?feedView=all' target="_blank" rel="noopener noreferrer" >
            LinkedIn
          </a>
          <a href='https://www.instagram.com/stackhacksbu/?hl=en' target="_blank" rel="noopener noreferrer" >
            Instagram
          </a>
          <a href='https://github.com/stackhacksbu' target="_blank" rel="noopener noreferrer" >
            Github
          </a>
        </div>

      </div>

    </div>
  )
}

export default Footer