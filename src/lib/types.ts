export type Episode = {
  _id: string;
  name: string;
  nameRoman: string | null;
  catchphrase: string;
  affiliation: string | null;
  description: string | null;
  category: string;
  accentColor: string | null;
  image: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    hotspot?: { x: number; y: number; height: number; width: number };
  } | null;
  instagramId: string | null;
  instagramPostId: string | null;
  favoriteSong: string | null;
  favoriteArtist: string | null;
  featured: boolean | null;
  order: number | null;
};
