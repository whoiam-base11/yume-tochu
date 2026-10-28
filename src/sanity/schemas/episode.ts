import { defineType, defineField } from "sanity";

export default defineType({
  name: "episode",
  title: "Episode",
  type: "document",
  fields: [
    defineField({
      name: "sourceId",
      title: "インポート元管理番号",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "spotifyLink",
      title: "Spotifyリンク",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
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
          { title: "Media", value: "media" },
          { title: "Sports", value: "sports" },
          { title: "Entertainment", value: "entertainment" },
          { title: "Challengers", value: "challengers" },
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
      name: "heroImage",
      title: "Hero用画像",
      description: "ヒーローの背景画像。未設定の場合はゲスト写真を使用します。",
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
