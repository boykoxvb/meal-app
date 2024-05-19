export enum Units {
  gramm = 'gramm',
  ml = 'ml',
}

const UnitNames: { [key in Units]: { name: string; shortname: string } } = {
  gramm: {
    name: 'грамм',
    shortname: 'гр.',
  },
  ml: {
    name: 'миллилитр',
    shortname: 'мл.',
  },
}

export class Unit {
  readonly name
  readonly shortname

  public static readonly units = Units
  public static readonly unitNames = UnitNames

  constructor(readonly key: Units) {
    this.name = UnitNames[this.key].name
    this.shortname = UnitNames[this.key].shortname
  }
}

export default class Portion {
  readonly id: string
  public name: string
  public unit: Unit
  public value: number

  constructor(dto: PortionDTO) {
    this.id = dto.id
    this.name = dto.name
    this.unit = new Unit(dto.unit)
    this.value = dto.value
  }
}

export type PortionDTO = {
  id: string
  name: string
  unit: Units
  value: number
}

export interface IPortionable {
  portions: Array<Portion>
}
