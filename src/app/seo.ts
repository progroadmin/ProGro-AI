export const SITE = {
  name: "ProGro.ai",
  description: "Contractor-focused software for projects, bids, billing, labor, contacts, equipment, and job records.",
  url: "https://progro.ai",
};

export function title(template?: string) {
  return template ? `${template} | ${SITE.name}` : `${SITE.name} — Construction Operations Software`;
}

export const ogImage = "/progro_logo.png";
