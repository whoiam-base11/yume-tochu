import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "代表の想い・会社概要｜夢、途中。| YUME, TOCHU PODCAST",
};

const SHOW_URL = "https://open.spotify.com/show/566JMxN11RnYzlPJKBJsdD";
const INSTAGRAM_URL = "https://www.instagram.com/yume.tochu/";

export default function CompanyPage() {
  return (
    <>
      <Header />
      {/* Message section */}
      <section className="bg-cream text-navy">
        <div className="max-w-[1200px] mx-auto px-5 pt-10 pb-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] font-bold no-underline text-[#5B6683] hover:text-navy"
          >
            <b className="text-red tracking-[-0.1em]">‹‹‹</b> トップへ戻る
          </Link>
        </div>
        <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-12 py-6 pb-16 max-[820px]:grid-cols-1 max-[820px]:gap-7">
          <div>
            <div className="text-[11px] font-bold tracking-[0.2em] text-[#B5862B]">
              MESSAGE FROM THE FOUNDER
            </div>
            <h1 className="font-mincho font-extrabold text-[clamp(30px,4.2vw,50px)] leading-[1.4] mt-2.5 mb-0 text-balance">
              代表の想い
            </h1>
            <div className="mt-7 aspect-[4/5] max-w-[300px] bg-navy relative overflow-hidden grid place-items-[end_start] p-[18px] max-[820px]:max-w-none max-[820px]:aspect-[16/7]">
              <div className="absolute w-[130%] aspect-square left-[5%] top-[-40%] rounded-full border-[5px] border-spot border-r-transparent border-b-transparent opacity-80 pointer-events-none" />
              <span className="relative text-cream text-[11px] tracking-[0.2em] font-bold">
                TAKUTO HIRAKAWA
              </span>
            </div>
          </div>
          <div>
            <p className="font-mincho font-extrabold text-[clamp(19px,2vw,23px)] leading-[1.8] text-navy border-b-2 border-spot pb-4 mb-[26px] mt-0">
              夢を口にした瞬間から、
              <br />
              人生は少しずつ動き出す。
            </p>
            <p className="mb-[18px] mt-0 text-[16px] leading-[2.05] text-[#2B3757] max-w-[36em]">
              夢や目標を持っていても、それを誰かに話す機会は意外と多くありません。笑われるかもしれない、まだ形になっていない。そうやって胸の中にしまったままの想いを、私はたくさん見てきました。
            </p>
            <p className="mb-[18px] mt-0 text-[16px] leading-[2.05] text-[#2B3757] max-w-[36em]">
              「夢、途中。」は、挑戦している若者に20分ノーカットで夢を語ってもらうポッドキャストです。編集で整えた成功談ではなく、迷いや途中経過も含めたリアルな声を届けたい。綺麗じゃなくて良い、夢を語ることこそがカッコいい。その考えから、この番組は生まれました。
            </p>
            <p className="mb-[18px] mt-0 text-[16px] leading-[2.05] text-[#2B3757] max-w-[36em]">
              誰かの言葉が、別の誰かの「やってみよう」に変わる。出演してくれたゲスト同士が繋がり、新しい挑戦が始まる。そんな連鎖をつくることが、私たちのビジョン「人と想いを繋ぎ、人生に最大のきっかけを創出する」です。
            </p>
            <p className="mb-[18px] mt-0 text-[16px] leading-[2.05] text-[#2B3757] max-w-[36em]">
              岡山から、全国、そして世界で挑戦する人たちへ。夢の途中にいるすべての人の背中を、これからも押し続けます。
            </p>
            <div className="mt-[30px] flex items-baseline gap-3.5 flex-wrap">
              <small className="text-[12px] tracking-[0.14em] text-[#6B7590]">
                代表
              </small>
              <b className="font-mincho font-extrabold text-[26px]">
                平川 拓虎
              </b>
              <i className="not-italic text-[11px] tracking-[0.2em] text-[#8B7A55]">
                TAKUTO HIRAKAWA
              </i>
            </div>
          </div>
        </div>
      </section>

      {/* Company info section */}
      <section className="bg-[#EFE7D4] text-navy border-t border-[rgb(29_42_76/0.14)]">
        <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-12 py-14 pb-16 max-[820px]:grid-cols-1 max-[820px]:gap-7">
          <div>
            <div className="text-[11px] font-bold tracking-[0.2em] text-[#B5862B]">
              COMPANY
            </div>
            <h2 className="font-mincho font-extrabold text-[clamp(26px,3vw,36px)] mt-2 mb-3">
              会社概要
            </h2>
            <p className="m-0 text-[#4A5675] text-sm">
              ポッドキャスト「夢、途中。」の運営者情報です。
            </p>
          </div>
          <dl className="m-0 grid content-start border-t-2 border-navy">
            <div className="grid grid-cols-[8em_1fr] gap-3 py-3.5 border-b border-[rgb(29_42_76/0.18)] max-[820px]:grid-cols-[6.5em_1fr]">
              <dt className="text-[11px] font-bold tracking-[0.16em] text-[#8B7A55] pt-[3px]">
                名称
              </dt>
              <dd className="m-0 font-medium">
                <span className="inline-block px-1.5 border border-dashed border-current rounded-[3px] text-[0.86em] font-bold opacity-75">
                  会社名・屋号を入力
                </span>
              </dd>
            </div>
            <div className="grid grid-cols-[8em_1fr] gap-3 py-3.5 border-b border-[rgb(29_42_76/0.18)] max-[820px]:grid-cols-[6.5em_1fr]">
              <dt className="text-[11px] font-bold tracking-[0.16em] text-[#8B7A55] pt-[3px]">
                代表者
              </dt>
              <dd className="m-0 font-bold">平川 拓虎</dd>
            </div>
            <div className="grid grid-cols-[8em_1fr] gap-3 py-3.5 border-b border-[rgb(29_42_76/0.18)] max-[820px]:grid-cols-[6.5em_1fr]">
              <dt className="text-[11px] font-bold tracking-[0.16em] text-[#8B7A55] pt-[3px]">
                所在地
              </dt>
              <dd className="m-0 font-medium">
                岡山県{" "}
                <span className="inline-block px-1.5 border border-dashed border-current rounded-[3px] text-[0.86em] font-bold opacity-75">
                  以降の住所を入力
                </span>
              </dd>
            </div>
            <div className="grid grid-cols-[8em_1fr] gap-3 py-3.5 border-b border-[rgb(29_42_76/0.18)] max-[820px]:grid-cols-[6.5em_1fr]">
              <dt className="text-[11px] font-bold tracking-[0.16em] text-[#8B7A55] pt-[3px]">
                設立
              </dt>
              <dd className="m-0 font-medium">
                <span className="inline-block px-1.5 border border-dashed border-current rounded-[3px] text-[0.86em] font-bold opacity-75">
                  設立年月を入力
                </span>
              </dd>
            </div>
            <div className="grid grid-cols-[8em_1fr] gap-3 py-3.5 border-b border-[rgb(29_42_76/0.18)] max-[820px]:grid-cols-[6.5em_1fr]">
              <dt className="text-[11px] font-bold tracking-[0.16em] text-[#8B7A55] pt-[3px]">
                事業内容
              </dt>
              <dd className="m-0 font-medium">
                <ul className="m-0 pl-[1.2em]">
                  <li>ポッドキャスト「夢、途中。」の企画・制作・配信</li>
                  <li>出演者紹介コンテンツの制作・SNS発信</li>
                  <li>
                    <span className="inline-block px-1.5 border border-dashed border-current rounded-[3px] text-[0.86em] font-bold opacity-75">
                      その他の事業があれば入力
                    </span>
                  </li>
                </ul>
              </dd>
            </div>
            <div className="grid grid-cols-[8em_1fr] gap-3 py-3.5 border-b border-[rgb(29_42_76/0.18)] max-[820px]:grid-cols-[6.5em_1fr]">
              <dt className="text-[11px] font-bold tracking-[0.16em] text-[#8B7A55] pt-[3px]">
                ビジョン
              </dt>
              <dd className="m-0 font-medium">
                人と想いを繋ぎ、人生に最大のきっかけを創出する
              </dd>
            </div>
            <div className="grid grid-cols-[8em_1fr] gap-3 py-3.5 border-b border-[rgb(29_42_76/0.18)] max-[820px]:grid-cols-[6.5em_1fr]">
              <dt className="text-[11px] font-bold tracking-[0.16em] text-[#8B7A55] pt-[3px]">
                番組
              </dt>
              <dd className="m-0 font-medium">
                <a
                  href={SHOW_URL}
                  target="_blank"
                  rel="noopener"
                  className="text-navy"
                >
                  Spotify「夢、途中。」
                </a>
                <small className="block font-normal text-[#4A5675]">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener"
                    className="text-[#4A5675]"
                  >
                    Instagram @yume.tochu
                  </a>
                </small>
              </dd>
            </div>
            <div className="grid grid-cols-[8em_1fr] gap-3 py-3.5 border-b border-[rgb(29_42_76/0.18)] max-[820px]:grid-cols-[6.5em_1fr]">
              <dt className="text-[11px] font-bold tracking-[0.16em] text-[#8B7A55] pt-[3px]">
                お問い合わせ
              </dt>
              <dd className="m-0 font-medium">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 py-[11px] px-5 rounded-full bg-navy text-cream font-bold no-underline text-sm hover:bg-[#26375F]"
                >
                  お問い合わせページへ
                </Link>
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <Footer />
    </>
  );
}
