"use client";

import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/colors";

const SHOW_URL = "https://open.spotify.com/show/566JMxN11RnYzlPJKBJsdD";
const INSTAGRAM_URL = "https://www.instagram.com/yume.tochu/";

export default function Header({
  onSearch,
}: {
  onSearch?: (query: string) => void;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-[rgb(14_14_17/0.94)] backdrop-blur-sm border-b border-line">
        <div className="max-w-[1200px] mx-auto px-5 flex items-center gap-2 h-[60px]">
          <Link
            href="/"
            className="flex items-center gap-2 no-underline mr-auto min-w-0"
          >
            <span className="w-[26px] h-[26px] rounded-full border-[1.5px] border-fg grid place-items-center flex-none">
              <svg viewBox="0 0 12 14" className="w-3 h-3.5 fill-fg">
                <rect x="3" y="0" width="6" height="9" rx="3" />
                <rect x="5.3" y="9" width="1.4" height="5" />
              </svg>
            </span>
            <b className="font-mincho font-extrabold text-[22px] whitespace-nowrap">
              夢、途中。
            </b>
            <small className="text-[9px] font-bold tracking-[0.14em] text-red self-end pb-1.5 max-[480px]:hidden">
              PODCAST
            </small>
          </Link>

          <button
            className="w-11 h-11 grid place-items-center border-0 bg-transparent rounded-lg cursor-pointer hover:bg-panel"
            onClick={() => {
              setSearchOpen(!searchOpen);
              if (searchOpen && onSearch) onSearch("");
            }}
            aria-label="出演者を検索"
            aria-expanded={searchOpen}
          >
            <Search className="w-6 h-6 stroke-fg" strokeWidth={2.2} />
          </button>

          <button
            className="w-11 h-11 grid place-items-center border-0 bg-transparent rounded-lg cursor-pointer hover:bg-panel"
            onClick={() => setDrawerOpen(true)}
            aria-label="メニューを開く"
          >
            <Menu className="w-6 h-6 stroke-fg" strokeWidth={2.2} />
          </button>
        </div>

        {searchOpen && (
          <div className="border-t border-line py-3">
            <div className="max-w-[1200px] mx-auto px-5">
              <input
                type="search"
                placeholder="名前・夢・所属・お気に入りの曲で検索（例：アナウンサー、サッカー、早稲田）"
                className="w-full text-base p-2.5 px-3.5 border border-line rounded-md bg-panel text-fg font-sans"
                onChange={(e) => onSearch?.(e.target.value)}
                aria-label="検索"
                autoFocus
              />
            </div>
          </div>
        )}
      </header>

      {/* Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/60"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDrawerOpen(false);
          }}
        >
          <nav
            className="w-[min(320px,86vw)] h-full bg-panel pt-4 px-5 pb-6 flex flex-col overflow-auto"
            aria-label="メニュー"
          >
            <button
              className="self-end w-11 h-11 grid place-items-center border-0 bg-transparent rounded-lg cursor-pointer hover:bg-line"
              onClick={() => setDrawerOpen(false)}
              aria-label="メニューを閉じる"
            >
              <X className="w-6 h-6 stroke-fg" strokeWidth={2.2} />
            </button>

            <a
              href="#latest"
              className="flex justify-between py-3.5 px-0.5 border-b border-line no-underline font-bold hover:text-spot"
              onClick={() => setDrawerOpen(false)}
            >
              最新エピソード
              <span className="text-red tracking-[-0.1em]">›››</span>
            </a>
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex justify-between py-3.5 px-0.5 border-b border-line no-underline font-bold hover:text-spot"
                onClick={() => setDrawerOpen(false)}
              >
                {cat.title}
                <span className="text-red tracking-[-0.1em]">›››</span>
              </a>
            ))}
            <a
              href="#about"
              className="flex justify-between py-3.5 px-0.5 border-b border-line no-underline font-bold hover:text-spot"
              onClick={() => setDrawerOpen(false)}
            >
              番組について
              <span className="text-red tracking-[-0.1em]">›››</span>
            </a>
            <a
              href="#recruit"
              className="flex justify-between py-3.5 px-0.5 border-b border-line no-underline font-bold hover:text-spot"
              onClick={() => setDrawerOpen(false)}
            >
              出演者募集
              <span className="text-red tracking-[-0.1em]">›››</span>
            </a>
            <Link
              href="/company"
              className="flex justify-between py-3.5 px-0.5 border-b border-line no-underline font-bold hover:text-spot"
              onClick={() => setDrawerOpen(false)}
            >
              代表メッセージ・会社概要
              <span className="text-red tracking-[-0.1em]">›››</span>
            </Link>
            <Link
              href="/contact"
              className="flex justify-between py-3.5 px-0.5 border-b border-line no-underline font-bold hover:text-spot"
              onClick={() => setDrawerOpen(false)}
            >
              お問い合わせ
              <span className="text-red tracking-[-0.1em]">›››</span>
            </Link>
            <a
              href={SHOW_URL}
              target="_blank"
              rel="noopener"
              className="flex justify-between py-3.5 px-0.5 border-b border-line no-underline font-bold hover:text-spot"
            >
              Spotifyで聴く
              <span className="text-red tracking-[-0.1em]">›››</span>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              className="flex justify-between py-3.5 px-0.5 border-b border-line no-underline font-bold hover:text-spot"
            >
              Instagram
              <span className="text-red tracking-[-0.1em]">›››</span>
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
