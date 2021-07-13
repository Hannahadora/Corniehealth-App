<template>
  <div class="grid grid-cols-1 gap-y-6 w-full">
    <label class="flex items-center">
      <input type="checkbox" class="mr-3" v-model="all" />
      All days
    </label>
    <div class="grid day-grid w-full" v-for="(opHour, i) in opHours" :key="i">
      <label class="flex items-center">
        <input v-model="opHour.selected" type="checkbox" class="mr-3" />
        {{ opHour.day }}:
      </label>
      <div class="flex items-center">
        <span class="flex">
          <cornie-select
            v-model="opHour.openTime.time"
            :items="['8:00']"
            class="w-24 mr-1"
          />
          <cornie-select
            v-model="opHour.openTime.period"
            :items="['AM', 'PM']"
            class="w-24 -ml-1 font-bold"
          />
        </span>
        <span class="mr-3">to</span>
        <span class="flex">
          <cornie-select
            v-model="opHour.closeTime.time"
            :items="['8:00', '5:00']"
            class="w-24 mr-1"
          />
          <cornie-select
            v-model="opHour.closeTime.period"
            :items="['AM', 'PM']"
            class="w-24 -ml-1 font-bold"
          />
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { Prop, Watch } from "vue-property-decorator";
import { HoursOfOperation } from "@/types/ILocation";
import ObjectSet from "@/lib/objectset";
import { Field } from "vee-validate";

const isEqual = require("lodash").isEqual;

const opHours = [
  {
    selected: true,
    day: "Monday",
    openTime: { time: "8:00", period: "AM" },
    closeTime: { time: "5:00", period: "PM" },
  },
  {
    selected: true,
    day: "Tuesday",
    openTime: { time: "8:00", period: "AM" },
    closeTime: { time: "5:00", period: "PM" },
  },
  {
    selected: true,
    day: "Wednesday",
    openTime: { time: "8:00", period: "AM" },
    closeTime: { time: "5:00", period: "PM" },
  },
  {
    selected: true,
    day: "Thursday",
    openTime: { time: "8:00", period: "AM" },
    closeTime: { time: "5:00", period: "PM" },
  },
  {
    selected: true,
    day: "Friday",
    openTime: { time: "8:00", period: "AM" },
    closeTime: { time: "5:00", period: "PM" },
  },
  {
    selected: true,
    day: "Saturday",
    openTime: { time: "8:00", period: "AM" },
    closeTime: { time: "5:00", period: "PM" },
  },
  {
    selected: true,
    day: "Sunday",
    openTime: { time: "8:00", period: "AM" },
    closeTime: { time: "5:00", period: "PM" },
  },
];

@Options({
  name: "HoursOfOperation",
  components: {
    CornieInput,
    CornieSelect,
    Field,
  },
})
export default class OperationHours extends Vue {
  @Prop({ type: Array, default: [] })
  modelValue!: HoursOfOperation[];

  opHours = opHours;

  all = true;

  buildTime({ time, period }: any) {
    return `${time} ${period}`;
  }

  splitTime(time: string) {
    let periodIndex = time.toUpperCase().indexOf("PM");
    if (periodIndex < 0) periodIndex = time.toUpperCase().indexOf("AM");
    return {
      time: time.substring(0, periodIndex).trim(),
      period: time.substring(periodIndex),
    };
  }

  mapOpHours() {
    const selectedDays = this.opHours.filter((opHour) => opHour.selected);
    return selectedDays.map((opHour) => {
      return {
        day: opHour.day,
        openTime: this.buildTime(opHour.openTime),
        closeTime: this.buildTime(opHour.closeTime),
      };
    });
  }

  setOpHours() {
    const operationHours = this.modelValue.map((opHour) => {
      return {
        day: opHour.day,
        openTime: this.splitTime(opHour.openTime),
        closeTime: this.splitTime(opHour.closeTime),
        selected: true,
      };
    });
    const allHours = new ObjectSet([...opHours, ...operationHours], "day");
    if (isEqual([...allHours], [...this.opHours])) return;
    this.opHours = [...allHours];
  }

  @Watch("opHours", { deep: true })
  hourChanged() {
    this.markAll();
    const opHours = this.mapOpHours();
    console.log("IS equal?", this.modelValue);
    if (isEqual([...opHours], [...this.modelValue])) {
      console.log("Equal");
      return;
    }
    this.$emit("update:modelValue", opHours);
  }

  markAll() {
    let all = true;
    this.opHours.forEach((val) => {
      if (!val.selected) {
        all = false;
      }
    });
    this.all = all;
  }

  @Watch("all")
  allMarked(all: boolean) {
    if (!all) return;
    this.opHours = this.opHours.map((opHour) => {
      return {
        ...opHour,
        selected: true,
      };
    });
  }

  @Watch("modelValue", { deep: true })
  propChanged(cur: any[], prev: any[]) {
    if (!isEqual(cur, prev)) {
      this.setOpHours();
      console.log("not equal");
    }
  }

  created() {
    this.setOpHours();
  }
}
</script>
<style scoped>
.day-grid {
  grid-template-columns: 20% 75%;
}
</style>
