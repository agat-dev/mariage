'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface GoogleMapProps {
  className?: string;
}


export default function GoogleMap({ className = '' }: GoogleMapProps) {
  // Suppression des états liés à la carte Google Maps
  const [distance, setDistance] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Coordonnées précises de la mairie de Trizac
  const TRIZAC_COORDS = {
    lat: 45.253367,
    lng: 2.538010999999983
  };

  const MAIRIE_ADDRESS = "Place de la Mairie, 15400 Trizac, France";

  // Fonction pour calculer la distance entre deux points (formule de Haversine)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): string => {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    if (distance < 1) {
      return `${Math.round(distance * 1000)} mètres`;
    } else if (distance < 10) {
      return `${distance.toFixed(1)} km`;
    } else {
      return `${Math.round(distance)} km`;
    }
  };

  // Fonction pour obtenir la géolocalisation
  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      console.log("La géolocalisation n'est pas supportée par ce navigateur.");
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        // Calculer la distance
        const calculatedDistance = calculateDistance(
          userCoords.lat, 
          userCoords.lng, 
          TRIZAC_COORDS.lat, 
          TRIZAC_COORDS.lng
        );
        setDistance(calculatedDistance);
        setIsGettingLocation(false);
        
        console.log("Position obtenue:", userCoords);
        console.log("Distance calculée:", calculatedDistance);
      },
      (error) => {
        console.log("Erreur de géolocalisation:", error);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  }, []);

  // Obtenir la géolocalisation au chargement du composant
  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);


  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAIRIE_ADDRESS)}`;
    window.open(url, '_blank');
  };

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAIRIE_ADDRESS)}`;
    window.open(url, '_blank');
  };

  const openInWaze = () => {
    const url = `https://waze.com/ul?ll=${TRIZAC_COORDS.lat}%2C${TRIZAC_COORDS.lng}&navigate=yes`;
    window.open(url, '_blank');
  };



  return (
    <div className={`w-screen relative ${className}`}>
      {/* Affichage de la distance si disponible */}
      {distance && (
        <div className="mb-3 md:p-3 md:text-4xl text-3xl">
          <p className="font-poiret-one text-white-900 font-bold text-center">
            Vous n&apos;êtes plus qu&apos;à {distance} de Trizac
          </p>
        </div>
      )}



      {/* Informations de contact */}
      <div className="my-20 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-poiret-one text-3xl font-bold text-gray-800 mb-2">
          Lieu de célébration
        </h3>

        {/* Message pendant la géolocalisation */}
        {isGettingLocation && (
          <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="font-poiret-one text-blue-800 text-center">
              Calcul de votre distance...
            </p>
          </div>
        )}
        
        <p className="font-poiret-one text-2xl text-gray-600 mt-8 mb-4">
          <strong>Mairie de Trizac</strong>
        </p>
        <p className="font-urbanist text-gray-600 mb-2">
          Place de la Mairie
        </p>
        <p className="font-urbanist text-gray-600 mb-6">
          15400 Trizac, Cantal, France
        </p>
      </div>

      {/* Boutons d'action */}
      <div className="flex gap-6 justify-center flex-wrap my-12">        
        <button
          onClick={openInGoogleMaps}
          className="bg-pink-200/90 hover:bg-pink-200 text-black px-4 py-2 rounded-lg shadow-md transition-all duration-200 font-urbanist text-base font-regular hover:shadow-lg"
        >
          Voir sur Google Maps
        </button>
        <button
          onClick={openDirections}
          className="bg-amber-50/90 hover:bg-amber-50 text-gray-800 px-4 py-2 rounded-lg shadow-md transition-all duration-200 font-urbanist text-base font-regular hover:shadow-lg"
        >
          Itinéraire Google Maps
        </button>
        <button
          onClick={openInWaze}
          className="bg-amber-50/90 hover:bg-amber-50 text-black px-4 py-2 rounded-lg shadow-md transition-all duration-200 font-urbanist text-base font-regular hover:shadow-lg"
        >
          Itinéraire Waze
        </button>
      </div>

    </div>
  );
}
