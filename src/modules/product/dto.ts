// Product-related DTOs and types
export type Category = {
  id: number;
  name: string;
  image: string;
  creationAt?: string;
  updatedAt?: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  creationAt?: string;
  updatedAt?: string;
};
