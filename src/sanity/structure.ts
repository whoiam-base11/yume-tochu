import type { StructureResolver } from "sanity/structure";

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Episodes")
        .schemaType("episode")
        .child(
          S.documentList()
            .title("Episodes")
            .filter('_type == "episode"')
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
    ]);

export default structure;
