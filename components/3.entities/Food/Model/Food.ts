import type { Nutrients, Category } from '#imports'

export default class Food {
  constructor(
    public title: string,
    public nutrients: Nutrients,
    public category: Category, //TODO сделать класс
    public subcategory?: Category //TODO сделать класс
  ) {}
}
