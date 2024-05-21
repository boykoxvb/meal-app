<template>
  <div class="food-card">
    <div class="food-card__row food-card__header">
      <BaseTitle
        v-model="buffer.name"
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
        :model-value="buffer.category"
        checkmark
        placeholder="Категория"
        optionLabel="name"
        :options="categoryOptions"
        @change="
          onChange(new Category($event.value), 'category', () => {
            if (buffer.subcategory) {
              buffer.subcategory = undefined
            }
          })
        "
      />

      <BaseDropdown
        class="food-card__category"
        v-model="buffer.subcategory"
        checkmark
        placeholder="Подкатегория"
        optionLabel="name"
        :options="categoryOptions"
      />
    </div>

    <BaseSegment v-if="$props.item.image" class="food-card__row food-card__image" :padding="false">
      <BaseImage ref="imageRef" :src="props.item.image" alt="Image" height="250" preview>
        <template #indicatoricon>
          <i class="pi pi-upload"></i>
        </template>
      </BaseImage>
    </BaseSegment>

    <BaseSegment class="food-card__row">
      <NutrientsCard v-if="!props.editMode" :item="$props.item.nutrients"> </NutrientsCard>

      <NutrientsEditCard
        v-else
        :item="buffer.nutrients"
        @update="onNutrientsChange"
      ></NutrientsEditCard>
    </BaseSegment>

    <BaseSegment class="food-card__row">
      <PortionTable :item="buffer" @update="test($event)"> </PortionTable>
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
  editMode: {
    type: Boolean,
    default: false,
  },
})

const { buffer, onChange, onArrayChange, hasChanges } = useBuffer(props.item)

const test = (value: any) => {
  onArrayChange(value, 'portions')
}

const onNutrientsChange = (payload: { key: keyof Nutrients; value: any }) => {
  buffer.nutrients[payload.key] = payload.value
}

const categoryOptions = MockDictionary.foodCategories

const categoryBreadcrumbs = computed(() => {
  return props.item.subcategory
    ? [{ label: props.item.category.name }, { label: props.item.subcategory.name }]
    : [{ label: props.item.category.name }]
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
