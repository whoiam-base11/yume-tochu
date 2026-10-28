import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

type SanityWebhookBody = {
  _type?: string;
};

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-sanity-webhook-secret");
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as SanityWebhookBody;
  const type = body._type;

  if (type === "episode") {
    revalidateTag("episodes", "max");
    return NextResponse.json({ revalidated: "episodes" });
  }

  return NextResponse.json({ message: "No matching type" }, { status: 400 });
}
