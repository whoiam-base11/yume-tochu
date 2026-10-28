"use client";

import { urlFor } from "@/sanity/lib/image";
import type { Episode } from "@/lib/types";

export default function EpisodeCard({
  episode,
  onClick,
}: {
  episode: Episode;
  onClick?: () => void;
}) {
  return (
    <button
      className="scroll-snap-start border-0 p-0 bg-transparent text-left cursor-pointer min-w-0 overflow-hidden transition-transform hover:-translate-y-[3px]"
      onClick={onClick}
      aria-label={`${episode.name}さんの回を開く`}
    >
      {episode.image ? (
        <img
          src={urlFor(episode.image).width(600).url()}
          alt={episode.name}
          className="w-full h-auto block"
          loading="lazy"
        />
      ) : (
        <div className="w-full aspect-square bg-[#1E1E24] flex items-center justify-center p-4">
          <span className="text-[#3A3A42] font-black text-[clamp(24px,5vw,40px)] text-center leading-tight">
            {episode.name}
          </span>
        </div>
      )}
    </button>
  );
}
