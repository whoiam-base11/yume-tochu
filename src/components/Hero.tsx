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
    <div key={key} className="flex-none w-full h-full relative overflow-hidden flex items-center bg-cream text-navy" aria-hidden={key !== "brand"}>
      <div className="absolute left-1/2 top-1/2 w-[min(1100px,150vw)] aspect-square -translate-x-[58%] -translate-y-1/2 rounded-full border-[6px] border-navy border-r-transparent border-t-transparent opacity-90 pointer-events-none -rotate-[20deg]" />
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[72px] pt-11 pb-12 grid grid-cols-[1.1fr_0.9fr] items-center gap-6 max-md:grid-cols-1 max-md:px-12 max-sm:px-6">
        <div>
          <h2 className="font-mincho font-extrabold text-[clamp(56px,9vw,112px)] leading-none tracking-[0.02em] m-0 whitespace-nowrap max-sm:text-[clamp(44px,13vw,64px)]">
            夢、途中。
          </h2>
          <div className="font-bold text-[clamp(13px,1.5vw,16px)] mt-4.5 mb-1.5 border-b-2 border-spot inline-block pb-1">
            挑戦する若者の、リアルなストーリーを。
          </div>
          <div className="text-xs tracking-[0.42em] font-medium mt-4 mb-5">
            YUME, TOCHU.
          </div>
          <a
            className="inline-flex items-center gap-2.5 py-[11px] px-5 rounded-full bg-navy text-cream font-bold no-underline text-sm max-sm:py-2 max-sm:px-3.5 max-sm:gap-1.5 max-sm:text-xs"
            href={SHOW_URL}
            target="_blank"
            rel="noopener"
          >
            <SpotifyIcon className="w-[18px] h-[18px] max-sm:w-3.5 max-sm:h-3.5" />
            Spotifyで聴く
          </a>
        </div>
        <svg className="w-full max-w-[340px] justify-self-center max-md:max-w-[130px] max-md:absolute max-md:right-5 max-md:bottom-3.5 max-md:opacity-95 max-sm:max-w-24 max-sm:right-2.5 max-sm:bottom-2.5" viewBox="0 0 300 300" aria-hidden="true">
          <polygon points="214,62 236,74 270,290 90,290" fill="#F2CF73" opacity=".85" />
          <g transform="rotate(28 225 60)">
            <rect x="208" y="34" width="34" height="46" rx="5" fill="#1D2A4C" />
            <rect x="221" y="14" width="8" height="22" fill="#1D2A4C" />
            <ellipse cx="225" cy="82" rx="20" ry="5" fill="#1D2A4C" />
          </g>
          <rect x="146" y="150" width="20" height="38" rx="10" fill="#1D2A4C" />
          <path d="M138 176a18 18 0 0 0 36 0" stroke="#1D2A4C" strokeWidth="5" fill="none" />
          <rect x="153" y="194" width="6" height="88" fill="#1D2A4C" />
          <path d="M130 288h52" stroke="#1D2A4C" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>
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
            className={`object-contain object-center${mobileImage ? " max-[390px]:hidden" : ""}`}
            sizes="100vw"
            priority
          />
        )}
        {mobileImage && (
          <Image
            src={urlFor(mobileImage.asset).width(390).height(338).fit("crop").url()}
            alt={`${ep.name}さんのインタビュー`}
            fill
            className="hidden max-[390px]:block object-cover object-center"
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
    <section className="group relative aspect-[8/3] max-[390px]:aspect-[390/338] overflow-hidden bg-black" aria-roledescription="carousel" aria-label="ピックアップ">
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
