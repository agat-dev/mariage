'use client';

import React from 'react';
import DynamicDirections from './dynamic-directions';
import SmartDirections from './smart-directions';

export default function DirectionsTest() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Test des composants d'itinéraire
          </h1>
          <p className="text-gray-600">
            Testez les différents composants d'itinéraire pour le mariage
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test DynamicDirections */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              DynamicDirections (avec Google Maps)
            </h2>
            <p className="text-gray-600 mb-4">
              Composant avec carte Google Maps intégrée et calcul d'itinéraire
            </p>
            <DynamicDirections 
              className="h-full"
              height="400px"
              showMap={true}
            />
          </div>

          {/* Test SmartDirections */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              SmartDirections (sans API)
            </h2>
            <p className="text-gray-600 mb-4">
              Composant léger avec liens vers les applications de navigation
            </p>
            <SmartDirections className="h-full" />
          </div>
        </div>

        {/* Test DynamicDirections sans carte */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            DynamicDirections (sans carte)
          </h2>
          <p className="text-gray-600 mb-4">
            Composant DynamicDirections configuré sans affichage de carte
          </p>
          <DynamicDirections 
            className="h-full"
            showMap={false}
          />
        </div>

        {/* Informations de test */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-bold text-blue-800 mb-2">
            ℹ️ Informations de test
          </h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• <strong>DynamicDirections :</strong> Nécessite une clé API Google Maps dans .env.local</li>
            <li>• <strong>SmartDirections :</strong> Fonctionne sans API, utilise les liens directs</li>
            <li>• <strong>Géolocalisation :</strong> Doit être autorisée dans le navigateur</li>
            <li>• <strong>Coordonnées de test :</strong> Mairie de Trizac (45.25376, 2.53779)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
