import React from "react";
import SpotlightCard from "./ui/spotlight-cards";

export default function LogementAirbnb() {
  return (
    <div className="w-full flex items-center md:pb-0 pb-16">
      <div className="flex flex-wrap max-w-3xl rounded-4xl overflow-hidden shadow-lg">
        <SpotlightCard className="md:w-1/3 w-full bg-transparent p-0" spotlightColor="rgba(0, 229, 255, 0)">
          <img
            src="/trizac-gite.jpg"
            alt="Logement Airbnb"
            className="w-full h-48 object-cover rounded-3xl"
          />
            <div className="mt-6 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                <span className="font-poiret-one text-base text-white tracking-wide">
                    Trizac, Cantal
                </span>
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                </div>
                <span className="font-urbanist text-sm text-white/80 transition">0.6 km - 9 pers.</span>
                <a
                href="https://www.airbnb.fr/rooms/17431961?check_in=2025-09-26&check_out=2025-09-28&guests=1&adults=1&s=67&unique_share_id=4926f334-0656-434a-807a-35000daae55f"
                target="_blank"
                rel="noopener noreferrer"
                className="font-urbanist text-sm text-white/80 underline hover:text-white transition"
                >
                Voir sur Airbnb
                </a>
            </div>
        </SpotlightCard>
        <SpotlightCard className="md:w-1/3 w-full bg-transparent p-0" spotlightColor="rgba(0, 229, 255, 0)">
          <img
            src="/trizac-maryse.webp"
            alt="Logement Airbnb"
            className="w-full h-48 object-cover rounded-3xl"
          />
                {/* Description Art Déco */}
      <div className="mt-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
          <span className="font-poiret-one text-base text-white tracking-wide">
            Trizac, Cantal
          </span>
          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
        </div>
        <span className="font-urbanist text-sm text-white/80 transition">1.8 km - 6 pers.</span>
        <a
          href="https://www.airbnb.fr/rooms/15068764?check_in=2025-09-26&check_out=2025-09-28&guests=1&adults=1&s=67&unique_share_id=0fc6201d-232f-4e5a-98b6-21e5553cbfe7"
          target="_blank"
          rel="noopener noreferrer"
          className="font-urbanist text-sm text-white/80 underline hover:text-white transition"
        >
          Voir sur Airbnb
        </a>
      </div>
        </SpotlightCard>
        <SpotlightCard className="md:w-1/3 w-full bg-transparent p-0" spotlightColor="rgba(0, 229, 255, 0)">
          <img
            src="/gite-trizac.avif"
            alt="Logement Airbnb"
            className="w-full h-48 object-cover rounded-3xl"
          />
          <div className="mt-6 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              <span className="font-poiret-one text-base text-white tracking-wide">
                Trizac, Cantal
              </span>
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            </div>
            <span className="font-urbanist text-sm text-white/80 transition">3.5 km - 10 pers.</span>
            <a
              href="https://www.airbnb.fr/rooms/1178241635726850563?check_in=2025-09-26&check_out=2025-09-28&guests=1&adults=1&s=67&unique_share_id=b19ca775-fa54-4bdb-ad7d-17037d7d23c3"
              target="_blank"
              rel="noopener noreferrer"
              className="font-urbanist text-sm text-white/80 underline hover:text-white transition"
            >
              Voir sur Airbnb
            </a>
          </div>
        </SpotlightCard>

        <SpotlightCard className="md:w-1/3 w-full bg-transparent p-0" spotlightColor="rgba(0, 229, 255, 0)">
          <img
            src="/gite-valette.jpg"
            alt="Logement Airbnb"
            className="w-full h-48 object-cover rounded-3xl"
          />
            <div className="mt-6 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                <span className="font-poiret-one text-base text-white tracking-wide">
                    Valette, Cantal
                </span>
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                </div>
                <span className="font-urbanist text-sm text-white/80 transition">5.2 km - 4 pers.</span>
                <a
                href="https://www.booking.com/hotel/fr/gite-sur-le-plus-volcan-d-europe.html"
                target="_blank"
                rel="noopener noreferrer"
                className="font-urbanist text-sm text-white/80 underline hover:text-white transition"
                >
                Voir sur Booking
                </a>
            </div>
        </SpotlightCard>
        <SpotlightCard className="md:w-1/3 w-full bg-transparent p-0" spotlightColor="rgba(0, 229, 255, 0)">
          <img
            src="/gite-valette.avif"
            alt="Logement Airbnb"
            className="w-full h-48 object-cover rounded-3xl"
            />
            <div className="mt-6 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                <span className="font-poiret-one text-base text-white tracking-wide">
                    Valette, Cantal
                </span>
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                </div>
                <span className="font-urbanist text-sm text-white/80 transition">5.2 km - 4 pers.</span>
                <a
                href="https://www.abritel.fr/location-vacances/p2414332"
                target="_blank"
                rel="noopener noreferrer"
                className="font-urbanist text-sm text-white/80 underline hover:text-white transition"
                >
                Voir sur Abritel
                </a>
            </div>
        </SpotlightCard>
        <SpotlightCard className="md:w-1/3 w-full bg-transparent p-0" spotlightColor="rgba(0, 229, 255, 0)">
          <img
            src="/gite-le-monteil.jpg"
            alt="Logement Airbnb"
            className="w-full h-48 object-cover rounded-3xl"
          />
          <div className="mt-6 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              <span className="font-poiret-one text-base text-white tracking-wide">
                Le Monteil, Cantal
              </span>
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            </div>
            <span className="font-urbanist text-sm text-white/80 transition">6.2 km - 2 pers.</span>
            <a
              href="https://www.booking.com/hotel/fr/chez-julie-le-monteil.fr.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-urbanist text-sm text-white/80 underline hover:text-white transition"
            >
              Voir sur Booking
            </a>
          </div>
        </SpotlightCard>

    </div>
        </div>
    );
}