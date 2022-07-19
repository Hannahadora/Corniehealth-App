<template>
  <div>
    <cornie-input
      label="Assessment"
      v-model="assessment"
      readonly
      :disabled="true"
      @click.prevent="show = true"
    >
      <template #append-inner>
        <plus-icon class="fill-current text-danger" />
      </template>
    </cornie-input>
    <assessment-modal
      v-model:selectedValue="selected"
      :patientId="patientId"
      v-model="show"
      @asses-data="assesdata"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import AssessmentModal from "./assessment-modal.vue";
import PlusIcon from "@/components/icons/plus.vue";
import { Prop, PropSync } from "vue-property-decorator";

@Options({
  name: "AssessmentSelect",
  inheritAttrs: false,
  components: {
    CornieInput,
    AssessmentModal,
    PlusIcon,
  },
})
export default class Assessment extends Vue {
  @Prop({ type: String, default: "" })
  patientId!: string;

  @Prop({ type: Object, default: {} })
  modelValue!: { reference: string; id: string };

  @PropSync("modelValue", { default: {} })
  selected!: { reference: string; id: string };

  show = false;

  assessment = "";

  // get assessment() {
  //   return this.selected?.id;
  // }

  assesdata(value:any){
    this.assessment = value.reference
    this.$emit('asses-data', value)
  }
}
</script>
