import { v4 } from 'uuid'

export type UUID = typeof v4

// export interface IBase {
//   id: string //TODO перевести на UUID - типизация ругается на v4()
//   name: string
// }

// export class EntityBase {
//   constructor(
//     readonly id: string,
//     public name: string
//   ) {}
// }
