<template>
  <div class="block w-full mt-4">
    <span
      class="flex capitalize mb-1 text-black text-sm font-medium items-center"
    >
      {{ label }}
      <info-icon class="fill-current ml-2 text-primary hidden" />
    </span>
    <div class="grid grid-cols-3 gap-3 mt-4 w-1/2">
      <cornie-radio :name="name" v-model="type" value="age" label="Age" />
      <cornie-radio :name="name" v-model="type" label="Range" value="range" />
      <cornie-radio :name="name" v-model="type" value="string" label="Year" />
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
                :items="['Days']"
                placeholder="Days"
                class="w-32 mt-0.5 flex-none"
                :setPrimary="true"
                v-model="measurable.day"
              />
          </div>
       </div>
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
                :items="['Days']"
                placeholder="Days"
                class="w-32 mt-0.5 flex-none"
                :setPrimary="true"
                v-model="measurable.day"
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
                :items="['Days']"
                placeholder="Days"
                class="w-32 mt-0.5 flex-none"
                :setPrimary="true"
                v-model="measurable.day"
              />
          </div>
       </div>

      <!-- <cornie-input label="Unit of Measurement" v-model="measurable.unit" />
      <cornie-input label="Range (min)" v-model="measurable.min" />
      <cornie-input label="Range (max)" v-model="measurable.max" /> -->
    </div>
    <div class="grid grid-cols-2 gap-3 mt-4" v-if="type == 'string'">
      <cornie-input label="Year" v-model="measurable.string" :placeholder="'Enter'" />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieRadio from "@/components/cornieradio.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieTooltip from "@/components/CornieTooltip.vue";
import InfoIcon from "@/components/icons/info.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import IMeasurable from "@/types/IMeasurable";
import CornieSelect from "@/components/cornieselect.vue";

const measurable = {
  age: "",
  day: "",
  unit: "",
  min: "",
  max: "",
  string: "",
};

@Options({
  name: "TimeablePicker",
  components: {
    CornieRadio,
    CornieInput,
    CornieTooltip,
    InfoIcon,
    CornieSelect,
  },
})
export default class TimeablePicker extends Vue {
  @Prop({ type: Object, default: measurable })
  modelValue!: IMeasurable;

  @PropSync("modelValue", { default: measurable })
  measurable!: IMeasurable;

  type: "age" | "range" | "string" = "range";

  @Prop({ type: String })
  label!: string;

  setType() {
    if (this.measurable.string) this.type = "string";
    else if(this.measurable.string) this.type = "range";
    else this.type = "age";
  }

  mounted() {
    this.setType();
  }

  @Watch("measurable", { deep: true })
  timeChanged() {
    this.setType();
  }

  created() {
    if (!this.measurable) this.measurable = measurable;
  }

  get name() {
    const id = Math.random().toString(36).substring(2, 9);
    return `measurable-${id}`;
  }
}
</script>
