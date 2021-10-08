<template>
  <clinical-dialog v-model="show" title="Add Occurence">
    <v-form>
      <div class="grid grid-cols-2 gap-3 border-b-2 border-dashed">
        <date-time-picker label="Last Occurence" width="w-11/12" />
        <cornie-input label="Note" />
      </div>
      <section class="mt-2 block">
        <h2 class="text-lg font-semibold">Onset</h2>
        <div class="grid grid-cols-2 gap-3">
          <cornie-select label="Substance" />
          <cornie-select label="Manifestation" />
          <cornie-input label="Description" />
          <date-time-picker label="Onset" width="w-11/12" />
          <div class="block">
            <h2 class="capitalize mb-1 text-black text-sm font-semibold">
              Severity
            </h2>
            <span class="grid grid-cols-3">
              <cornie-radio label="Mild" value="mild" name="severity" />
              <cornie-radio label="Moderate" value="moderate" name="severity" />
              <cornie-radio label="Severe" value="severe" name="severity" />
            </span>
          </div>
          <auto-complete label="Exposure route" />
        </div>
        <cornie-text-area label="Note" class="w-full" />
      </section>
    </v-form>
    <template #actions>
      <cornie-btn
        @click="show = false"
        class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
      >
        Cancel
      </cornie-btn>
      <cornie-btn class="text-white bg-danger px-3 rounded-xl">
        Add Occurence
      </cornie-btn>
    </template>
  </clinical-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ClinicalDialog from "./clinical-dialog.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import DateTimePicker from "./date-time-picker.vue";
import CornieTextArea from "@/components/textarea.vue";
import AutoComplete from "@/components/autocomplete.vue";
import { Prop, PropSync } from "vue-property-decorator";
import CornieRadio from "@/components/cornieradio.vue";

@Options({
  name: "ConditionOccurence",
  components: {
    ClinicalDialog,
    CornieSelect,
    CornieInput,
    DateTimePicker,
    CornieTextArea,
    AutoComplete,
    CornieRadio,
  },
})
export default class ConditionOccurence extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;
}
</script>
