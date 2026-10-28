import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { NextResponse } from "next/server";

const KINDS = ["出演応募", "取材・メディア", "協賛・コラボ", "その他"];

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function POST(request: Request) {
  try {
    const { kind, name, org, reply, body } = await request.json();

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

    await writeClient.create({
      _type: "contact",
      kind,
      name: name.trim(),
      org: org?.trim() || undefined,
      reply: reply.trim(),
      body: body.trim(),
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "送信に失敗しました" },
      { status: 500 }
    );
  }
}
