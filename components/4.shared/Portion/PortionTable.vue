<template>
  <div class="portion">
    <div class="portion__header">
      <span>Порции:</span>
      <BaseButton
        icon="pi pi-plus"
        label="Новая"
        severity="primary"
        @click="push(Portion.default())"
      >
      </BaseButton>
    </div>
    <BaseDataTable
      :value="props.item.portions"
      v-model:selection="selectedPorion"
      selection-mode="single"
    >
      <BaseColumn field="name" header="Название">
        <template #body="slotProps">
          <BaseInputText
            :value="slotProps.data.name"
            :pt="{
              root: () => ({
                style: {
                  border: 'none',
                  'box-shadow': 'none',
                  'background-color': 'inherit',
                },
              }),
            }"
            @input="update(slotProps.data.id, 'name', getTargetValue($event))"
          />
        </template>
      </BaseColumn>

      <BaseColumn field="value" header="Кол-во" style="width: 100px">
        <template #body="slotProps">
          <BaseInputNumber
            class="portion__value"
            :inputStyle="{ width: '80px', textAlign: 'right' }"
            :model-value="slotProps.data.value"
            @input="update(slotProps.data.id, 'value', $event.value)"
          />
        </template>
      </BaseColumn>

      <BaseColumn field="unit" header="Единица изм." style="width: 100px">
        <template #body="slotProps">
          <BaseDropdown
            class="portion__unit"
            :model-value="getUnitValue(slotProps.data.unit)"
            checkmark
            placeholder="Ед. изм."
            optionLabel="name"
            :options="unitOptions"
            @change="update(slotProps.data.id, 'unit', new Unit($event.value.key))"
          >
          </BaseDropdown>
        </template>
      </BaseColumn>

      <BaseColumn :exportable="false" style="width: 54px">
        <template #body="slotProps">
          <BaseButton
            v-show="selectedPorion?.id === slotProps.data.id"
            icon="pi pi-times"
            text
            severity="danger"
            @click="pop(slotProps.data.id)"
          />
        </template>
      </BaseColumn>
    </BaseDataTable>
  </div>
</template>

<script lang="ts" setup>
import type { IPortionable, Unit as TUnit } from '#imports'

defineOptions({
  name: 'PortionTable',
})

const props = defineProps({
  item: {
    type: Object as PropType<IPortionable>,
    required: true,
  },
})

const emits = defineEmits<{
  update: [value: Array<typeof Portion>]
  'update:modelValue': [value: Array<typeof Portion>]
}>()

const { update, push, pop } = useArrayUpdateModel(props.item.portions, emits, 'id')

const unitOptions = Object.values(Unit.units).map((unit) => ({
  key: unit,
  name: Unit.unitNames[unit].shortname,
}))

const getUnitValue = (unit: TUnit) => {
  return unitOptions.find((u) => u.key === unit.key)
}

const selectedPorion = ref()
</script>

<style lang="scss" scoped>
.portion {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
