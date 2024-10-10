export const DEVICE = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: window.devicePixelRatio,
  aspect: window.innerWidth / window.innerHeight,
});

export const PROJECTS = [
  {
    name: "Imagina Energía",
    tech: ["javascript", "react", "web performance", "maintenance", "figma"],
    img: "/img/projects/imagina.png",
  },
  {
    name: "GyrusDS",
    tech: [
      "typescript",
      "nextjs",
      "web performance",
      "animations",
      "seo",
      "figma",
    ],
    img: "/img/projects/gyrusds.png",
  },
  {
    name: "Sulcus",
    tech: ["typescript", "svelte", "supabase", "sqlite"],
    img: "/img/projects/sulcus.png",
  },
  {
    name: "Webel",
    tech: [
      "angular",
      "web performance",
      "seo",
      "maintenance",
      "adobe xd",
      "startup",
    ],
    img: "/img/projects/webel.png",
  },
  {
    name: "Conciertos Solo",
    tech: ["react", "CI/CD", "freelance"],
    img: "/img/projects/conciertossolo.png",
  },
  {
    name: "Blinki",
    tech: ["angular", "figma", "freelance", "ux", "mobile"],
    img: "/img/projects/blinki.png",
  },
  {
    name: "Clubit",
    tech: ["angular", "mobile", "startup"],
    img: "/img/projects/clubit.png",
  },
  {
    name: "Apolo",
    tech: ["react", "figma", "svg motion"],
    img: "/img/projects/apolo.png",
  },
];
