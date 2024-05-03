<template>
  <div class="nutrients-card">
    <div class="nutrients-card__row nutrients-card__caloricity">
      <label>Калорийность на 100 гр:</label>
      <label
        ><b>{{ $props.item.caloricity }} ккал</b></label
      >
    </div>

    <div class="nutrients-card__row f-space-around">
      <div class="nutrients-card__col nutrients-card__nutrient">
        <BaseKnob
          v-model="props.item.proteins"
          valueColor="var(--primary-500)"
          readonly
          :max="maxKnobValue"
        />
        <label class=""> Белки </label>
      </div>

      <div class="nutrients-card__col nutrients-card__nutrient">
        <BaseKnob
          v-model="props.item.fats"
          valueColor="var(--blue-500)"
          readonly
          :max="maxKnobValue"
        />
        <label class=""> Жиры </label>
      </div>

      <div class="nutrients-card__col nutrients-card__nutrient">
        <BaseKnob
          v-model="props.item.carbs"
          valueColor="var(--yellow-500)"
          readonly
          :max="maxKnobValue"
        />
        <label class=""> Углеводы </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Nutrients } from '#imports'

defineOptions({
  name: 'NutrientsEditCard',
})

const props = defineProps({
  item: {
    type: Object as PropType<Nutrients>,
    required: true,
  },
})

//TODO когда появятся порции сделать

const maxKnobValue = computed(() => props.item.carbs + props.item.fats + props.item.proteins)
</script>

<style lang="scss" scoped>
.nutrients-card {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  gap: $spacing-6;

  &__caloricity {
    @include p1;

    margin-bottom: $spacing-8;
  }

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

    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
