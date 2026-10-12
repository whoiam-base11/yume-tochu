import { defineQuery } from "next-sanity";

export const EPISODES_QUERY = defineQuery(
  `*[_type == "episode"] | order(order asc) {
    _id,
    name,
    nameRoman,
    catchphrase,
    affiliation,
    description,
    category,
    accentColor,
    image,
    instagramId,
    instagramPostId,
    favoriteSong,
    favoriteArtist,
    featured,
    order
  }`
);

export const FEATURED_EPISODES_QUERY = defineQuery(
  `*[_type == "episode" && featured == true] | order(order asc) {
    _id,
    name,
    nameRoman,
    catchphrase,
    affiliation,
    description,
    category,
    accentColor,
    image,
    instagramId,
    instagramPostId,
    favoriteSong,
    favoriteArtist,
    order
  }`
);
