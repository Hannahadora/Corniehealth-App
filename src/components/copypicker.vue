<template>
  <span class="" :class="[$attrs.width || 'w-full']">
    <label class="flex capitalize mb-1 text-black text-sm font-semibold">
      {{ label }}
    </label>
    <Field
      v-model="date"
      :rules="customRules"
      :name="inputName"
      v-slot="{ meta, handleChange, errorMessage }"
    >
      <div class="relative" style="width: 100%" :id="inputName">
        <div
          @click="
            () => {
              if (!$slots.time) toggleDropdown;
            }
          "
          class="block w-full"
        >
          <cornie-input
            class="w-full"
            readonly
            :errorClasses="{
              'border-red-500': Boolean(errorMessage),
              'border-green-400': Boolean(meta.valid),
            }"
            v-model="inputFieldText"
          >
            <template #append-inner>
              <calendar-icon class="cursor-pointer" @click="toggleDropdown" />
            </template>
            <template #prepend-inner>
              <slot name="text" />
            </template>
          </cornie-input>
        </div>
        <div
          v-if="visible"
          :class="{ 'right-0 min-w-max': right, 'left-0 min-w-max': left }"
          class="
            origin-top-right
            absolute
            mt-2
            w-full
            rounded-md
            shadow-lg
            bg-white
            z-20
            ring-1 ring-black ring-opacity-5
            divide-y divide-gray-100
            focus:outline-none
          "
          role="menu"
          aria-orientation="vertical"
          tabindex="-1"
          style="z-index: 999"
        >
          <input type="number" class="form-control col-sm-6 numberinput" id="current-year" v-model="currentYear"  @update:modelValue="handleChange"/>
          <!-- <v-date-picker
            @update:modelValue="handleChange"
            v-model="date"
            mode="date"
            type="year"
            color="red"
            :model-config="{
              type: 'string',
              mask: 'YYYY',
            }"
            style="width: 100%"
          /> -->
        </div>
        <span v-if="errorMessage" class="text-red-400 text-xs">
          {{ errorMessage }}
        </span>
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
import CornieInput from "./cornieinput.vue";

@Options({
  name: "DatePicker",
  inheritAttrs: false,
  components: {
    VDatePicker,
    CalendarIcon,
    CornieInput,
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

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: Boolean, default: false })
  left!: boolean;

  @Prop({ type: Boolean, default: false })
  right!: boolean;

  visible = false;
 currentYear = new Date().getFullYear();
  toggleDropdown(): void {
    if (this.disabled) return;
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
    if (!this.date) return "yyyy";
    return this.date;
  }

  @Prop({ type: String, default: "" })
  name: any;

  @Prop({ type: String, default: "" })
  label: any;

  get inputName() {
  //  const id = Math.random().toString(36).substring(2, 9);
    return this.name;
  }

  mounted() {
    clickOutside(this.inputName, () => (this.visible = false));
  }
}
</script>
<style scoped>
.numberinput{
    padding: 10px;
    width: 100%;
    float: right;
}
.p-2.rounded-lg.w-full {
margin-left: 40px !important;
}
</style>
