import { useEffect } from 'react'
import Header from './components/header'
import Hero from './components/hero'
import Projects from './components/projects'
import Footer from './components/footer'
import Carousel from './components/Carousel'
import Contact from './components/contact'

function App() {


  return (
    <div className='flex flex-col pt-16 items-center bg-backgorund bg-center bg-cover bg-no-repeat justify-around h-full w-full' >
      <div id='top'></div>
      <Header islight={false} />
      <Hero />
      <Carousel />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
