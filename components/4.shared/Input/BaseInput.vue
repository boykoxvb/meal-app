<template>
  <div class="base-input" :class="classes">
    <input
      class="base-input__field"
      :value="props[valueName]"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      @input="onInput"
      @focus="setActive(true)"
      @blur="setActive(false)"
    />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'BaseInput',
})

const props = defineProps({
  placeholder: String,
  value: String,
  modelValue: String,
  color: {
    type: String,
    default: PRIMARY_COLORS.primary,
    validator(value: string) {
      return Object.keys(PRIMARY_COLORS).includes(value)
    },
  },
  size: {
    type: String,
    default: 'large',
    validator(value: string) {
      return Object.keys(BLOCK_SIZES).includes(value)
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: true,
  },
})

const valueName = computed(() => (props.modelValue ? 'modelValue' : 'value'))

const emit = defineEmits(['input', 'update:value', 'update:modelValue'])

const baseColor = useColor(props.color, props.disabled)
const lightColor = useColor(props.color, props.disabled, 100)

const size = useSize(props.size)
const fontSize = useSize(getNextSize(props.size, -2))

const classes = computed(() => {
  return {
    disabled: props.disabled,
    active: active.value,
    bordered: props.border,
  }
})

const active = ref(false)

const setActive = (value: boolean) => {
  active.value = value
}

const onInput = (e: Event) => {
  const value = getTargetValue(e)
  emit('input', value)
  emit('update:modelValue', value)
}
</script>

<style lang="scss" scoped>
.base-input {
  height: v-bind(size);

  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 $spacing-4;
  cursor: text;
  font-family: $font-family-default;
  font-size: calc(v-bind(fontSize));
  transition-duration: $transition-duration;

  &.bordered {
    border: 1px solid v-bind(lightColor);
    border-radius: $border-radius;

    &.active {
      border-color: v-bind(baseColor);
    }

    &:hover:not(.disabled) {
      border-color: v-bind(baseColor);
      transition-duration: $transition-duration;
    }
  }

  &__field {
    width: 100%;

    outline: none;
    display: flex;
    border: none;
    font-size: inherit;
    background-color: inherit;
  }

  &.disabled {
    cursor: default;
  }
}
</style>
