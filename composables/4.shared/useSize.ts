export const useSize = (sizeName: string) => {
  const sizeKey: Size = <Size>sizeName
  const sizeCode = SIZES[sizeKey]

  const size = computed(() => {
    return `var(--size-${sizeCode})`
  })

  return size
}
