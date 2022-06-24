<template>
  <div>
    <label class="mt-6" for="valueType">Value</label>
    <br />
    <div class="flex flex-wrap space-x-8 space-y-4 mt-4">
      <cornie-radio
        v-for="(vType, i) in valueTypes"
        :key="i"
        name="value"
        class="mr-4"
        id="valueType"
        v-model="valueType"
        :value="vType"
        :label="vType"
        @change="nullify"
      />
    </div>

    <div class="grid grid-cols-2 gap-6 mt-6">
      <cornie-input
        class="w-full"
        label="Quantity"
        placeholder="Enter"
        v-model="value.quantity"
        :rules="required"
        v-if="valueType === 'quantity'"
      />
      <cornie-input
        class="w-full"
        label="Code"
        placeholder="Enter"
        v-model="value.code"
        :rules="required"
        v-else-if="valueType === 'code'"
      />
      <cornie-input
        class="w-full"
        label="String"
        placeholder="Enter"
        v-model="value.string"
        :rules="required"
        v-else-if="valueType === 'string'"
      />
      <cornie-input
        class="w-full"
        type="number"
        label="Integer"
        placeholder="Enter"
        v-model="value.integer"
        v-if="valueType === 'integer'"
      />
      <cornie-input
        class="w-full"
        label="Sample Data"
        placeholder="Enter"
        v-model="value.sampleData"
        :rules="required"
        v-if="valueType === 'sample-data'"
      />
      <cornie-input
        class="w-full"
        label="Ratio"
        placeholder="1:1"
        v-model="value.ratio"
        :rules="required"
        v-if="valueType === 'ratio'"
      />
    </div>

    <div class="grid grid-cols-2 gap-6 mt-6">
      <date-picker
        class="w-full"
        label="Start Date/Time"
        :modelValue:date="date.startDate"
        :modelValue:time="date.startTime"
        v-if="valueType === 'period'"
      />
      <date-picker
        class="w-full"
        label="End Date/Time"
        :modelValue:date="date.endDate"
        :modelValue:time="date.endTime"
        v-if="valueType === 'period'"
      />
      <date-picker
        class="w-full"
        label="Date/Time"
        :modelValue:date="date.dateTime"
        v-if="valueType === 'date-time'"
      />
      <date-picker
        class="w-full"
        label="Date/Time"
        :modelValue:date="date.time"
        v-if="valueType === 'time'"
      />
    </div>

    <div v-if="valueType === 'boolean'">
      <div class="font-bold text-base">Boolean</div>
      <div class="grid grid-cols-3 gap-3 mt-6 w-1/3">
        <cornie-radio
          name="booleanValue"
          v-model="value.boolean"
          label="Yes"
          value="Yes"
        />
        <cornie-radio
          name="booleanValue"
          v-model="value.boolean"
          value="No"
          label="No"
        />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-6 mt-2" v-if="valueType === 'range'">
      <div class="flex space-x-2 w-full">
        <cornie-input
          label="Range(min)"
          placeholder="0"
          :modelValue="range.min"
          class="grow w-full"
          :setfull="true"
        />
        <cornie-select
          :items="['Days']"
          placeholder="Days"
          class="w-32 mt-3 flex-none"
          :setPrimary="true"
          :modelValue="range.unit"
        />
      </div>
      <div class="flex space-x-2 w-full">
        <cornie-input
          label="Range(max)"
          placeholder="0"
          v-model="range.max"
          class="grow w-full"
          :setfull="true"
        />
        <cornie-select
          :items="['Days']"
          placeholder="Days"
          class="w-32 mt-3 flex-none"
          :setPrimary="true"
          v-model="range.unit"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import { namespace } from "vuex-class";
import { CornieUser } from "@/types/user";
import { string } from "yup";
import AutoComplete from "@/components/autocomplete.vue";
import { cornieClient } from "@/plugins/http";
import CornieRadio from "@/components/cornieradio.vue";
import { IObservationValue } from "@/types/IObservationValue";

import DateTimePicker from "@/components/date-time-picker.vue";
import DatePicker from "@/components/datetime-picker.vue";
import { first, getTableKeyValue } from "@/plugins/utils";

@Options({
  name: "ValueForm",
  components: {
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
    AutoComplete,
    CornieRadio,
    DateTimePicker,
    DatePicker,
  },
})
export default class ValueForm extends Vue {
  // @Prop({ type: Object, default: value })
  // xValue!: IObservationValue;

  required = string().required();

  value = <any>{};

  valueTypes = [
    "quantity",
    "code",
    "string",
    "sample-data",
    "boolean",
    "range",
    "integer",
    "date-time",
    "time",
    "period",
    "ratio",
  ];

  valueType = "quantity";

  range = {
    min: "",
    max: "",
    unit: "Days",
  };

  date = {
    dateTime: "",
    time: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  };

  @Watch("valueType")
  valueChanged() {
    this.$emit("get-value", this.value);
  }

  @Watch("range")
  onInput() {
    this.value.range.min = this.range.min;
    this.value.range.max = this.range.max;
    this.value.range.unit = this.range.unit;
  }

  @Watch("date")
  onUpdate() {
    this.value.dateTime = this.buildDateTime(this.date.dateTime, this.date.time);
    this.value.time = this.date.time;
    this.value.period = this.buildPeriod(
      this.date.startDate,
      this.date.startTime,
      this.date.endDate,
      this.date.endTime
    );
  }

  nullify() {
    Object.keys(this.value).forEach((key) => {
      if (key !== this.valueType) {
        delete this.value[key];
      }
    });
  }

  buildPeriod(
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string
  ) {
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
}
</script>

<style scoped></style>
