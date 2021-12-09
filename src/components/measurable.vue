<template>
  <div class="block w-full mt-4">
    <span
      class="flex capitalize mb-1 text-black text-sm font-medium items-center"
    >
      {{ label }}
      <info-icon class="fill-current ml-2 text-primary" />
    </span>
    <div class="grid grid-cols-3 gap-3 mt-4 w-1/2">
      <cornie-radio :name="name" v-model="type" label="Range" value="range" />
      <cornie-radio :name="name" v-model="type" value="string" label="String" />
    </div>
    <div class="grid grid-cols-3 gap-3 mt-4" v-if="type == 'range'">
      <cornie-input label="Unit of Measurement" v-model="measurable.unit" />
      <cornie-input label="Range (min)" v-model="measurable.min" />
      <cornie-input label="Range (max)" v-model="measurable.max" />
    </div>
    <div class="grid grid-cols-2 gap-3 mt-4" v-else>
      <cornie-input label="String" v-model="measurable.string" />
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

const measurable = {
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
  },
})
export default class TimeablePicker extends Vue {
  @Prop({ type: Object, default: measurable })
  modelValue!: IMeasurable;

  @PropSync("modelValue", { default: measurable })
  measurable!: IMeasurable;

  type: "range" | "string" = "range";

  @Prop({ type: String })
  label!: string;

  setType() {
    if (this.measurable.string) this.type = "string";
    else this.type = "range";
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
