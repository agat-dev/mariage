'use client';

import React, { useEffect, useRef, useState } from 'react';

interface GoogleMapProps {
  className?: string;
  height?: string;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function GoogleMap({ className = '', height = '400px' }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Coordonnées de la mairie de Trizac
  const TRIZAC_COORDS = {
    lat: 45.2167,
    lng: 2.7333
  };

  const MAIRIE_ADDRESS = "Place de la Mairie, 15400 Trizac, France";

  useEffect(() => {
    // Vérifier si l'API Google Maps est déjà chargée
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // Charger l'API Google Maps
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    window.initMap = initializeMap;
    script.onload = () => setIsLoaded(true);
    
    document.head.appendChild(script);

    return () => {
      // Nettoyage
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    // Créer la carte
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: TRIZAC_COORDS,
      zoom: 15,
      styles: [
        // Style personnalisé pour un look élégant
        {
          featureType: 'all',
          elementType: 'geometry',
          stylers: [{ color: '#f5f5f5' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#ffffff' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#c9c9c9' }]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{ color: '#eeeeee' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#e5e5e5' }]
        }
      ],
      mapTypeControl: false,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
    });

    // Créer un marqueur personnalisé
    const markerInstance = new window.google.maps.Marker({
      position: TRIZAC_COORDS,
      map: mapInstance,
      title: 'Mairie de Trizac',
      icon: {
        url: 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B4513" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 32),
        anchor: new window.google.maps.Point(16, 32)
      }
    });

    // Fenêtre d'information
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 10px; font-family: 'Poiret One', cursive;">
          <h3 style="margin: 0 0 8px 0; color: #8B4513; font-size: 18px;">Mairie de Trizac</h3>
          <p style="margin: 0; color: #666; font-size: 14px;">Place de la Mairie<br>15400 Trizac, France</p>
          <p style="margin: 8px 0 0 0; color: #8B4513; font-size: 14px;">🤵👰 Lieu de célébration du mariage</p>
        </div>
      `
    });

    // Ouvrir la fenêtre d'information au clic
    markerInstance.addListener('click', () => {
      infoWindow.open(mapInstance, markerInstance);
    });

    setMap(mapInstance);
    setMarker(markerInstance);
  };

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAIRIE_ADDRESS)}`;
    window.open(url, '_blank');
  };

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAIRIE_ADDRESS)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Carte */}
      <div 
        ref={mapRef} 
        className="w-full rounded-lg shadow-lg border border-gray-200"
        style={{ height }}
      />
      
      {/* Boutons d'action */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
        <button
          onClick={openDirections}
          className="bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md transition-all duration-200 font-poiret-one text-sm font-medium border border-gray-200 hover:shadow-lg"
        >
          📍 Itinéraire
        </button>
        <button
          onClick={openInGoogleMaps}
          className="bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md transition-all duration-200 font-poiret-one text-sm font-medium border border-gray-200 hover:shadow-lg"
        >
          🗺️ Ouvrir dans Maps
        </button>
      </div>

      {/* Informations de contact */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-poiret-one text-lg font-bold text-gray-800 mb-2">
          📍 Lieu de célébration
        </h3>
        <p className="font-poiret-one text-gray-600 mb-1">
          <strong>Mairie de Trizac</strong>
        </p>
        <p className="font-poiret-one text-gray-600 mb-1">
          Place de la Mairie
        </p>
        <p className="font-poiret-one text-gray-600 mb-3">
          15400 Trizac, Cantal, France
        </p>
        <p className="font-poiret-one text-sm text-gray-500">
          💒 Cérémonie civile le 27 septembre 2025 à 16h30
        </p>
      </div>

      {/* Message si l'API n'est pas chargée */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-2"></div>
            <p className="font-poiret-one text-gray-600">Chargement de la carte...</p>
          </div>
        </div>
      )}
    </div>
  );
}
