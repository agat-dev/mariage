'use client';

import React, { useState, useEffect } from 'react';
import GoogleMap from './google-map';
import OpenStreetMap from './open-street-map';

interface MapContainerProps {
  className?: string;
  height?: string;
}

export default function MapContainer({ className = '', height = '400px' }: MapContainerProps) {
  const [useGoogleMaps, setUseGoogleMaps] = useState(true);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    // Vérifier si Google Maps est disponible
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      setUseGoogleMaps(false);
    }
  }, []);

  const handleGoogleMapError = () => {
    setMapError(true);
    setUseGoogleMaps(false);
  };

  const toggleMapType = () => {
    setUseGoogleMaps(!useGoogleMaps);
    setMapError(false);
  };

  return (
    <div className={className}>
      {/* Sélecteur de carte */}
      <div className="mb-4 flex gap-2 justify-center">
        <button
          onClick={() => setUseGoogleMaps(true)}
          className={`px-4 py-2 rounded-lg font-poiret-one text-sm transition-all duration-200 ${
            useGoogleMaps 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          disabled={!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        >
          🗺️ Google Maps
        </button>
        <button
          onClick={() => setUseGoogleMaps(false)}
          className={`px-4 py-2 rounded-lg font-poiret-one text-sm transition-all duration-200 ${
            !useGoogleMaps 
              ? 'bg-orange-600 text-white shadow-md' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          🌍 OpenStreetMap
        </button>
      </div>

      {/* Message d'information si Google Maps n'est pas disponible */}
      {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="font-poiret-one text-yellow-800 text-sm text-center">
            ⚠️ Google Maps non configuré. Utilisation d'OpenStreetMap.
          </p>
        </div>
      )}

      {/* Message d'erreur Google Maps */}
      {mapError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="font-poiret-one text-red-800 text-sm text-center">
            ❌ Erreur Google Maps. Basculement vers OpenStreetMap.
            <button 
              onClick={toggleMapType}
              className="ml-2 underline hover:no-underline"
            >
              Réessayer Google Maps
            </button>
          </p>
        </div>
      )}

      {/* Rendu de la carte */}
      {useGoogleMaps && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
        <div onError={handleGoogleMapError}>
          <GoogleMap 
            className="" 
            height={height}
          />
        </div>
      ) : (
        <OpenStreetMap 
          className="" 
          height={height}
        />
      )}
    </div>
  );
}
