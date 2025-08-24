import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Hero2 from '../Components/Hero2'
import { Fotter } from '../Components/Fotter'

function Home() {
  return (
    <div className='relative'>
      <Navbar/>
      <Hero/>
      <Hero2/>
      <Fotter/>
      
      
    </div>
  )
}

export default Home
