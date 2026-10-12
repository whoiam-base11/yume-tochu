"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { getAccentColor } from "@/lib/colors";
import { urlFor } from "@/sanity/lib/image";
import SpotifyIcon from "./SpotifyIcon";
import type { Episode } from "@/lib/types";

const SHOW_URL = "https://open.spotify.com/show/566JMxN11RnYzlPJKBJsdD";

function ghostName(ep: Episode): string {
  if (ep.nameRoman) {
    return ep.nameRoman.split(" ").pop()?.toUpperCase() || "";
  }
  return ep.name.replace(/\s/g, "").toUpperCase();
}

export default function EpisodeModal({
  episode,
  onClose,
}: {
  episode: Episode | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!episode) return null;

  const accent = getAccentColor(episode.accentColor);

  return (
    <div
      className="fixed inset-0 z-60 bg-black/70 grid place-items-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="エピソード詳細"
    >
      <div
        className="bg-[#121216] max-w-[820px] w-full max-h-[92vh] overflow-auto grid grid-cols-[minmax(0,340px)_minmax(0,1fr)] relative max-md:grid-cols-1"
        style={{ "--accent-color": accent } as React.CSSProperties}
      >
        {/* Close button */}
        <button
          className="absolute right-1.5 top-1.5 z-10 w-11 h-11 grid place-items-center border-0 bg-black/50 rounded-lg cursor-pointer"
          onClick={onClose}
          aria-label="閉じる"
        >
          <X className="w-6 h-6 stroke-fg" strokeWidth={2.2} />
        </button>

        {/* Card preview */}
        <div className="flex flex-col">
          <div className="relative aspect-[1/0.9] overflow-hidden tint">
            {episode.image ? (
              <Image
                src={urlFor(episode.image).width(680).height(612).url()}
                alt=""
                fill
                className="object-cover"
                sizes="340px"
              />
            ) : (
              <span className="ghost right-[-6%] top-[10%] text-[130px]">
                {ghostName(episode)}
              </span>
            )}
            <div className="absolute left-2.5 top-2 flex items-center gap-1.5 text-[10px] font-black">
              <i className="w-3.5 h-3.5 rounded-full border border-white grid place-items-center not-italic">
                <span className="block w-1 h-1.5 rounded-sm bg-white" />
              </i>
              夢、途中
              <small className="text-[6px] tracking-[0.08em]" style={{ color: accent }}>
                PODCAST
              </small>
            </div>
            <p className="absolute left-2.5 bottom-[26px] m-0 font-black italic text-[26px] leading-tight tracking-[0.01em] drop-shadow-[2px_3px_0_rgb(0_0_0/0.55)]">
              YUME, TOCHU
              <br />
              PODCAST
            </p>
            <div
              className="absolute left-2.5 bottom-3 w-10 h-0.5"
              style={{ background: accent }}
            />
          </div>

          <div className="p-2.5 pt-2.5 pb-0 flex flex-col flex-1">
            <div className="text-[15px] font-black leading-[1.5] pb-2 border-b border-[#2C2C33] mb-2 text-balance">
              {episode.catchphrase}
            </div>
            <div className="text-[8px] font-bold tracking-[0.18em]" style={{ color: accent }}>
              GUEST
            </div>
            <div className="font-black text-[19px] leading-[1.3] flex flex-wrap items-baseline gap-x-2.5">
              {episode.name}
              {episode.nameRoman && (
                <span className="text-[0.72em]">{episode.nameRoman}</span>
              )}
            </div>
            {episode.affiliation && (
              <span
                className="inline-block mt-1.5 px-2 py-0.5 text-[11px] font-bold leading-[1.6] text-white rounded-[1px] self-start"
                style={{ background: accent }}
              >
                {episode.affiliation}
              </span>
            )}
            <div className="flex items-center gap-1.5 mt-auto border-t border-[#2C2C33] py-[7px] mt-2.5">
              <SpotifyIcon className="w-3.5 h-3.5 flex-none" />
              <b className="text-[9px] leading-[1.2]">
                Spotifyで配信中！
                <small className="block text-[6.5px] font-normal text-muted">
                  プロフィールのリンクからご視聴いただけます
                </small>
              </b>
              <span
                className="ml-auto font-black tracking-[-0.15em] text-[13px]"
                style={{ color: accent }}
              >
                ›››
              </span>
            </div>
          </div>
        </div>

        {/* Detail body */}
        <div className="p-6 min-w-0 border-l border-line max-md:border-l-0 max-md:border-t max-md:border-line">
          <h4
            className="text-xs tracking-[0.18em] m-0 mb-2.5"
            style={{ color: accent }}
          >
            【{episode.name.replace(/\s/g, "")}さんの夢、途中】
          </h4>
          <p className="m-0 mb-4 text-sm text-[#D6D5DA]">
            {episode.description}
          </p>

          {episode.favoriteSong && (
            <div
              className="mb-5 p-3 px-3.5 bg-[#1C1C22] text-sm"
              style={{ borderLeft: `3px solid ${accent}` }}
            >
              <span className="block text-[10px] tracking-[0.18em] text-muted">
                FAVORITE SONG
              </span>
              「{episode.favoriteSong}」{episode.favoriteArtist}
            </div>
          )}

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
            {episode.instagramPostId && (
              <a
                className="inline-flex items-center gap-2.5 py-[11px] px-5 rounded-full bg-transparent text-fg font-bold no-underline text-sm shadow-[inset_0_0_0_1.5px_currentColor]"
                href={`https://www.instagram.com/p/${episode.instagramPostId}/`}
                target="_blank"
                rel="noopener"
              >
                紹介投稿を見る
              </a>
            )}
            {episode.instagramId && (
              <a
                className="inline-flex items-center gap-2.5 py-[11px] px-5 rounded-full bg-transparent text-fg font-bold no-underline text-sm shadow-[inset_0_0_0_1.5px_currentColor]"
                href={`https://www.instagram.com/${episode.instagramId}/`}
                target="_blank"
                rel="noopener"
              >
                @{episode.instagramId}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
