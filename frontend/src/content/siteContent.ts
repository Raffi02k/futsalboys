/**
 * FUTSAL BOYS CONTENT CONFIGURATION
 * Officiella sajten för Futsal Boys - Trollhättan
 */

export interface SiteConfig {
  projectName: string;
  clubName: string;
  tagline: string;
  subTagline: string;
  description: string;
  city: string;
  region: string;
  arena: string;
  email: string;
  instagramHandle: string;
  instagramUrl: string;

  // Leaders
  leaders: Array<{
    name: string;
    role: string;
    number?: number;
  }>;

  // Key Stats
  stats: Array<{
    value: string;
    label: string;
    sub?: string;
  }>;

  // CTA
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };

  // Branding & Assets
  logoUrl: string;
  wordmarkUrl: string;
  heroPosterUrl: string;

  // Navigation links
  navLinks: Array<{
    label: string;
    path: string;
  }>;

  // Social
  socialLinks: {
    instagram: string;
    youtube?: string;
    tiktok?: string;
  };
}

export const siteConfig: SiteConfig = {
  projectName: "Futsal Boys",
  clubName: "Futsal Boys Trollhättan",
  tagline: "LEADERS OF THE CLUB",
  subTagline: "Tillsammans mot toppen – Cuper, matcher & passion för futsal i Trollhättan.",
  description: "Officiella hemsidan för Trollhättan Futsal Boys. Följ våra ledare, se truppen, matchresultat och den unika gemenskapen i hallen.",
  city: "Trollhättan",
  region: "Västra Götaland",
  arena: "Arena Älvhögsborg",
  email: "raffi9998@gmail.com",
  instagramHandle: "@grabbarna.futsal",
  instagramUrl: "https://www.instagram.com/grabbarna.futsal/",

  leaders: [
    { name: "Raffi Medz", role: "CEO & Content Manager", number: 7 },
    { name: "Elvis Mesic", role: "Sportchefen & Målvakten", number: 1 },
    { name: "Marcelo Villa", role: "Generalen & Lagkapten", number: 3 },
  ],

  stats: [
    { value: "3", label: "LEDARE", sub: "Raffi • Elvis • Marcelo" },
    { value: "14+", label: "SPELARE I TRUPPEN", sub: "Elit & talanger" },
    { value: "100%", label: "ENGAGEMANG", sub: "I varje matchminut" },
    { value: "2024", label: "ETABLERAT", sub: "Trollhättan" },
  ],

  primaryCta: {
    label: "FÖLJ RESAN",
    href: "#instagram",
  },
  secondaryCta: {
    label: "SE TRUPPEN",
    href: "#truppen",
  },

  logoUrl: "/images/futsalboys-logo.png",
  wordmarkUrl: "/images/futsalboys-logo.png",
  heroPosterUrl: "/images/futsalboys-ledare.JPG",

  navLinks: [
    { label: "HEM", path: "/" },
    { label: "LEDARNA", path: "/ledarna" },
    { label: "TRUPPEN", path: "/truppen" },
    { label: "MATCHER", path: "/matcher" },
    { label: "GALLERI", path: "/galleri" },
    { label: "INSTAGRAM", path: "/instagram" },
  ],

  socialLinks: {
    instagram: "https://www.instagram.com/grabbarna.futsal/",
  },
};
