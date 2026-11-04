export type NavItem = { href: string; labelKey: string };

export const primaryNav: NavItem[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/schemes", labelKey: "nav.schemes" },
  { href: "/#how-it-works", labelKey: "nav.how" },
  { href: "/impact", labelKey: "nav.impact" },
  { href: "/become-a-saathi", labelKey: "nav.saathi" },
  { href: "/contact", labelKey: "nav.contact" },
];

export const helpLinks: NavItem[] = [
  { href: "/eligibility", labelKey: "nav.eligibility" },
  { href: "/contact?category=support", labelKey: "footer.helpDesk" },
  { href: "/contact?category=grievance", labelKey: "contact.catGrievance" },
];

export const legalLinks: NavItem[] = [
  { href: "/privacy", labelKey: "footer.privacy" },
  { href: "/accessibility", labelKey: "footer.accessibility" },
  { href: "/about#disclaimer", labelKey: "footer.disclaimer" },
];
