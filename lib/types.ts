export type ProductImage = {
  src: string;
  thumbnail: string;
};

export type ProductCategoryRef = {
  name: string;
  slug: string;
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
};

export type Category = {
  name: string;
  slug: string;
  count: number;
  parent?: string;
};
