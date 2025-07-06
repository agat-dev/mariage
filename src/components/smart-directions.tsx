'use client';

import React, { useState, useEffect } from 'react';

interface SmartDirectionsProps {
  className?: string;
}

export default function SmartDirections({ className = '' }: SmartDirectionsProps) {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);

  // Coordonnées précises de la mairie de Trizac
  const TRIZAC_COORDS = {
    lat: 45.253367,
    lng: 2.538010999999983
  };

  const MAIRIE_ADDRESS = "Place de la Mairie, 15400 Trizac, France";

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(userCoords);
        setIsGettingLocation(false);
        
        // Calculer la distance approximative
        const calculatedDistance = calculateDistance(
          userCoords.lat, 
          userCoords.lng, 
          TRIZAC_COORDS.lat, 
          TRIZAC_COORDS.lng
        );
        setDistance(calculatedDistance);
      },
      (error) => {
        setIsGettingLocation(false);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Vous avez refusé l'accès à votre position. Veuillez l'autoriser pour obtenir l'itinéraire personnalisé.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Votre position n'est pas disponible.");
            break;
          case error.TIMEOUT:
            setLocationError("La demande de géolocalisation a expiré.");
            break;
          default:
            setLocationError("Erreur lors de la récupération de votre position.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

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

  const openDirectionsInGoogleMaps = () => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${TRIZAC_COORDS.lat},${TRIZAC_COORDS.lng}`;
      window.open(url, '_blank');
    } else {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAIRIE_ADDRESS)}`;
      window.open(url, '_blank');
    }
  };

  const openDirectionsInAppleMaps = () => {
    if (userLocation) {
      const url = `https://maps.apple.com/?saddr=${userLocation.lat},${userLocation.lng}&daddr=${TRIZAC_COORDS.lat},${TRIZAC_COORDS.lng}`;
      window.open(url, '_blank');
    } else {
      const url = `https://maps.apple.com/?daddr=${TRIZAC_COORDS.lat},${TRIZAC_COORDS.lng}`;
      window.open(url, '_blank');
    }
  };

  const openDirectionsInWaze = () => {
    const url = `https://waze.com/ul?ll=${TRIZAC_COORDS.lat}%2C${TRIZAC_COORDS.lng}&navigate=yes`;
    window.open(url, '_blank');
  };

  const openDirectionsInMapsMe = () => {
    const url = `https://maps.me/directions?to=${TRIZAC_COORDS.lat},${TRIZAC_COORDS.lng}`;
    window.open(url, '_blank');
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(MAIRIE_ADDRESS).then(() => {
      alert('Adresse copiée dans le presse-papier !');
    }).catch(() => {
      alert('Impossible de copier l\'adresse. Veuillez la sélectionner manuellement.');
    });
  };

  return (
    <div className={`${className}`}>
      {/* Titre */}
      <div className="text-center mb-6">
        <h2 className="font-poiret-one text-3xl font-bold text-gray-800 mb-2">
          Comment venir à la mairie
        </h2>
        <p className="font-poiret-one text-gray-600">
          Choisissez votre application de navigation préférée
        </p>
      </div>

      {/* Informations sur la destination */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200 mb-6">
        <div className="text-center">
          <h3 className="font-poiret-one text-xl font-bold text-gray-800 mb-3">
            Lieu de la cérémonie
          </h3>
          <div className="bg-white/70 p-4 rounded-lg border border-purple-100">
            <p className="font-poiret-one text-gray-700 mb-1 font-semibold">
              Mairie de Trizac
            </p>
            <p className="font-poiret-one text-gray-600 mb-1">
              Place de la Mairie
            </p>
            <p className="font-poiret-one text-gray-600 mb-3">
              15400 Trizac, Cantal, France
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
              <p className="font-poiret-one text-purple-700 font-semibold text-sm">
                Samedi 27 septembre 2025 à 16h30
              </p>
              <button
                onClick={copyAddress}
                className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded text-xs font-poiret-one transition-colors"
              >
                Copier l'adresse
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton pour obtenir la position */}
      <div className="text-center mb-6">
        <button
          onClick={getUserLocation}
          disabled={isGettingLocation}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-200 font-poiret-one text-lg font-medium hover:shadow-lg disabled:cursor-not-allowed"
        >
          {isGettingLocation ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div>
              Localisation en cours...
            </>
          ) : (
            <>
              Obtenir ma position pour l'itinéraire
            </>
          )}
        </button>
      </div>

      {/* Informations de distance */}
      {distance && userLocation && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
          <div className="text-center">
            <h3 className="font-poiret-one text-lg font-bold text-green-800 mb-2">
              📏 Distance approximative
            </h3>
            <p className="font-poiret-one text-green-700 text-2xl font-bold">{distance}</p>
            <p className="font-poiret-one text-green-600 text-sm mt-1">
              depuis votre position actuelle
            </p>
          </div>
        </div>
      )}

      {/* Erreur de géolocalisation */}
      {locationError && (
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-6">
          <div className="text-center">
            <div className="text-orange-500 text-2xl mb-2">⚠️</div>
            <p className="font-poiret-one text-orange-700 mb-3">{locationError}</p>
            <p className="font-poiret-one text-orange-600 text-sm">
              Vous pouvez toujours utiliser les boutons ci-dessous pour ouvrir l'itinéraire dans votre application préférée.
            </p>
          </div>
        </div>
      )}

      {/* Boutons d'applications de navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <button
          onClick={openDirectionsInGoogleMaps}
          className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-4 rounded-lg shadow-md transition-all duration-200 font-poiret-one text-sm font-medium border border-gray-200 hover:shadow-lg group"
        >
          <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🗺️</div>
          <div>Google Maps</div>
          <div className="text-xs text-gray-500 mt-1">Navigation web</div>
        </button>
        
        <button
          onClick={openDirectionsInAppleMaps}
          className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-4 rounded-lg shadow-md transition-all duration-200 font-poiret-one text-sm font-medium border border-gray-200 hover:shadow-lg group"
        >
          <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🍎</div>
          <div>Apple Maps</div>
          <div className="text-xs text-gray-500 mt-1">iPhone/iPad</div>
        </button>
        
        <button
          onClick={openDirectionsInWaze}
          className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-4 rounded-lg shadow-md transition-all duration-200 font-poiret-one text-sm font-medium border border-gray-200 hover:shadow-lg group"
        >
          <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🚗</div>
          <div>Waze</div>
          <div className="text-xs text-gray-500 mt-1">Navigation social</div>
        </button>
        
        <button
          onClick={openDirectionsInMapsMe}
          className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-4 rounded-lg shadow-md transition-all duration-200 font-poiret-one text-sm font-medium border border-gray-200 hover:shadow-lg group"
        >
          <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🧭</div>
          <div>Maps.me</div>
          <div className="text-xs text-gray-500 mt-1">Cartes offline</div>
        </button>
      </div>

      {/* Informations supplémentaires */}
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-poiret-one text-lg font-bold text-blue-800 mb-2">
            ℹ️ Informations pratiques
          </h3>
          <ul className="font-poiret-one text-blue-700 text-sm space-y-1">
            <li>• Prévoir d'arriver 15-30 minutes avant la cérémonie</li>
            <li>• Parking disponible sur la place de la mairie</li>
            <li>• La mairie est située au cœur du village</li>
            <li>• En cas de problème, contactez les mariés</li>
          </ul>
        </div>

        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <h3 className="font-poiret-one text-lg font-bold text-amber-800 mb-2">
            🚗 Conseils de route
          </h3>
          <ul className="font-poiret-one text-amber-700 text-sm space-y-1">
            <li>• Trizac est un petit village du Cantal en région Auvergne</li>
            <li>• Routes de montagne : conduisez prudemment</li>
            <li>• Vérifiez les conditions météo avant le départ</li>
            <li>• Essence disponible dans les villes voisines</li>
          </ul>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-poiret-one text-lg font-bold text-green-800 mb-2">
            🎯 Repères pour arriver
          </h3>
          <ul className="font-poiret-one text-green-700 text-sm space-y-1">
            <li>• La mairie se trouve sur la place centrale du village</li>
            <li>• Bâtiment en pierre typique de la région</li>
            <li>• Drapeau français visible</li>
            <li>• Signalétique "Mairie" bien visible</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
