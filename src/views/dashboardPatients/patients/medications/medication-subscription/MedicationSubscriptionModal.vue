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
            <div class="p-2 text-sm" style="background: #f0f4fe">
              Source your regular medications and care for yourself and your
              loved ones. You can save upto 59% off regular retail prices each
              time you receive your medications from our virtual pharmacy.
            </div>
            <div class="flex gap-5 mt-6">
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

            <div
              v-if="subscriberModel === 'self'"
              class="grid grid-cols-2 gap-6 mt-6"
            >
              <cornie-select
                class="w-full"
                label="Medical Condition"
                placeholder="--Select--"
                v-model="form.condition"
                :items="conditionsList"
              />
              <div class="relative">
                <span
                  class="absolute top-0 right-0 text-red-500 text-sm font-semibold"
                  >Add Physician</span
                >
                <cornie-input
                  class="w-full"
                  label="Attending Physician"
                  placeholder="Search"
                  v-model="form.physician"
                />
              </div>
              <div class="w-full cursor-pointer">
                <cornie-input
                  v-bind="$attrs"
                  label="Allergies (Specify if known)"
                  placeholder="--Select--"
                  v-model="form.allergy"
                >
                  <template #append-inner>
                    <plus-icon class="fill-current text-danger" />
                  </template>
                </cornie-input>
              </div>
              <cornie-input
                class="w-full"
                label="Other Medical Condition (Specify if known)"
                placeholder="--Enter--"
                v-model="form.otherCondition"
              />
            </div>

            <div
              v-if="subscriberModel === 'others'"
              class="grid grid-cols-2 gap-6 mt-6"
            >
              <cornie-input
                class="w-full"
                label="Full Name"
                placeholder="--Enter--"
                v-model="other.fullname"
              />
              <date-picker
                class="w-full"
                label="Date of Birth"
                v-model:date="other.dob"
                v-model:time="other.tob"
              />
              <cornie-select
                class="w-full"
                label="Gender"
                placeholder="--Select--"
                v-model="other.gender"
                :items="['Male', 'Female']"
              />
              <cornie-input
                class="w-full"
                label="Email"
                placeholder="--Enter--"
                v-model="other.email"
              />
              
              <div class="col-span-2 grid grid-cols-2">
                <phone-input
                  label="Phone Number"
                  v-model:code="dialCode"
                  v-model="phoneNumber"
                  :rules="requiredString"
                  :readonly="readonly"
                />
              </div>
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

  form: any = {
    condition: "",
    otherCondition: "",
    allergy: "",
    physician: "",
  };
  other: any = {
    fullname: "",
    gender: "",
    email: "",
    dob: "",
    tob: "",
    
  };
  conditionsList: any = [
    "Hypertension (High Blood Pressure)",
    "Coronary Heart Disease & Stroke",
    "Prostate",
    "High Cholesterol",
    "Arthristis",
    "Diabetes",
    "Cancer",
    "Chronic Kidney Disease and Other",
    "Alzheimer’s Disease and Other",
    "ALS (Lou Gehrig’s Disease)",
    "Osteoporosis",
    "Chronic Obstructive Pulmonary",
    "Crohn’s Disease, Ulcerative Colitis",
    "Obesity",
    "Asthma",
    "Cystic Fibrosis",
    "Reflex Sympathetic Dystrophy (RSD)",
    "Oral Health",
  ];

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
