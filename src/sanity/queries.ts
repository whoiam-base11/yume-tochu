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
    heroImage,
    heroImageMobile,
    instagramId,
    instagramPostId,
    favoriteSong,
    favoriteArtist,
    spotifyLink,
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
    heroImage,
    heroImageMobile,
    instagramId,
    instagramPostId,
    favoriteSong,
    favoriteArtist,
    spotifyLink,
    order
  }`
);
