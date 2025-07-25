"use client";

import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const morphTime = 0.8;
const cooldownTime = 0.5;
const startDelay = 0.5;

const useMorphingText = (texts: string[], onFirstCycleComplete?: () => void, onConfettiTrigger?: () => void) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());
  const startDelayRef = useRef(startDelay);
  const firstCycleCompletedRef = useRef(false);
  const confettiTriggeredRef = useRef(false);

  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current];
      if (!current1 || !current2) return;

      current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const invertedFraction = 1 - fraction;
      current1.style.filter = `blur(${Math.min(
        8 / invertedFraction - 8,
        100,
      )}px)`;
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

      current1.textContent = texts[textIndexRef.current % texts.length];
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    },
    [texts],
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      textIndexRef.current++;
      
      // Déclencher les confettis un peu avant la fin
      if (!confettiTriggeredRef.current && textIndexRef.current >= texts.length - 2) {
        confettiTriggeredRef.current = true;
        if (onConfettiTrigger) {
          onConfettiTrigger();
        }
      }
      
      // Vérifier si on a complété un cycle complet (scroll un peu plus tôt)
      if (!firstCycleCompletedRef.current && textIndexRef.current >= texts.length - 1) {
        firstCycleCompletedRef.current = true;
        if (onFirstCycleComplete) {
          onFirstCycleComplete();
        }
      }
    }
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [current1, current2] = [text1Ref.current, text2Ref.current];
    if (current1 && current2) {
      current2.style.filter = "none";
      current2.style.opacity = "100%";
      current1.style.filter = "none";
      current1.style.opacity = "0%";
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const newTime = new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = newTime;

      // Gérer le délai de démarrage
      if (startDelayRef.current > 0) {
        startDelayRef.current -= dt;
        return;
      }

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref };
};

interface MorphingTextProps {
  className?: string;
  texts: string[];
  onFirstCycleComplete?: () => void;
  onConfettiTrigger?: () => void;
}

const Texts: React.FC<Pick<MorphingTextProps, "texts" | "onFirstCycleComplete" | "onConfettiTrigger">> = ({ texts, onFirstCycleComplete, onConfettiTrigger }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts, onFirstCycleComplete, onConfettiTrigger);
  return (
    <>
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text1Ref}
      />
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text2Ref}
      />
    </>
  );
};

const SvgFilters: React.FC = () => (
  <svg
    id="filters"
    className="fixed h-0 w-0"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="threshold">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
);

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className,
  onFirstCycleComplete,
  onConfettiTrigger,
}) => (
  <div
    className={cn(
      "relative mx-auto mt-0 h-16 w-full max-w-screen-md text-center font-young-serif text-[40pt] font-bold leading-none [filter:url(#threshold)_blur(0.6px)] md:h-24 lg:text-[6rem]",
      className,
    )}
  >
    <Texts texts={texts} onFirstCycleComplete={onFirstCycleComplete} onConfettiTrigger={onConfettiTrigger} />
    <SvgFilters />
  </div>
);
