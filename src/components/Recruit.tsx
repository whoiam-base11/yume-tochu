import Link from "next/link";

export default function Recruit() {
  return (
    <section className="bg-black border-y border-line" id="recruit">
      <div className="max-w-[1200px] mx-auto px-5 flex flex-wrap items-center justify-between gap-5 py-10 relative">
        <div>
          <div className="text-[11px] font-bold tracking-[0.18em] text-red">
            CASTING
          </div>
          <h2 className="font-black text-[clamp(22px,2.8vw,32px)] mt-1.5 mb-0 leading-[1.35]">
            あなたの「夢、途中。」を聞かせてください。
          </h2>
          <p className="mt-2 mb-0 max-w-[36em] text-[#D6D5DA]">
            出演・収録したい方を待っています。夢が固まっていなくても大丈夫。お問い合わせページから気軽に連絡してください。
          </p>
        </div>
        <Link
          className="inline-flex items-center gap-2.5 py-[11px] px-5 rounded-full bg-fg text-[#111] font-bold no-underline text-sm hover:bg-white"
          href="/contact"
        >
          お問い合わせはこちら
        </Link>
      </div>
    </section>
  );
}
