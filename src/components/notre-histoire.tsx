import React from "react";

export default function NotreHistoire() {
  // Liste des images pour la galerie
  const images = [
    "mariage-1.jpg",
    "mariage-2.jpg",
    "mariage-3.jpg",
    "mariage-4.jpg",
    "mariage-5.png",
  ];

  return (
    <div className="grid grid-cols-2 px-8">
      {/* Galerie d'images sticky */}
      <div className="grid gap-2">
        {images.map((image, index) => (
          <figure
            key={index}
            className="sticky top-0 h-screen grid place-content-center"
          >
            <img
              src={image}
              alt={`Trizac ${index + 1}`}
              className="transition-all duration-300 w-124 h-96 align-bottom object-cover rounded-md"
            />
          </figure>
        ))}
      </div>

      {/* Informations de lieu */}
      <div className="sticky top-0 h-screen grid place-content-center">
        <div className="text-4xl px-8 font-poiret-one text-right tracking-tight leading-[120%]">
          
        </div>
      </div>
    </div>
  );
}
