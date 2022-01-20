<template>
  <cornie-menu left="0" right="0">
    <template #activator="{ on }">
      <cornie-input
        readonly
        class="py-2"
        v-bind="$attrs"
        v-on="on"
        placeholder="_ _ /_ _ /_ _ _ _"
        v-model="date"
      >
        <template #prepend-inner>
          <calendar-icon />
        </template>
      </cornie-input>
    </template>
    <v-date-picker
      v-model="date"
      mode="date"
      class="py-2"
      color="red"
      :model-config="{
        type: 'string',
        mask: 'DD/MM/YYYY',
      }"
      style="width: 100%"
    />
  </cornie-menu>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { DatePicker as VDatePicker } from "v-calendar";
import CornieInput from "./cornieinput.vue";
import { clickOutside, createDate } from "@/plugins/utils";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieMenu from "./newcorniemenu.vue";
import CalendarIcon from "./icons/calendar.vue";
import Period from "@/types/IPeriod";

@Options({
  name: "cornie-date-picker",
  inheritAttrs: false,
  components: {
    CornieInput,
    CornieMenu,
    CalendarIcon,
    VDatePicker,
  },
})
export default class CornieDatePicker extends Vue {
  @Prop({ type: String, default: { start: null, end: null } })
  modelValue!: String;

  @PropSync("modelValue")
  date!: String;
}
</script>

<style></style>
