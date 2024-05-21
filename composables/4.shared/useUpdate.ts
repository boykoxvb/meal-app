//TODO Попытаться объединить в одном методе updateModels`ы
// type UpdateModel<T> = IArrayUpdateModel<T> | IObjectUpdateModel<T>

import type { UnwrapNestedRefs } from 'vue'

// full обновляем сущность целиком и эмитим его с изменениями, partial - эмитим изменения
type UpdateModelStrategy = 'full' | 'partial'

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
  if (!isReactive(item)) {
    throw new Error('Переданный объект не реактивен')
  }
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
      const result = emitValue.filter((p) => p[keyName] !== keyValue)

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

//TODO найти способ получить тип поля из Generic через key
export type ObjectUpdateModelPayload<T> = { key: keyof T; value: any }

export const useObjectUpdateModel = <T>(
  item: T,
  emit: Function,
  type: UpdateModelStrategy
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
  if (!isReactive(item)) {
    throw new Error('Переданный объект не реактивен: ', item)
  }

  const raw: T = toRaw(item)
  const clone = structuredClone(raw)
  const buffer = reactive(clone)

  return {
    buffer,
    onChange: (value: any, key: keyof UnwrapNestedRefs<T>, cb?: Function) => {
      buffer[key] = value
      cb && cb()
    },
    //TODO пересмотреть логику
    onArrayChange: (value: any[], key: keyof UnwrapNestedRefs<T>, cb?: Function) => {
      const arr = buffer[key]
      if (arr instanceof Array) {
        arr.length = 0
        arr.push(...value)
      }
      cb && cb()
    },
    hasChanges: computed(() => {
      return !deepEqual(buffer, item)
    }),
  }
}
