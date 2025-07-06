'use client';
import { ReactLenis } from 'lenis/react';
import Gallery from "@/components/gallery";
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

          <section id='programme' className='h-screen py-20 px-8 bg-black text-white sticky top-24 rounded-tr-2xl rounded-tl-2xl overflow-hidden'>
              <Programme />
          </section>


          <section className='text-white  h-screen  w-screen bg-slate-950 grid place-content-center sticky top-0'>
            <GoogleMap 
                className="w-full"
              />
          </section>          
        </div>
        
      
        <section className='text-white  w-full bg-black'>
            <NotreHistoire  />
        </section>



        <footer className='group bg-slate-950 '>
          <h1 className='text-[16vw] group-hover:translate-y-4 translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear'>
            A bientôt
          </h1>
          <section className='bg-black h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'>
            Thanks for Scrolling
          </section>
        </footer>
      </main>
    </ReactLenis>
    </>
  );
}