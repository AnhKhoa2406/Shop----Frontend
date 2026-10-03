import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BesetSeller from '../components/BesetSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'


const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BesetSeller />
      <OurPolicy />
      <NewsletterBox />
     
    </div>
  )
}

export default Home