<template>
  <div class="block w-full mt-4">
    <span
      class="flex capitalize mb-1 text-black text-sm font-semibold items-center"
    >
      {{ label }}
      <info-icon class="fill-current ml-2 text-primary hidden" />
    </span>
    <div class="grid grid-cols-3 gap-4 mt-4 w-1/2">
      <cornie-radio :name="name" v-model="type" value="period" label="Period" />
      <cornie-radio
        :name="name"
        v-model="type"
        label="Date/Time"
        value="date-time"
      />
      <cornie-radio :name="name" v-model="type" value="age" label="Year" />
    </div>
    <div class="grid grid-cols-2 gap-4 mt-3 w-full">
      <date-time-picker
        v-model:date="timeable.date"
        v-model:time="timeable.time"
        label="Date/Time"
        class="w-full"
        v-if="type == 'date-time'"
      />
      <cornie-input
        v-model="timeable.age"
        v-if="type == 'age'"
        label="Year"
        class="w-full"
        placeholder="year"
      />
      <date-time-picker
        v-model:date="timeable.startDate"
        v-model:time="timeable.startTime"
        label="Start Date/Time"
        v-if="type == 'period'"
         class="w-full"
      />
      <date-time-picker
        v-model:date="timeable.endDate"
        v-model:time="timeable.endTime"
        label="End Date/Time"
        v-if="type == 'period'"
        class="w-full"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieRadio from "@/components/cornieradio.vue";
import CornieInput from "@/components/cornieinput.vue";
import DateTimePicker from "./date-time-picker.vue";
import CornieTooltip from "@/components/CornieTooltip.vue";
import InfoIcon from "@/components/icons/info.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { ITimeable } from "@/types/ITimeable";

const timeable = {
  age: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  date: "",
  time: "",
};

@Options({
  name: "TimeablePicker",
  components: {
    CornieRadio,
    CornieInput,
    DateTimePicker,
    CornieTooltip,
    InfoIcon,
  },
})
export default class TimeablePicker extends Vue {
  @Prop({ type: Object, default: timeable })
  modelValue!: ITimeable;

  @Prop({ type: String })
  label!: string;

  @PropSync("modelValue", { default: timeable })
  timeable!: ITimeable;

  type: "age" | "period" | "date-time" = "age";

  setType() {
    const timeable = this.timeable;
    if (timeable.date || timeable.time) this.type = "date-time";
    else if (timeable.startDate || timeable.endDate) this.type = "period";
    else this.type = "age";
  }

  mounted() {
    this.setType();
  }

  @Watch("timeable", { deep: true })
  timeChanged() {
    this.setType();
  }

  created() {
    if (!this.timeable) this.timeable = timeable;
  }

  get name() {
    const id = Math.random().toString(36).substring(2, 9);
    return `timeable-${id}`;
  }
}
</script>
