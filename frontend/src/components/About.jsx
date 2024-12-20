import React, { useState, useEffect } from 'react';
import aboutImg from '../assets/about.jpg';
import { RiDoubleQuotesL } from 'react-icons/ri';
import CountUp from 'react-countup';


const About = () => {

  const statistics = [
    {
      label: "Happy clients", value: 12
    },
    {
      label: "Diferents cities", value: 3
    },
    {
      label: "Projects completed", value: 45
    },
  ]

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if(aboutSection){
        const top = aboutSection.getBoundingClientRect().top;   // Posición del borde superior del elemento 'about' relativo a viewport
        const isVisible = top < window.innerHeight - 100        // Si el borde superior del elemento 'about' está a menos de 100 píxeles de la parte inferior de la ventana, se considera visible.
        setIsVisible(isVisible)
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  },[])

  return (
    <section className="max-padd-container py-16 xl:py-28" id="about">
      {/* container */}
      <div className="flex flex-col xl:flex-row gap-10">
        {/* left */}
          <div className="flex-1 relative">
            <img 
              src={aboutImg} 
              alt="" 
              className="rounded-3xl rounded-tr-[155px] w-[488px]"
            />
            <div className="bg-white absolute bottom-16 left-16 max-w-xs p-4 rounded-lg flexCenter flex-col">
              <span className="relative bottom-8 p-3 shadow-md bg-white h-12 w-12 flex items-center rounded-full">
                <RiDoubleQuotesL className="text-2xl" />
              </span>
              <p className="text-center relative bottom-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              </p>
            </div>
          </div>
        {/* right */}
        <div className="flex-1 flex justify-center flex-col">
          <span className="medium-18">Unveiling Our Journey</span>
          <h2 className="h2">Our Commitment Crafting Extraordinary Real Estate Experiences</h2>
          <p className="py-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat.
          </p>
          {/* Statistics container */}
          <div className="flex flex-row gap-4">
            {statistics.map((statistic, index) => (
              <div key={index} className="bg-primaryp-4 rounded-lg">
                <div className="flex items-center gap-1">
                  <CountUp
                    start={isVisible ? 0 : null}
                    end={statistic.value}
                    duration={10}
                    delay={3}
                  >
                    {({countUpRef}) => (
                      <h3 ref={countUpRef} className='text-2xl font-semibold'></h3>
                    )}
                  </CountUp>
                  <h4 className='bold-22'>k+</h4>
                </div>
                <p>{statistic.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About