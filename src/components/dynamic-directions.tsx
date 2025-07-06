'use client';

import React, { useEffect, useRef, useState } from 'react';

interface DynamicDirectionsProps {
  className?: string;
  height?: string;
  showMap?: boolean;
}

declare global {
  interface Window {
    google: any;
    initDirectionsMap: () => void;
  }
}

export default function DynamicDirections({ 
  className = '', 
  height = '500px', 
  showMap = true 
}: DynamicDirectionsProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [directionsService, setDirectionsService] = useState<any>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{distance: string, duration: string} | null>(null);

  // Coordonnées précises de la mairie de Trizac
  const TRIZAC_COORDS = {
    lat: 45.253367,
    lng: 2.538010999999983
  };

  const MAIRIE_ADDRESS = "Place de la Mairie, 15400 Trizac, France";

  useEffect(() => {
    // Vérifier si la clé API est présente
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      setError("Clé API Google Maps manquante pour afficher l'itinéraire.");
      return;
    }

    // Vérifier si l'API Google Maps est déjà chargée
    if (window.google && window.google.maps) {
      initializeDirectionsMap();
      return;
    }

    // Charger l'API Google Maps avec les bibliothèques nécessaires
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,directions&callback=initDirectionsMap`;
    script.async = true;
    script.defer = true;
    
    // Fonction globale pour le callback
    window.initDirectionsMap = () => {
      setIsLoaded(true);
      initializeDirectionsMap();
    };
    
    script.onerror = () => {
      setError("Erreur lors du chargement de l'API Google Maps.");
    };
    
    document.head.appendChild(script);

    return () => {
      // Nettoyage
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      (window as any).initDirectionsMap = undefined;
    };
  }, []);

  const initializeDirectionsMap = () => {
    if (!showMap || !mapRef.current) return;

    if (!window.google || !window.google.maps) {
      console.error("API Google Maps non chargée");
      return;
    }

    try {
      // Créer la carte
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: TRIZAC_COORDS,
        zoom: 10,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      });

      // Créer les services de directions
      const directionsServiceInstance = new window.google.maps.DirectionsService();
      const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
        map: mapInstance,
        panel: null, // On gérera l'affichage des instructions nous-mêmes
        polylineOptions: {
          strokeColor: '#8B4513',
          strokeWeight: 5,
          strokeOpacity: 0.8,
        },
        markerOptions: {
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#8B4513',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          }
        }
      });

      setMap(mapInstance);
      setDirectionsService(directionsServiceInstance);
      setDirectionsRenderer(directionsRendererInstance);
      setError(null);
      
      console.log("Carte d'itinéraire initialisée avec succès");
    } catch (err) {
      console.error("Erreur lors de l'initialisation de la carte d'itinéraire:", err);
      setError("Erreur lors de l'initialisation de la carte d'itinéraire");
    }
  };

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
        
        // Calculer l'itinéraire si possible
        if (directionsService && directionsRenderer) {
          calculateRoute(userCoords);
        }
      },
      (error) => {
        setIsGettingLocation(false);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Vous avez refusé l'accès à votre position. Veuillez l'autoriser pour obtenir l'itinéraire.");
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

  const calculateRoute = (origin: {lat: number, lng: number}) => {
    if (!directionsService || !directionsRenderer) {
      console.error("Services de directions non initialisés");
      return;
    }

    const request = {
      origin: origin,
      destination: TRIZAC_COORDS,
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };

    directionsService.route(request, (result: any, status: any) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
        
        // Extraire les informations de la route
        const route = result.routes[0];
        const leg = route.legs[0];
        setRouteInfo({
          distance: leg.distance.text,
          duration: leg.duration.text
        });
      } else {
        console.error('Erreur lors du calcul de l\'itinéraire:', status);
        setError(`Impossible de calculer l'itinéraire: ${status}`);
      }
    });
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
    const url = `https://maps.apple.com/?daddr=${TRIZAC_COORDS.lat},${TRIZAC_COORDS.lng}`;
    window.open(url, '_blank');
  };

  const openDirectionsInWaze = () => {
    const url = `https://waze.com/ul?ll=${TRIZAC_COORDS.lat}%2C${TRIZAC_COORDS.lng}&navigate=yes`;
    window.open(url, '_blank');
  };

  return (
    <div className={`${className}`}>
      {/* Titre */}
      <div className="text-center mb-6">
        <h2 className="font-poiret-one text-3xl font-bold text-gray-800 mb-2">
          🗺️ Itinéraire vers la mairie
        </h2>
        <p className="font-poiret-one text-gray-600">
          Obtenez l'itinéraire depuis votre position actuelle
        </p>
      </div>

      {/* Informations sur la destination */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200 mb-6">
        <div className="text-center">
          <h3 className="font-poiret-one text-xl font-bold text-gray-800 mb-2">
            📍 Destination
          </h3>
          <p className="font-poiret-one text-gray-700 mb-1">
            <strong>Mairie de Trizac</strong>
          </p>
          <p className="font-poiret-one text-gray-600 mb-1">
            Place de la Mairie, 15400 Trizac, France
          </p>
          <p className="font-poiret-one text-purple-700 font-semibold">
            🤵👰 Cérémonie le 27 septembre 2025 à 16h30
          </p>
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
              📍 Obtenir l'itinéraire depuis ma position
            </>
          )}
        </button>
      </div>

      {/* Informations de l'itinéraire */}
      {routeInfo && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
          <div className="text-center">
            <h3 className="font-poiret-one text-lg font-bold text-green-800 mb-2">
              🎯 Itinéraire calculé
            </h3>
            <div className="flex justify-center gap-6">
              <div className="text-center">
                <p className="font-poiret-one text-green-700 text-sm">Distance</p>
                <p className="font-poiret-one text-green-800 font-bold text-lg">{routeInfo.distance}</p>
              </div>
              <div className="text-center">
                <p className="font-poiret-one text-green-700 text-sm">Durée</p>
                <p className="font-poiret-one text-green-800 font-bold text-lg">{routeInfo.duration}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Carte (si showMap est true) */}
      {showMap && (
        <div className="relative mb-6">
          <div 
            ref={mapRef} 
            className="w-full rounded-lg shadow-lg border border-gray-200"
            style={{ height }}
          />
          
          {/* Message si l'API n'est pas chargée */}
          {!isLoaded && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-2"></div>
                <p className="font-poiret-one text-gray-600">Chargement de la carte...</p>
              </div>
            </div>
          )}

          {/* Message d'erreur */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg border border-red-200">
              <div className="text-center p-4">
                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                <p className="font-poiret-one text-red-700">{error}</p>
              </div>
            </div>
          )}
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

      {/* Boutons d'actions alternatives */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={openDirectionsInGoogleMaps}
          className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-3 rounded-lg shadow-md transition-all duration-200 font-poiret-one text-sm font-medium border border-gray-200 hover:shadow-lg"
        >
          🗺️ Ouvrir dans Google Maps
        </button>
        <button
          onClick={openDirectionsInAppleMaps}
          className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-3 rounded-lg shadow-md transition-all duration-200 font-poiret-one text-sm font-medium border border-gray-200 hover:shadow-lg"
        >
          🍎 Ouvrir dans Apple Maps
        </button>
        <button
          onClick={openDirectionsInWaze}
          className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-3 rounded-lg shadow-md transition-all duration-200 font-poiret-one text-sm font-medium border border-gray-200 hover:shadow-lg"
        >
          🚗 Ouvrir dans Waze
        </button>
      </div>

      {/* Informations supplémentaires */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-poiret-one text-lg font-bold text-blue-800 mb-2">
          ℹ️ Informations pratiques
        </h3>
        <ul className="font-poiret-one text-blue-700 text-sm space-y-1">
          <li>• Autoriser la géolocalisation pour un itinéraire personnalisé</li>
          <li>• Prévoir d'arriver 15-30 minutes avant la cérémonie</li>
          <li>• Parking disponible près de la mairie</li>
          <li>• En cas de problème, contactez les mariés</li>
        </ul>
      </div>
    </div>
  );
}
