<template>
  <cornie-menu left="0" right="0">
    <template #activator="{ on }">
      <cornie-input
        readonly
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
import CornieInput from "./CornieInput.vue";
import CornieMenu from "./CornieMenu.vue";
import CalendarIcon from "./icons/calendar.vue";

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
  date = "";
}
</script>

<style>
</style>