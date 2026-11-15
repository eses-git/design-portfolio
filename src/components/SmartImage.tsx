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
}

/**
 * Stock photo component with a graceful gradient + monogram fallback so the
 * demo never shows a broken image if a remote URL is unavailable.
 */
export default function SmartImage({ src, alt, className = "", imgClassName = "", letter }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

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
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className} ${imgClassName}`}
    />
  );
}