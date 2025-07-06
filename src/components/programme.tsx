import React from 'react';

export default function Programme() {
  return (
    <div className="w-full">
      
      {/* Détails de l'invitation */}
      <div className='grid md:grid-cols-3 md:mt-4'>
        <div className='col-span-1 md:mt-24 font-urbanist text-3xl font-light'>
          <div className='md:mt-8 text-2xl italic'>
            Programme à venir
            </div>
        </div>
        <div className='mt-12 md:col-span-2 col-span-1 flex justify-end'>
          <img
            src="/mariage-5.png"
            alt="Mairie de Trizac"
            width={600}
            height={400}
            className="md:w-10/12 h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}