export default class Category {
  readonly id: string
  public name: string

  constructor(dto: CategoryDTO) {
    this.id = dto.id
    this.name = dto.name
  }
}

export type CategoryDTO = {
  id: string
  name: string
}
