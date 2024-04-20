<template>
  <div class="gui">
    <div class="gui__buttons">
      <base-button size="large" icon="uil:github">Тест</base-button>
      <base-button outlined size="large" color="success" icon="uil:github">Тест</base-button>
      <base-button size="large" color="info" endIcon="uil:github">Тест</base-button>
      <base-button outlined size="large" color="warning" icon="uil:github" />
      <base-button size="large" color="error" icon="uil:github" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gui {
  &__buttons {
    display: flex;
    align-items: center;
    gap: $spacing-4;
  }
}
</style>
