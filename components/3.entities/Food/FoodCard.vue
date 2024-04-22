<template>
  <div class="food-card">
    <div class="food-card__row food-card__header">
      <BaseTitle class="f-grow" :title="props.item.title" placeholder="Название продукта" />

      <div class="food-card__header-toolbar f-noshrink">
        <BaseButton v-if="hasChanges">Сохранить</BaseButton>

        <BaseButton icon="pi pi-times" severity="secondary"> </BaseButton>
      </div>
    </div>

    <div class="food-card__row">
      <BaseDropdown
        class="food-card__category"
        v-model="category"
        checkmark
        placeholder="Категория"
        optionLabel="name"
        :options="categoryOptions"
      />

      <BaseDropdown
        class="food-card__category"
        v-model="subcategory"
        checkmark
        placeholder="Подкатегория"
        optionLabel="name"
        :options="categoryOptions"
      />
    </div>

    <BaseSegment class="food-card__row food-card__image" :padding="false">
      <BaseImage src="/testimage.jpg" alt="Image" height="250" preview />
    </BaseSegment>

    <BaseSegment class="food-card__row">
      <NutrientsCard :item="nutrients" @update="onNutrientsChange"></NutrientsCard>
    </BaseSegment>
  </div>
</template>

<script lang="ts" setup>
import type { Food, Nutrients } from '#imports'

defineOptions({
  name: 'FoodCard',
})

const props = defineProps({
  item: {
    type: Object as PropType<Food>,
    required: true,
  },
})

const category = ref(props.item.category)
const subcategory = ref(props.item.subcategory)
const nutrients = ref(structuredClone(props.item.nutrients))

const categoryOptions = MockDictionary.foodCategories

const onNutrientsChange = (value: Nutrients) => {
  nutrients.value = value
}

const hasChanges = computed(() => {
  return (
    !deepEqual(category.value, props.item.category) ||
    !deepEqual(subcategory.value, props.item.subcategory) ||
    !deepEqual(nutrients.value, props.item.nutrients)
  )
})
</script>

<style lang="scss" scoped>
.food-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &__row {
    display: flex;
    margin-bottom: $spacing-6;
    gap: $spacing-6;
    flex-wrap: wrap;
  }

  &__header {
    flex-wrap: nowrap;

    &-toolbar {
      display: flex;

      gap: $spacing-6;
    }
  }

  &__col {
    display: flex;
    flex-direction: column;
    gap: $spacing-2;
  }

  &__category {
    width: 160px;
  }

  &__image {
    :deep(*) {
      border-radius: inherit;
    }

    :deep(.p-image) {
      display: flex;
      justify-content: center;
    }
  }

  &__actions {
    display: flex;
    justify-content: end;
  }

  &__nutrient {
    @include p3-semibold;

    &-input {
      :deep(input) {
        width: 100px;
      }
    }
  }
}
</style>
