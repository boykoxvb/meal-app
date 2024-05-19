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
import type { INutritious, Nutrients } from '#imports'

defineOptions({
  name: 'NutrientsEditCard',
})

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

const emit = defineEmits<{
  update: [value: ObjectUpdateModelPayload<Nutrients>]
  'update:modelValue': [value: ObjectUpdateModelPayload<Nutrients>]
}>()

const { caloricity, proteins, fats, carbs } = useVModel(
  props.item,
  useObjectUpdateModel(props.item, emit, 'partial')
)
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
