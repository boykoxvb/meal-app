export type Size = keyof typeof SIZES

export enum SIZES {
  tiny = 'xs',
  small = 's',
  medium = 'm',
  large = 'l',
}

export const ICON_SIZES = {
  ...SIZES,
}

export const BUTTON_SIZES = {
  medium: SIZES.medium,
  large: SIZES.large,
}

export enum PRIMARY_COLORS {
  primary = 'primary',
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}

export const getNextSize = (sizeName: string, offset: number) => {
  const sizeKey: Size = <Size>sizeName

  const arr = Object.entries(SIZES)
  const index = arr.findIndex(([key]) => key == sizeKey) + offset

  if (index <= 0) {
    return arr[0][0]
  } else if (index > arr.length - 1) {
    return arr[arr.length - 1][0]
  } else {
    return arr[index][0]
  }
}
