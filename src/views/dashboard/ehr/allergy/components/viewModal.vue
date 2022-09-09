<template>
  <cornie-dialog v-model="show" right class="w-6/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <span
          class="pr-2 flex items-center cursor, Templates-pointer border-r-2"
        >
          <cornie-icon-btn @click="closeModal">
            <arrow-left-icon />
          </cornie-icon-btn>
        </span>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            View Allergy
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="closeModal"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
          <div class="grid grid-cols-3 gap-4 w-full mt-5">
            <div>
              <p class="text-gray-400 italic text-sm">Allergy Intolerance ID</p>
              <span class="text-sm">{{ allergy.identifier }}</span>
            </div>
            <div>
              <p class="text-gray-400 italic text-sm">Clinical Status</p>
              <span class="text-sm">{{ allergy.clinicalStatus }}</span>
            </div>
            <div>
              <p class="text-gray-400 italic text-sm">Verification Status</p>
              <span class="text-sm">{{ allergy.verificationStatus }}</span>
            </div>
            <div>
              <p class="text-gray-400 italic text-sm">Encounter</p>
              <span class="mb-0 text-sm">{{ allergy.encounter }}</span>
              <p class="text-xs">{{ new Date(allergy.createdAt).toLocaleDateString() }}</p>
            </div>
            <div>
              <p class="text-gray-400 italic text-sm">Asserter</p>
               <div class="flex space-x-4">
            <avatar :src="getPractImage(allergy.asserterId)"/>
            <div>
              <span class="mb-0 text-sm"
                >Dr {{ getPractitionerName(allergy.asserterId) }}</span
              >
              <p class="text-xs">{{ getPractDepartment(allergy.asserterId) }}</p>
            </div>
          </div>
            </div>
          </div>
          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Basic Info" :opened="true">
              <template v-slot:default>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full">
                  <cornie-input
                    label="type"
                    placeholder="Autoloaded"
                    :disabled="true"
                    :modelValue="allergy.type"
                  />
                  <cornie-input
                    label="Category"
                    placeholder="Autoloaded"
                    :disabled="true"
                    v-model="allergy.category"
                  />
                  <cornie-input
                    label="Criticality"
                    placeholder="Autoloaded"
                    :disabled="true"
                    v-model="allergy.criticality"
                  />
                  <cornie-input
                    label="Code"
                    placeholder="Autoloaded"
                    :disabled="true"
                    v-model="allergy.code"
                  />
                </div>
              </template>
            </accordion-component>
          </div>

          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Recorded" :opened="true">
              <template v-slot:default>
                <div class="mt-8 grid grid-cols-2 gap-4 w-full">
                  <div class="">
                    <date-time-picker :label="'Date/Time'" v-model:date="allergy.createdAt" :time="separateTime(allergy.createdAt)" :disabled="true" />
                  </div>
                  <cornie-input
                    label="Recorder"
                    class="-mt-5 w-full"
                    placeholder="Autoloaded"
                    :disabled="true"
                    v-model="recorder"
                  >
                    <template #labelicon>
                      <custom-checkbox
                        :label="'Assert this record'"
                        class="w-full"
                        :disabled="true"
                        v-model="asserterId"
                    :value="authPractitioner.id"
                      />
                    </template>
                  </cornie-input>
                  <div class="">
                    <date-time-picker
                      :disabled="true"
                      :label="'Last Occurence'"
                      v-model:date="allergy.occurences[0].time"
                       :time="separateTime(allergy?.occurences[0]?.time)"
                    />
                  </div>
                  <cornie-input
                    label="Note"
                    class="mb-5 w-full"
                    placeholder="Autoloaded"
                    :disabled="true"
                    v-model="allergy.note"
                  >
                  </cornie-input>
                </div>
              </template>
            </accordion-component>
          </div>

          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Onset" :opened="true">
              <template v-slot:default>
                <div class="mt-5">
              <div class="mt-5 grid grid-cols-2 gap-4" v-if="allergy?.onset?.dateTime != null">
                <date-time-picker
                  v-model:date="allergy.onset.dateTime"
                  :time="separateTime(allergy.onset.dateTime)"
                  label="Date/Time"
                  width="w-11/12"
                  :disabled="true"
                />
              </div>
              <div class="w-full mt-5 grid grid-cols-2 gap-4" v-if="allergy?.onset?.age != null">
                <div class="w-full -mt-1">
                  <span class="text-sm font-semibold mb-3">Age</span>
                  <div class="flex space-x-2 w-full">
                    <cornie-input
                      placeholder="0"
                      class="grow w-full"
                      :setfull="true"
                      v-model="allergy.onset.age.value"
                      :disabled="true"
                    />
                     <cornie-input
                      placeholder="0"
                      class="grow w-full"
                      :setfull="true"
                      v-model="allergy.onset.age.unit"
                      :disabled="true"
                    />
                    <!-- <cornie-select
                      :items="['Days', 'Months', 'Years']"
                      placeholder="Days"
                      class="w-32 mt-0.5 flex-none"
                      :setPrimary="true"
                      v-model="allergy.onset.age.unit"
                      :disabled="true"
                    /> -->
                  </div>
                </div>
              </div>
              <div class="w-full mt-5 grid grid-cols-2 gap-4" v-if="allergy?.onset?.period != null">
                <date-time-picker
                  v-model:date="allergy.onset.period.start"
                  :time="separateTime(allergy.onset.period.startTime)"
                  label="Start Date/Time"
                  width="w-11/12"
                  :disabled="true"
                />
                <date-time-picker
                  v-model:date="allergy.onset.period.end"
                  :time="separateTime(allergy.onset.period.endTime)"
                  label="End Date/Time"
                  width="w-11/12"
                  :disabled="true"
                />
              </div>
              <div class="grid grid-cols-3 gap-3 mt-4 w-full" v-if="allergy?.onset?.range != null">
                <div class="w-full -mt-1">
                  <span class="text-sm font-semibold mb-3">Range (min)</span>
                  <div class="flex space-x-2 w-full">
                    <cornie-input
                      placeholder="0"
                      class="grow w-full"
                      :setfull="true"
                      v-model="allergy.onset.range.min"
                      :disabled="true"
                    />
                    <cornie-select
                      :items="['Days', 'Months', 'Years']"
                      placeholder="Days"
                      class="w-32 mt-0.5 flex-none"
                      :setPrimary="true"
                      v-model="allergy.onset.range.unit"
                      :disabled="true"
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
                     v-model="allergy.onset.range.max"
                     :disabled="true"
                    />
                    <cornie-select
                      :items="['Days', 'Months', 'Years']"
                      placeholder="Days"
                      class="w-32 mt-0.5 flex-none"
                      :setPrimary="true"
                      v-model="allergy.onset.range.min"
                     :disabled="true"
                    />
                  </div>
                </div>
              </div>
              <div class="w-full mt-5 grid grid-cols-2 gap-4" v-if="allergy?.onset?.string != null">
                 <cornie-input label="String" v-model="allergy.onset.string"  :disabled="true" />
              </div>
            </div>
              </template>
            </accordion-component>
          </div>

          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Reaction" :opened="true">
              <template v-slot:default>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full">
                  <cornie-input
                    label="Substance"
                    placeholder="Autoloaded"
                    :disabled="true"
                    v-model="allergy.substance"
                  />
                  <cornie-input
                    label="Manifestation"
                    placeholder="Autoloaded"
                    :disabled="true"
                     v-model="allergy.manifestation"
                  />
                  <cornie-input
                    label="Description"
                    placeholder="Autoloaded"
                    :disabled="true"
                     v-model="reaction.description"
                  />

                  <div class="">
                    <date-picker :label="'Onset'" v-model="allergy.reaction.onset" :disabled="true" />
                  </div>
                  <cornie-input
                    label="Severity"
                    placeholder="Autoloaded"
                    :disabled="true"
                    v-model="allergy.reaction.severity"
                  />
                  <cornie-input
                    label="Exposure Route"
                    placeholder="Autoloaded"
                    :disabled="true"
                    v-model="allergy.exposureRoute"
                  />
                  <cornie-input
                    label="Note"
                    class="mb-5 w-full"
                    placeholder="Autoloaded"
                    :disabled="true"
                    v-model="allergy.reaction.note"
                  >
                  </cornie-input>
                </div>
              </template>
            </accordion-component>
          </div>
        </v-form>
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="closeModal"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Close
          </cornie-btn>
          <!-- <cornie-btn
            :loading="loading"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn> -->
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { string, date } from "yup";
import search from "@/plugins/search";
import { useFHIRDefinition } from "@/composables/useFHIRDefinition";

import IAllergy from "@/types/IAllergy";
import IPractitioner from "@/types/IPractitioner";

import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import DEdit from "@/components/icons/aedit.vue";
import DatePicker from "@/components/datepicker.vue";
import CDelete from "@/components/icons/adelete.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import FhirInput from "@/components/fhir-input.vue";
import DateTimePicker from "@/components/date-time-picker.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import Avatar from "@/components/avatar.vue";

import OnsetPicker from "./onset.vue";

const user = namespace("user");
const allergy = namespace("allergy");
const practitioner = namespace("practitioner");

const timeable = {
  age: null,
  start: null,
  startTime: null,
  end: null,
  endTime: null,
  date: null,
  time: null,
};

const measurable = {
  age: null,
  ageUnit: null,
  ageValue: null,
  day: null,
  unit: null,
  min: null,
  minUnit: null,
  minValue: null,
  max: null,
  maxUnit: null,
  maxValue: null,
  string: null,
  startDate: null,
  startTime: null,
  endDate: null,
  date: null,
  time: null,
  endTime: null,
};

@Options({
  name: "viewAlergyModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
    DEdit,
    CDelete,
    CancelIcon,
    Avatar,
    InfoIcon,
    CornieDialog,
    SearchIcon,
    AccordionComponent,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    CornieTable,
    OnsetPicker,
    FhirInput,
    DateTimePicker,
    CustomCheckbox,
  },
})
export default class viewAlergyModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, required: true })
  allergy!: any;

  @user.Getter
  authPractitioner!: IPractitioner;

  @allergy.Action
  getAllergyById!: (id: string) => IAllergy;

    @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  loading = false;
  required = string().required();
  emailRule = string().email().required();
  requiredRule = string().required();
  query = "";
  showRecorder = false;

  onsetmesurable = { ...measurable };

  // clinicalStatus = "active";
  // verificationStatus = "confirmed";
  // type = "";
  // category = "";
  // criticality = "";
  // code = "";
reaction = {
    substance: "",
    manifestation: "",
    description: "",
    onset: "",
    severity: "",
    exposureRoute: "",
    note: "",
  }; 
  recorderId = "";
  asserterId = "";
  occurences = [] as any;
  setOccurence = "";
  setOccurencetime = "";
  recordDate = "";
  note = "";


  clinicalStatus = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/condition-clinical")
  );
  verificationStatus = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/condition-ver-status")
  );

  code = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/allergyintolerance-code")
  );
   type = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/allergy-intolerance-type")
  );
   category = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/allergy-intolerance-category")
  );
   criticality = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/allergy-intolerance-criticality")
  );
   substance = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/substance-code")
  );
   manifestation = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/clinical-findings")
  );
   exposureRoute = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/route-codes")
  );

  get item() {
    return this.allergy || {};
  }


  separateTime(date:string){
    const [newtime, ..._]  = new Date(date).toTimeString().split(" ")
    return date ? newtime :''
  }

  @Watch("id")
  idChanged() {
    this.setAllergy();
  }

  async setAllergy() {
    const allergy = await this.getAllergyById(this.id);
    if (!allergy) return;
    // this.clinicalStatus = allergy.clinicalStatus;
    // this.verificationStatus = allergy.verificationStatus;
    // this.type = allergy.type;
    // this.category = allergy.category;
    // this.criticality = allergy.criticality;
    // this.code = allergy.code;
    //this.onset = allergy.onset;
    this.occurences = allergy.occurences;
    this.note = allergy.note;
    this.reaction = allergy.reaction;
    this.recordDate = new Date(allergy.recordDate).toLocaleDateString();
    this.asserterId = allergy.asserterId;
    this.recorderId = allergy.recorderId;
  }

  get payload() {
    return {};
  }

  newDate(){
    return new Date(this.recordDate).toLocaleDateString()
  }

  closeModal(){
    this.show = false ;
    this.id = "";
    this.allergy = {}
    this.$emit('close')
  }

   get recorder(){
    this.recorderId = this.authPractitioner.id;
    return this.authPractitioner.firstName +' '+ this.authPractitioner.lastName
  }

  done() {
    this.show = false;
    this.$emit("requestAdded");
  }
  newsubstance = this.item?.reaction?.substance;

    loadDefinitions() {
      
       this.clinicalStatus.code = this.allergy?.clinicalStatus;
      this.verificationStatus.code = this.item?.verificationStatus;
      this.category.code = this.allergy?.category;
      this.type.code = this.allergy?.type;
      this.code.code = this.allergy?.code;
      this.criticality.code = this.allergy?.criticality;
      this.substance.code = this.allergy?.reaction?.substance;
      this.manifestation.code = this.allergy?.reaction?.manifestation;
      this.exposureRoute.code = this.allergy?.reaction?.exposureRoute;
  }

    getPractitionerName(id: string) {
    const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }

  getPractImage(id:string){
    const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.image}` : "";
  }

  getPractDepartment(id: string){
    const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.department}` : "";
  }

  get occur(){
    return this.occurences[this.occurences?.length - 1] as any || ""
  }

  async created() {
    this.setAllergy();
    await this.loadDefinitions();
    this.fetchPractitioners();

    this.type;
  }
  mounted(){
    this.loadDefinitions();
     this.clinicalStatus.code = this.allergy?.clinicalStatus;
      this.verificationStatus.code = this.item?.verificationStatus;
      this.category.code = this.allergy?.category;
      this.type.code = this.allergy?.type;
      this.code.code = this.allergy?.code;
      this.criticality.code = this.allergy?.criticality;
      this.substance.code = this.allergy?.reaction?.substance;
      this.manifestation.code = this.allergy?.reaction?.manifestation;
      this.exposureRoute.code = this.allergy?.reaction?.exposureRoute;
  }
}
</script>

<style></style>
