export type ProductImage = {
  src: string;
  thumbnail: string;
};

export type ProductCategoryRef = {
  name: string;
  slug: string;
};

export type AttributeTerm = {
  name: string;
  slug: string;
};

/** A variation-defining attribute on a variable product, e.g. "Types". */
export type ProductAttribute = {
  name: string;
  terms: AttributeTerm[];
};

/** Lightweight pointer from a variable product to one of its variations. */
export type VariationRef = {
  id: number;
  attributes: { name: string; value: string }[];
};

/** A fully resolved variation (fetched separately from the Store API). */
export type Variation = {
  id: number;
  attributes: { name: string; value: string }[];
  price: string; // minor units
  regularPrice: string;
  salePrice: string;
  onSale: boolean;
  inStock: boolean;
  image?: ProductImage;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  type: string;
  price: string; // minor units, e.g. "5000" = 50.00
  regularPrice: string;
  salePrice: string;
  onSale: boolean;
  sku: string;
  shortDescription: string;
  description: string;
  images: ProductImage[];
  categories: ProductCategoryRef[];
  inStock: boolean;
  /**
   * Sanitized description HTML preserving the original structure: spec
   * tables, measurement lists, headings. Absent on stale fallback snapshots,
   * in which case the PDP falls back to the plain-text description.
   */
  descriptionHtml?: string;
  /** Present on variable products when live data is available. */
  attributes?: ProductAttribute[];
  variationRefs?: VariationRef[];
  /**
   * Non-variation attributes (e.g. Colour options, materials), mirroring the
   * old site's "Additional information" tab.
   */
  infoAttributes?: ProductAttribute[];
};

/** Slim product shape serialized into the page for client-side search. */
export type SearchItem = {
  id: number;
  name: string;
  slug: string;
  price: string;
  image: string;
  category: string;
};

export type Category = {
  name: string;
  slug: string;
  count: number;
  parent?: string;
};
