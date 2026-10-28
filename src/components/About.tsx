const SHOW_URL = "https://open.spotify.com/show/566JMxN11RnYzlPJKBJsdD";
const INSTAGRAM_URL = "https://www.instagram.com/yume.tochu/";

export default function About({ guestCount }: { guestCount: number }) {
  return (
    <section className="bg-cream text-navy relative overflow-hidden" id="about">
      <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-[1.1fr_1fr] gap-12 py-14 max-md:grid-cols-1 max-md:gap-5">
        <div>
          <div className="text-[11px] font-bold tracking-[0.2em] text-[#B5862B]">
            ABOUT
          </div>
          <h2 className="font-mincho font-extrabold text-[clamp(28px,3.6vw,42px)] leading-[1.4] mt-2 mb-4.5 text-balance">
            挑戦する若者の、
            <br />
            リアルなストーリーを。
          </h2>
          <p className="m-0 mb-3.5 max-w-[34em] text-[#33405F]">
            「夢、途中。」は、挑戦する若者の夢や目標を聞き出して、リアルな声を発信するポッドキャストです。毎回ひとりのゲストと20分ノーカットで歓談し、収録は顔出しで行います。
          </p>
          <p className="m-0 mb-3.5 max-w-[34em] text-[#33405F]">
            届けたいのは&quot;挑戦するきっかけ&quot;。目標はあるのに動き出せていない人にも、まだ方向を探している人にも。誰かの&quot;人生が動き出す瞬間&quot;をつくれる場所を目指しています。
          </p>
          <p className="font-mincho font-extrabold text-[22px] leading-[1.6] mt-5.5 pt-1 pb-1 pl-4 border-l-4 border-spot">
            綺麗じゃなくて良い、
            <br />
            夢を語ることこそがカッコいい。
          </p>
        </div>

        <dl className="m-0 grid content-start">
          <div className="grid grid-cols-[6.5em_1fr] gap-3 py-3.5 border-b border-navy/18">
            <dt className="text-[11px] font-bold tracking-[0.16em] text-[#8B7A55] pt-0.5">
              FORMAT
            </dt>
            <dd className="m-0 font-bold">
              20分ノーカット歓談
              <small className="block font-normal text-[#4A5675]">
                顔出し収録・毎回ゲスト1名
              </small>
            </dd>
          </div>
          <div className="grid grid-cols-[6.5em_1fr] gap-3 py-3.5 border-b border-navy/18">
            <dt className="text-[11px] font-bold tracking-[0.16em] text-[#8B7A55] pt-0.5">
              HOST
            </dt>
            <dd className="m-0 font-bold">
              平川拓虎
              <small className="block font-normal text-[#4A5675]">
                VISION「人と想いを繋ぎ、人生に最大のきっかけを創出する」
              </small>
            </dd>
          </div>
          <div className="grid grid-cols-[6.5em_1fr] gap-3 py-3.5 border-b border-navy/18">
            <dt className="text-[11px] font-bold tracking-[0.16em] text-[#8B7A55] pt-0.5">
              BASE
            </dt>
            <dd className="m-0 font-bold">岡山</dd>
          </div>
          <div className="grid grid-cols-[6.5em_1fr] gap-3 py-3.5 border-b border-navy/18">
            <dt className="text-[11px] font-bold tracking-[0.16em] text-[#8B7A55] pt-0.5">
              GUESTS
            </dt>
            <dd className="m-0 font-bold">
              {guestCount}名
              <small className="block font-normal text-[#4A5675]">
                Instagram掲載の出演者紹介より
              </small>
            </dd>
          </div>
          <div className="grid grid-cols-[6.5em_1fr] gap-3 py-3.5 border-b border-navy/18">
            <dt className="text-[11px] font-bold tracking-[0.16em] text-[#8B7A55] pt-0.5">
              LISTEN
            </dt>
            <dd className="m-0 font-bold min-w-0">
              <a href={SHOW_URL} target="_blank" rel="noopener" className="text-navy">
                Spotify
              </a>
              <small className="block font-normal text-[#4A5675]">
                出演者紹介は{" "}
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="text-navy">
                  Instagram @yume.tochu
                </a>
              </small>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
