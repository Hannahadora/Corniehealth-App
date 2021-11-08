<template>
  <clinical-dialog v-model="show" title="Add Occurence">
    <v-form ref="form">
      <div class="grid grid-cols-2 gap-3 border-b-2 border-dashed">
        <date-time-picker
          v-model:date="lastOccurenceDate"
          v-model:time="lastOccurenceTime"
          label="Last Occurence"
          width="w-11/12"
        />
        <cornie-input label="Note" v-model="lastOccurenceNote" />
      </div>
      <section class="mt-2 block">
        <h2 class="text-lg font-semibold mb-2">Onset</h2>
        <div class="grid grid-cols-2 gap-3">
          <cornie-select
            label="Substance"
            v-model="substance"
            :items="['substance']"
          />
          <cornie-select
            label="Manifestation"
            v-model="manifestation"
            :items="['manifestation']"
          />
          <cornie-input label="Description" v-model="description" />
          <date-time-picker
            label="Onset"
            width="w-11/12"
            v-model:date="onsetDate"
            v-model:time="onsetTime"
          />
          <div class="block">
            <h2 class="capitalize mb-3 text-black text-sm font-semibold">
              Severity
            </h2>
            <span class="grid grid-cols-3">
              <cornie-radio
                label="Mild"
                v-model="severity"
                value="Mild"
                name="severity"
              />
              <cornie-radio
                label="Moderate"
                v-model="severity"
                value="Moderate"
                name="severity"
              />
              <cornie-radio
                label="Severe"
                value="Severe"
                v-model="severity"
                name="severity"
              />
            </span>
          </div>
          <auto-complete
            :items="[{ code: 'mouth', display: 'mouth' }]"
            v-model="exposureRoute"
            label="Exposure route"
          />
        </div>
        <cornie-text-area v-model="note" rows="4" label="Note" class="w-full" />
      </section>
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
        class="text-white bg-danger px-3 rounded-xl"
      >
        Save
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
import { ICondition } from "@/types/ICondition";
import { cornieClient } from "@/plugins/http";

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

  @Prop({ type: Object })
  condition!: ICondition;

  @PropSync("modelValue")
  show!: boolean;

  loading = false;

  lastOccurenceDate = "";
  lastOccurenceTime = "";
  lastOccurenceNote = "";
  note = "";
  substance = "";
  manifestation = "";
  description = "";
  onsetDate = "";
  onsetTime = "";
  severity = "Mild";
  exposureRoute = "";

  get payload() {
    return {
      lastOccurrence: this.buildDateTime(
        this.lastOccurenceDate,
        this.lastOccurenceTime
      ),
      lastOccurrenceNote: this.lastOccurenceNote,
      substance: this.substance,
      manifestation: this.manifestation,
      description: this.description,
      onSet: this.buildDateTime(this.onsetDate, this.onsetTime),
      severity: this.severity,
      exposureRoute: this.exposureRoute,
      note: this.note,
      conditionId: this.condition.id,
    };
  }
  buildDateTime(dateString: string, time: string) {
    const date = new Date(dateString);
    const [hour, minute] = (time || "00:00").split(":");
    date.setMinutes(Number(minute));
    date.setHours(Number(hour));
    return date.toISOString();
  }
  async submit() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    this.loading = true;
    try {
      await cornieClient().post("/api/v1/condition/occurence", this.payload);
      this.show = false;
      window.notify({ msg: "Occurence added", status: "success" });
    } catch (error) {
      window.notify({ msg: "Occurence not added", status: "error" });
    }
    this.loading = false;
  }
}
</script>
