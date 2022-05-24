<template>
  <div>
    <div class="flex flex-wrap space-x-8 space-y-4 mt-6">
      <cornie-radio
        v-for="(vType, i) in valueTypes"
        :key="i"
        name="value"
        class="mr-4"
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
        :modelValue:date="value.period.startDate"
        :modelValue:time="value.period.startTime"
        v-if="valueType === 'period'"
      />
      <date-picker
        class="w-full"
        label="End Date/Time"
        :modelValue:date="value.period.endDate"
        :modelValue:time="value.period.endTime"
        v-if="valueType === 'period'"
      />
      <date-picker
        class="w-full"
        label="Date/Time"
        :modelValue:date="value.period.dateTime"
        v-if="valueType === 'date-time'"
      />
      <date-picker
        class="w-full"
        label="Date/Time"
        :modelValue:date="value.period.time"
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
          :modelValue="value?.range?.min"
          class="grow w-full"
          :setfull="true"
        />
        <cornie-select
          :items="['Days']"
          placeholder="Days"
          class="w-32 mt-3 flex-none"
          :setPrimary="true"
          :modelValue="value?.range?.unit"
        />
      </div>
      <div class="flex space-x-2 w-full">
        <cornie-input
          label="Range(max)"
          placeholder="0"
          v-model="value.range.max"
          class="grow w-full"
          :setfull="true"
        />
        <cornie-select
          :items="['Days']"
          placeholder="Days"
          class="w-32 mt-3 flex-none"
          :setPrimary="true"
          v-model="value.range.unit"
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

  @Watch("valueType")
  valueChanged() {
    this.$emit("get-value", this.value);
  }

  nullify() {
    Object.keys(this.value).forEach((key) => {
      if (key !== this.valueType) {
        delete this.value[key];
      }
    });
  }
}
</script>

<style scoped></style>
