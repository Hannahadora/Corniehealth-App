<template>
  <div class="block w-full mt-4">
    <span
      class="flex capitalize mb-1 text-black text-sm font-semibold items-center"
    >
      {{ label }}
      <info-icon class="fill-current ml-2 text-primary" />
    </span>
    <div class="grid grid-cols-4 gap-4 mt-4 w-1/2">
      <cornie-radio :name="name" v-model="type" value="age" label="Age"  @click="setType(type)"/>
       <cornie-radio :name="name" v-model="type" label="Range" value="range" @click="setType(type)"/>
      <cornie-radio :name="name" v-model="type" value="string" label="Year" @click="setType(type)"/>
    </div>
     <div class="grid grid-cols-2 gap-4 mt-4" v-if="type == 'age'">
       <div class="w-full -mt-1">
          <span class="text-sm font-semibold mb-3">Age</span>
          <div class="flex space-x-2 w-full">
              <cornie-input
              placeholder="0"
              class="grow w-full"
              :setfull="true"
              v-model="newtimeable.ageValue"
              />
              <cornie-select
                :items="['days', 'months', 'years']"
                placeholder="Days"
                class="w-32 mt-0.5 flex-none"
                :setPrimary="true"
                v-model="newtimeable.ageUnit"
              />
          </div>
       </div>
    </div>
    <!-- <div class="grid grid-cols-2 gap-4 mt-5 w-full">
      <date-time-picker
        v-model:date="newtimeable.startDate"
        v-model:time="newtimeable.startTime"
        label="Start Date/Time"
        v-if="type == 'period'"
        width="w-11/12"
      />
      <date-time-picker
        v-model:date="newtimeable.endDate"
        v-model:time="newtimeable.endTime"
        label="End Date/Time"
        v-if="type == 'period'"
        width="w-11/12"
      />
    </div> -->
     <div class="grid grid-cols-3 gap-3 mt-4 w-full" v-if="type == 'range'">
       <div class="w-full -mt-1">
          <span class="text-sm font-semibold mb-3">Range (min)</span>
          <div class="flex space-x-2 w-full">
              <cornie-input
              placeholder="0"
              class="grow w-full"
              :setfull="true"
              v-model="timeable.minValue"
              />
              <cornie-select
                 :items="['days', 'months', 'years']"
                placeholder="Days"
                class="w-32 mt-0.5 flex-none"
                :setPrimary="true"
                v-model="newtimeable.minUnit"
              />
          </div>
       </div>
       <div class="w-full -mt-1">
          <span class="text-sm font-semibold mb-3">Range (max)</span>
          <div class="flex space-x-2 w-full">
              <cornie-input
              placeholder="0"
              class="grow w-full"
              :setfull="true"
              v-model="newtimeable.minValue"
              />
              <cornie-select
                 :items="['days', 'months', 'years']"
                placeholder="Days"
                class="w-32 mt-0.5 flex-none"
                :setPrimary="true"
                v-model="newtimeable.minUnit"
              />
          </div>
       </div>
    </div>
    <div class="grid grid-cols-2 gap-3 mt-1" v-if="type == 'string'">
      <cornie-input label="Year" v-model="newtimeable.string" />
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
import CornieSelect from "@/components/cornieselect.vue";

const timeable = {
  age: "",
  day:"",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  date: "",
  time: "",
  unit: "",
  min: "",
  max: "",
  ageValue: "",
  ageUnit:"",
  string: "",
  minUnit: "",
  minValue: "",
  maxUnit : "",
  maxValue: "",
};

@Options({
  name: "TimeablePicker",
  components: {
    CornieRadio,
    CornieInput,
    DateTimePicker,
    CornieTooltip,
    InfoIcon,
    CornieSelect,
  },
})
export default class TimeablePicker extends Vue {
  @Prop({ type: Object, default: timeable })
  modelValue!: ITimeable;

  @Prop({ type: String })
  label!: string;

  @PropSync("modelValue", { default: timeable })
  timeable!: ITimeable;

  type = "age";

setType(type:string) {
   if(type) return this.timeable = {};

  }
  newtimeable = {
  age: "",
  day:"",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  date: "",
  time: "",
  unit: "years",
  min: "",
  max: "",
  ageValue: "",
  ageUnit:"years",
  string: "",
  minUnit: "years",
  minValue: "",
  maxUnit : "years",
  maxValue: "",
};


  // mounted() {
  //   this.setType();
  // }

  // @Watch("timeable", { deep: true })
  // timeChanged() {
  //   this.setType();
  // }

  created() {
    if (!this.timeable) this.timeable = timeable as any;
  }

  get name() {
    const id = Math.random().toString(36).substring(2, 9);
    return `timeable-${id}`;
  }
}
</script>
