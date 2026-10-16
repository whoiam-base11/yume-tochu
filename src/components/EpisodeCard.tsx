"use client";

import Image from "next/image";
import { getAccentColor } from "@/lib/colors";
import { urlFor } from "@/sanity/lib/image";
import SpotifyIcon from "./SpotifyIcon";
import type { Episode } from "@/lib/types";

function ghostName(ep: Episode): string {
  if (ep.nameRoman) {
    return ep.nameRoman.split(" ").pop()?.toUpperCase() || "";
  }
  return ep.name.replace(/\s/g, "").toUpperCase();
}

export default function EpisodeCard({
  episode,
  onClick,
}: {
  episode: Episode;
  onClick?: () => void;
}) {
  const accent = getAccentColor(episode.accentColor);

  return (
    <button
      className="scroll-snap-start flex flex-col border-0 p-0 bg-[#121216] text-left cursor-pointer min-w-0 overflow-hidden transition-transform hover:-translate-y-[3px]"
      style={{ "--accent-color": accent } as React.CSSProperties}
      onClick={onClick}
      aria-label={`${episode.name}さんの回を開く`}
    >
      {/* Photo area */}
      <div className="relative aspect-[1/0.82] overflow-hidden tint">
        {episode.image ? (
          <Image
            src={urlFor(episode.image).width(400).height(328).url()}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 820px) 50vw, 25vw"
          />
        ) : (
          <span className="ghost right-[-6%] top-[10%] text-[90px]">
            {ghostName(episode)}
          </span>
        )}
        {/* Mini logo */}
        <div className="absolute left-2.5 top-2 flex items-center gap-1.5 text-[10px] font-black">
          <i className="w-3.5 h-3.5 rounded-full border border-white grid place-items-center not-italic">
            <span className="block w-1 h-1.5 rounded-sm bg-white" />
          </i>
          夢、途中
          <small className="text-[6px] tracking-[0.08em]" style={{ color: accent }}>
            PODCAST
          </small>
        </div>
        {/* YUME, TOCHU text */}
        <p className="card-yt absolute left-2.5 bottom-[22px] m-0 font-black italic text-[19px] leading-tight tracking-[0.01em] drop-shadow-[2px_3px_0_rgb(0_0_0/0.55)]">
          YUME, TOCHU
          <br />
          PODCAST
        </p>
        <div
          className="absolute left-2.5 bottom-3 w-10 h-0.5"
          style={{ background: accent }}
        />
      </div>

      {/* Info area */}
      <div className="p-2.5 pt-2.5 pb-0 flex flex-col flex-1">
        <div className="card-catch text-[12.5px] font-black leading-[1.5] min-h-[3em] pb-2 border-b border-[#2C2C33] mb-2 text-balance">
          {episode.catchphrase}
        </div>
        <div
          className="text-[8px] font-bold tracking-[0.18em]"
          style={{ color: accent }}
        >
          GUEST
        </div>
        <div className="card-gname font-black text-[15px] leading-[1.3] flex flex-wrap items-baseline gap-x-2.5">
          {episode.name}
          {episode.nameRoman && (
            <span className="text-[0.8em]">{episode.nameRoman}</span>
          )}
        </div>
        {episode.affiliation && (
          <span
            className="inline-block mt-1 px-1.5 py-px text-[9px] font-bold leading-[1.6] text-white rounded-[1px] self-start max-w-full overflow-hidden text-ellipsis whitespace-nowrap"
            style={{ background: accent }}
          >
            {episode.affiliation}
          </span>
        )}

        {/* Spotify bar */}
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
    </button>
  );
}
