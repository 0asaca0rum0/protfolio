import Header from './components/header'
import Hero from './components/hero'
import Carousel from './components/Carousel'
import Projects from './components/projects'
import Footer from './components/footer'
import Contact from './components/contact'
import { useEffect, useState } from 'react';

function App() {
  const [condition, setCondition] = useState(false);
  const [location, setLocation] = useState("");
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== "/") {
      setLocation(window.location.pathname);
      setCondition(true)
    } 
  }, []);
  if (!condition) {
    return (
      <div className='flex flex-col pt-16 items-center  justify-around h-full w-full' >
        <div id='top'></div>
        <Header islight={false} />
        <Hero />
        <Carousel />
        <Projects />
        <Contact />
        <Footer />
      </div>
    )
  } else {
    return (
      <div className="flex justify-center items-center h-screen ">
        <div className="bg-inherit bg-opacity-50 backdrop-filter backdrop-blur w-full h-full flex items-center flex-col justify-center text-center rounded-lg p-8 shadow-xl">
          <h1 className="text-6xl text-white mb-4">404</h1>
          <p className="text-2xl text-white">Elmasri.pages.dev{location} does not exist</p>
          <a href="/" className='text-lg mt-10 bg-red-500 rounded-md    p-2 '>return home</a>      </div>
      </div>
    )
  }
}

export default App
