'use client';
import { ReactLenis } from 'lenis/react';
import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import Programme from '@/components/programme';
import NotreHistoire from '@/components/notre-histoire';
import GoogleMap from '@/components/google-map';
import SplashCursor from '@/components/ui/cursor';





export default function Index() {
  return (
    <>
    <SplashCursor />

    <ReactLenis root>
      <main className='bg-black'>
        <Navbar />
        <div className='wrapper'>
          <section className='m-0 p-0 flex flex-col justify-center align-middle text-black h-screen w-full sticky top-0 overflow-hidden'>
              {/* <MountainVillageBackground /> */}
              <div className="relative z-10">
                <Hero />
                {/*<MorphingText texts={texts} className='text-black font-light' />*/}
              </div>
          </section>

          <section id='programme' className='md:h-screen h-[120vh] py-20 md:px-8 px-0 bg-black text-white sticky top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden'>
              <Programme />
          </section>


          <section id='venir' className='text-white md:h-screen h-[120vh] mb-16 p-6 bg-slate-950 grid place-content-center sticky top-0'>
            <GoogleMap 
                className="w-full"
              />
          </section>          
        </div>
        
      
        <section id='histoire' className='text-white w-full bg-black p-2'>
            <NotreHistoire  />
        </section>



        <footer id="contact" className='md:h-max h-[40vh] group bg-slate-950 '>

          <section className='flex md:flex-row flex-col gap-4 pb-12 md:pt-0 pt-36 justify-center items-center text-center bg-black h-40 relative z-10 text-2xl rounded-tr-full rounded-tl-full'>
            <a href="mailto:am.agathe.martin@gmail.com" className="text-white font-poiret-one tracking-wider hover:underline">Mail</a>
                          {/* Séparateur losange Art Déco */}
              <div className="md:flex items-center justify-center">
                <div className="relative">
                    <div className="w-2 h-2 border-2 border-amber-400/60 rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"></div>
                </div>
              </div>
            <a href="tel:0673981638" className="text-white font-poiret-one tracking-wider hover:underline">Téléphone</a>
              <div className="md:flex items-center justify-center">
                <div className="relative">
                    <div className="w-2 h-2 border-2 border-amber-400/60 rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"></div>
                </div>
              </div>
            <a href="https://open.spotify.com/playlist/55QbUOCQ3lDyTkITkJlo3R?si=4bf0f57c511a4eac&pt=5d6985ad0c4e9ab5a185cbb4c1e2b8a7" className="text-white font-poiret-one tracking-wider hover:underline">Contribuer à la playlist Spotify</a>        
                        
                        
           {/* <div className="hidden md:flex items-center justify-center">
                <div className="relative">
                    <div className="w-2 h-2 border-2 border-amber-400/60 rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"></div>
                </div>
              </div>
            <a href="#" className="text-white font-poiret-one text-base tracking-wider hover:underline">Cagnotte Cadeau</a>        
              */}
          </section>
        </footer>
      </main>
    </ReactLenis>
    </>
  );
}