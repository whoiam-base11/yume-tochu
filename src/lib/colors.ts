export const ACCENT_COLORS: Record<string, string> = {
  red: "#D8423F",
  orange: "#E07A35",
  amber: "#D99A33",
  gold: "#CFAE3A",
  blue: "#3E66CF",
  sky: "#3A9CC9",
  navy: "#2F4FA8",
  purple: "#7C55C9",
  pink: "#D3457A",
  teal: "#3C9592",
  tan: "#C3A06A",
  rose: "#B4506A",
};

export function getAccentColor(key: string | null | undefined): string {
  return ACCENT_COLORS[key || "red"] || ACCENT_COLORS.red;
}

export type Category = {
  id: string;
  title: string;
  english: string;
  value: string;
};

export const CATEGORIES: Category[] = [
  { id: "cat-media", title: "アナウンサー・伝える仕事", english: "MEDIA", value: "media" },
  { id: "cat-sports", title: "アスリート・指導者・トレーナー", english: "SPORTS", value: "sports" },
  { id: "cat-fan", title: "サポーター・発信者", english: "SUPPORTERS", value: "fan" },
  { id: "cat-show", title: "俳優・モデル・エンタメ", english: "ENTERTAINMENT", value: "show" },
  { id: "cat-world", title: "起業・国際・挑戦", english: "CHALLENGERS", value: "world" },
];
