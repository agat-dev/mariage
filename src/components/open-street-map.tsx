'use client';

import React, { useEffect, useRef } from 'react';

interface OpenStreetMapProps {
  className?: string;
  height?: string;
}

// Déclaration pour Leaflet
declare global {
  interface Window {
    L: any;
  }
}

export default function OpenStreetMap({ className = '', height = '400px' }: OpenStreetMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const MAIRIE_ADDRESS = "Place de la Mairie, 15400 Trizac, France";
  
  // Coordonnées de Trizac
  const TRIZAC_COORDS = [45.216667, 2.733333];

  useEffect(() => {
    // Charger Leaflet.js si pas déjà chargé
    if (!window.L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      // Nettoyage si nécessaire
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || !window.L) return;

    // Créer la carte
    const map = window.L.map(mapRef.current).setView(TRIZAC_COORDS, 16);

    // Ajouter les tuiles OpenStreetMap
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Créer une icône personnalisée
    const customIcon = window.L.divIcon({
      html: `
        <div style="
          background: white;
          border: 3px solid #8B4513;
          border-radius: 50% 50% 50% 0;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          transform: rotate(-45deg);
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        ">
          <span style="transform: rotate(45deg);">💒</span>
        </div>
      `,
      className: 'custom-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    // Ajouter le marqueur
    const marker = window.L.marker(TRIZAC_COORDS, { icon: customIcon }).addTo(map);

    // Ajouter un popup
    marker.bindPopup(`
      <div style="padding: 15px; font-family: 'Poiret One', cursive; max-width: 300px;">
        <h3 style="margin: 0 0 12px 0; color: #8B4513; font-size: 18px; text-align: center;">💒 Mairie de Trizac</h3>
        <div style="border-bottom: 2px solid #8B4513; margin-bottom: 12px;"></div>
        <p style="margin: 0 0 8px 0; color: #666; font-size: 14px; line-height: 1.4;">
          <strong>📍 Adresse :</strong><br>
          Place de la Mairie<br>
          15400 Trizac, Cantal, France
        </p>
        <p style="margin: 0 0 8px 0; color: #8B4513; font-size: 14px; line-height: 1.4;">
          <strong>📅 Rendez-vous :</strong><br>
          27 septembre 2025 à 16h30
        </p>
        <p style="margin: 8px 0 0 0; color: #8B4513; font-size: 14px; text-align: center; font-weight: bold;">
          🤵👰 Lieu de célébration du mariage d'Agathe & Alain
        </p>
      </div>
    `);

    // Ouvrir automatiquement le popup
    marker.openPopup();
  };

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAIRIE_ADDRESS)}`;
    window.open(url, '_blank');
  };

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAIRIE_ADDRESS)}`;
    window.open(url, '_blank');
  };

  const openInOSM = () => {
    const url = `https://www.openstreetmap.org/?mlat=${TRIZAC_COORDS[0]}&mlon=${TRIZAC_COORDS[1]}&zoom=16`;
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
      <div className="mt-4 flex gap-2 justify-center flex-wrap">
        <button
          onClick={openDirections}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 font-poiret-one text-sm font-medium"
        >
          🧭 Itinéraire Google
        </button>
        <button
          onClick={openInGoogleMaps}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 font-poiret-one text-sm font-medium"
        >
          🗺️ Google Maps
        </button>
        <button
          onClick={openInOSM}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 font-poiret-one text-sm font-medium"
        >
          🌍 OpenStreetMap
        </button>
      </div>

      {/* Informations détaillées */}
      <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
        <h3 className="font-poiret-one text-lg font-bold text-gray-800 mb-3">
          💒 Lieu de célébration
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-poiret-one text-gray-700 mb-1">
              <strong>📍 Adresse :</strong>
            </p>
            <p className="font-poiret-one text-gray-600 mb-3">
              Place de la Mairie<br />
              15400 Trizac, Cantal, France
            </p>
          </div>
          
          <div>
            <p className="font-poiret-one text-gray-700 mb-1">
              <strong>🕐 Rendez-vous :</strong>
            </p>
            <p className="font-poiret-one text-gray-600 mb-1">
              27 septembre 2025
            </p>
            <p className="font-poiret-one text-gray-600">
              16h30 précises
            </p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-poiret-one text-blue-800 text-sm">
            🌍 <strong>Carte alternative :</strong> Cette carte utilise OpenStreetMap, 
            une alternative gratuite et open-source à Google Maps.
          </p>
        </div>

        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="font-poiret-one text-amber-800 text-sm">
            💡 <strong>Conseil :</strong> Prévoyez votre itinéraire à l'avance. 
            Trizac est un charmant village du Cantal, pensez au temps de trajet !
          </p>
        </div>
      </div>
    </div>
  );
}
