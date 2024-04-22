export const getTargetValue = (e: Event) => {
  return (e.target as HTMLInputElement).value
}

export function deepEqual(obj1: Object | undefined, obj2: Object | undefined) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}
