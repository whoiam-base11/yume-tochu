import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "お問い合わせ",
  type: "document",
  fields: [
    defineField({
      name: "kind",
      title: "種別",
      type: "string",
      options: {
        list: ["出演応募", "取材・メディア", "協賛・コラボ", "その他"],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "name",
      title: "お名前",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "org",
      title: "所属・肩書き",
      type: "string",
    }),
    defineField({
      name: "reply",
      title: "ご連絡先",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "お問い合わせ内容",
      type: "text",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "receivedAt",
      title: "受信日時",
      type: "datetime",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "受信日時（新しい順）",
      name: "receivedAtDesc",
      by: [{ field: "receivedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "kind",
      date: "receivedAt",
    },
    prepare({ title, subtitle, date }) {
      const d = date ? new Date(date).toLocaleDateString("ja-JP") : "";
      return {
        title: title || "名前なし",
        subtitle: `${subtitle || ""} ${d}`.trim(),
      };
    },
  },
});
