import type { Category, Nutrients } from '#imports'

export default class Meal implements IMeal {
  public id: string
  public name: string
  public category: Category
  public subcategory?: Category

  public get nutrients(): Nutrients {
    return {
      caloricity: 1,
      proteins: 1,
      fats: 1,
      carbs: 1,
    }
  }

  constructor(id: string, name: string, category: Category, subcategory?: Category) {
    this.id = id
    this.name = name
    this.category = category
    this.subcategory = subcategory
  }
}

interface IMeal extends INutritious {}

export type MealDTO = {
  id: string
  name: string
  // category: CategoryDTO
  // subcategory?: CategoryDTO
}
