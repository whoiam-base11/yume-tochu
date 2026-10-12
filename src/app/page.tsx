import { client } from "@/sanity/lib/client";
import { EPISODES_QUERY, FEATURED_EPISODES_QUERY } from "@/sanity/queries";
import HomeClient from "./HomeClient";

export default async function Home() {
  const [episodes, featured] = await Promise.all([
    client.fetch(EPISODES_QUERY, {}, { next: { tags: ["episodes"] } }),
    client.fetch(FEATURED_EPISODES_QUERY, {}, { next: { tags: ["episodes"] } }),
  ]);

  return <HomeClient episodes={episodes} featured={featured} />;
}
