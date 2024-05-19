<template>
  <div class="portion">
    <BaseDataTable :value="props.item.portions">
      <BaseColumn field="name" header="Название">
        <template #body="slotProps">
          <BaseInputText
            :value="slotProps.data.name"
            :pt="{
              root: () => ({
                style: {
                  border: 'none',
                  'box-shadow': 'none',
                },
              }),
            }"
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
          >
          </BaseDropdown>
        </template>
      </BaseColumn>
    </BaseDataTable>
  </div>
</template>

<script lang="ts" setup>
import type { IPortionable, Portion, Unit as TUnit, Units as TUnits } from '#imports'

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
  update: [value: Portion[]]
  'update:modelValue': [value: Portion[]]
}>()

const { update, push, pop } = useArrayUpdateModel(props.item.portions, emits, 'id')

const unitOptions = Object.values(Unit.units).map((unit) => ({
  key: unit,
  name: Unit.unitNames[unit].name,
}))

const getUnitValue = (unit: TUnit) => {
  return unitOptions.find((u) => u.key === unit.key)
}
</script>

<style lang="scss" scoped>
.portion {
}
</style>
