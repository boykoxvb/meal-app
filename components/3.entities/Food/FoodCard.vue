<template>
  <div class="food-card">
    <div class="food-card__row food-card__header">
      <BaseTitle
        v-model="title"
        :edit-mode="props.editMode"
        class="f-grow"
        placeholder="Название продукта"
      />

      <div class="food-card__header-toolbar f-noshrink">
        <BaseButton v-if="hasChanges">Сохранить</BaseButton>

        <BaseButton icon="pi pi-times" severity="secondary"> </BaseButton>
      </div>
    </div>

    <div v-if="!props.editMode" class="food-card__row food-card__categories">
      <BaseBreadcrumb :model="categoryBreadcrumbs"></BaseBreadcrumb>
    </div>

    <div class="food-card__row" v-else>
      <BaseDropdown
        class="food-card__category"
        :model-value="category"
        checkmark
        placeholder="Категория"
        optionLabel="name"
        :options="categoryOptions"
        @change="onCategoryChange"
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
      <NutrientsCard v-if="!props.editMode" :item="props.item.nutrients"> </NutrientsCard>

      <NutrientsEditCard
        v-else
        :item="props.item.nutrients"
        @update="onNutrientsChange"
      ></NutrientsEditCard>
    </BaseSegment>
  </div>
</template>

<script lang="ts" setup>
import type { Category, Food, Nutrients } from '#imports'
import type { DropdownChangeEvent } from 'primevue/dropdown'

defineOptions({
  name: 'FoodCard',
})

const props = defineProps({
  item: {
    type: Object as PropType<Food>,
    required: true,
  },
  editMode: {
    type: Boolean,
    default: false,
  },
})

const title = ref(props.item.title)
const category = ref(props.item.category)
const subcategory = ref(props.item.subcategory)
const nutrients = ref(structuredClone(props.item.nutrients))

const categoryOptions = MockDictionary.foodCategories

const categoryBreadcrumbs = computed(() => {
  return props.item.subcategory
    ? [{ label: props.item.category.name }, { label: props.item.subcategory.name }]
    : [{ label: props.item.category.name }]
})

const onCategoryChange = (event: DropdownChangeEvent) => {
  category.value = event.value
  subcategory.value = undefined
}

const onNutrientsChange = (value: Nutrients) => {
  nutrients.value = value
}

const hasChanges = computed(() => {
  return (
    title.value !== props.item.title ||
    !deepEqual(category.value, props.item.category) ||
    !deepEqual(subcategory.value, props.item.subcategory) ||
    !deepEqual(nutrients.value, props.item.nutrients)
  )
})
</script>

<style lang="scss" scoped>
.food-card {
  max-width: 545px;
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

  &__categories {
    .p-breadcrumb {
      @include p2;
      padding-left: 0;
    }
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
