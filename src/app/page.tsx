import { serverClient } from "@/sanity/lib/client";
import { EPISODES_QUERY, FEATURED_EPISODES_QUERY } from "@/sanity/queries";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [episodes, featured] = await Promise.all([
    serverClient.fetch(EPISODES_QUERY, {}, { next: { tags: ["episodes"] } }),
    serverClient.fetch(FEATURED_EPISODES_QUERY, {}, { next: { tags: ["episodes"] } }),
  ]);

  return <HomeClient episodes={episodes} featured={featured} />;
}
