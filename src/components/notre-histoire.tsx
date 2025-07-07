import React, { useEffect, useState, useRef } from "react";

export default function NotreHistoire() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
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
    // Détecter si on est sur mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Version mobile : affichage simple des images
  if (isMobile) {
    return (
      <div className="relative bg-black py-16 px-4">
        <div className="mx-auto space-y-8">
          {images.map((image, index) => (
            <div key={index} className="w-full">
              <img
                src={`/${image}`}
                alt={`Notre histoire ${index + 1}`}
                className="w-full h-80 object-cover rounded-lg shadow-2xl"
              />
            </div>
          ))}
          

        </div>
      </div>
    );
  }

  // Calculer la position et l'opacité de chaque image en fonction du scroll
  const getImageStyle = (index: number) => {
    if (!containerRef.current) return { opacity: index === 0 ? 1 : 0, transform: 'translateX(0%)' };
    
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = window.innerHeight;
    const relativeScroll = Math.max(0, scrollY - containerTop);
    
    // Zone d'animation pour chaque image
    const imageStartScroll = index * containerHeight * 0.5;
    const imageEndScroll = (index + 1) * containerHeight * 0.5;
    
    // Zone totale d'animation (dernière image complètement centrée)
    const totalAnimationHeight = images.length * containerHeight * 0.5;
    // Zone de sécurité étendue pour s'assurer que la dernière image soit complètement visible
    const safetyZone = totalAnimationHeight + containerHeight * 0.5;
    
    // Progression de l'animation pour cette image (0 à 1)
    const progress = Math.max(0, Math.min(1, 
      (relativeScroll - imageStartScroll) / (imageEndScroll - imageStartScroll)
    ));

    // Translation depuis la droite vers le centre
    const translateX = (1 - progress) * 100; // 100% à droite, 0% au centre
    
    // Opacité progressive - logique renforcée pour la dernière image
    let opacity;
    if (relativeScroll >= safetyZone) {
      // Dans la zone de sécurité étendue, toutes les images sont visibles
      opacity = 1;
    } else if (index === 0) {
      // La première image est toujours visible
      opacity = 1;
    } else if (index === images.length - 1) {
      // Logique spéciale pour la dernière image - elle doit être complètement visible
      if (relativeScroll >= imageEndScroll + containerHeight * 0.25) {
        opacity = 1;
      } else {
        opacity = progress;
      }
    } else if (relativeScroll >= imageStartScroll) {
      // Images intermédiaires
      opacity = Math.max(progress, relativeScroll >= imageEndScroll ? 1 : progress);
    } else {
      // Image pas encore déclenchée
      opacity = 0;
    }

    // Position finale : toutes les images restent centrées après animation
    const finalTranslateX = relativeScroll >= safetyZone ? 0 : translateX;

    return {
      transform: `translateX(${finalTranslateX}%)`,
      opacity,
      zIndex: index + 1,
      transition: 'none'
    };
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Container avec la hauteur nécessaire pour l'animation + espace supplémentaire */}
      <div style={{ height: `${(images.length + 1) * 60}vh` }} className="relative">
        
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
                className="w-164 h-164 object-cover rounded-lg shadow-2xl"
              />
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}
