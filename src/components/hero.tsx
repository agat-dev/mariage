import React, { useEffect, useState, useRef } from 'react';
import { TextAnimate } from "@/components/magicui/text-animate";



export default function Hero() {
  const [lineVisible, setLineVisible] = useState([false, false, false, false, false]);
  const [decorVisible, setDecorVisible] = useState({
    topDecor: false,
    betweenNames: false,
    afterNames: false,
    finalDecor: false,
    corners: false
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Animation d'apparition progressive des lignes et éléments décoratifs
    const animationSequence = [
      { delay: 500, line: 0 },   // Première ligne
      { delay: 800, decor: 'topDecor' },  // Décoration supérieure
      { delay: 1200, line: 1 },  // Deuxième ligne
      { delay: 1400, decor: 'betweenNames' },  // Ornement entre les noms
      { delay: 1900, line: 2 },  // Troisième ligne
      { delay: 2100, decor: 'afterNames' },  // Décoration après les noms
      { delay: 2600, line: 3 },  // Quatrième ligne
      { delay: 3300, line: 4 },  // Cinquième ligne
      { delay: 3800, decor: 'finalDecor' },  // Décoration finale
      { delay: 4200, decor: 'corners' }  // Éléments d'angle
    ];

    animationSequence.forEach(({ delay, line, decor }) => {
      setTimeout(() => {
        if (line !== undefined) {
          setLineVisible(prev => {
            const newVisible = [...prev];
            newVisible[line] = true;
            return newVisible;
          });
        }
        if (decor) {
          setDecorVisible(prev => ({
            ...prev,
            [decor]: true
          }));
        }
      }, delay);
    });

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

  return (
    <main className="relative h-screen w-screen overflow-hidden flex items-center justify-center flex-col">



      {/* Background gradient - style film muet 
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to right, rgba(36,31,31,1) 0%, rgba(36,31,31,1) 32%, rgba(74,71,70,1) 100%)'
        }}
      />

      Canvas pour le bruit de fond 
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-10 opacity-30 pointer-events-none mix-blend-multiply"
        style={{ filter: 'contrast(170%) brightness(100%)' }}
      />

       Effet de crépitement avec petits points blancs 
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

       Crépitement secondaire plus fin 
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

      Pellicule usée - rayures verticales 
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

      Taches et défauts de pellicule 
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

      Perforations de pellicule 
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

     Vignette effect 
      <div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          boxShadow: 'inset 0px 0px 150px 20px black',
          mixBlendMode: 'multiply'
        }}
      />

       Barre verticale qui traverse l'écran - atténuée 
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

      Effet de scintillement - presque invisible
      <div 
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          backgroundColor: 'rgba(200,200,200,0.008)',
          opacity: Math.random() > 0.9999 ? 0.03 : 0,
          animation: Math.random() > 0.9998 ? 'flicker 0.08s infinite' : 'none'
        }}
      />
        */}


      {/* Title container */}
      <div className="relative z-40 text-center px-8 space-y-4">   

       {/* Décoration art déco supérieure */}
       <div className="flex justify-center items-center mb-8"
            style={{
              opacity: decorVisible.topDecor ? 1 : 0,
              transform: `scale(${decorVisible.topDecor ? 1 : 0.8}) translateY(${decorVisible.topDecor ? 0 : -20}px)`,
              filter: `blur(${decorVisible.topDecor ? '0px' : '4px'})`,
              transition: 'all 1.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
         <div className="flex items-center space-x-4">
           {/* Motif géométrique gauche */}
           <div className="relative">
             <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-white/60"></div>
             <div className="absolute -top-1 right-0 w-3 h-3 border-t border-r border-white/40 transform rotate-45"></div>
             <div className="absolute -top-0.5 right-2 w-1.5 h-1.5 border-t border-r border-white/60 transform rotate-45"></div>
           </div>
           
           {/* Losange central */}
           <div className="relative">
             <div className="w-4 h-4 border border-white/50 transform rotate-45"></div>
             <div className="absolute inset-1 w-2 h-2 bg-white/20 transform rotate-45"></div>
           </div>
           
           {/* Motif géométrique droite */}
           <div className="relative">
             <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-white/60"></div>
             <div className="absolute -top-1 left-0 w-3 h-3 border-t border-l border-white/40 transform -rotate-45"></div>
             <div className="absolute -top-0.5 left-2 w-1.5 h-1.5 border-t border-l border-white/60 transform -rotate-45"></div>
           </div>
         </div>
       </div>

       <TextAnimate animation="blurIn" as="h1" className='font-poiret-one md:text-5xl text-3xl text-white'>Agathe Martin</TextAnimate>
       
       {/* Ornement entre les noms */}
       <div className="flex justify-center py-2"
            style={{
              opacity: decorVisible.betweenNames ? 1 : 0,
              transform: `translateY(${decorVisible.betweenNames ? 0 : 20}px) scale(${decorVisible.betweenNames ? 1 : 0.6})`,
              filter: `blur(${decorVisible.betweenNames ? '0px' : '6px'})`,
              transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
         <div className="flex items-center space-x-3">
        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-white/40"></div>
       <TextAnimate animation="blurIn" as="h1" className='font-poiret-one md:text-6xl text-4xl text-white'>&</TextAnimate>

           <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-white/40"></div>
          </div>
       </div>
       
       
       <TextAnimate animation="blurIn" as="h1" className='font-poiret-one md:text-5xl text-3xl text-white'>Alain Karinthi</TextAnimate>
       
       {/* Décoration art déco après les noms */}
       <div className="flex justify-center items-center mt-8 mb-6"
            style={{
              opacity: decorVisible.afterNames ? 1 : 0,
              transform: `scale(${decorVisible.afterNames ? 1 : 0.5}) translateY(${decorVisible.afterNames ? 0 : 40}px) rotate(${decorVisible.afterNames ? 0 : 10}deg)`,
              filter: `blur(${decorVisible.afterNames ? '0px' : '8px'})`,
              transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
         <div className="relative">
           {/* Éventail art déco */}
           <div className="flex space-x-1">
             <div className="w-0.5 h-8 bg-gradient-to-t from-white/20 to-white/60 transform -rotate-12"></div>
             <div className="w-0.5 h-10 bg-gradient-to-t from-white/30 to-white/70 transform -rotate-6"></div>
             <div className="w-0.5 h-12 bg-gradient-to-t from-white/40 to-white/80"></div>
             <div className="w-0.5 h-10 bg-gradient-to-t from-white/30 to-white/70 transform rotate-6"></div>
             <div className="w-0.5 h-8 bg-gradient-to-t from-white/20 to-white/60 transform rotate-12"></div>
           </div>
           {/* Base de l'éventail */}
           <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-white/50"></div>
         </div>
       </div>
       <p className="text-white/80 font-poiret-one leading-tight mt-10 mb-10"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
              letterSpacing: '0.1em',
              opacity: lineVisible[1] ? 1 : 0,
              transform: `scale(${lineVisible[1] ? 1 : 0.9})`,
              filter: `blur(${lineVisible[1] ? '0px' : '8px'})`,
              transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>       
       vous invitent à célébrer leur mariage</p>
        <p className="text-white/80 font-bold font-poiret-one leading-tight mt-10 mb-10"
            style={{
              fontSize: 'clamp(1.7rem, 4vw, 2.4rem)',
              letterSpacing: '0.1em',
              opacity: lineVisible[2] ? 1 : 0,
              transform: `scale(${lineVisible[2] ? 1 : 0.9})`,
              filter: `blur(${lineVisible[2] ? '0px' : '8px'})`,
              transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
          le 27 Septembre 2025
        </p>
        <p className="text-white/80 font-poiret-one leading-tight mb-1"
            style={{  
              fontSize: 'clamp(1.2rem, 4vw, 2rem)',
              letterSpacing: '0.1em',
              opacity: lineVisible[3] ? 1 : 0,
              transform: `scale(${lineVisible[3] ? 1 : 0.9})`,
              filter: `blur(${lineVisible[3] ? '0px' : '8px'})`,
              transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              à 16h
        </p>
        <p className="text-white/80 font-poiret-one leading-tight"
            style={{
              fontSize: 'clamp(1.2rem, 4vw, 2rem)',
              letterSpacing: '0.1em',
              opacity: lineVisible[4] ? 1 : 0,
              transform: `scale(${lineVisible[4] ? 1 : 0.9})`,
              filter: `blur(${lineVisible[4] ? '0px' : '8px'})`,
              transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
          Place de la mairie, à Trizac, Cantal
        </p>

        {/* Décoration art déco finale */}
        <div className="flex justify-center items-center mt-12 pt-8"
             style={{
               opacity: decorVisible.finalDecor ? 1 : 0,
               transform: `scale(${decorVisible.finalDecor ? 1 : 0.7}) translateY(${decorVisible.finalDecor ? 0 : 50}px)`,
               filter: `blur(${decorVisible.finalDecor ? '0px' : '10px'})`,
               transition: 'all 2.2s cubic-bezier(0.4, 0, 0.2, 1)'
             }}>
          <div className="flex items-center space-x-6">
            {/* Motif escalier gauche */}
            <div className="flex flex-col items-end space-y-0.5">
              <div className="w-8 h-0.5 bg-white/40"></div>
              <div className="w-6 h-0.5 bg-white/50"></div>
              <div className="w-4 h-0.5 bg-white/60"></div>
              <div className="w-2 h-0.5 bg-white/70"></div>
            </div>
            
            {/* Élément central complexe */}
            <div className="relative">
              <div className="w-6 h-6 border border-white/50 transform rotate-45"></div>
              <div className="absolute inset-2 w-2 h-2 border border-white/70 transform rotate-45"></div>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-white/40"></div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-white/40"></div>
            </div>
            
            {/* Motif escalier droite */}
            <div className="flex flex-col items-start space-y-0.5">
              <div className="w-8 h-0.5 bg-white/40"></div>
              <div className="w-6 h-0.5 bg-white/50"></div>
              <div className="w-4 h-0.5 bg-white/60"></div>
              <div className="w-2 h-0.5 bg-white/70"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Éléments décoratifs d'angle art déco */}
      <div className="absolute top-8 left-8 z-30"
           style={{
             opacity: decorVisible.corners ? 1 : 0,
             transform: `scale(${decorVisible.corners ? 1 : 0.3}) translate(${decorVisible.corners ? 0 : -20}px, ${decorVisible.corners ? 0 : -20}px)`,
             filter: `blur(${decorVisible.corners ? '0px' : '8px'})`,
             transition: 'all 2.5s cubic-bezier(0.4, 0, 0.2, 1)'
           }}>
        <div className="relative">
          <div className="w-12 h-0.5 bg-gradient-to-r from-white/60 to-transparent"></div>
          <div className="w-0.5 h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
          <div className="absolute top-4 left-4 w-4 h-0.5 bg-white/40"></div>
          <div className="absolute top-4 left-4 w-0.5 h-4 bg-white/40"></div>
        </div>
      </div>
      
      <div className="absolute top-8 right-8 z-30"
           style={{
             opacity: decorVisible.corners ? 1 : 0,
             transform: `scale(${decorVisible.corners ? 1 : 0.3}) translate(${decorVisible.corners ? 0 : 20}px, ${decorVisible.corners ? 0 : -20}px)`,
             filter: `blur(${decorVisible.corners ? '0px' : '8px'})`,
             transition: 'all 2.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
           }}>
        <div className="relative">
          <div className="w-12 h-0.5 bg-gradient-to-l from-white/60 to-transparent"></div>
          <div className="absolute right-0 w-0.5 h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
          <div className="absolute top-4 right-4 w-4 h-0.5 bg-white/40"></div>
          <div className="absolute top-4 right-4 w-0.5 h-4 bg-white/40"></div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-8 z-30"
           style={{
             opacity: decorVisible.corners ? 1 : 0,
             transform: `scale(${decorVisible.corners ? 1 : 0.3}) translate(${decorVisible.corners ? 0 : -20}px, ${decorVisible.corners ? 0 : 20}px)`,
             filter: `blur(${decorVisible.corners ? '0px' : '8px'})`,
             transition: 'all 2.5s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
           }}>
        <div className="relative">
          <div className="w-0.5 h-12 bg-gradient-to-t from-white/60 to-transparent"></div>
          <div className="absolute bottom-0 w-12 h-0.5 bg-gradient-to-r from-white/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 w-4 h-0.5 bg-white/40"></div>
          <div className="absolute bottom-4 left-4 w-0.5 h-4 bg-white/40"></div>
        </div>
      </div>
      
      <div className="absolute bottom-8 right-8 z-30"
           style={{
             opacity: decorVisible.corners ? 1 : 0,
             transform: `scale(${decorVisible.corners ? 1 : 0.3}) translate(${decorVisible.corners ? 0 : 20}px, ${decorVisible.corners ? 0 : 20}px)`,
             filter: `blur(${decorVisible.corners ? '0px' : '8px'})`,
             transition: 'all 2.5s cubic-bezier(0.4, 0, 0.2, 1) 0.6s'
           }}>
        <div className="relative">
          <div className="absolute right-0 w-0.5 h-12 bg-gradient-to-t from-white/60 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-12 h-0.5 bg-gradient-to-l from-white/60 to-transparent"></div>
          <div className="absolute bottom-4 right-4 w-4 h-0.5 bg-white/40"></div>
          <div className="absolute bottom-4 right-4 w-0.5 h-4 bg-white/40"></div>
        </div>
      </div>
    </main>
  );
}