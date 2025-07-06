// @ts-nocheck
'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import { motion, AnimateSharedLayout, AnimatePresence } from 'motion/react';
import Image from 'next/image';

type GalleryItem = {
  id: string;
  url: string;
  title: string;
  description: string;
};

type GalleryProps = {
  items: GalleryItem[];
  index: number;
  setIndex: (index: number) => void;
  setOpen: (open: boolean) => void;
};

function Gallery({ items, setIndex, setOpen, index }: GalleryProps) {
  return (
    <div className='rounded-md h-64 w-fit mx-auto md:gap-2 gap-1 flex pb-20 pt-10 '>
      {items.slice(0, 11).map((item, i) => {
        return (
          <>
            <motion.img
              whileTap={{ scale: 0.95 }}
              className={`rounded-2xl ${
                index === i
                  ? 'w-[550px] '
                  : 'xl:w-[80px] md:w-[70px] sm:w-[60px] w-[30px]'
              } h-[350px] flex-shrink-0  object-cover transition-[width] ease-in-out duration-300`}
              key={item.id}
              onMouseEnter={() => {
                setIndex(i);
              }}
              onMouseLeave={() => {
                setIndex(i);
              }}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              src={item?.url}
              layoutId={item.id}
            />
          </>
        );
      })}
    </div>
  );
}

export default function index() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  
  // Données d'exemple pour la galerie
  const items: GalleryItem[] = [
    {
      id: "1",
      url: "/mariage-1.jpg",
      title: "Photo de mariage 1",
      description: "Belle photo de notre mariage"
    },
    {
      id: "2", 
      url: "/mariage-2.jpg",
      title: "Photo de mariage 2",
      description: "Moment magique capturé"
    },
    {
      id: "3",
      url: "/mariage-3.jpg", 
      title: "Photo de mariage 3",
      description: "Souvenir précieux"
    },
    {
      id: "4",
      url: "/mariage-4.jpg",
      title: "Photo de mariage 4", 
      description: "Instant inoubliable"
    },
    {
      id: "5",
      url: "/mariage-5.png",
      title: "Photo de mariage 5",
      description: "Bonheur partagé"
    }
  ];

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);
  return (
    <div className='relative'>
      <Gallery
        items={items}
        index={index}
        setIndex={setIndex}
        setOpen={setOpen}
      />
      <AnimatePresence>
        {open !== false && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key='overlay'
            className='dark:bg-black/40 bg-white/40 backdrop-blur-sm fixed inset-0 z-50 top-0 left-0 bottom-0 right-0 w-full h-full grid place-content-center'
            onClick={() => {
              setOpen(false);
            }}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <motion.div
                layoutId={items[index].id}
                className='w-[400px] h-[600px] rounded-2xl cursor-default'
              >
                <Image
                  src={items[index].url}
                  width={600}
                  height={600}
                  alt='single-image'
                  className='rounded-2xl h-full w-full object-cover'
                />
                <article className='dark:bg-primary-base bg-white rounded-md p-2 mt-2 border '>
                  <motion.h1
                    initial={{ scaleY: 0.2 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0.2 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    className='text-xl font-semibold'
                  >
                    {items[index].title}
                  </motion.h1>
                  <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ scaleY: -10, opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    className='text-sm leading-[100%] py-2'
                  >
                    {items[index].description}
                  </motion.p>
                </article>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
