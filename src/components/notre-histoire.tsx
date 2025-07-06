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
    
    // Zone totale d'animation = nombre d'images * hauteur d'écran
    const totalAnimationHeight = images.length * containerHeight;
    
    // Si on est dans la zone d'animation
    if (relativeScroll <= totalAnimationHeight) {
      // Chaque image a une zone de déclenchement de 100vh
      const imageStartScroll = index * containerHeight;
      const imageEndScroll = (index + 1) * containerHeight;
      
      // Progression de l'animation pour cette image (0 à 1)
      const progress = Math.max(0, Math.min(1, 
        (relativeScroll - imageStartScroll) / (imageEndScroll - imageStartScroll)
      ));

      // Translation depuis la droite vers le centre
      const translateX = (1 - progress) * 100; // 100% à droite, 0% au centre
      
      // Opacité progressive - la première image est visible dès le début
      const opacity = index === 0 ? Math.max(1, progress) : progress;

      return {
        transform: `translateX(${translateX}%)`,
        opacity,
        zIndex: index + 1,
        transition: 'none'
      };
    }
    
    // Après l'animation, toutes les images restent visibles au centre
    return {
      transform: 'translateX(0%)',
      opacity: 1,
      zIndex: index + 1,
      transition: 'none'
    };
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Container avec la hauteur totale nécessaire pour l'animation */}
      <div style={{ height: `${images.length * 100}vh` }} className="relative">
        
        {/* Zone sticky pour l'animation des images - reste fixe pendant le scroll */}
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
      </div>
    </div>
  );
}
