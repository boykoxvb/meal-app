export const useColor = (color: string, disabled?: boolean, weight?: number) => {
  if (disabled) {
    return `var(--color-base-disabled)`
  }

  return computed(() => {
    return `var(--color-${color}-${weight ? weight : 400})`
  })
}
