import React from 'react';

export default function Programme() {
  return (
    <div className="w-full">
      {/* Noms des mariés */}
      <div className="mr-0 flex flex-col w-full justify-end gap-4 font-poiret-one text-right text-6xl">
        <h2>Agathe Martin</h2>
        <h2>& Alain Karinthi</h2>
      </div>
      
      {/* Détails de l'invitation */}
      <div className='flex justify-between mt-8'>
        <div className='mt-24 font-urbanist text-3xl font-light'>
          <p className='mb-4 text-2xl italic'>vous invitent</p>
          <p>le 27 Septembre 2025</p>
          <p>à 16h</p>
          <p>à Trizac</p>
          <p>Place de la Mairie</p>
        </div>
      </div>
    </div>
  );
}