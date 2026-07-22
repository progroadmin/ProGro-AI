import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Account", template: "%s | ProGro.ai" },
  robots: { index: false, follow: false },
};

export default function PublicAccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
