export const useColor = (colorName: string) => {
  const color = computed(() => {
    return `var(--color-${colorName}-400)`
  })

  return color
}
