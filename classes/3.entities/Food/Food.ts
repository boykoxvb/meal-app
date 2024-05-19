import type { Nutrients as TNutrients, Portion as TPortion, Category as TCategory } from '#imports'

export default class Food implements INutritious, IPortionable {
  readonly id: string
  public name: string
  public nutrients: TNutrients
  public portions: Array<TPortion>
  public category: TCategory
  public subcategory?: TCategory
  public image?: string

  constructor(dto: FoodDTO) {
    this.id = dto.id
    this.name = dto.name
    this.nutrients = new Nutrients(dto.nutrients)
    this.portions = dto.portions.map((p: PortionDTO) => new Portion(p))
    this.category = new Category(dto.category)
    this.subcategory = dto?.subcategory ? new Category(dto.subcategory) : undefined
    this.image = dto.image
  }
}

export type FoodDTO = {
  id: string
  name: string
  nutrients: NutrientsDTO
  portions: Array<PortionDTO>
  category: CategoryDTO
  subcategory?: CategoryDTO
  image?: string
}
