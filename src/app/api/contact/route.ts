import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const KINDS = ["出演応募", "取材・メディア", "協賛・コラボ", "その他"];

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

// --- Rate limiting (in-memory, per-instance) ---
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const ipMap = new Map<string, number[]>();

setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of ipMap) {
    const valid = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
    if (valid.length === 0) ipMap.delete(ip);
    else ipMap.set(ip, valid);
  }
}, 10 * 60 * 1000).unref?.();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipMap.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT) {
    ipMap.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  ipMap.set(ip, timestamps);
  return false;
}

// --- Resend (skip if API key not set) ---
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { kind, name, org, reply, body, _hp } = json;

    // Honeypot: if filled, silently succeed
    if (_hp) {
      return NextResponse.json({ ok: true });
    }

    // Rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "送信回数の上限に達しました。しばらくしてからお試しください。" },
        { status: 429 }
      );
    }

    // Validation
    if (!kind || !KINDS.includes(kind)) {
      return NextResponse.json({ error: "種別が不正です" }, { status: 400 });
    }
    if (!name?.trim()) {
      return NextResponse.json({ error: "お名前は必須です" }, { status: 400 });
    }
    if (!reply?.trim()) {
      return NextResponse.json(
        { error: "ご連絡先は必須です" },
        { status: 400 }
      );
    }
    if (!body?.trim()) {
      return NextResponse.json({ error: "内容は必須です" }, { status: 400 });
    }

    const trimmedName = name.trim();
    const trimmedOrg = org?.trim() || undefined;
    const trimmedReply = reply.trim();
    const trimmedBody = body.trim();
    const receivedAt = new Date().toISOString();

    // Save to Sanity
    await writeClient.create({
      _type: "contact",
      kind,
      name: trimmedName,
      org: trimmedOrg,
      reply: trimmedReply,
      body: trimmedBody,
      receivedAt,
    });

    // Send email notification via Resend
    if (resend && process.env.CONTACT_TO_EMAIL) {
      try {
        const fromEmail =
          process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
        const receivedDate = new Date(receivedAt).toLocaleString("ja-JP", {
          timeZone: "Asia/Tokyo",
        });

        await resend.emails.send({
          from: `夢、途中。 <${fromEmail}>`,
          to: process.env.CONTACT_TO_EMAIL,
          replyTo: EMAIL_RE.test(trimmedReply) ? trimmedReply : undefined,
          subject: `【夢、途中。】${kind} — ${trimmedName}`,
          text: [
            `種別: ${kind}`,
            `お名前: ${trimmedName}`,
            trimmedOrg ? `所属: ${trimmedOrg}` : null,
            `連絡先: ${trimmedReply}`,
            ``,
            `--- お問い合わせ内容 ---`,
            trimmedBody,
            ``,
            `受信日時: ${receivedDate}`,
          ]
            .filter((line) => line !== null)
            .join("\n"),
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Email failure should not block form submission
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "送信に失敗しました" },
      { status: 500 }
    );
  }
}
