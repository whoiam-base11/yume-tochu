import { NextResponse } from "next/server";
import { serverClient } from "@/sanity/lib/client";

export async function GET() {
  const hasToken = !!process.env.SANITY_API_READ_TOKEN;
  const tokenPrefix = process.env.SANITY_API_READ_TOKEN?.slice(0, 8) ?? "none";

  try {
    const count = await serverClient.fetch("count(*)");
    return NextResponse.json({ hasToken, tokenPrefix, count });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ hasToken, tokenPrefix, error: message });
  }
}
