import type { Nutrients, Category } from '#imports'

export default class Food {
  constructor(
    public title: string,
    public nutrients: Nutrients,
    public category: Category,
    public subcategory?: Category
  ) {}
}
