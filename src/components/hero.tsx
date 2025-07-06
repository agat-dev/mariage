import React, { useEffect, useState, useRef } from 'react';
import { TextAnimate } from "@/components/magicui/text-animate";



export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [fadeStage, setFadeStage] = useState(0);
  const [lineVisible, setLineVisible] = useState([false, false, false, false, false]);
  const [barPosition, setBarPosition] = useState(-100);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Animation d'apparition progressive des lignes
    const lineSequence = [
      { delay: 500, line: 0 },   // Première ligne
      { delay: 1200, line: 1 },  // Deuxième ligne
      { delay: 1900, line: 2 },  // Troisième ligne
      { delay: 2600, line: 3 },  // Quatrième ligne
      { delay: 3300, line: 4 }   // Cinquième ligne
    ];

    lineSequence.forEach(({ delay, line }) => {
      setTimeout(() => {
        setLineVisible(prev => {
          const newVisible = [...prev];
          newVisible[line] = true;
          return newVisible;
        });
      }, delay);
    });

    // Animation de la barre verticale qui traverse l'écran
    const animateBar = () => {
      setBarPosition(prev => {
        if (prev > window.innerWidth + 100) {
          return -100; // Remet la barre à gauche quand elle sort à droite
        }
        return prev + 2; // Vitesse de déplacement
      });
      requestAnimationFrame(animateBar);
    };
    animateBar();

    // Animation du bruit de fond sur canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const createNoise = () => {
          const imageData = ctx.createImageData(canvas.width, canvas.height);
          const buffer = new Uint32Array(imageData.data.buffer);
          
          for (let i = 0; i < buffer.length; i++) {
            if (Math.random() < 0.1) {
              buffer[i] = 0xff000000;
            }
          }
          
          ctx.putImageData(imageData, 0, 0);
        };

        const animateNoise = () => {
          createNoise();
          requestAnimationFrame(animateNoise);
        };

        animateNoise();
      }
    }

    // Nettoyage
    return () => {
      // Nettoyage des timers est automatique avec les setTimeout individuels
    };
  }, []);

      const boxes = [
    {
      items: [
        {
          id: '12',
          chart: '/trizac-0.jpg',
          className: 'grid xl:col-span-1 col-start-1 col-end-3',
        },
        {
            id: '22',
            chart: '/trizac-1.jpg',
            className: 'grid xl:col-span-1 col-start-3 col-end-6',  
        },
        {
          id: '32',
          chart: '/trizac-2.jpg',
          className: 'grid xl:col-span-1 col-start-1 col-end-3',
        },
        {
          id: '42',
          chart: '/trizac-3.jpg',
          className: 'grid xl:col-span-1 col-start-3 col-end-6',
        },
        {
          id: '52',
          chart: '/trizac-4.jpg',
          className: 'grid xl:col-span-1 col-start-1 col-end-3',
        },
        {
          id: '62',
          chart: '/trizac-5.jpg',
          className: 'grid xl:col-span-1 col-start-1 col-end-3',
        },
        {
            id: '72',
            chart: '/trizac-6.jpg',
            className: 'grid xl:col-span-1 col-start-1 col-end-3',
        },
        {
            id: '82',
            chart: '/trizac-7.jpg',
            className: 'grid xl:col-span-1 col-start-1 col-end-3',
        },
        {
            id: '92',
            chart: '/trizac-8.jpg',
            className: 'grid xl:col-span-1 col-start-1 col-end-3',
        },
        {
          id: '102',
          chart: '/trizac-9.jpg',
          className: 'grid xl:col-span-1 col-start-3 col-end-6',
        }
        ],
        className: 'grid xl:grid-cols-6 grid-cols-3 gap-2',
    },
  ];

  return (
    <main className="relative h-screen w-screen overflow-hidden flex items-center justify-center flex-col">
      {/* Background gradient - style film muet */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to right, rgba(36,31,31,1) 0%, rgba(36,31,31,1) 32%, rgba(74,71,70,1) 100%)'
        }}
      />

      {/* Canvas pour le bruit de fond */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-10 opacity-30 pointer-events-none mix-blend-multiply"
        style={{ filter: 'contrast(170%) brightness(100%)' }}
      />

      {/* Effet de crépitement avec petits points blancs */}
      <div 
        className="absolute inset-0 z-11 pointer-events-none opacity-80"
        style={{
          background: `
            radial-gradient(circle 1px at 10% 20%, rgba(255,255,255,1) 0%, transparent 100%),
            radial-gradient(circle 0.5px at 25% 45%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(circle 1px at 40% 10%, rgba(255,255,255,1) 0%, transparent 100%),
            radial-gradient(circle 0.5px at 60% 35%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(circle 1px at 80% 60%, rgba(255,255,255,1) 0%, transparent 100%),
            radial-gradient(circle 0.5px at 15% 70%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(circle 1px at 35% 85%, rgba(255,255,255,1) 0%, transparent 100%),
            radial-gradient(circle 0.5px at 55% 75%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(circle 1px at 75% 25%, rgba(255,255,255,1) 0%, transparent 100%),
            radial-gradient(circle 0.5px at 90% 80%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(circle 1px at 20% 50%, rgba(255,255,255,1) 0%, transparent 100%),
            radial-gradient(circle 0.5px at 45% 95%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(circle 1px at 65% 15%, rgba(255,255,255,1) 0%, transparent 100%),
            radial-gradient(circle 0.5px at 85% 40%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(circle 1px at 5% 65%, rgba(255,255,255,1) 0%, transparent 100%)
          `,
          backgroundSize: '100px 100px, 80px 80px, 120px 120px, 70px 70px, 110px 110px, 90px 90px, 130px 130px, 60px 60px, 140px 140px, 85px 85px, 150px 150px, 75px 75px, 160px 160px, 65px 65px, 95px 95px',
          animation: 'crackle 0.2s infinite'
        }}
      />

      {/* Crépitement secondaire plus fin */}
      <div 
        className="absolute inset-0 z-12 pointer-events-none opacity-60"
        style={{
          background: `
            radial-gradient(circle 0.5px at 8% 12%, rgba(255,255,255,1) 0%, transparent 100%),
            radial-gradient(circle 0.3px at 22% 38%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(circle 0.5px at 37% 8%, rgba(255,255,255,1) 0%, transparent 100%),
            radial-gradient(circle 0.3px at 52% 28%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(circle 0.5px at 68% 48%, rgba(255,255,255,1) 0%, transparent 100%),
            radial-gradient(circle 0.3px at 83% 18%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(circle 0.5px at 12% 58%, rgba(255,255,255,1) 0%, transparent 100%),
            radial-gradient(circle 0.3px at 28% 78%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(circle 0.5px at 43% 68%, rgba(255,255,255,1) 0%, transparent 100%),
            radial-gradient(circle 0.3px at 58% 88%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(circle 0.5px at 73% 53%, rgba(255,255,255,1) 0%, transparent 100%),
            radial-gradient(circle 0.3px at 88% 73%, rgba(255,255,255,0.8) 0%, transparent 100%)
          `,
          backgroundSize: '40px 40px, 30px 30px, 50px 50px, 35px 35px, 45px 45px, 32px 32px, 42px 42px, 28px 28px, 47px 47px, 37px 37px, 52px 52px, 25px 25px',
          animation: 'finecrackle 0.15s infinite'
        }}
      />

      {/* Pellicule usée - rayures verticales */}
      <div 
        className="absolute inset-0 z-12 pointer-events-none opacity-30"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 2px,
              rgba(255,255,255,0.02) 2px,
              rgba(255,255,255,0.02) 3px,
              transparent 3px,
              transparent 150px
            ),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 50px,
              rgba(255,255,255,0.01) 50px,
              rgba(255,255,255,0.01) 51px,
              transparent 51px,
              transparent 300px
            )
          `,
          animation: 'filmScratches 8s linear infinite'
        }}
      />

      {/* Taches et défauts de pellicule */}
      <div 
        className="absolute inset-0 z-13 pointer-events-none opacity-20"
        style={{
          background: `
            radial-gradient(ellipse 3px 20px at 15% 25%, rgba(0,0,0,0.4) 0%, transparent 100%),
            radial-gradient(ellipse 2px 15px at 85% 70%, rgba(0,0,0,0.3) 0%, transparent 100%),
            radial-gradient(ellipse 4px 25px at 65% 40%, rgba(0,0,0,0.2) 0%, transparent 100%),
            radial-gradient(ellipse 1px 10px at 30% 80%, rgba(0,0,0,0.5) 0%, transparent 100%),
            radial-gradient(ellipse 3px 18px at 90% 20%, rgba(0,0,0,0.3) 0%, transparent 100%),
            radial-gradient(circle 5px at 45% 60%, rgba(0,0,0,0.6) 0%, transparent 100%),
            radial-gradient(circle 3px at 75% 90%, rgba(0,0,0,0.4) 0%, transparent 100%),
            radial-gradient(circle 2px at 20% 45%, rgba(0,0,0,0.5) 0%, transparent 100%)
          `,
          animation: 'filmDamage 12s ease-in-out infinite'
        }}
      />

      {/* Perforations de pellicule */}
      <div 
        className="absolute left-0 top-0 z-14 h-full w-8 pointer-events-none opacity-40"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 15px,
              rgba(0,0,0,0.8) 15px,
              rgba(0,0,0,0.8) 25px,
              transparent 25px,
              transparent 40px
            )
          `,
          borderRight: '1px solid rgba(0,0,0,0.3)'
        }}
      />
      <div 
        className="absolute right-0 top-0 z-14 h-full w-8 pointer-events-none opacity-40"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 15px,
              rgba(0,0,0,0.8) 15px,
              rgba(0,0,0,0.8) 25px,
              transparent 25px,
              transparent 40px
            )
          `,
          borderLeft: '1px solid rgba(0,0,0,0.3)'
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          boxShadow: 'inset 0px 0px 150px 20px black',
          mixBlendMode: 'multiply'
        }}
      />

      {/* Barre verticale qui traverse l'écran - atténuée */}
      <div 
        className="absolute top-0 z-25 h-full pointer-events-none"
        style={{
          left: `${barPosition}px`,
          width: '1px',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(220,220,220,0.1) 20%, rgba(230,230,230,0.2) 50%, rgba(220,220,220,0.3) 80%, transparent 100%)',
          boxShadow: '0 0 8px rgba(200,200,200,0.1), inset 0 0 2px rgba(210,210,210,0.1)',
          filter: 'blur(0.8px)'
        }}
      />

      {/* Effet de scintillement - presque invisible */}
      <div 
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          backgroundColor: 'rgba(200,200,200,0.008)',
          opacity: Math.random() > 0.9999 ? 0.03 : 0,
          animation: Math.random() > 0.9998 ? 'flicker 0.08s infinite' : 'none'
        }}
      />

      {/* Title container */}
      <div className="relative z-40 text-center px-8 space-y-4">   

       <TextAnimate animation="blurIn" as="h1" className='font-poiret-one text-5xl text-white'>Agathe & Alain vous invitent à célébrer leur mariage</TextAnimate>
        <p className="text-white/80 font-bold font-poiret-one leading-tight mt-20 mb-10"
            style={{
              fontSize: 'clamp(1rem, 4vw, 2rem)',
              letterSpacing: '0.1em',
              opacity: lineVisible[2] ? 1 : 0,
              transform: `scale(${lineVisible[2] ? 1 : 0.9})`,
              filter: `blur(${lineVisible[2] ? '0px' : '8px'})`,
              transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
          le 27 Septembre 2025
        </p>
        <p className="text-white/80 font-poiret-one leading-tight mb-4"
            style={{  
              fontSize: 'clamp(1rem, 4vw, 1.5rem)',
              letterSpacing: '0.1em',
              opacity: lineVisible[3] ? 1 : 0,
              transform: `scale(${lineVisible[3] ? 1 : 0.9})`,
              filter: `blur(${lineVisible[3] ? '0px' : '8px'})`,
              transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              à 16h30
        </p>
        <p className="text-white/80 font-poiret-one leading-tight"
            style={{
              fontSize: 'clamp(1rem, 4vw, 1.5rem)',
              letterSpacing: '0.1em',
              opacity: lineVisible[4] ? 1 : 0,
              transform: `scale(${lineVisible[4] ? 1 : 0.9})`,
              filter: `blur(${lineVisible[4] ? '0px' : '8px'})`,
              transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
          Place de la mairie, à Trizac, Cantal
        </p>

{/*}
        <Gallery
            items={boxes}
            index={0}
            setIndex={() => {}}
            setOpen={() => {}}
        />
        */}
        
        {/* Main title avec style film muet 
        <h1 className="text-white font-bellefair leading-tight mb-10"
            style={{
              fontSize: 'clamp(1rem, 4vw, 2rem)',
              letterSpacing: '0.1em'
            }}>
          <span className="block mb-4" style={{ paddingLeft: '0px' }}>Agathe Martin</span>
          <span className="block mb-4" style={{ 
            fontSize: 'clamp(1.5rem, 5vw, 4rem)',
            paddingRight: '20px' 
          }}>&</span>
          <span className="block mb-8" style={{ paddingLeft: '10px' }}>Alain Karinthi</span>
        </h1>


        <div className="text-white mb-8 italic font-serif"
             style={{
               fontSize: 'clamp(1.2rem, 4vw, 2rem)',
               textShadow: '2px 2px 0px rgba(0,0,0,0.8)'
             }}>
          <span className="block" style={{ paddingLeft: '50px' }}>vous invitent à célébrer</span>
          <span className="block mt-2" style={{ paddingRight: '50px' }}>leur mariage</span>
        </div>


        <div className="text-white mb-8 font-serif"
             style={{
               fontSize: 'clamp(1rem, 3vw, 1.5rem)',
               textShadow: '2px 2px 0px rgba(0,0,0,0.8)'
             }}>
          <span className="block" style={{ paddingLeft: '30px' }}>le 27 Septembre 2025</span>
          <span className="block mt-2" style={{ paddingRight: '30px' }}>à Trizac, Cantal</span>
        </div>
        */}

      </div>



      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Bellefair:wght@400&display=swap');
        .font-serif {
          font-family: 'Bellefair', serif;
        }
        .font-bellefair {
          font-family: 'Bellefair', serif;
        }
        
        @keyframes flicker {
          0% { opacity: 1; }
          2% { opacity: 0.8; }
          4% { opacity: 1; }
          8% { opacity: 0.9; }
          10% { opacity: 1; }
          100% { opacity: 1; }
        }
        
        @keyframes filmScratches {
          0% { transform: translateX(0px); }
          100% { transform: translateX(-20px); }
        }
        
        @keyframes filmDamage {
          0% { 
            opacity: 0.15;
            transform: translateY(0px);
          }
          25% { 
            opacity: 0.25;
            transform: translateY(-2px);
          }
          50% { 
            opacity: 0.10;
            transform: translateY(1px);
          }
          75% { 
            opacity: 0.20;
            transform: translateY(-1px);
          }
          100% { 
            opacity: 0.15;
            transform: translateY(0px);
          }
        }
        
        @keyframes crackle {
          0% { 
            opacity: 0.6;
            transform: translate(0px, 0px);
          }
          10% { 
            opacity: 1;
            transform: translate(-2px, 2px);
          }
          20% { 
            opacity: 0.4;
            transform: translate(2px, -2px);
          }
          30% { 
            opacity: 0.8;
            transform: translate(-2px, -2px);
          }
          40% { 
            opacity: 0.2;
            transform: translate(2px, 2px);
          }
          50% { 
            opacity: 1;
            transform: translate(0px, -2px);
          }
          60% { 
            opacity: 0.6;
            transform: translate(-2px, 0px);
          }
          70% { 
            opacity: 0.9;
            transform: translate(2px, 0px);
          }
          80% { 
            opacity: 0.3;
            transform: translate(0px, 2px);
          }
          90% { 
            opacity: 0.8;
            transform: translate(-2px, -2px);
          }
          100% { 
            opacity: 0.6;
            transform: translate(0px, 0px);
          }
        }
        
        @keyframes finecrackle {
          0% { 
            opacity: 0.5;
            transform: translate(0px, 0px) scale(1);
          }
          15% { 
            opacity: 0.9;
            transform: translate(-1px, 1px) scale(1.3);
          }
          30% { 
            opacity: 0.3;
            transform: translate(1px, -1px) scale(0.7);
          }
          45% { 
            opacity: 0.7;
            transform: translate(-1px, -1px) scale(1.1);
          }
          60% { 
            opacity: 1;
            transform: translate(1px, 1px) scale(0.9);
          }
          75% { 
            opacity: 0.4;
            transform: translate(0px, -1px) scale(1.2);
          }
          90% { 
            opacity: 0.8;
            transform: translate(-1px, 0px) scale(0.8);
          }
          100% { 
            opacity: 0.5;
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes cinematicFade {
          0% { 
            opacity: 0;
            transform: scale(0.9) translateY(30px);
            filter: blur(15px) brightness(0.3);
          }
          25% { 
            opacity: 0.1;
            transform: scale(0.95) translateY(20px);
            filter: blur(8px) brightness(0.5);
          }
          50% { 
            opacity: 0.4;
            transform: scale(0.98) translateY(10px);
            filter: blur(4px) brightness(0.8);
          }
          75% { 
            opacity: 0.8;
            transform: scale(1) translateY(5px);
            filter: blur(1px) brightness(1.1);
          }
          100% { 
            opacity: 1;
            transform: scale(1) translateY(0px);
            filter: blur(0px) brightness(1);
          }
        }
        
        @keyframes filmFadeIn {
          0% { 
            opacity: 0;
            box-shadow: inset 0 0 100px rgba(0,0,0,0.9);
          }
          30% { 
            opacity: 0.3;
            box-shadow: inset 0 0 60px rgba(0,0,0,0.6);
          }
          60% { 
            opacity: 0.7;
            box-shadow: inset 0 0 30px rgba(0,0,0,0.3);
          }
          100% { 
            opacity: 1;
            box-shadow: inset 0 0 0px rgba(0,0,0,0);
          }
        }
      `}</style>
    </main>
  );
}