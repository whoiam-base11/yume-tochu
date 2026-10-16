"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { getAccentColor } from "@/lib/colors";
import { urlFor } from "@/sanity/lib/image";
import SpotifyIcon from "./SpotifyIcon";
import type { Episode } from "@/lib/types";

const SHOW_URL = "https://open.spotify.com/show/566JMxN11RnYzlPJKBJsdD";
const INSTAGRAM_URL = "https://www.instagram.com/yume.tochu/";

function ghostName(ep: Episode): string {
  if (ep.nameRoman) return ep.nameRoman.split(" ").pop()?.toUpperCase() || "";
  return ep.name.replace(/\s/g, "").toUpperCase();
}

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
    <section className="relative overflow-hidden bg-black" aria-roledescription="carousel" aria-label="ピックアップ">
      <div
        className="flex slides-transition"
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
        <div className="flex-none w-full relative min-h-[400px] overflow-hidden flex items-center bg-cream text-navy max-md:min-h-0">
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
          const accent = getAccentColor(ep.accentColor);
          return (
            <div
              key={ep._id}
              className="flex-none w-full relative min-h-[400px] overflow-hidden flex items-center tint max-md:min-h-0"
              style={{ "--accent-color": accent } as React.CSSProperties}
            >
              {ep.image && (
                <Image
                  src={urlFor(ep.image).width(1200).height(600).url()}
                  alt=""
                  fill
                  className="object-cover opacity-30"
                  sizes="100vw"
                  priority
                />
              )}
              <span className="ghost right-[-2%] bottom-[-6%] text-[clamp(90px,17vw,230px)]">
                {ghostName(ep)}
              </span>
              <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[72px] pt-11 pb-12 max-md:px-12 max-sm:px-10">
                <p className="font-black italic text-[clamp(22px,3vw,34px)] leading-[1.12] m-0 tracking-[0.01em] drop-shadow-[2px_3px_0_rgb(0_0_0/0.55)]">
                  YUME, TOCHU
                  <br />
                  PODCAST
                </p>
                <div className="w-14 h-[3px] mt-3.5 mb-[22px]" style={{ background: accent }} />
                <h2 className="text-[clamp(24px,3.6vw,42px)] font-black leading-[1.35] m-0 mb-4.5 text-balance max-w-[16em]">
                  {ep.catchphrase}
                </h2>
                <div className="text-[11px] font-bold tracking-[0.18em]" style={{ color: accent }}>
                  NEW EPISODE ・ GUEST
                </div>
                <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1 font-black text-[clamp(20px,2.4vw,28px)] leading-[1.3]">
                  {ep.name}
                  {ep.nameRoman && <span className="text-[0.72em]">{ep.nameRoman}</span>}
                </div>
                {ep.affiliation && (
                  <span
                    className="inline-block mt-1.5 px-2 py-0.5 text-[11px] font-bold leading-[1.6] text-white rounded-[1px]"
                    style={{ background: accent }}
                  >
                    {ep.affiliation}
                  </span>
                )}
                <p className="mt-3 mb-5 max-w-[34em] text-[#D6D5DA] text-sm leading-[1.75]">
                  {ep.description}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    className="inline-flex items-center gap-2.5 py-[11px] px-5 rounded-full bg-fg text-[#111] font-bold no-underline text-sm hover:bg-white"
                    href={SHOW_URL}
                    target="_blank"
                    rel="noopener"
                  >
                    <SpotifyIcon className="w-[18px] h-[18px]" />
                    Spotifyで聴く
                  </a>
                  <button
                    className="inline-flex items-center gap-2.5 py-[11px] px-5 rounded-full bg-transparent text-fg font-bold text-sm shadow-[inset_0_0_0_1.5px_currentColor] border-0 cursor-pointer"
                    onClick={() => onSelect(ep)}
                  >
                    詳しく見る
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Recruit slide */}
        <div
          className="flex-none w-full relative min-h-[400px] overflow-hidden flex items-center tint max-md:min-h-0"
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
            <a
              className="inline-flex items-center gap-2.5 py-[11px] px-5 rounded-full bg-fg text-[#111] font-bold no-underline text-sm hover:bg-white"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
            >
              DMで応募する
            </a>
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
      <div className="flex justify-center gap-3 pt-4" role="tablist" aria-label="スライド選択">
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
