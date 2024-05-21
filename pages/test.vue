<template>
  <div class="test">
    <FoodCard editMode :item="f"></FoodCard>
    <!-- <PortionTable :item="food"></PortionTable> -->
  </div>
</template>

<script lang="ts" setup>
import { v4 } from 'uuid'
import { Nutrients, Food, Category } from '#imports'

const x = v4()

const foodDTO: FoodDTO = {
  id: 'stringId',
  name: 'Банан',
  nutrients: {
    caloricity: 100,
    proteins: 20,
    fats: 3,
    carbs: 10,
  },
  portions: [
    {
      id: '1',
      name: 'MyFirstPortion',
      unit: Unit.units.gramm,
      value: 1,
    },
  ],
  category: {
    id: '1',
    name: 'Фрукты',
  },
  image: '/testimage.jpg',
}

const food = new Food(foodDTO)
const f = reactive(food)
</script>

<style lang="scss" scoped></style>
