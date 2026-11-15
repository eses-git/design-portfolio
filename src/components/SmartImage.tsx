import { useState } from "react";

interface SmartImageProps {
  src: string;
  alt: string;
  /** Sizing classes applied to both the <img> and the fallback block. */
  className?: string;
  /** Extra classes applied only to the <img> (e.g. hover zoom). */
  imgClassName?: string;
  /** Monogram shown if the image fails to load. */
  letter?: string;
  /** Optional fallback image URL tried before the gradient monogram. */
  fallbackSrc?: string;
}

/**
 * Stock photo component with two layers of resilience:
 *  1. An optional fallback image URL (tried once on error), then
 *  2. A graceful gradient + monogram block so no broken image ever shows.
 */
export default function SmartImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  letter,
  fallbackSrc,
}: SmartImageProps) {
  const [usingFallback, setUsingFallback] = useState(false);
  const [failed, setFailed] = useState(false);

  const currentSrc = usingFallback && fallbackSrc ? fallbackSrc : src;

  if (failed) {
    return (
      <div
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-blush via-cream to-champagne ${className}`}
      >
        <span className="font-serif text-3xl text-ink/40">
          {letter ?? alt.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (fallbackSrc && !usingFallback) {
          setUsingFallback(true);
        } else {
          setFailed(true);
        }
      }}
      className={`object-cover ${className} ${imgClassName}`}
    />
  );
}