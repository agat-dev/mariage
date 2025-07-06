import React from 'react';
import GoogleMap from './google-map';

export default function MapTest() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-poiret-one mb-6 text-center">
        Test de la carte Google Maps
      </h1>
      
      <GoogleMap 
        className="mb-8"
        height="500px"
      />
      
      <div className="text-center text-sm text-gray-600">
        <p>Si la carte ne s'affiche pas, vérifiez :</p>
        <ul className="list-disc list-inside mt-2">
          <li>Votre clé API Google Maps dans .env.local</li>
          <li>Que l'API JavaScript Maps est activée</li>
          <li>Que votre domaine est autorisé</li>
        </ul>
      </div>
    </div>
  );
}
