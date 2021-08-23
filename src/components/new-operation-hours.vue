<template>
  <div class="grid grid-cols-1 mt-4 gap-y-6 w-full">
    <label class="flex items-center">
      <input type="checkbox" class="mr-3" v-model="all" />
      All days
    </label>
    <div class="day-grid grid w-full">
      <span class="font-bold block"></span>
      <span class="font-bold uppercase text-sm">
        <span>Start Time</span>
        <span class="ml-14">End Time</span>
      </span>
    </div>
    <div class="grid day-grid w-full" v-for="(opHour, i) in opHours" :key="i">
      <label class="flex items-center">
        <input
          @change="changed"
          v-model="opHour.selected"
          type="checkbox"
          class="mr-3"
        />
        {{ opHour.day }}:
      </label>

      <div class="flex items-center">
        <span class="flex">
          <cornie-select
            @update:modelValue="changed"
            v-model="opHour.openTime"
            :items="wholeDay"
            class="w-24 mr-1"
          />
        </span>
        <span class="mr-3">to</span>
        <span class="flex">
          <cornie-select
            @update:modelValue="changed"
            v-model="opHour.closeTime"
            :items="wholeDay"
            class="w-24 mr-1"
          />
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/CornieInput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { Prop, Watch } from "vue-property-decorator";
import { HoursOfOperation } from "@/types/ILocation";
import { Field } from "vee-validate";

const opHours = [
  {
    selected: true,
    day: "Monday",
    openTime: "08:00",
    closeTime: "16:00",
  },
  {
    selected: true,
    day: "Tuesday",
    openTime: "08:00",
    closeTime: "16:00",
  },
  {
    selected: true,
    day: "Wednesday",
    openTime: "08:00",
    closeTime: "16:00",
  },
  {
    selected: true,
    day: "Thursday",
    openTime: "08:00",
    closeTime: "16:00",
  },
  {
    selected: true,
    day: "Friday",
    openTime: "08:00",
    closeTime: "16:00",
  },
  {
    selected: true,
    day: "Saturday",
    openTime: "08:00",
    closeTime: "16:00",
  },
  {
    selected: true,
    day: "Sunday",
    openTime: "08:00",
    closeTime: "16:00",
  },
];

const pad = (x: number) => {
  if (x < 10) return `0${x}00`;
  return `${x}000`;
};
const splitTime = (time: string) => {
  const hour = time.slice(0, 2);
  const minutes = time.slice(2, 4);
  return `${hour}:${minutes}`;
};

const workHours = Array.from(Array(24), (_, x) => splitTime(pad(x)));
@Options({
  name: "HoursOfOperation",
  components: {
    CornieInput,
    CornieSelect,
    Field,
  },
})
export default class OperationHours extends Vue {
  @Prop({ type: Array, default: opHours })
  modelValue!: HoursOfOperation[];

  opHours = opHours;

  all = true;

  get operationHours() {
    return this.modelValue;
  }
  set operationHours(val: HoursOfOperation[]) {
    this.$emit("update:modelValue", val);
  }

  changed() {
    this.operationHours = this.operationHours;
  }
  @Watch("all")
  allWeek(all: boolean) {
    if (!all) return;
    const opHours = [...this.operationHours].map((opHour) => ({
      ...opHour,
      selected: true,
    }));
    this.operationHours = opHours;
  }

  wholeDay = workHours;

  created() {
    if (!this.modelValue || this.modelValue.length < 1)
      this.operationHours = opHours;
  }
}
</script>
<style scoped>
.day-grid {
  grid-template-columns: 20% 75%;
}
</style>
