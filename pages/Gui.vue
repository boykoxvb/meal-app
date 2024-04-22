<template>
  <div class="gui">
    <div class="gui__block gui__buttons">
      <!-- <base-button size="large" icon="uil:github">Тест</base-button>
      <base-button outlined size="medium" color="success" icon="uil:github">Тест</base-button>
      <base-button size="large" color="info" endIcon="uil:github">Тест</base-button>
      <base-button outlined size="medium" color="warning" icon="uil:github" />
      <base-button size="large" color="error" icon="uil:github" />

      <base-button outlined disabled size="large" color="success" icon="uil:github"
        >Тест</base-button
      >
      <base-button disabled size="large" color="info" endIcon="uil:github">Тест</base-button> -->
    </div>
    <div class="gui__block gui__inputs">
      <base-input v-model="model1" placeholder="Введите значение"></base-input>
      <br />
      <base-input
        v-model="model2"
        disabled
        placeholder="Введите значение"
        color="warning"
        size="medium"
      ></base-input>
      <br />
      <base-input
        v-model="model1"
        placeholder="Введите значение"
        color="warning"
        size="large"
        :border="false"
      ></base-input>

      <BaseButton severity="primary">Кнопка</BaseButton>
      <BaseInputNumber :height="24" showButtons buttonLayout="horizontal"> </BaseInputNumber>
    </div>
  </div>
</template>

<script lang="ts" setup>
const model1 = ref('model1')
const model2 = ref('model2')
</script>

<style lang="scss" scoped>
.gui {
  &__block {
    margin-bottom: $spacing-8;
    font-size: 14px;
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: $spacing-4;
  }
}
</style>
