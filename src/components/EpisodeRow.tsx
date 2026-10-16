"use client";

import { useState } from "react";
import EpisodeCard from "./EpisodeCard";
import type { Episode } from "@/lib/types";

export default function EpisodeRow({
  id,
  title,
  english,
  episodes,
  onSelect,
}: {
  id: string;
  title: string;
  english: string;
  episodes: Episode[];
  onSelect: (episode: Episode) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  if (episodes.length === 0) return null;

  return (
    <section className="pt-[34px]" id={id}>
      <div className="flex items-end justify-between gap-3 mb-3.5 border-b border-line pb-2.5">
        <h3 className="font-black text-xl m-0 leading-[1.35]">
          <small className="block text-[11px] font-bold tracking-[0.16em] text-red">
            {english}
          </small>
          {title}
        </h3>
        <button
          className="text-fg text-[13px] font-bold whitespace-nowrap bg-transparent border-0 cursor-pointer py-1 px-0 hover:text-spot"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "閉じる" : "すべて表示"}
          <b className="text-red tracking-[-0.1em] ml-1">
            {expanded ? "‹‹‹" : "›››"}
          </b>
        </button>
      </div>
      <div
        className={
          expanded
            ? "grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] max-[820px]:grid-cols-[repeat(2,minmax(0,1fr))] gap-3.5"
            : "grid grid-flow-col gap-3.5 overflow-x-auto snap-x snap-mandatory pb-2.5 track-scroll"
        }
        style={
          expanded
            ? undefined
            : {
                gridAutoColumns:
                  "calc((100% - 3 * 14px) / 4.2)",
              }
        }
      >
        {episodes.map((ep) => (
          <EpisodeCard
            key={ep._id}
            episode={ep}
            onClick={() => onSelect(ep)}
          />
        ))}
      </div>
    </section>
  );
}
