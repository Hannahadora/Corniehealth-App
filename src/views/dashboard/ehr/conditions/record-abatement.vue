<template>
  <clinical-dialog v-model="show" title="Record Abatement" class="h-full">
    <v-form class="w-full p-3 h-full">
      <!-- <timeable-picker v-model="timeable" /> -->
       <div>
         <onset-picker v-model="abatementMeasurable" label="Abatement" :name="'abatement'"/>
       </div>
      <!-- <span class="grid grid-cols-2 gap-3 mt-3 border-t-2 pt-5 border-dashed">
        <practitioner-select
          v-model="asserter"
          label="Asserter"
        />
      </span> -->
    </v-form>
    <template #actions>
      <cornie-btn
        @click="show = false"
        class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
      >
        Cancel
      </cornie-btn>
      <cornie-btn
        :loading="loading"
        @click="submit"
        class="text-white bg-danger px-7 rounded-xl"
      >
        Save
      </cornie-btn>
    </template>
  </clinical-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { Prop, PropSync } from "vue-property-decorator";

import { ICondition } from "@/types/ICondition";
import IPractitioner from "@/types/IPractitioner";
import { Timeable } from "@/types/misc";

import ClinicalDialog from "./clinical-dialog.vue";
import TimeablePicker from "./timeable.vue";
import Measurable from "./measurable.vue";
import PractitionerSelect from "./practitioner-select.vue";



import OnsetPicker from "./components/onset.vue";

const user = namespace("user");
const timeable = {
  age: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  date: "",
  time: "",
};

const measurable = {
  age: null,
  ageUnit: null,
  ageValue: null,
  day: null,
  unit: null,
  min: null,
  minUnit: null,
  minValue: null,
  max: null,
  maxUnit: null,
  maxValue: null,
  string: null,
  startDate: null,
  startTime: null,
  endDate: null,
  date: null,
  time: null,
  endTime: null
};


@Options({
  name: "RecordAbatement",
  components: {
    ClinicalDialog,
    TimeablePicker,
    Measurable,
    PractitionerSelect,
    OnsetPicker
  },
})
export default class RecordAbatement extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @Prop({ type: Object })
  condition!: ICondition;

  @PropSync("modelValue")
  show!: boolean;

  loading = false;

  timeable = { ...timeable };
  measurable = { ...measurable };
  abatement = [] as any;

  asserter = "";

  @user.Getter
  authPractitioner!: IPractitioner;

  abatementMeasurable = { ...measurable };

  isEmptyObject(object:any){
  const nonNulls = Object.entries(object).filter(([k,v]) => Boolean (v))
  return nonNulls.length <1
}

  get setabatement() {
    const range = {
        unit: this.abatementMeasurable.unit,
        min: this.abatementMeasurable.min,
        max: this.abatementMeasurable.max,
    
    }; 
    const age = {
       unit: this.abatementMeasurable.ageUnit,
        value: this.abatementMeasurable.ageValue,
    }; 
    const period = {
       start: this.abatementMeasurable.startDate,
        end: this.abatementMeasurable.endDate,
        startTime:this.abatementMeasurable.startTime,
        endTime: this.abatementMeasurable.endTime,
    
    }; 

    return {
      range: this.isEmptyObject (range) ? undefined : range,
      age: this.isEmptyObject (age) ? undefined : age,
      string: this.abatementMeasurable.string || null,
      period:this.isEmptyObject (period) ? undefined : period,
      dateTime:  this.safeBuildDateTime(
       this.abatementMeasurable.date as any,
       this.abatementMeasurable.time as any
     ),
    };
  }
  get payload() {
    this.abatement.push(this.setabatement);
   return{
     abatement: this.abatement,
   }
  }

  buildPeriod({ startDate, startTime, endDate, endTime }: Timeable) {
    try {
      const start = this.buildDateTime(startDate, startTime);
      const end = this.buildDateTime(endDate, endTime);
      return { start, end };
    } catch (error) {
      return;
    }
  }

  buildDateTime(dateString: string, time: string) {
    const date = new Date(dateString);
    const [hour, minute] = time.split(":");
    date.setMinutes(Number(minute));
    date.setHours(Number(hour));
    return date.toISOString();
  }

  safeBuildDateTime(dateString: string, time: string) {
    try {
      return this.buildDateTime(dateString, time);
    } catch (error) {
      return;
    }
  }

  async submit() {
    this.loading = true;
    try {
      await cornieClient().put(`/api/v1/condition/${this.condition.id}`, this.payload);
      window.notify({ status: "success", msg: "Abatement added" });
      this.done();
      this.abatement = [];
    } catch (error) {
      window.notify({ status: "error", msg: "Abatement not added" });
      this.done();
    }
    this.loading = false;
  }

  
done() {
    this.$emit("conditionAdded");
    this.show = false;
  }

  created() {
    this.asserter = this.authPractitioner?.id || "";
  }
}
</script>
