export class Nutrients {
  public caloricity: number
  public proteins: number
  public fats: number
  public carbs: number

  constructor(dto: NutrientsDTO) {
    this.caloricity = dto.caloricity
    this.proteins = dto.proteins
    this.fats = dto.fats
    this.carbs = dto.carbs
  }
}

export interface INutritious {
  nutrients: Nutrients
}

export type NutrientsDTO = {
  caloricity: number
  proteins: number
  fats: number
  carbs: number
}
