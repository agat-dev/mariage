'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface GoogleMapProps {
  className?: string;
}

export default function GoogleMap({ className = '' }: GoogleMapProps) {
  // États existants
  const [distance, setDistance] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  // Nouvel état pour le compte à rebours avec secondes
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Date de la cérémonie (à ajuster selon votre date réelle)
  const CEREMONY_DATE = new Date('2025-09-27T16:30:00'); // Exemple: 12 juillet 2025 à 14h30

  // Coordonnées précises de la mairie de Trizac
  const TRIZAC_COORDS = {
    lat: 45.253367,
    lng: 2.538010999999983
  };

  const MAIRIE_ADDRESS = "Place de la Mairie, 15400 Trizac, France";

  // Fonction pour calculer le temps restant avec secondes
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const difference = CEREMONY_DATE.getTime() - now.getTime();

    if (difference > 0) {
      const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44)); // Approximation
      const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ months, days, hours, minutes, seconds });
    } else {
      setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  }, [CEREMONY_DATE]);

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

  // Mettre à jour le compte à rebours toutes les secondes
  useEffect(() => {
    calculateTimeLeft(); // Calcul initial
    const timer = setInterval(calculateTimeLeft, 1000); // Mise à jour toutes les secondes
    
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

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
    <div className={`w-10/12 relative ${className}`}>



      {/* Informations de contact */}
      <div className="my-10 relative">
        {/* Encadré Art Déco */}
        <div className="relative bg-gradient-to-br from-indigo-900/10 to-indigo-900/20 p-8 rounded-lg shadow-2xl border-[1px] border-amber-200/50 overflow-hidden">
          
          {/* Ornements Art Déco - Coins supérieurs */}
          <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
            <div className="absolute top-2 left-2 w-12 h-12 border-t-[1px] border-l-[1px] border-amber-400/60 rounded-tl-lg"></div>
            <div className="absolute top-1 left-1 w-6 h-6 border-t-2 border-l-[1px] border-amber-600/80 rounded-tl-lg"></div>
            <div className="absolute top-4 left-4 w-2 h-2 bg-amber-500 rounded-full"></div>
          </div>
          
          <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
            <div className="absolute top-2 right-2 w-12 h-12 border-t-[1px] border-r-[1px] border-amber-400/60 rounded-tr-lg"></div>
            <div className="absolute top-1 right-1 w-6 h-6 border-t-[1px] border-r-[1px] border-amber-600/80 rounded-tr-lg"></div>
            <div className="absolute top-4 right-4 w-2 h-2 bg-amber-500 rounded-full"></div>
          </div>
          
          {/* Ornements Art Déco - Coins inférieurs */}
          <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
            <div className="absolute bottom-2 left-2 w-12 h-12 border-b-[1px] border-l-[1px] border-amber-400/60 rounded-bl-lg"></div>
            <div className="absolute bottom-1 left-1 w-6 h-6 border-b-[1px] border-l-[1px] border-amber-600/80 rounded-bl-lg"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-amber-500 rounded-full"></div>
          </div>
          
          <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
            <div className="absolute bottom-2 right-2 w-12 h-12 border-b-[1px] border-r-[1px] border-amber-400/60 rounded-br-lg"></div>
            <div className="absolute bottom-1 right-1 w-6 h-6 border-b-[1px] border-r-[1px] border-amber-600/80 rounded-br-lg"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-amber-500 rounded-full"></div>
          </div>
          
          {/* Motifs géométriques Art Déco centraux */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none opacity-10">
            <div className="absolute inset-0 border-2 border-amber-400 rounded-full"></div>
            <div className="absolute inset-4 border-2 border-amber-500 rounded-full"></div>
            <div className="absolute inset-8 border-2 border-amber-600 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-500 rounded-full"></div>
          </div>
          
          {/* Lignes décoratives verticales */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent"></div>
          <div className="absolute right-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent"></div>
          
          {/* Contenu */}
          <div className="relative z-10 text-center">
            <h3 className="font-poiret-one text-4xl font-bold text-white/70 mb-6 relative">
              Lieu de célébration
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            </h3>

            {/* Message pendant la géolocalisation */}
            {isGettingLocation && (
              <div className="mb-6 p-4 bg-white/70 rounded-lg border border-amber-300/50 shadow-inner">
                <p className="font-poiret-one text-amber-800 text-center text-lg">
                  Calcul de votre distance...
                </p>
              </div>
            )}
            
            <div className="space-y-3 mt-8">
              <p className="font-poiret-one text-3xl text-white/90 font-bold">
                Mairie de Trizac
              </p>
              <div className="w-16 h-px bg-amber-500 mx-auto my-4"></div>
              <p className="font-urbanist text-lg text-white/80">
                Place de la Mairie
              </p>
              <p className="font-urbanist text-lg text-white/80">
                15400 Trizac, Cantal, France
              </p>
            </div>
            
            {/* Ornement décoratif de séparation */}
            <div className="flex justify-center items-center mt-6">
              <div className="w-8 h-px bg-amber-400"></div>
              <div className="w-2 h-2 bg-amber-500 rounded-full mx-2"></div>
              <div className="w-8 h-px bg-amber-400"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex gap-6 justify-center items-center flex-wrap my-4">        
        <button
          onClick={openInGoogleMaps}
          className="button"
        >
          Voir sur Google Maps
        </button>
        
        {/* Séparateur losange Art Déco */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative">
              <div className="w-2 h-2 border-2 border-amber-400/60 rotate-45"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"></div>
           </div>
        </div>
        
        <button
          onClick={openDirections}
          className="button"
        >
          Itinéraire Google Maps
        </button>
        
        {/* Séparateur losange Art Déco */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative">
            <div className="w-2 h-2 border-2 border-amber-400/60 rotate-45"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"></div>
          </div>
        </div>
        
        <button
          onClick={openInWaze}
          className="button"
        >
          Itinéraire Waze
        </button>
      </div>

            {/* Affichage de la distance si disponible */}
      {distance && (
        <div className="mt-10 md:p-1 text-xl">
          <p className="font-poiret-one text-white-900 font-bold text-center">
            Vous n&apos;êtes plus qu&apos;à {distance} de Trizac
          </p>
        </div>
      )}

            {/* Ornement décoratif de séparation */}
            <div className="flex justify-center items-center my-6">
              <div className="w-8 h-px bg-amber-400"></div>
              <div className="w-2 h-2 bg-amber-500 rounded-full mx-2"></div>
              <div className="w-8 h-px bg-amber-400"></div>
            </div>


            {/* Compte à rebours avant la cérémonie */}
      <div className="my-4">
        <div className="text-center">
          <p className="font-poiret-one text-xl text-white/90 font-bold mb-4">
            Nous nous retrouvons dans
          </p>

          <div className="flex gap-4 justify-center items-center flex-wrap">
              <span className="w-[3rem] font-poiret-one text-2xl font-bold text-white"> {timeLeft.months}</span>
              <span className="font-urbanist text-sm text-gray-400">Mois</span>

        {/* Séparateur losange Art Déco */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative">
            <div className="w-1 h-1 border-2 border-amber-400 rotate-45"></div>
           </div>
        </div>
              <span className="w-[3rem] font-poiret-one text-2xl font-bold text-white">{timeLeft.days}</span>
              <span className="font-urbanist text-sm text-gray-400">Jours</span>
        {/* Séparateur losange Art Déco */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative">
            <div className="w-1 h-1 border-2 border-amber-400 rotate-45"></div>
           </div>
        </div>
              <span className="w-[3rem] font-poiret-one text-2xl font-bold text-white">{timeLeft.hours}</span>
              <span className="font-urbanist text-sm text-gray-400">Heures</span>
        {/* Séparateur losange Art Déco */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative">
            <div className="w-1 h-1 border-2 border-amber-400 rotate-45"></div>
           </div>
        </div>
              <span className="w-[3rem] font-poiret-one text-2xl font-bold text-white">{timeLeft.minutes}</span>
              <span className="font-urbanist text-sm text-gray-400">Minutes</span>
        {/* Séparateur losange Art Déco */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative">
            <div className="w-1 h-1 border-2 border-amber-400 rotate-45"></div>
           </div>
        </div>
              <span className="w-[3rem] font-poiret-one text-2xl font-bold text-white">{timeLeft.seconds}</span>
              <span className="font-urbanist text-sm text-gray-400">Secondes</span>

          </div>
        </div>
      </div>

    </div>
  );
}
