export interface PortfolioItem {
  id: string;
  name: string;
  url: string;
  description: string;
  thumbnail?: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "pdfedit4u",
    name: "PDFEdit4U",
    url: "https://pdfedit4u.com",
    description: "A comprehensive PDF editing tool for document management.",
  },
  {
    id: "suburbintel",
    name: "SuburbIntel",
    url: "https://suburbintel.com",
    description: "A suburb intelligence platform providing property and area insights.",
  },
];
