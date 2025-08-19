import React, { useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)"
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-4xl bg-neutral-900 overflow-hidden p-8 ${className}`}
    >
      {/* Ornements Art Déco - coins */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Coin haut gauche */}
        <div className="absolute top-0 left-0 w-8 h-8">
          <div className="absolute top-1 left-1 w-6 h-6 border-t-2 border-l-2 border-amber-400/60 rounded-tl-lg"></div>
          <div className="absolute top-3 left-3 w-2 h-2 bg-amber-500 rounded-full"></div>
        </div>
        {/* Coin haut droit */}
        <div className="absolute top-0 right-0 w-8 h-8">
          <div className="absolute top-1 right-1 w-6 h-6 border-t-2 border-r-2 border-amber-400/60 rounded-tr-lg"></div>
          <div className="absolute top-3 right-3 w-2 h-2 bg-amber-500 rounded-full"></div>
        </div>
        {/* Coin bas gauche */}
        <div className="absolute bottom-0 left-0 w-8 h-8">
          <div className="absolute bottom-1 left-1 w-6 h-6 border-b-2 border-l-2 border-amber-400/60 rounded-bl-lg"></div>
          <div className="absolute bottom-3 left-3 w-2 h-2 bg-amber-500 rounded-full"></div>
        </div>
        {/* Coin bas droit */}
        <div className="absolute bottom-0 right-0 w-8 h-8">
          <div className="absolute bottom-1 right-1 w-6 h-6 border-b-2 border-r-2 border-amber-400/60 rounded-br-lg"></div>
          <div className="absolute bottom-3 right-3 w-2 h-2 bg-amber-500 rounded-full"></div>
        </div>
        {/* Séparateur bas */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded"></div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}


    </div>
  );
};

export default SpotlightCard;