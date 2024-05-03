<template>
  <div class="test">
    <FoodCard :item="food1"></FoodCard>
  </div>
</template>

<script lang="ts" setup>
import { Nutrients, Food, Category } from '#imports'

const food1 = new Food(
  'Банан',
  new Nutrients(89, 1.09, 0.33, 22.84),
  new Category('Фрукты', '1'),
  new Category('Фрукты', '1')
)
</script>

<style lang="scss" scoped></style>
