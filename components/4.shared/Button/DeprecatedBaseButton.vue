<template>
  <div class="base-button" :class="classes">
    <Icon v-if="props.icon" :name="`${props.icon}`" />

    <div class="base-button__title">
      <slot name="default" />
    </div>

    <Icon v-if="props.endIcon" :name="`${props.endIcon}`" />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'DeprecatedBaseButton',
})

const props = defineProps({
  color: {
    type: String,
    default: PRIMARY_COLORS.primary,
    validator(value: string) {
      return Object.keys(PRIMARY_COLORS).includes(value)
    },
  },
  size: {
    type: String,
    default: 'medium',
    validator(value: string) {
      return Object.keys(BLOCK_SIZES).includes(value)
    },
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  icon: String,
  endIcon: String,
  disabled: {
    type: Boolean,
    default: false,
  },
})

const slots = useSlots()

const color = useColor(props.color, props.disabled)
const size = useSize(props.size)

const iconOnly = computed(() => {
  return !slots?.default && (props.icon || props.endIcon)
})

const fontSize = useSize(getNextSize(props.size, -1))

const classes = computed(() => {
  return {
    outlined: props.outlined,
    'icon-only': iconOnly.value,
    disabled: props.disabled,
  }
})
</script>

<style lang="scss" scoped>
.base-button {
  height: v-bind(size);
  background-color: v-bind(color);

  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  gap: $spacing-2;
  padding: $spacing-2 $spacing-4;
  cursor: pointer;
  font-family: $font-family-default;
  font-size: calc(v-bind(fontSize) - 4px);
  color: $color-base-white;
  transition-duration: $transition-duration;
  border: 1px solid v-bind(color);
  user-select: none;
  border-radius: $border-radius;

  &:hover:not(.disabled) {
    background-color: $color-base-white;
    color: v-bind(color);

    transition-duration: $transition-duration;
  }

  &.outlined {
    color: v-bind(color);

    background-color: transparent;

    &:hover:not(.disabled) {
      background-color: v-bind(color);
      color: $color-base-white;

      transition-duration: $transition-duration;
    }
  }

  &.icon-only {
    gap: 0;
    padding: $spacing-2;
    width: v-bind(size);
  }

  &.disabled {
    cursor: default;
  }
}
</style>
