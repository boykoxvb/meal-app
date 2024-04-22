<template>
  <div class="base-segment" :class="{ 'with-padding': props.padding }">
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'BaseSegment',
})

const props = defineProps({
  padding: {
    type: Boolean,
    default: true,
  },
})
</script>

<style lang="scss" scoped>
.base-segment {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  //   border: 1px solid $color-base-primary;
  box-shadow: $box-shadow-base;
  border-radius: $border-radius-huge;

  &.with-padding {
    padding: $spacing-6;
  }
}
</style>
