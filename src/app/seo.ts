export const SITE = {
  name: "Visionaire × ProGro.AI",
  description:
    "A smarter way to manage, quote, and grow construction projects — powered by AI & precision design.",
  url: "https://progro.ai",
};

export function title(template?: string) {
  return template ? `${template} | ${SITE.name}` : SITE.name;
}

export const ogImage = "/progro_logo.png";


