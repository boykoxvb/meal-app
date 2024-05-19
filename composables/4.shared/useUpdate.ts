//TODO Попытаться объединить в одном методе updateModels`ы
// type UpdateModel<T> = IArrayUpdateModel<T> | IObjectUpdateModel<T>

import type { UnwrapNestedRefs } from 'vue'

// export const useUpdateModel = <T extends ModelTypes>(
//   item: T,
//   emit: Function,
//   keyName: KeyNameOptional<T>
// ) => {
//   if (item instanceof Array && keyName) {
//     const x: IArrayUpdateModel<T> = useArrayUpdateModel(item, keyName, emit)
//     return x
//   } else {
//     return useObjectUpdateModel(item, emit)
//   }
// }

// Array

interface IArrayUpdateModel<T> {
  update: (keyValue: string, propertyName: keyof T, value: any) => void
  push: (value: T) => void
  pop: (keyValue: string) => void
}

export const useArrayUpdateModel = <T>(
  item: Array<T>,
  emit: Function,
  keyName: keyof T
): IArrayUpdateModel<T> => {
  return {
    update: (keyValue: string, propertyName: keyof T, value: any): void => {
      const emitValue = structuredClone(toRaw(item))
      const target = emitValue.find((p) => p[keyName] === keyValue)

      if (target) {
        target[propertyName] = value

        emit('update', emitValue)
        emit('update:modelValue', emitValue)
      }
    },
    push: (value: T): void => {
      const emitValue = structuredClone(toRaw(item))
      emitValue.push(value)

      emit('update', emitValue)
      emit('update:modelValue', emitValue)
    },
    pop: (keyValue: string): void => {
      const emitValue = structuredClone(toRaw(item))
      const result = emitValue.filter((p) => p[keyName] === keyValue)

      emit('update', result)
      emit('update:modelValue', result)
    },
  }
}

// Object

interface IObjectUpdateModel<T> {
  update: (propertyName: keyof T, value: any) => void
  //   hasChanges: () => boolean
}

type ObjectUpdateType = 'full' | 'partial'

//TODO найти способ получить тип поля из Generic через key
export type ObjectUpdateModelPayload<T> = { key: keyof T; value: any }

export const useObjectUpdateModel = <T>(
  item: T,
  emit: Function,
  type: ObjectUpdateType
): IObjectUpdateModel<T> => {
  if (type === 'full') {
    return {
      update: (propertyName: keyof T, value: any): void => {
        const emitValue: T = structuredClone(toRaw(item))
        emitValue[propertyName] = value

        emit('update', emitValue)
        emit('update:modelValue', emitValue)
      },
    }
  } else {
    return {
      update: (propertyName: keyof T, value: any): void => {
        emit('update', { key: propertyName, value })
        emit('update:modelValue', { key: propertyName, value })
      },
    }
  }
}

// ------------------------------------------------------------------------------------

export const useVModel = <T extends Object>(
  item: T,
  updateModel: IObjectUpdateModel<T>
): ClearPropertyTypes<T> => {
  const proxy: ClearPropertyTypes<T> = structuredClone(toRaw(item))

  for (const key in proxy) {
    proxy[key] = computed({
      get() {
        return item[key]
      },
      set(value) {
        updateModel.update(key, value)
      },
    })
  }

  return proxy
}

// ------------------------------------------------------------------------------------

export const useBuffer = <T extends Object>(item: T) => {
  const raw: T = toRaw(item)
  const clone = structuredClone(raw)
  const buffer = reactive(clone)
  // const buffer: T = reactive(structuredClone(toRaw(item)))

  return {
    buffer,
    onChange: (value: any, key: keyof UnwrapNestedRefs<T>, cb?: Function) => {
      buffer[key] = value
      cb && cb()
    },
    hasChanges: computed(() => {
      return !deepEqual(toRaw(buffer), toRaw(item))
    }),
  }
}
