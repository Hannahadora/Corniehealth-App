<template>
  <span>
    <label class="block uppercase mb-1 text-xs font-bold">{{ label }}</label>
    <Field
      :name="inputName"
      v-slot="{ meta, handleChange, errorMessage }"
      :rules="rules"
      v-model="myValue"
      v-bind="$attrs"
    >
      <MultiSelect
        v-model="myValue"
        :options="filteredItems"
        optionLabel="name"
        @update:modelValue="handleChange"
        :placeholder="placeholder"
        style="width: 100%"
        :style="{
          borderColor: Boolean(!meta.dirty)
            ? ''
            : Boolean(errorMessage)
            ? '#EC0868'
            : '#35BA83',
        }"
        display="comma"
        :showToggleAll="false"
      >
        <template #value="slotProps">
          <div class="flex">
            <div
              class="country-item country-item-value flex items-center p-multiselect-car-token mx-1"
              v-for="(option, index) of slotProps.value"
              :key="index"
            >
              <ContactIcon
                v-if="isContact && (optionLabel ? option[optionLabel] : option)"
              />
              <div
                class="ml-2"
                :class="{ p2: !(optionLabel ? option[optionLabel] : option) }"
              >
                <span>{{ optionLabel ? option[optionLabel] : option }}</span>
              </div>
            </div>
            <span
              v-if="!slotProps.value || slotProps.value.length === 0"
              class="p-3 rounded"
            >
              {{ placeholder }}
            </span>
          </div>
        </template>
        <template #header="">
          <div :class="{ 'p-2': withFilter }">
            <input
              v-if="withFilter"
              autofocus
              v-model="filterText"
              class="rounded-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Search"
            />
          </div>
        </template>
        <template #option="slotProps">
          <div class="country-item flex items-center w-full">
            <ContactIcon v-if="isContact" />
            <div class="ml-2 w-full">
              <span class="flex justify-between">
                <span>{{
                  optionLabel ? slotProps.option[optionLabel] : slotProps.option
                }}</span>
                <span class="ml-3 text-current italic">{{
                  optionLabel ? slotProps.option[subText] : ""
                }}</span>
              </span>
            </div>
          </div>
        </template>
        <template #chip="slotProps">
          <div class="country-item flex items-center p-2">
            <div
              class="country-item country-item-value flex items-center p-multiselect-car-token mx-1"
              v-for="(option, index) of slotProps.value"
              :key="index"
            >
              <!-- <ContactIcon v-if="isContact && option" /> -->
              <div class="-2" :class="{ 'p-2': !option }">
                <span>{{ option }}</span>
              </div>
            </div>
          </div>
        </template>
        <template #emptyfilter="slotProps">
          <div class="country-item flex items-center p-2">
            {{ slotProps }}
          </div>
        </template>
      </MultiSelect>

      <span v-if="errorMessage" class="text-red-400">{{ errorMessage }}</span>
    </Field>
  </span>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MultiSelect from "primevue/multiselect";
import { Prop } from "vue-property-decorator";
import { Field } from "vee-validate";
import ContactIcon from "@/components/icons/contactinfo.vue";

@Options({
  name: "DateRangePicker",
  components: {
    MultiSelect,
    Field,
    ContactIcon,
  },
})
export default class MySelect extends Vue {
  myValue: any[] = [];
  showList = false;
  filterText = "";

  @Prop({ type: String, default: "" })
  label!: any;

  @Prop({ type: String, default: "" })
  optionLabel!: any;

  @Prop({ type: String, default: "" })
  subText!: any;

  @Prop({ type: String, default: "" })
  placeholder!: any;

  @Prop({ type: String, default: "" })
  name!: any;

  @Prop({ type: Array, default: [] })
  items!: any;

  @Prop({ type: Boolean, default: false })
  isContact!: boolean;

  @Prop({ type: Boolean, default: false })
  withFilter!: boolean;

  @Prop()
  rules: any;

  get inputName() {
    const id = Math.random().toString(36).substring(2, 9);
    return this.name || `input-${id}`;
  }

  get filteredItems() {
    if (this.items.length <= 0) return [];
    if (!this.filterText) return this.items;

    return this.items.filter((i: any) => {
      return this.optionLabel
        ? i[this.optionLabel] &&
            i[this.optionLabel]
              .toLowerCase()
              .includes(this.filterText.toLowerCase())
        : i &&
            i.toString().toLowerCase().includes(this.filterText.toLowerCase());
    });
  }

  toggleDropdown(): void {
    this.showList = !this.showList;
  }
}
</script>

<style scoped>
.p-multiselect-header {
  display: none !important;
}
</style>
