<template>
  <div class="block w-full mt-4">
    <span
      class="flex capitalize mb-1 text-black text-sm font-semibold items-center"
    >
      {{ label }}
      <info-icon class="fill-current ml-2 text-primary" />
    </span>
    <div class="grid grid-cols-5 gap-4 mt-4 w-full">
      <cornie-radio
        :name="name"
        v-model="type"
        value="date"
        label="Date/Time"
        @click="setType(type)"
      />
      <cornie-radio :name="name" v-model="type" @click="setType(type)" label="Age" value="age" />
      <cornie-radio :name="name" v-model="type" @click="setType(type)" value="period" label="Period" />
      <cornie-radio :name="name" v-model="type" @click="setType(type)" value="range" label="Range" />
      <cornie-radio :name="name" v-model="type" @click="setType(type)" value="string" label="String" />
    </div>
    <div class="grid grid-cols-2 gap-4 mt-5 w-full" v-if="type == 'date'">
      <date-time-picker
        v-model:date="measurable.date"
        v-model:time="measurable.time"
        label="Date/Time"
        width="w-11/12"
      />
    </div>
    <div class="grid grid-cols-2 gap-4 mt-4" v-if="type == 'age'">
      <div class="w-full -mt-1">
        <span class="text-sm font-semibold mb-3">Age</span>
        <div class="flex space-x-2 w-full">
          <cornie-input
            placeholder="0"
            class="grow w-full"
            :setfull="true"
            v-model="measurable.age"
          />
          <cornie-select
            :items="['Days', 'Months', 'Years']"
            placeholder="Days"
            class="w-32 mt-0.5 flex-none"
            :setPrimary="true"
            v-model="measurable.ageUnit"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 mt-5 w-full" v-if="type == 'period'">
      <date-time-picker
        v-model:date="measurable.startDate"
        v-model:time="measurable.startTime"
        label="Start Date/Time"
        width="w-11/12"
      />
      <date-time-picker
        v-model:date="measurable.endDate"
        v-model:time="measurable.endTime"
        label="End Date/Time"
        width="w-11/12"
      />
    </div>
    <div class="grid grid-cols-3 gap-3 mt-4 w-full" v-if="type == 'range'">
      <div class="w-full -mt-1">
        <span class="text-sm font-semibold mb-3">Range (min)</span>
        <div class="flex space-x-2 w-full">
          <cornie-input
            placeholder="0"
            class="grow w-full"
            :setfull="true"
            v-model="measurable.min"
          />
          <cornie-select
            :items="['Days', 'Months', 'Years']"
            placeholder="Days"
            class="w-32 mt-0.5 flex-none"
            :setPrimary="true"
            v-model="measurable.minUnit"
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
            v-model="measurable.max"
          />
          <cornie-select
            :items="['Days', 'Months', 'Years']"
            placeholder="Days"
            class="w-32 mt-0.5 flex-none"
            :setPrimary="true"
      
            v-model="measurable.maxUnit"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-3 mt-1" v-if="type == 'string'">
      <cornie-input label="Year" v-model="measurable.string" />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieRadio from "@/components/cornieradio.vue";
import CornieInput from "@/components/cornieinput.vue";
import DateTimePicker from "@/components/date-time-picker.vue";
import CornieTooltip from "@/components/CornieTooltip.vue";
import InfoIcon from "@/components/icons/info.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import IMeasurable from "@/types/IMeasurable";
import CornieSelect from "@/components/cornieselect.vue";

const measurable = {
  age: "" ,
  ageUnit: "",
  day: "",
  unit: "years",
  min: "",
  max: "",
  string: "",
  minUnit: "years",
 maxUnit: "years",
 date:"",
 time:"",
 endDate:"",
 endTime:"",

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
export default class MeasurablePicker extends Vue {
  @Prop({ type: Object, default: measurable })
  modelValue!: IMeasurable;

  @PropSync("modelValue", { default: measurable })
  measurable!: IMeasurable;

  @Prop({ type: String })
  label!: string;



  //type: "date" | "age" | "period" | "range" | "string" = "date";

  type  = "date";

  // setType() {
  //   const timeable = this.timeable;
  //   if (timeable.date || timeable.time) this.type = "date";
  //   else if (timeable.startDate || timeable.endDate) this.type = "period";
  //   else if (timeable.ageValue) this.type = "age";
  //   else this.type = "date";
  // }

  setType(type:string) {
   if(type) return this.measurable = {};
  }
  // mounted() {
  //   this.setType();
  // }

  // @Watch("timeable", { deep: true })
  // timeChanged() {
  //   this.setType();
  // }

  created() {
    if (!this.measurable) this.measurable = measurable as any;
  }

  get name() {
    const id = Math.random().toString(36).substring(2, 9);
    return `measurable-${id}`;
  }
}
</script>
