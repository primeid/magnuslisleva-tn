export const siteConfig = {
  title: "MagnusLisleva.tn",
  description:
    "A botanical-technical publication of texts, creations, notes from the field, and digital work.",
  mailchimpAction: "",
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/magnuslislevatn/",
    },
    {
      label: "X",
      href: "https://x.com/LislevatnMagnus",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@magnuslislevatn",
    },
    {
      label: "SoundCloud",
      href: "https://soundcloud.com/magnuslislevatn",
    },
  ],
  nav: [
    { label: "About", href: "/" },
    { label: "Texts", href: "/texts/" },
    { label: "Creations", href: "/creations/" },
    { label: "Tags", href: "/tags/" },
    { label: "Newsletter", href: "/newsletter/" },
  ],
} as const;
