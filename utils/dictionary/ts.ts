export const getTargetValue = (e: Event) => {
  return (e.target as HTMLInputElement).value
}

export function deepEqual(obj1: Object | undefined, obj2: Object | undefined) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

// Types -------------------------------------------------------------------

export type ClearPropertyTypes<T> = {
  [P in keyof T]: any
}

export type MutableKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
}[keyof T]

type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B

export type ArrayElementType<ArrayType> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never

export type PropertyType<TObj, TProp extends keyof TObj> = TObj[TProp]
