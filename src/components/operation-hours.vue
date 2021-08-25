<template>
  <div
    class="grid grid-cols-1 gap-y-6 w-full"
    :validateOnBlur="false"
    :validateOnChange="false"
    :validateOnInput="false"
  >
    <label class="flex items-center">
      <input type="checkbox" class="mr-3" v-model="all" />
      All days
    </label>
    <div class="grid day-grid w-full" v-for="(opHour, i) in value" :key="i">
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
            @change="changed"
            v-model="opHour.openTime.time"
            :items="['8:00']"
            class="w-24 mr-1"
          />
          <cornie-select
            @change="changed"
            v-model="opHour.openTime.period"
            :items="['AM', 'PM']"
            class="w-24 -ml-1 font-bold"
          />
        </span>
        <span class="mr-3">to</span>
        <span class="flex">
          <cornie-select
            @change="changed"
            v-model="opHour.closeTime.time"
            :items="['8:00', '5:00']"
            class="w-24 mr-1"
          />
          <cornie-select
            @change="changed"
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

import { debounce, isEmpty, isEqual, xorWith } from "lodash";

const isArrayEqual = (x: any[], y: any[]) => {
  const first = JSON.parse(JSON.stringify(x));
  const second = JSON.parse(JSON.stringify(y));
  return isEmpty(xorWith(first, second, isEqual));
};

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

type ActiveTime = { time: string; period: string };
type OpHour = {
  selected: boolean;
  day: string;
  openTime: ActiveTime;
  closeTime: ActiveTime;
};

@Options({
  name: "HoursOfOperation",
  components: {
    CornieInput,
    CornieSelect,
  },
})
export default class OperationHours extends Vue {
  @Prop({ type: Array, default: opHours })
  modelValue!: HoursOfOperation[];

  all = true;

  buildTime({ time, period }: any) {
    return `${time} ${period}`;
  }

  get value() {
    const operationHours = this.modelValue.map((opHour) => {
      return {
        day: opHour.day,
        openTime: this.splitTime(opHour.openTime),
        closeTime: this.splitTime(opHour.closeTime),
        selected: true,
      };
    });
    const allHours = new ObjectSet([...opHours, ...operationHours], "day");
    return [...allHours];
  }

  set value(value: OpHour[]) {
    const opHours = this.mapOpHours(value);
    if (isArrayEqual(opHours, this.modelValue)) return;
    this.emitUpdate(opHours);
  }

  emitUpdate!: (value: any) => void;

  splitTime(time: string) {
    let periodIndex = time.toUpperCase().indexOf("PM");
    if (periodIndex < 0) periodIndex = time.toUpperCase().indexOf("AM");
    return {
      time: time.substring(0, periodIndex).trim(),
      period: time.substring(periodIndex),
    };
  }

  mapOpHours(opHours: OpHour[]) {
    const selectedDays = opHours.filter((opHour) => opHour.selected);
    return selectedDays.map((opHour) => {
      return {
        day: opHour.day,
        openTime: this.buildTime(opHour.openTime),
        closeTime: this.buildTime(opHour.closeTime),
      };
    });
  }

  changed() {
    /**
     * this function is needed because computed property setters
     * are not called when a nested property changes,
     * this assignment here triggers the computed property setter
     * */
    this.value = [...this.value];
  }

  @Watch("all")
  allMarked(all: boolean) {
    if (!all) return;
    this.value = opHours.map((opHour) => {
      return {
        ...opHour,
        selected: true,
      };
    });
  }

  created() {
    this.emitUpdate = debounce((val: any) => {
      this.$emit("update:modelValue", val);
    }, 20);
  }
}
</script>
<style scoped>
.day-grid {
  grid-template-columns: 20% 75%;
}
</style>
