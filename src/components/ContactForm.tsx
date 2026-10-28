"use client";

import { useState } from "react";
import Link from "next/link";

const KINDS = ["出演応募", "取材・メディア", "協賛・コラボ", "その他"] as const;
const INSTAGRAM_URL = "https://www.instagram.com/yume.tochu/";

export default function ContactForm() {
  const [kind, setKind] = useState<string>(KINDS[0]);
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [reply, setReply] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, boolean> = {};
    if (!name.trim()) errs.name = true;
    if (!reply.trim()) errs.reply = true;
    if (!body.trim()) errs.body = true;
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          name: name.trim(),
          org: org.trim() || undefined,
          reply: reply.trim(),
          body: body.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "送信に失敗しました");
      }

      setDone(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "送信に失敗しました"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="desktop-viewport-section pb-16">
      <div className="max-w-[1200px] mx-auto px-5 pt-10 pb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] font-bold no-underline text-muted hover:text-spot"
        >
          <b className="text-red tracking-[-0.1em]">‹‹‹</b> トップへ戻る
        </Link>
      </div>
      <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-12 pt-5 max-[820px]:grid-cols-1 max-[820px]:gap-7">
        {/* Left column */}
        <div>
          <div className="text-[11px] font-bold tracking-[0.18em] text-red">
            CONTACT
          </div>
          <h1 className="font-black text-[clamp(28px,3.8vw,44px)] leading-[1.3] mt-2 mb-4 text-balance">
            お問い合わせ
          </h1>
          <p className="text-[#D6D5DA] m-0 mb-[26px] max-w-[30em]">
            出演のご応募、取材やメディア掲載、協賛のご相談など、お気軽にご連絡ください。
          </p>
          <dl className="grid gap-0 m-0 mb-[26px] border-t border-line">
            {[
              { term: "出演応募", desc: "夢が固まっていなくても大丈夫です。今の挑戦を教えてください。" },
              { term: "取材・メディア", desc: "番組や代表への取材、記事掲載のご相談。" },
              { term: "協賛・コラボ", desc: "スポンサー、企業・団体とのコラボ企画のご相談。" },
              { term: "その他", desc: "ご感想、番組へのご質問など。" },
            ].map((item) => (
              <div
                key={item.term}
                className="grid grid-cols-[7.5em_1fr] gap-3 py-3 border-b border-line text-[13.5px]"
              >
                <dt className="font-bold">{item.term}</dt>
                <dd className="m-0 text-muted">{item.desc}</dd>
              </div>
            ))}
          </dl>
          <p className="text-[13px] text-muted">
            Instagram：
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              className="text-fg"
            >
              @yume.tochu
            </a>
          </p>
        </div>

        {/* Right column */}
        <div>
          {!done ? (
            <form
              className="bg-panel border border-line p-7 grid gap-5 content-start max-[820px]:p-5"
              noValidate
              onSubmit={handleSubmit}
            >
              {/* Kind */}
              <fieldset className="grid gap-[7px] min-w-0 border-0 p-0 m-0">
                <legend className="text-[13px] font-bold mb-2">
                  お問い合わせ種別
                  <em className="not-italic text-[10px] font-bold tracking-[0.1em] text-white bg-red py-px px-1.5 ml-2 align-[2px]">
                    必須
                  </em>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {KINDS.map((k) => (
                    <label key={k} className="font-medium cursor-pointer">
                      <input
                        type="radio"
                        name="kind"
                        value={k}
                        checked={kind === k}
                        onChange={() => setKind(k)}
                        className="absolute opacity-0 w-px h-px"
                      />
                      <span
                        className={`inline-block py-[7px] px-3.5 border rounded-full text-[13px] ${
                          kind === k
                            ? "bg-fg text-[#111] border-fg"
                            : "border-[#3A3A42]"
                        }`}
                      >
                        {k}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Name + Org */}
              <div className="grid grid-cols-2 gap-5 max-[820px]:grid-cols-1">
                <div className="grid gap-[7px] min-w-0">
                  <label htmlFor="c-name" className="text-[13px] font-bold">
                    お名前
                    <em className="not-italic text-[10px] font-bold tracking-[0.1em] text-white bg-red py-px px-1.5 ml-2 align-[2px]">
                      必須
                    </em>
                  </label>
                  <input
                    id="c-name"
                    name="name"
                    autoComplete="name"
                    placeholder="例：山田 花子"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full font-[inherit] text-[16px] py-[11px] px-[13px] bg-bg text-fg border rounded-[4px] ${
                      errors.name ? "border-red" : "border-[#3A3A42]"
                    } focus:border-spot focus:outline-none`}
                  />
                  {errors.name && (
                    <span className="text-[12px] text-[#FF7A74]">
                      お名前を入力してください。
                    </span>
                  )}
                </div>
                <div className="grid gap-[7px] min-w-0">
                  <label htmlFor="c-org" className="text-[13px] font-bold">
                    所属・肩書き
                  </label>
                  <input
                    id="c-org"
                    name="org"
                    autoComplete="organization"
                    placeholder="例：〇〇大学 2年"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    className="w-full font-[inherit] text-[16px] py-[11px] px-[13px] bg-bg text-fg border border-[#3A3A42] rounded-[4px] focus:border-spot focus:outline-none"
                  />
                </div>
              </div>

              {/* Reply */}
              <div className="grid gap-[7px] min-w-0">
                <label htmlFor="c-reply" className="text-[13px] font-bold">
                  ご連絡先
                  <em className="not-italic text-[10px] font-bold tracking-[0.1em] text-white bg-red py-px px-1.5 ml-2 align-[2px]">
                    必須
                  </em>
                </label>
                <input
                  id="c-reply"
                  name="reply"
                  placeholder="メールアドレス または InstagramのID"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className={`w-full font-[inherit] text-[16px] py-[11px] px-[13px] bg-bg text-fg border rounded-[4px] ${
                    errors.reply ? "border-red" : "border-[#3A3A42]"
                  } focus:border-spot focus:outline-none`}
                />
                <span className="text-[12px] text-muted">
                  返信先として使います。
                </span>
                {errors.reply && (
                  <span className="text-[12px] text-[#FF7A74]">
                    ご連絡先を入力してください。
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="grid gap-[7px] min-w-0">
                <label htmlFor="c-body" className="text-[13px] font-bold">
                  お問い合わせ内容
                  <em className="not-italic text-[10px] font-bold tracking-[0.1em] text-white bg-red py-px px-1.5 ml-2 align-[2px]">
                    必須
                  </em>
                </label>
                <textarea
                  id="c-body"
                  name="body"
                  placeholder="出演応募の方は、今取り組んでいること・叶えたい夢を教えてください。"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className={`w-full font-[inherit] text-[16px] py-[11px] px-[13px] bg-bg text-fg border rounded-[4px] min-h-[170px] resize-y leading-[1.7] ${
                    errors.body ? "border-red" : "border-[#3A3A42]"
                  } focus:border-spot focus:outline-none`}
                />
                {errors.body && (
                  <span className="text-[12px] text-[#FF7A74]">
                    内容を入力してください。
                  </span>
                )}
              </div>

              {submitError && (
                <p className="text-[13px] text-[#FF7A74] m-0">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2.5 py-[11px] px-5 rounded-full bg-fg text-[#111] font-bold no-underline text-sm border-0 cursor-pointer hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "送信中..." : "送信する"}
              </button>
            </form>
          ) : (
            <div className="border border-spot bg-[#1A1914] p-[22px] grid gap-3.5">
              <h3 className="m-0 text-[18px] font-black">
                お問い合わせを受け付けました
              </h3>
              <p className="text-[#D6D5DA] text-sm m-0 leading-[1.8]">
                内容を確認のうえ、ご連絡先へ返信いたします。
                <br />
                お時間をいただく場合がございますが、ご了承ください。
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2.5 py-[11px] px-5 rounded-full bg-fg text-[#111] font-bold no-underline text-sm w-fit"
              >
                トップへ戻る
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
