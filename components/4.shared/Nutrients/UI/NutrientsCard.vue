<template>
  <div class="nutrients-card">
    <div class="nutrients-card__row nutrients-card__caloricity">
      <div class="nutrients-card__col">
        <label>Калорийность / 100 гр.</label>
        <BaseInputNumber v-model="caloricity" suffix=" ккал" />
      </div>
    </div>

    <div class="nutrients-card__row">
      <div class="nutrients-card__col nutrients-card__nutrient">
        <label class=""> Белки </label>
        <BaseInputNumber
          v-model="proteins"
          class="nutrients-card__nutrient-input"
          showButtons
          :minFractionDigits="0"
          :maxFractionDigits="1"
          :step="0.1"
        />
      </div>

      <div class="nutrients-card__col nutrients-card__nutrient">
        <label class=""> Жиры </label>
        <BaseInputNumber
          v-model="fats"
          class="nutrients-card__nutrient-input"
          showButtons
          :minFractionDigits="0"
          :maxFractionDigits="1"
          :step="0.1"
        />
      </div>

      <div class="nutrients-card__col nutrients-card__nutrient">
        <label class=""> Углеводы </label>
        <BaseInputNumber
          v-model="carbs"
          class="nutrients-card__nutrient-input"
          showButtons
          :minFractionDigits="0"
          :maxFractionDigits="1"
          :step="0.1"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Nutrients } from '#imports'

defineOptions({
  name: 'NutrientsCard',
})

const emit = defineEmits(['update', 'update:modelValue'])

const props = defineProps({
  item: {
    type: Object as PropType<Nutrients>,
    required: true,
  },
})

const sendEmits = () => {
  emit('update', itemBuffer)
  emit('update:modelValue', itemBuffer)
}

const itemBuffer = reactive(props.item)

const caloricity = computed({
  get() {
    return props.item.caloricity
  },
  set(value) {
    itemBuffer.caloricity = value
    emit('update', itemBuffer)
  },
})

const proteins = computed({
  get() {
    return props.item.proteins
  },
  set(value) {
    itemBuffer.proteins = value
    sendEmits()
  },
})

const fats = computed({
  get() {
    return props.item.fats
  },
  set(value) {
    itemBuffer.fats = value
    sendEmits()
  },
})

const carbs = computed({
  get() {
    return props.item.carbs
  },
  set(value) {
    itemBuffer.carbs = value
    sendEmits()
  },
})
</script>

<style lang="scss" scoped>
.nutrients-card {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  gap: $spacing-6;

  &__row {
    display: flex;
    gap: $spacing-6;
    flex-wrap: wrap;
  }

  &__col {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    gap: $spacing-2;
  }

  &__nutrient {
    @include p3;

    &-input {
      :deep(input) {
        width: 100px;
      }
    }
  }
}
</style>
