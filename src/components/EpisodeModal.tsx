"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { getAccentColor } from "@/lib/colors";
import { urlFor } from "@/sanity/lib/image";
import SpotifyIcon from "./SpotifyIcon";
import type { Episode } from "@/lib/types";

const SHOW_URL = "https://open.spotify.com/show/566JMxN11RnYzlPJKBJsdD";

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
        <div className="flex items-start">
          {episode.image ? (
            <img
              src={urlFor(episode.image).width(680).url()}
              alt={episode.name}
              className="w-full h-auto block"
            />
          ) : (
            <div className="w-full aspect-square bg-[#1E1E24] flex items-center justify-center p-4">
              <span className="text-[#3A3A42] font-black text-[40px] text-center leading-tight">
                {episode.name}
              </span>
            </div>
          )}
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
              href={episode.spotifyLink || SHOW_URL}
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
