import Image from "next/image";
import Link from "next/link";
import iconImg from "@/app/icon.png";

const SHOW_URL = "https://open.spotify.com/show/566JMxN11RnYzlPJKBJsdD";
const INSTAGRAM_URL = "https://www.instagram.com/yume.tochu/";

export default function Footer() {
  return (
    <footer className="py-9 bg-bg">
      <div className="max-w-[1200px] mx-auto px-5 flex flex-wrap justify-between items-center gap-5">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <Image
            src={iconImg}
            alt=""
            width={26}
            height={26}
            className="rounded-full flex-none"
          />
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
          <Link href="/company" className="no-underline text-muted hover:text-fg">
            会社概要
          </Link>
          <Link href="/contact" className="no-underline text-muted hover:text-fg">
            お問い合わせ
          </Link>
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
