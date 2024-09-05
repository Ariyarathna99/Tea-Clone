import React from 'react'
import HeroContainer from '../components/hero/Hero'
import Footer from '../components/footer/Footer'
import Navigation from '../components/nav/Navigation'
import Services from '../components/cards/Services'

function Home() {
  return (
    <>
        <Navigation />
        <div className='main-container'>
            <video autoPlay loop muted className='video-background'>
              <source src={process.env.PUBLIC_URL + '/videos/sample.mp4'} type='video/mp4' />
              Your browser does not support the video tag.
          </video>
            <HeroContainer />
            {/* <div className='content-container'>
                <Services />
            </div> */}
            
        </div>
        

        <Footer />
    </>
  )
}

export default Home