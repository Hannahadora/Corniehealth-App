<template>
  <cornie-dialog v-model="show" right class="w-1/2 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white overflow-y-scroll"
    >
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Medication Subscription
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <v-form class="flex-grow flex flex-col" @submit="save">
          <accordion-component
            class="text-primary"
            title="Subscription"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-3 mt-6">
              <cornie-radio
                name="subscriberModel"
                v-model="subscriberModel"
                label="Subscribe for self"
                value="self"
                @change="subscriberModel = 'self'"
              />
              <cornie-radio
                name="subscriberModel"
                v-model="subscriberModel"
                value="others"
                label="Subscribe for others"
                @change="subscriberModel = 'others'"
              />
            </div>

            <div v-if="subscriberModel === 'self'" class="grid grid-cols-2 gap-3 mt-6">
              <cornie-select
                class="w-full"
                label="Medical Condition"
                placeholder="--Select--"
                v-model="form.condition"
                :items="conditionsList"
              />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Effective"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <date-picker
                class="w-full"
                label="Start Date/Time"
                v-model:date="effective.period.startDate"
                v-model:time="effective.period.startTime"
                v-if="effectiveType == 'period'"
              />
              <date-picker
                class="w-full"
                label="End Date/Time"
                v-model:date="effective.period.endDate"
                v-model:time="effective.period.endTime"
                v-if="effectiveType == 'period'"
              />
              <date-picker
                class="w-full"
                label="Date/Time"
                v-model:date="effective.instant.date"
                v-model:time="effective.instant.time"
                v-if="effectiveType == 'instant'"
              />
              <date-picker
                class="w-full"
                label="Date/Time"
                v-model:date="effective.date"
                v-model:time="effective.time"
                v-if="effectiveType == 'date-time'"
              />
              <cornie-select
                class="w-full"
                label="Timezone"
                placeholder="Select"
                v-model="effective.instant.timeZone"
                :items="['a', 'b']"
                v-if="effectiveType == 'instant'"
              />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Issue Info"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <date-picker
                class="w-full"
                label="Date/Time"
                v-model:date="issued.date"
                v-model:time="issued.time"
              />
              <practitioner-select
                :rules="required"
                class="w-full"
                label="Performer"
                placeholder="Select"
                v-model="issueInfo.performer"
              />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Value"
            :opened="false"
          >
            <div>
              <value-form @get-value="setValue" />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Reason Info"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <cornie-input
                class="w-full"
                label="Date Absent Reason"
                placeholder="Enter"
                v-model="reasonInfo.dateAbsentReason"
              />
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/observation-interpretation"
                class="w-full"
                label="Interpretation"
                placeholder="Interpretation"
                v-model="reasonInfo.interpretation"
              />

              <cornie-input
                class="w-full"
                label="Note"
                placeholder="Note"
                v-model="reasonInfo.note"
              />
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/body-site"
                class="w-full"
                label="Body Site"
                placeholder="Select"
                v-model="reasonInfo.bodysite"
              />
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/observation-methods"
                class="w-full"
                label="Method"
                placeholder="Select"
                v-model="reasonInfo.method"
              />
              <cornie-input
                class="w-full"
                label="Specimen"
                placeholder="Autoloaded"
                v-model="reasonInfo.specimen"
                disabled
              />
              <!-- <cornie-select
                  class="w-full"
                  label="Device"
                  placeholder="Device"
                  v-model="reasonInfo.device"
                  :items="['a', 'b']"
                /> -->
              <div
                class="w-full cursor-pointer"
                @click="openReferenceModal('device', ['Device'])"
              >
                <cornie-input
                  v-bind="$attrs"
                  label="Device"
                  placeholder="Device"
                  v-model="reasonInfo.device"
                >
                  <template #append-inner>
                    <plus-icon class="fill-current text-danger" />
                  </template>
                </cornie-input>
              </div>
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Reference Range"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <cornie-input
                class="w-full"
                label="Low"
                placeholder="Select"
                v-model="referenceRange.low"
              />
              <cornie-input
                class="w-full"
                label="high"
                placeholder="High"
                v-model="referenceRange.high"
              />
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/observation-methods"
                class="w-full"
                label="Type"
                placeholder="Select"
                v-model="referenceRange.type"
              />
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/referencerange-appliesto"
                class="w-full"
                label="Applies To"
                placeholder="Select"
                v-model="referenceRange.appliesTo"
              />
              <cornie-input
                class="w-full"
                label="Age"
                placeholder="Enter"
                v-model="referenceRange.age"
              />
              <cornie-input
                class="w-full"
                label="Text"
                placeholder="Enter"
                v-model="referenceRange.text"
              />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Member"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <div
                class="w-full cursor-pointer"
                @click="
                  openReferenceModal('hasMember', [
                    'Observation',
                    'QuestionnaireResponse',
                    'MolecularSequence',
                  ])
                "
              >
                <cornie-input
                  v-bind="$attrs"
                  label="Has Member"
                  placeholder="Select"
                  v-model="member.hasMemer"
                >
                  <template #append-inner>
                    <plus-icon class="fill-current text-danger" />
                  </template>
                </cornie-input>
              </div>
              <div
                class="w-full cursor-pointer"
                @click="
                  openReferenceModal('derivedFrom', [
                    'DocumentReference',
                    'ImagingStudy',
                    'Media',
                    'QuestionnaireResponse',
                    'Observation',
                    'MolecularSequence',
                  ])
                "
              >
                <cornie-input
                  v-bind="$attrs"
                  label="Derived From"
                  placeholder="Select"
                  v-model="member.derivedFrom"
                >
                  <template #append-inner>
                    <plus-icon class="fill-current text-danger" />
                  </template>
                </cornie-input>
              </div>
            </div>
          </accordion-component>
          <accordion-component
            class="text-primary"
            title="Component"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/observation-codes"
                class="w-full"
                label="Code"
                placeholder="Select"
                v-model="component.code"
              />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Value"
            :opened="false"
          >
            <div>
              <value-form :value="value" />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Reason Info"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <cornie-input
                class="w-full"
                label="Date Absent Reason"
                placeholder="Enter"
                v-model="reasonInfo.dateAbsentReason"
              />
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/observation-interpretation"
                class="w-full"
                label="Interpretation"
                placeholder="Interpretation"
                v-model="reasonInfo.interpretation"
              />
              <cornie-input
                class="w-full"
                label="Range(min)"
                placeholder="0"
                v-model="rangeMin"
                :rules="required"
              />
              <cornie-input
                class="w-full"
                label="Range(max)"
                placeholder="0"
                v-model="rangeMax"
                :rules="required"
              />
            </div>
          </accordion-component>
        </v-form>
      </cornie-card-text>

      <div class="flex items-center justify-end mt-6 mb-6">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-3 py-1 mr-3 rounded-lg text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          @click="save('')"
          :loading="loading"
          type="submit"
          class="text-white bg-danger px-3 py-1 rounded-lg"
        >
          Save
        </cornie-btn>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import PlusIcon from "@/components/icons/plus.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
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
import { IObservation } from "@/types/IObservation";
import { IPatient } from "@/types/IPatient";

import FhirInput from "@/components/fhir-input.vue";
import DateTimePicker from "@/components/date-time-picker.vue";
import DatePicker from "@/components/datetime-picker.vue";
import { first, getTableKeyValue } from "@/plugins/utils";

// import AccordionComponent from "@/components/dialog-accordion.vue";
import AccordionComponent from "@/components/form-accordion.vue";

const user = namespace("user");
const patients = namespace("patients");

@Options({
  name: "MedicationSubscriptionModal",
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
    AutoComplete,
    CornieRadio,
    DateTimePicker,
    CancelRedBg,
    AccordionComponent,
    PlusIcon,
    DatePicker,
    FhirInput,
  },
})
export default class MedicationSubscriptionModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: <any>{} })
  observation!: IObservation;

  required = string().required();

  customers = <any>[];

  loading = false;
  opened = true;
  subscriberModel = "self";

  @Watch("id")
  idChanged() {}

  async created() {}
}
</script>

<style scoped>
td {
  padding: 16px;
}
</style>
