import { defineType, defineField } from "sanity";

export default defineType({
  name: "episode",
  title: "Episode",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "ゲスト名",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nameRoman",
      title: "ゲスト名（ローマ字）",
      type: "string",
    }),
    defineField({
      name: "catchphrase",
      title: "キャッチコピー",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "affiliation",
      title: "肩書き・所属",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "紹介文",
      type: "text",
    }),
    defineField({
      name: "category",
      title: "カテゴリ",
      type: "string",
      options: {
        list: [
          { title: "アナウンサー・伝える仕事", value: "media" },
          { title: "アスリート・指導者・トレーナー", value: "sports" },
          { title: "サポーター・発信者", value: "fan" },
          { title: "俳優・モデル・エンタメ", value: "show" },
          { title: "起業・国際・挑戦", value: "world" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "accentColor",
      title: "アクセントカラー",
      type: "string",
      options: {
        list: [
          { title: "Red", value: "red" },
          { title: "Orange", value: "orange" },
          { title: "Amber", value: "amber" },
          { title: "Gold", value: "gold" },
          { title: "Blue", value: "blue" },
          { title: "Sky", value: "sky" },
          { title: "Navy", value: "navy" },
          { title: "Purple", value: "purple" },
          { title: "Pink", value: "pink" },
          { title: "Teal", value: "teal" },
          { title: "Tan", value: "tan" },
          { title: "Rose", value: "rose" },
        ],
      },
      initialValue: "red",
    }),
    defineField({
      name: "image",
      title: "ゲスト写真",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "instagramId",
      title: "Instagram ID",
      type: "string",
    }),
    defineField({
      name: "instagramPostId",
      title: "Instagram 投稿ID",
      type: "string",
    }),
    defineField({
      name: "favoriteSong",
      title: "お気に入りの曲",
      type: "string",
    }),
    defineField({
      name: "favoriteArtist",
      title: "アーティスト名",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "ヒーローに表示",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "表示順",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "表示順",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "catchphrase",
      media: "image",
    },
  },
});
