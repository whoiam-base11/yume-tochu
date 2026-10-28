import type { StructureResolver } from "sanity/structure";

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .id("episode")
        .title("Episodes")
        .schemaType("episode")
        .child(
          S.documentList()
            .id("episode")
            .title("Episodes")
            .filter('_type == "episode"')
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.divider(),
      S.listItem()
        .id("contact")
        .title("お問い合わせ")
        .schemaType("contact")
        .child(
          S.documentList()
            .id("contact")
            .title("お問い合わせ")
            .filter('_type == "contact"')
            .defaultOrdering([{ field: "receivedAt", direction: "desc" }])
        ),
    ]);

export default structure;
