"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EpisodeRow from "@/components/EpisodeRow";
import EpisodeCard from "@/components/EpisodeCard";
import EpisodeModal from "@/components/EpisodeModal";
import About from "@/components/About";
import Recruit from "@/components/Recruit";
import Footer from "@/components/Footer";
import { CATEGORIES } from "@/lib/colors";
import type { Episode } from "@/lib/types";

export default function HomeClient({
  episodes,
  featured,
}: {
  episodes: Episode[];
  featured: Episode[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    return episodes.filter((ep) =>
      [
        ep.name,
        ep.nameRoman,
        ep.catchphrase,
        ep.affiliation,
        ep.description,
        ep.favoriteSong,
        ep.favoriteArtist,
        ep.instagramId,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [searchQuery, episodes]);

  return (
    <>
      <Header onSearch={setSearchQuery} />

      <Hero featured={featured} onSelect={setSelectedEpisode} />

      <main className="max-w-[1200px] mx-auto px-5 pb-12 pt-2">
        {searchResults !== null ? (
          <section className="pt-[34px]">
            <div className="flex items-end justify-between gap-3 mb-3.5 border-b border-line pb-2.5">
              <h3 className="font-black text-xl m-0 leading-[1.35]">
                <small className="block text-[11px] font-bold tracking-[0.16em] text-red">
                  SEARCH
                </small>
                「{searchQuery}」の検索結果 {searchResults.length}件
              </h3>
            </div>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3.5">
                {searchResults.map((ep) => (
                  <EpisodeCard
                    key={ep._id}
                    episode={ep}
                    onClick={() => setSelectedEpisode(ep)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted py-5">
                見つかりませんでした。名前の一部、所属、曲名などで試してください。
              </p>
            )}
          </section>
        ) : (
          <>
            {/* Latest episodes */}
            <EpisodeRow
              id="latest"
              title="最新エピソード"
              english="NEW EPISODES"
              episodes={episodes.slice(0, 12)}
              onSelect={setSelectedEpisode}
            />

            {/* Category rows */}
            {CATEGORIES.map((cat) => (
              <EpisodeRow
                key={cat.id}
                id={cat.id}
                title={cat.title}
                english={cat.english}
                episodes={episodes.filter((ep) => ep.category === cat.value)}
                onSelect={setSelectedEpisode}
              />
            ))}
          </>
        )}
      </main>

      <About guestCount={episodes.length} />
      <Recruit />
      <Footer />

      <EpisodeModal
        episode={selectedEpisode}
        onClose={() => setSelectedEpisode(null)}
      />
    </>
  );
}
