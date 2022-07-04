<template>
  <div>
    <date-picker v-bind="$attrs" v-model="dateSync">
      <template #time>
        <span>
          <input
            type="time"
            class="outline-none focus:outline-none"
            v-model="timeSync"
            :readonly="disabled"
          />
        </span>
      </template>
    </date-picker>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DatePicker from "@/components/datepicker.vue";
import { Prop, PropSync } from "vue-property-decorator";

@Options({
  name: "DateTimePicker",
  inheritAttrs: false,
  components: {
    DatePicker,
  },
})
export default class DateTimePicker extends Vue {
  @Prop({ type: String, default: "" })
  date!: string;

  @Prop({ type: String, default: "00:00" })
  time!: string;

  @PropSync("date")
  dateSync!: string;

  @PropSync("time")
  timeSync!: string;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;
}
</script>
<style scoped>
input[type="time"] {
  position: relative;
}

input[type="time"]::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  color: transparent;
  background: transparent;
}
</style>
