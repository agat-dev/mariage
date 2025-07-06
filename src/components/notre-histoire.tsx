import React, { useEffect, useState, useRef } from "react";

export default function NotreHistoire() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Liste des images pour la galerie
  const images = [
    "mariage-1.jpg",
    "mariage-2.jpg", 
    "mariage-3.jpg",
    "mariage-4.jpg",
    "mariage-5.png",
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculer la position et l'opacité de chaque image en fonction du scroll
  const getImageStyle = (index: number) => {
    if (!containerRef.current) return { opacity: index === 0 ? 1 : 0, transform: 'translateX(0%)' };
    
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = window.innerHeight;
    const relativeScroll = Math.max(0, scrollY - containerTop);
    
    // Chaque image a une zone de déclenchement de 100vh
    const imageStartScroll = index * containerHeight;
    const imageEndScroll = (index + 1) * containerHeight;
    
    // Progression de l'animation pour cette image (0 à 1)
    const progress = Math.max(0, Math.min(1, 
      (relativeScroll - imageStartScroll) / (imageEndScroll - imageStartScroll)
    ));

    // Translation depuis la droite vers le centre
    const translateX = (1 - progress) * 100; // 100% à droite, 0% au centre
    
    // Opacité progressive - la première image est toujours visible au début
    const opacity = index === 0 ? Math.max(0.5, progress) : progress;

    // Z-index pour la superposition (première image au-dessus)
    const zIndex = index + 1;

    return {
      transform: `translateX(${translateX}%)`,
      opacity,
      zIndex,
      transition: 'none' // Animation contrôlée par le scroll
    };
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Zone sticky pour l'animation des images */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 flex items-center justify-center"
            style={getImageStyle(index)}
          >
            <img
              src={`/${image}`}
              alt={`Notre histoire ${index + 1}`}
              className="w-96 h-96 object-cover rounded-lg shadow-2xl"
            />
          </div>
        ))}
      </div>

      {/* Spacer pour créer l'espace de scroll nécessaire pour l'animation */}
      <div style={{ height: `${images.length * 100}vh` }}></div>

      {/* Section de contenu qui apparaît après l'animation */}
      <div className="min-h-screen flex items-center justify-end pr-16 bg-gradient-to-br from-black to-gray-900">
        <div className="text-right max-w-2xl">
          <h2 className="mb-8 text-6xl font-poiret-one text-white tracking-tight">
            Notre Histoire
          </h2>
          <p className="text-xl leading-relaxed mb-6 text-white/90">
            Une histoire qui a commencé dans les rues de Paris et qui trouve son apogée à Trizac, 
            dans le cadre enchanteur du Cantal.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            Chaque image raconte un chapitre de notre parcours vers ce jour si spécial. 
            Des premiers regards aux moments les plus intimes, notre amour a grandi 
            pour s'épanouir dans ce lieu magique.
          </p>
        </div>
      </div>
    </div>
  );
}
