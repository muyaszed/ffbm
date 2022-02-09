import { Meta } from "./post";

export type Category = {
  attributes: PostAttr;
  id: number;
};

export type PostAttr = {
  name: string;
};

export type CategoryData = {
  data: Category[];
  meta: Meta;
};

export async function getCategories() {
  const result = await fetch("http://localhost:1337/api/categories");
  const categories: CategoryData = await result.json();

  return categories.data;
}
