import React from 'react'
import Image from "../data/img";
import { aboutContent } from '../data/content'
import SH from '/SH.png'

//Internal Import
// import Style from "../styles/aboutus.module.css"


const About = () => {
  const founderArray = [
    {name: "David Ponce" , position: "Chief Executive Officer", images: Image.David_Ponce},
    {name: "Jack Hunter" , position: "Chief Technology Officer", images: Image.Jack_Hunter},
    {name: "Angelina Ponce" , position: "Chief Marketing Officer", images: Image.Angelina_Ponce},
    {name: "Aditya Kapoor" , position: "Chief Financial Officer", images: Image.Aditya_Kapoor},
    {name: "Shahida Chowdhury" , position: "Chief Operating Officer", images: Image.Shahida_Chowdhury},
    {name: "Hilary Rojas Rosales" , position: "Director of Professional Development", images: Image.Hilary_Rojas_Rosales},
    {name: "Erika Nelson" , position: "Director of Communications", images: Image.Erika_Nelson},
    {name: "Ryan Gallego" , position: "Director of Events and Community Engagement", images: Image.Ryan_Gallego},
    {name: "Elizabeth Tirado" , position: "Director of Team Excellence", images: Image.Elizabeth_Tirado},
  ]
  
  const explainArray = [
    {
      method: "Monitor Announcements",
      info: "StackHacks maily uses social media, such as Linkedln or Instragram. These are where we announce when applications are open for new members, when project teams open up, and when executive board or intern applications open."
    },

    {
      method: "Apply Online" ,
      info: "When applications open up a google form will be sent out to students who are interested. Make sure to check your emails for this form." ,
    },

    {
      method: "Attend Events",
      info: "Getting involved in Stackhacks events allows you to meet with current members to hear about opportunities first hand",
    },

    {
      method: "Check the University Website",
      info: "The university website may also have information and even provide ways to contact the members."
    }
  ]

  // const projectTeams = [
  //   {Team: , Pos}
  // ]
  
  return(
    <div>
      <div>
        <div>
          <div>
            <h1 className='text-center my-10'>About Us</h1>
            <div className='w-full grid grid-cols-1 md:grid-cols-3 mx-auto items-center max-w-7xl'>

            <img src={SH} alt='logo' className='col-span-1 mx-auto w-[75%]'/>
             <p className='col-span-2 mx-auto text-justify'> Welcome to StackHacks, we are an organization geared towards project development. 
              Our mission is to expand cdoing skills, tackle practical technology challenges, and support the educational  and professional advancement
              of underrepresented communities in technology.{aboutContent.description}</p>
            </div>
          </div>
          <div>
            <h2>Founders</h2>
            <p>David Ponce</p>
          </div>
        </div>
        <div>
          <h2>Project Teams</h2>
          <p>N/A</p>
        </div>
        <div>
          <div>
            {founderArray.map((el, i)=> (
              <div>
                <img 
                src={el.images} 
                alt={el.name} 
                width={500} 
                height={500}
                />
                <h3>{el.name}</h3>
                <p>{el.posiion}</p>
              </div>
            ))}
          </div>
          <div>
            {explainArray.map((el, i)=> (
              <div> 
                <h3>{el.title}</h3>
                <p>{el.info}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About