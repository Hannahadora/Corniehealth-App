<template>
  <cornie-input> </cornie-input>
  <v-date-picker
    v-model="date"
    mode="time"
    color="red"
    :model-config="{
      type: 'string',
      mask: '00:00',
    }"
    style="width: 100%"
  />
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { DatePicker as VDatePicker } from "v-calendar";
import CornieInput from "./cornieinput.vue";
import CornieMenu from "./newcorniemenu.vue";
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
  date = new Date();
}
</script>

<style></style>
