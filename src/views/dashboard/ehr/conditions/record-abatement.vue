<template>
  <clinical-dialog v-model="show" title="Record Abatement">
    <v-form class="w-full p-3">
      <timeable-picker v-model="timeable" />
      <measurable v-model="measurable" />
      <span class="grid grid-cols-2 gap-3 mt-3 border-t-2 pt-5 border-dashed">
        <practitioner-select
          :rules="required"
          v-model="asserter"
          label="Asserter"
        />
      </span>
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
import ClinicalDialog from "./clinical-dialog.vue";
import TimeablePicker from "./timeable.vue";
import Measurable from "./measurable.vue";
import { Prop, PropSync } from "vue-property-decorator";
import PractitionerSelect from "./practitioner-select.vue";
import IPractitioner from "@/types/IPractitioner";
import { namespace } from "vuex-class";
import { ICondition } from "@/types/ICondition";
import { Timeable } from "@/types/misc";
import { cornieClient } from "@/plugins/http";

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
  unit: "",
  min: "",
  max: "",
  string: "",
};

@Options({
  name: "RecordAbatement",
  components: {
    ClinicalDialog,
    TimeablePicker,
    Measurable,
    PractitionerSelect,
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

  asserter = "";

  @user.Getter
  authPractitioner!: IPractitioner;

  get payload() {
    const { string, ...range } = this.measurable;
    const dateTime = this.safeBuildDateTime(
      this.timeable.date,
      this.timeable.time
    );
    const period = this.buildPeriod(this.timeable);
    const data: any = {
      asserter: this.asserter,
      conditionId: this.condition.id,
    };
    if (range.unit && range.min && range.max) data.range = range;
    if (string) data.string = string;
    if (this.timeable.age) data.age = this.timeable.age;
    if (period) data.period = period;
    if (dateTime) data.dateTime = dateTime;
    return data;
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
      await cornieClient().post("/api/v1/condition/abatement", this.payload);
      window.notify({ status: "success", msg: "Abatement added" });
    } catch (error) {
      window.notify({ status: "error", msg: "Abatement not added" });
    }
    this.loading = false;
  }
  created() {
    this.asserter = this.authPractitioner?.id || "";
  }
}
</script>
