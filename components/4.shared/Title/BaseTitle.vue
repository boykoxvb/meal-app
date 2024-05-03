<template>
  <div class="base-title">
    <input
      class="base-title__input"
      type="text"
      :value="props.title ?? props.modelValue"
      :readonly="!props.editMode"
      :placeholder="props.placeholder"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'BaseTitle',
})

const emit = defineEmits(['change', 'update:modelValue'])

const props = defineProps({
  title: String,
  modelValue: String,
  editMode: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: 'Название',
  },
})

const onChange = (e: Event) => {
  const value = getTargetValue(e)

  emit('change', value)
  emit('update:modelValue', value)
}
</script>

<style lang="scss" scoped>
.base-title {
  display: flex;
  align-items: center;
  font-family: $font-family-default;
  transition-duration: $transition-duration;
  min-width: $spacing-18;

  &__input {
    @include p0-semibold;

    min-width: $spacing-18;

    font-family: $font-family-default;

    border: none;
    outline: none;
  }
}
</style>
