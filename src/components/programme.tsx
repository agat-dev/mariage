import React from 'react';

export default function Programme() {
  return (
    <div className="w-[90%] mx-auto">
      
      {/* Détails de l'invitation */}
      <div className='relative p-8 md:p-12 rounded-xl shadow-lg border border-amber-200/30 overflow-hidden'>
        
        {/* Décoration Art Déco - Cadre principal */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Ornements coins supérieurs */}
          <div className="absolute top-0 left-0 w-24 h-24">
            <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-amber-400/40 rounded-tl-lg"></div>
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-500/60 rounded-tl-lg"></div>
            <div className="absolute top-6 left-6 w-3 h-3 bg-amber-500 rounded-full"></div>
          </div>
          
          <div className="absolute top-0 right-0 w-24 h-24">
            <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-amber-400/40 rounded-tr-lg"></div>
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-500/60 rounded-tr-lg"></div>
            <div className="absolute top-6 right-6 w-3 h-3 bg-amber-500 rounded-full"></div>
          </div>
          
          {/* Ornements coins inférieurs */}
          <div className="absolute bottom-0 left-0 w-24 h-24">
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-amber-400/40 rounded-bl-lg"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-500/60 rounded-bl-lg"></div>
            <div className="absolute bottom-6 left-6 w-3 h-3 bg-amber-500 rounded-full"></div>
          </div>
          
          <div className="absolute bottom-0 right-0 w-24 h-24">
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-amber-400/40 rounded-br-lg"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-500/60 rounded-br-lg"></div>
            <div className="absolute bottom-6 right-6 w-3 h-3 bg-amber-500 rounded-full"></div>
          </div>
          
          {/* Motifs géométriques centraux */}
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-10">
            <div className="absolute inset-0 border-2 border-amber-400 rounded-full"></div>
            <div className="absolute inset-4 border-2 border-amber-500 rounded-full"></div>
            <div className="absolute inset-8 border-2 border-amber-600 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-500 rounded-full"></div>
          </div>
          
 </div>
        
        {/* Contenu dans une grid */}
        <div className='grid md:grid-cols-3 gap-8 md:gap-12 relative z-10'>
          <div className='col-span-1 md:mt-6 font-urbanist text-3xl font-light'>
            <div className='text-4xl text-center font-bold mb-12 font-poiret-one relative'>
              Programme du mariage
              
              {/* Ornement décoratif sous le titre */}
              <div className="absolute -bottom-8 left-0 right-0 flex justify-center items-center">
                <div className="w-12 h-px bg-amber-500"></div>
                <div className="w-3 h-3 bg-amber-500 rounded-full mx-2"></div>
                <div className="w-12 h-px bg-amber-500"></div>
              </div>
            </div>
            
            {/* Étapes du programme avec icônes décoratives */}
            <div className='text-lg mb-4 relative pl-8'>
             
              <p>
                Cérémonie civile à la Mairie de Trizac
              </p>
            </div>
            
            <div className='text-lg mb-4 relative pl-8'>
              <p>
                Vin d&apos;honneur à la Salle des Fêtes de Trizac
              </p>
            </div>
            
            <div className='text-lg mb-4 relative pl-8'>
              <p>
                Repas de mariage à la Salle des Fêtes de Trizac
              </p>
            </div>
            
            {/* Encadré décoratif pour les horaires */}
            <div className='md:mt-8 text-sm italic relative'>
              <div className="p-4 rounded-lg border border-amber-200/50 shadow-sm relative">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-400 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-400 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-400 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-400 rounded-br-lg"></div>
                
                <div className="text-center">
                  <div className="flex justify-center items-center mb-2">
                    <div className="w-4 h-px bg-amber-400"></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full mx-1"></div>
                    <div className="w-4 h-px bg-amber-400"></div>
                  </div>
                  Horaires et détails à venir
                </div>
              </div>
            </div>
          </div>
          
          <div className='md:col-span-2 col-span-1 flex justify-center md:justify-end items-center'>
            {/* Image sans décoration */}
            <img
              src="/mariage-5.png"
              alt="Mairie de Trizac"
              width={600}
              height={400}
              className="w-full md:w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}