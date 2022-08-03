<template>
  <span>
    <label class="block uppercase mb-1 text-xs font-semibold">{{
      label
    }}</label>
    <icon-input
      type="date"
      width="w-11/12"
      class="rounded-lg border p-2 focus:outline-none"
      v-model="valueSync"
    >
      <template v-slot:prepend> <calendar-icon class="text-danger fill-current" /> </template>
    </icon-input>
  </span>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IconInput from "@/components/IconInput.vue";
import CalendarIcon from "@/components/icons/calendar.vue";
import { Prop, PropSync } from "vue-property-decorator";

@Options({
  components: {
    IconInput,
    CalendarIcon,
  },
})
export default class DatePicker extends Vue {
  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  valueSync!: string;

  @Prop({ type: Array, default: [] })
  items!: any;

  @Prop({ type: String, default: "" })
  label!: string;
}
</script>
<style>
input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
  color: transparent;
  background: transparent;
}
</style>
