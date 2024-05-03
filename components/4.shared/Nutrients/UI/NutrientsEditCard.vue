<template>
  <div class="nutrients-edit-card">
    <div class="nutrients-edit-card__row nutrients-edit-card__caloricity">
      <div class="nutrients-edit-card__col">
        <label>Калорийность / 100 гр.</label>
        <BaseInputNumber v-model="caloricity" showButtons suffix=" ккал" />
      </div>
    </div>

    <div class="nutrients-edit-card__row">
      <div class="nutrients-edit-card__col nutrients-edit-card__nutrient">
        <label class=""> Белки </label>
        <BaseInputNumber
          v-model="proteins"
          class="nutrients-edit-card__nutrient-input"
          showButtons
          :minFractionDigits="0"
          :maxFractionDigits="2"
          :step="0.01"
        />
      </div>

      <div class="nutrients-edit-card__col nutrients-edit-card__nutrient">
        <label class=""> Жиры </label>
        <BaseInputNumber
          v-model="fats"
          class="nutrients-edit-card__nutrient-input"
          showButtons
          :minFractionDigits="0"
          :maxFractionDigits="2"
          :step="0.01"
        />
      </div>

      <div class="nutrients-edit-card__col nutrients-edit-card__nutrient">
        <label class=""> Углеводы </label>
        <BaseInputNumber
          v-model="carbs"
          class="nutrients-edit-card__nutrient-input"
          showButtons
          :minFractionDigits="0"
          :maxFractionDigits="2"
          :step="0.01"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Nutrients } from '#imports'

defineOptions({
  name: 'NutrientsEditCard',
})

const emit = defineEmits(['update', 'update:modelValue'])

const props = defineProps({
  item: {
    type: Object as PropType<Nutrients>,
    required: true,
  },
  editMode: {
    type: Boolean,
    default: false,
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
.nutrients-edit-card {
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
