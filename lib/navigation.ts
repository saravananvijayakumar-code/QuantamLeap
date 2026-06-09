export interface NavLink {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

export interface DropdownItem {
  label: string;
  href: string;
}

export const ROUTES = {
  home: "/",
  products: "/products",
  appBuilder: "/products/app-builder",
  portfolio: "/portfolio",
  pricing: "/pricing",
  blog: "/blog",
  about: "/about",
  contact: "/contact",
} as const;
