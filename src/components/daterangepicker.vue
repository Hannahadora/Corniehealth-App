<template>
  <span class="block w-11/12">
    <label class="block uppercase mb-1 text-xs font-bold">{{ label }}</label>
    <Field :name="inputName" v-slot="{ meta, handleChange, errorMessage }">
      <div class="relative" :id="inputName" style="width: 100%">
        <div @click="toggleDropdown">
          <button
            type="button"
            class="
              flex
              items-center
              w-full
              rounded-md
              border border-gray-300
              shadow-sm
              p-1
              bg-white
              text-sm
              font-medium
              text-gray-700
              hover:bg-gray-50
              focus:outline-none
            "
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            :class="{
              'border-red-500': Boolean(errorMessage),
              'border-green-400': Boolean(meta.valid),
            }"
          >
            <CalendarIcon />
            <span class="ml-2.5">{{ inputFieldText }}</span>
          </button>
        </div>

        <div
          v-if="datePickerVissible"
          class="
            origin-top-right
            absolute
            right-0
            mt-2
            w-full
            rounded-md
            z-50
            shadow-lg
            bg-white
            ring-1 ring-black ring-opacity-5
            divide-y divide-gray-100
            focus:outline-none
          "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <span>
            <DatePicker
              @update:modelValue="handleChange"
              style="width: 100%"
              mode="date"
              v-model="range"
              is-range
              color="red"
            >
            </DatePicker>
          </span>
        </div>
        <span v-if="errorMessage" class="text-red-400">{{ errorMessage }}</span>
      </div>
    </Field>
  </span>
</template>
<script lang="ts">
import { DatePicker } from "v-calendar";
import { Options, Vue } from "vue-class-component";
import CalendarIcon from "@/components/icons/calendar.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { Field } from "vee-validate";
import Period from "@/types/IPeriod";
import { clickOutside } from "@/plugins/utils";

@Options({
  name: "DateRangePicker",
  components: {
    DatePicker,
    CalendarIcon,
    Field,
  },
})
export default class DRangePicker extends Vue {
  @Prop({ type: Object, default: { start: null, end: null } })
  modelValue!: Period;

  @PropSync("modelValue")
  range!: Period;

  datePickerVissible = false;

  toggleDropdown(): void {
    this.datePickerVissible = !this.datePickerVissible;
  }

  get inputFieldText() {
    if (!this.range?.start) return `------ → -------`;
    const end = this.range.end
      ? new Date(this.range.end).toLocaleDateString("en-NG")
      : "";
    const start = new Date(this.range.start).toLocaleDateString("en-NG") || "";
    return `${start} → ${end}`;
  }

  @Prop({ type: String, default: "" })
  name: any;

  @Prop({ type: String, default: "" })
  label: any;

  get inputName() {
    const id = Math.random().toString(36).substring(2, 9);
    return this.name || `input-${id}`;
  }

  mounted() {
    clickOutside(this.inputName, () => (this.datePickerVissible = false));
  }
}
</script>
