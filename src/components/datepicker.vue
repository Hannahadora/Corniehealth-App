<template>
  <span class="block w-11/12">
    <label class="block uppercase mb-1 text-xs font-bold">{{ label }}</label>
    <Field
      v-model="date"
      :rules="customRules"
      :name="inputName"
      v-slot="{ meta, handleChange, errorMessage }"
    >
      <div class="relative" style="width: 100%" :id="inputName">
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
              px-2
              z-50
              py-1
              bg-white
              text-sm
              font-medium
              text-gray-700
              hover:bg-gray-50
              focus:outline-none
            "
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
          v-if="visible"
          class="
            origin-top-right
            absolute
            right-0
            mt-2
            w-full
            rounded-md
            shadow-lg
            bg-white
            ring-1 ring-black ring-opacity-5
            divide-y divide-gray-100
            focus:outline-none
          "
          role="menu"
          aria-orientation="vertical"
          tabindex="-1"
        >
          <v-date-picker
            @update:modelValue="handleChange"
            v-model="date"
            mode="date"
            color="red"
            :model-config="{
              type: 'string',
              mask: 'DD/MM/YYYY',
            }"
            style="width: 100%"
          />
        </div>
        <span v-if="errorMessage" class="text-red-400 text-xs">{{
          errorMessage
        }}</span>
      </div>
    </Field>
  </span>
</template>
<script lang="ts">
import { DatePicker as VDatePicker } from "v-calendar";
import { Options, Vue } from "vue-class-component";
import CalendarIcon from "@/components/icons/calendar.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { Field } from "vee-validate";
import { clickOutside, createDate } from "@/plugins/utils";
import { date } from "yup";
@Options({
  name: "DatePicker",
  inheritAttrs: false,
  components: {
    VDatePicker,
    CalendarIcon,
    Field,
  },
})
export default class DatePicker extends Vue {
  @Prop({
    required: false,
    type: String,
    default: new Date(Date.now()).toLocaleDateString("en-NG"),
  })
  modelValue!: string;

  @PropSync("modelValue")
  date!: string;

  @Prop({ type: Object })
  rules!: any;

  visible = false;

  toggleDropdown(): void {
    this.visible = !this.visible;
  }

  get customRules() {
    const defaultRule = date();
    if (this.rules) return defaultRule.concat(this.rules);
    return defaultRule;
  }

  @Watch("date")
  changed() {
    this.visible = false;
  }

  get inputFieldText() {
    return this.date || "dd/mm/yyyy";
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
    clickOutside(this.inputName, () => (this.visible = false));
  }
}
</script>
