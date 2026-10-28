"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const totalSlides = 1 + featured.length + 1; // brand + episodes + recruit
  const [current, setCurrent] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const go = useCallback(
    (n: number) => setCurrent((n + totalSlides) % totalSlides),
    [totalSlides]
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const timer = setInterval(() => go(current + 1), 6500);
    return () => clearInterval(timer);
  }, [current, go]);

  return (
    <section className="relative aspect-[8/3] overflow-hidden bg-black" aria-roledescription="carousel" aria-label="ピックアップ">
      <div
        className="absolute inset-0 flex slides-transition"
        style={{ transform: `translateX(-${current * 100}%)` }}
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX === null) return;
          const diff = touchStartX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) go(current + (diff > 0 ? 1 : -1));
          setTouchStartX(null);
        }}
      >
        {/* Brand slide */}
        <div className="flex-none w-full h-full relative overflow-hidden flex items-center bg-cream text-navy">
          <div className="absolute left-1/2 top-1/2 w-[min(1100px,150vw)] aspect-square -translate-x-[58%] -translate-y-1/2 rounded-full border-[6px] border-navy border-r-transparent border-t-transparent opacity-90 pointer-events-none -rotate-[20deg]" />
          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[72px] pt-11 pb-12 grid grid-cols-[1.1fr_0.9fr] items-center gap-6 max-md:grid-cols-1 max-md:px-12 max-sm:px-10">
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
                className="inline-flex items-center gap-2.5 py-[11px] px-5 rounded-full bg-navy text-cream font-bold no-underline text-sm"
                href={SHOW_URL}
                target="_blank"
                rel="noopener"
              >
                <SpotifyIcon className="w-[18px] h-[18px]" />
                Spotifyで聴く
              </a>
            </div>
            {/* Stage SVG */}
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

        {/* Episode slides */}
        {featured.map((ep) => {
          const backgroundImage = ep.heroImage || ep.image;
          return (
            <div
              key={ep._id}
              className="flex-none w-full h-full relative overflow-hidden"
            >
              {backgroundImage && (
                <Image
                  src={urlFor(backgroundImage.asset).width(1920).fit("max").url()}
                  alt={`${ep.name}さんのインタビュー`}
                  fill
                  className="object-contain object-center"
                  sizes="100vw"
                  priority
                />
              )}
              <div className="absolute bottom-[120px] left-[58px] z-10 flex items-start gap-2.5 max-md:left-9 max-sm:left-3 max-sm:bottom-20 max-sm:gap-2">
                <a
                  href={ep.spotifyLink || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!ep.spotifyLink}
                  tabIndex={ep.spotifyLink ? undefined : -1}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-cream no-underline shadow-md hover:bg-[#26375F] max-sm:px-3 max-sm:text-xs ${!ep.spotifyLink ? "pointer-events-none opacity-50" : ""}`}
                >
                  <SpotifyIcon className="h-[18px] w-[18px]" />
                  Spotifyで聴く
                </a>
                <button
                  type="button"
                  onClick={() => onSelect(ep)}
                  className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-navy bg-cream px-5 py-2.5 text-sm font-bold text-navy shadow-md hover:bg-white max-sm:px-3 max-sm:text-xs"
                >
                  詳しく見る
                </button>
              </div>
            </div>
          );
        })}

        {/* Recruit slide */}
        <div
          className="flex-none w-full h-full relative overflow-hidden flex items-center tint"
          style={{ "--accent-color": "#D8423F" } as React.CSSProperties}
        >
          <span className="ghost right-[-2%] bottom-[-6%] text-[clamp(90px,17vw,230px)]">
            CASTING
          </span>
          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[72px] pt-11 pb-12 max-md:px-12 max-sm:px-10">
            <p className="font-black italic text-[clamp(22px,3vw,34px)] leading-[1.12] m-0 tracking-[0.01em] drop-shadow-[2px_3px_0_rgb(0_0_0/0.55)]">
              YUME, TOCHU
              <br />
              PODCAST
            </p>
            <div className="w-14 h-[3px] mt-3.5 mb-[22px] bg-red" />
            <h2 className="text-[clamp(24px,3.6vw,42px)] font-black leading-[1.35] m-0 mb-4.5 text-balance max-w-[16em]">
              あなたの「夢、途中。」を
              <br />
              聞かせてください。
            </h2>
            <p className="mt-3 mb-5 max-w-[34em] text-[#D6D5DA] text-sm leading-[1.75]">
              出演・収録したい方を待っています。20分ノーカット、顔出しで夢を語ってみませんか。
            </p>
            <Link
              className="inline-flex items-center gap-2.5 py-[11px] px-5 rounded-full bg-fg text-[#111] font-bold no-underline text-sm hover:bg-white"
              href="/contact"
            >
              お問い合わせはこちら
            </Link>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-16 border-0 bg-transparent cursor-pointer text-white mix-blend-difference"
        onClick={() => go(current - 1)}
        aria-label="前のスライド"
      >
        <svg viewBox="0 0 28 48" className="w-[26px] h-[46px] stroke-current fill-none stroke-2">
          <path d="M24 2 4 24l20 22" />
        </svg>
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-16 border-0 bg-transparent cursor-pointer text-white mix-blend-difference"
        onClick={() => go(current + 1)}
        aria-label="次のスライド"
      >
        <svg viewBox="0 0 28 48" className="w-[26px] h-[46px] stroke-current fill-none stroke-2">
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
            onClick={() => go(i)}
            role="tab"
            aria-label={`スライド${i + 1}`}
            aria-selected={i === current}
          />
        ))}
      </div>
    </section>
  );
}
