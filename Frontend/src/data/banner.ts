export type BannerStat = {
  value: string;
  label: string;
};

export type BannerContent = {
  headlineBefore: string;
  headlineHighlight: string;
  headlineAfter: string;
  description: string;
  stats: BannerStat[];
};

export const DEFAULT_BANNER_CONTENT: BannerContent = {
  headlineBefore: "We Build",
  headlineHighlight: "Powerful",
  headlineAfter: "Digital Experiences",
  description:
    "WebMarkio Agency helps businesses grow with modern websites, UI/UX design, SEO and digital marketing solutions that convert visitors into loyal clients.",
  stats: [
    { value: "100+", label: "Projects" },
    { value: "50+", label: "Clients" },
    { value: "5★", label: "Rating" },
  ],
};
