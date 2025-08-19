'use client';
import { ReactLenis } from 'lenis/react';
import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import Programme from '@/components/programme';
import NotreHistoire from '@/components/notre-histoire';
import GoogleMap from '@/components/google-map';
import SplashCursor from '@/components/ui/cursor';
import LogementAirbnb from '@/components/logement';





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

          <section id='programme' className='md:h-[150vh] h-[300vh] py-20 md:px-8 px-0 bg-black text-white sticky top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden'>
              <Programme />
          </section>


          <section id='venir' className='text-white md:h-screen h-[150vh] mb-16 p-6 bg-slate-950 grid place-content-center sticky top-0'>
            <GoogleMap 
                className="w-full"
              />
          </section>          
        </div>
        
        <section id='logement' className='text-white w-full bg-black p-2'>
          <div className='max-w-screen-md mx-auto'>
            <div className="mt-24 mb-10 flex flex-col items-center relative">
            {/* Ornements Art Déco */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-2">
              <div className="w-6 h-6 border-t-2 border-l-2 border-amber-400/60 rounded-tl-lg rotate-[-15deg]"></div>
              <div className="w-3 h-3 bg-amber-500 rounded-full mt-2"></div>
              <div className="w-6 h-6 border-t-2 border-r-2 border-amber-400/60 rounded-tr-lg rotate-[15deg]"></div>
            </div>    
            <h2 className="font-poiret-one text-4xl md:text-5xl font-medium text-white tracking-widest mb-2 relative z-10">
              Logements
              <span className="block mx-auto mt-2 w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded"></span>
            </h2>
            <p className="text-lg text-center text-white/60 max-w-xl my-2">
              Pour ceux qui souhaitent rester à proximité du lieu de la cérémonie, voici quelques options de logement recommandées :
            </p>
            {/* Ornement bas */}
            <div className="flex justify-center gap-2 mt-2">
              <div className="w-4 h-4 border-b-2 border-l-2 border-amber-400/60 rounded-bl-lg rotate-[15deg]"></div>
              <div className="w-2 h-2 bg-amber-500 rounded-full mb-1"></div>
              <div className="w-4 h-4 border-b-2 border-r-2 border-amber-400/60 rounded-br-lg rotate-[-15deg]"></div>
            </div>
          </div>
            <LogementAirbnb />
              </div>
        </section>
      
        <section id='histoire' className='text-white w-full bg-black p-2'>
            <NotreHistoire  />
        </section>


        <footer id="contact" className='md:h-max h-[45vh] group bg-slate-950 '>

          <section className='flex md:flex-row flex-col gap-4 pb-12 md:pt-0 pt-36 justify-center items-center text-center bg-black h-40 relative z-10 text-2xl rounded-tr-full rounded-tl-full'>
            <a href="mailto:am.agathe.martin@gmail.com" target="_blank" className="text-white font-poiret-one tracking-wider hover:underline">Mail</a>
                          {/* Séparateur losange Art Déco */}
              <div className="md:flex items-center justify-center">
                <div className="relative">
                    <div className="w-2 h-2 border-2 border-amber-400/60 rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"></div>
                </div>
              </div>
            <a href="tel:0673981638" target="_blank" className="text-white font-poiret-one tracking-wider hover:underline">Téléphone</a>
              <div className="md:flex items-center justify-center">
                <div className="relative">
                    <div className="w-2 h-2 border-2 border-amber-400/60 rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"></div>
                </div>
              </div>
            <a href="https://open.spotify.com/playlist/55QbUOCQ3lDyTkITkJlo3R?si=4bf0f57c511a4eac&pt=5d6985ad0c4e9ab5a185cbb4c1e2b8a7" target="_blank" className="text-white font-poiret-one tracking-wider hover:underline">Contribuer à la playlist Spotify</a>        
                        
                        
            <div className="md:flex items-center justify-center">
                <div className="relative">
                    <div className="w-2 h-2 border-2 border-amber-400/60 rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"></div>
                </div>
              </div>
            <a href="https://www.leetchi.com/c/mariage-da-agathe-et-alain-1519924?utm_source=native&utm_medium=social_sharing" target="_blank" className="text-white font-poiret-one tracking-wider hover:underline">Cagnotte Cadeau</a>        
              
          </section>
        </footer>
      </main>
    </ReactLenis>
    </>
  );
}