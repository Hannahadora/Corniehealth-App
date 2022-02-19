<template>
  <div class="grid grid-cols-1 mt-4 gap-y-6 w-full">
    <label class="flex items-center">
      <input type="checkbox" class="mr-3 cursor-pointer" v-model="all" />
      All days
    </label>
    <div class="grid day-grid gap-4 w-full">
      <span class="font-bold block"></span>
      <span class="font-bold uppercase text-sm">
        <span>Start Time</span>
        <span class="ml-14">End Time</span>
      </span>
    </div>
    <div
      class="grid grid-cols-3 gap-4 w-full"
      v-for="(opHour, i) in operationHours"
      :key="i"
    >
      <label class="flex items-center">
        <input
          @change="changed"
          v-model="opHour.selected"
          type="checkbox"
          class="mr-3 cursor-pointer"
        />
        {{ opHour.day }}:
      </label>

      <div class="flex items-center">
        <div class="flex">
          <cornie-select
            @update:modelValue="changed"
            v-model="opHour.openTime"
            :items="wholeDay"
            class="w-24 mr-1"
          />
          <cornie-select
            @update:modelValue="changed"
            v-model="opHour.openAmpm"
            :items="['AM', 'PM']"
            class="w-24 mr-1"
          />
        </div>
        <div class="mx-3 -mt-5">to</div>
        <div class="flex">
          <cornie-select
            @update:modelValue="changed"
            v-model="opHour.closeTime"
            :items="wholeDay"
            class="w-24 mr-1"
          />
          <cornie-select
            @update:modelValue="changed"
            v-model="opHour.closeAmpm"
            :items="['AM', 'PM']"
            class="w-24"
          />
        </div>
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
import { Field } from "vee-validate";

const opHours = [
  {
    selected: true,
    day: "Monday",
    openTime: "08:00",
    openAmpm: "AM",
    closeTime: "09:00",
    closeAmpm: "PM",
  },
  {
    selected: true,
    day: "Tuesday",
    openTime: "08:00",
    openAmpm: "AM",
    closeTime: "09:00",
    closeAmpm: "PM",
  },
  {
    selected: true,
    day: "Wednesday",
    openTime: "08:00",
    openAmpm: "AM",
    closeTime: "09:00",
    closeAmpm: "PM",
  },
  {
    selected: true,
    day: "Thursday",
    openTime: "08:00",
    openAmpm: "AM",
    closeTime: "09:00",
    closeAmpm: "PM",
  },
  {
    selected: true,
    day: "Friday",
    openTime: "08:00",
    openAmpm: "AM",
    closeTime: "09:00",
    closeAmpm: "PM",
  },
  {
    selected: true,
    day: "Saturday",
    openTime: "07:00",
    openAmpm: "AM",
    closeTime: "06:00",
    closeAmpm: "PM",
  },
  {
    selected: true,
    day: "Sunday",
    openTime: "07:00",
    openAmpm: "AM",
    closeTime: "06:00",
    closeAmpm: "PM",
  },
];

const pad = (x: number) => {
  if (x < 10) return `0${x}00`;
  return `${x}00`;
};
const splitTime = (time: string) => {
  const hour = time.slice(0, 2);
  const minutes = time.slice(2, 4);
  return `${hour}:${minutes}`;
};

const workHours = Array.from(Array(12), (_, x) => splitTime(pad(x)));
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
  grid-template-columns: 34% 75%;
}
</style>
