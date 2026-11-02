"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import SpotifyIcon from "./SpotifyIcon";
import type { Episode } from "@/lib/types";

const SHOW_URL = "https://open.spotify.com/show/566JMxN11RnYzlPJKBJsdD";

export default function Hero({
  featured,
  onSelect,
}: {
  featured: Episode[];
  onSelect: (episode: Episode) => void;
}) {
  const totalSlides = 1 + featured.length; // brand + episodes
  // position includes clone slots: 0=clone-last, 1..totalSlides=real, totalSlides+1=clone-first
  const [pos, setPos] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Real slide index (0-based)
  const current = ((pos - 1) % totalSlides + totalSlides) % totalSlides;

  const go = useCallback(
    (dir: number) => setPos((p) => p + dir),
    []
  );

  // After transition to a clone, snap to the real slide without animation
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onEnd = () => {
      if (pos <= 0) {
        setAnimate(false);
        setPos(totalSlides);
      } else if (pos > totalSlides) {
        setAnimate(false);
        setPos(1);
      }
    };
    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, [pos, totalSlides]);

  // Re-enable animation after a snap
  useEffect(() => {
    if (!animate) {
      requestAnimationFrame(() => setAnimate(true));
    }
  }, [animate]);

  // Auto-advance
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const timer = setInterval(() => go(1), 6500);
    return () => clearInterval(timer);
  }, [pos, go]);

  const renderBrandSlide = (key: string) => (
    <div key={key} className="flex-none w-full h-full relative overflow-hidden" aria-hidden={key !== "brand"}>
      <Image
        src="/hero.png"
        alt="夢、途中。- 挑戦する若者の、リアルなストーリーを。"
        fill
        className="object-cover object-center max-[391px]:hidden"
        sizes="100vw"
        priority
      />
      <Image
        src="/hero_mobile.png"
        alt="夢、途中。- 挑戦する若者の、リアルなストーリーを。"
        fill
        className="hidden max-[391px]:block object-cover object-center"
        sizes="390px"
        priority
      />
    </div>
  );

  const renderEpisodeSlide = (ep: Episode, key?: string) => {
    if (!ep) return null;
    const desktopImage = ep.heroImage || ep.image;
    const mobileImage = ep.heroImageMobile;
    return (
      <div key={key || ep._id} className="flex-none w-full h-full relative overflow-hidden" aria-hidden={!!key}>
        {desktopImage && (
          <Image
            src={urlFor(desktopImage.asset).width(1920).fit("max").url()}
            alt={`${ep.name}さんのインタビュー`}
            fill
            className={`object-contain object-center${mobileImage ? " max-[391px]:hidden" : ""}`}
            sizes="100vw"
            priority
          />
        )}
        {mobileImage && (
          <Image
            src={urlFor(mobileImage.asset).width(390).height(338).fit("crop").url()}
            alt={`${ep.name}さんのインタビュー`}
            fill
            className="hidden max-[391px]:block object-cover object-center"
            sizes="390px"
            priority
          />
        )}
        <div className="hero-btn-wrap absolute z-10 flex items-start">
          <a
            href={ep.spotifyLink || undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!ep.spotifyLink}
            tabIndex={ep.spotifyLink ? undefined : -1}
            className={`hero-btn hero-btn-spotify inline-flex items-center bg-navy font-bold text-cream no-underline shadow-md hover:bg-[#26375F] ${!ep.spotifyLink ? "pointer-events-none opacity-50" : ""}`}
          >
            <SpotifyIcon className="hero-btn-icon" />
            Spotifyで聴く
          </a>
          <button
            type="button"
            onClick={() => onSelect(ep)}
            className="hero-btn inline-flex cursor-pointer items-center border border-navy bg-cream font-bold text-navy shadow-md hover:bg-white"
          >
            詳しく見る
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="group relative aspect-[8/3] max-[391px]:aspect-[390/338] overflow-hidden bg-black" aria-roledescription="carousel" aria-label="ピックアップ">
      <div
        ref={trackRef}
        className={`absolute inset-0 flex${animate ? " slides-transition" : ""}`}
        style={{ transform: `translateX(-${pos * 100}%)` }}
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX === null) return;
          const diff = touchStartX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
          setTouchStartX(null);
        }}
      >
        {/* Clone of last slide (for seamless backward loop) */}
        {renderEpisodeSlide(featured[featured.length - 1], "clone-prev")}

        {/* Brand slide */}
        {renderBrandSlide("brand")}

        {/* Episode slides */}
        {featured.map((ep) => renderEpisodeSlide(ep))}

        {/* Clone of first slide (for seamless forward loop) */}
        {renderBrandSlide("clone-next")}
      </div>

      {/* Arrows */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-16 border-0 bg-transparent cursor-pointer text-white mix-blend-difference max-sm:w-7 max-sm:h-11 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={() => go(-1)}
        aria-label="前のスライド"
      >
        <svg viewBox="0 0 28 48" className="w-[26px] h-[46px] stroke-current fill-none stroke-2 max-sm:w-[17px] max-sm:h-[31px]">
          <path d="M24 2 4 24l20 22" />
        </svg>
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-16 border-0 bg-transparent cursor-pointer text-white mix-blend-difference max-sm:w-7 max-sm:h-11 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={() => go(1)}
        aria-label="次のスライド"
      >
        <svg viewBox="0 0 28 48" className="w-[26px] h-[46px] stroke-current fill-none stroke-2 max-sm:w-[17px] max-sm:h-[31px]">
          <path d="M4 2l20 22L4 46" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 inset-x-0 z-10 flex justify-center gap-3" role="tablist" aria-label="スライド選択">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            className="w-2.5 h-2.5 rounded-full border-0 cursor-pointer p-0"
            style={{ background: i === current ? "#E0443E" : "#3A3A42" }}
            onClick={() => setPos(i + 1)}
            role="tab"
            aria-label={`スライド${i + 1}`}
            aria-selected={i === current}
          />
        ))}
      </div>
    </section>
  );
}
