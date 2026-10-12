import Link from "next/link";

const SHOW_URL = "https://open.spotify.com/show/566JMxN11RnYzlPJKBJsdD";
const INSTAGRAM_URL = "https://www.instagram.com/yume.tochu/";

export default function Footer() {
  return (
    <footer className="py-9 bg-bg">
      <div className="max-w-[1200px] mx-auto px-5 flex flex-wrap justify-between items-center gap-5">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span className="w-[26px] h-[26px] rounded-full border-[1.5px] border-fg grid place-items-center flex-none">
            <svg viewBox="0 0 12 14" className="w-3 h-3.5 fill-fg">
              <rect x="3" y="0" width="6" height="9" rx="3" />
              <rect x="5.3" y="9" width="1.4" height="5" />
            </svg>
          </span>
          <b className="font-mincho font-extrabold text-[22px] whitespace-nowrap">
            夢、途中。
          </b>
        </Link>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[13px]" aria-label="フッター">
          <a href="#latest" className="no-underline text-muted hover:text-fg">
            エピソード
          </a>
          <a href="#about" className="no-underline text-muted hover:text-fg">
            番組について
          </a>
          <a href="#recruit" className="no-underline text-muted hover:text-fg">
            出演者募集
          </a>
          <a
            href={SHOW_URL}
            target="_blank"
            rel="noopener"
            className="no-underline text-muted hover:text-fg"
          >
            Spotify
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener"
            className="no-underline text-muted hover:text-fg"
          >
            Instagram
          </a>
        </nav>

        <div className="w-full text-[11px] tracking-[0.3em] text-[#6B6A72]">
          YUME, TOCHU.
        </div>
      </div>
    </footer>
  );
}
