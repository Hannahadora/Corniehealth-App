<template>
  <clinical-dialog v-model="show" title="Add Occurence">
    <v-form>
      <div class="grid grid-cols-2 gap-3">
        <date-time-picker label="Last Occurence" />
        <cornie-input label="" />
      </div>
    </v-form>
  </clinical-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ClinicalDialog from "./clinical-dialog.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import DateTimePicker from "./date-time-picker.vue";
import CornieTextArea from "@/components/textarea.vue";
import { Prop, PropSync } from "vue-property-decorator";

@Options({
  name: "ConditionOccurence",
  components: {
    ClinicalDialog,
    CornieSelect,
    CornieInput,
    DateTimePicker,
    CornieTextArea,
  },
})
export default class ConditionOccurence extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;
}
</script>
