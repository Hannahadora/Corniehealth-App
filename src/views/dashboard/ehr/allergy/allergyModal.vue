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
            {{ newaction }}
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="closeModal"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Basic Info" :opened="true">
              <template v-slot:default>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full">
                  <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/allergy-intolerance-type"
                    class="required w-full"
                    v-model="type"
                    label="type"
                    placeholder="Select"
                    required
                  />

                  <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/allergy-intolerance-category"
                    class="required w-full"
                    v-model="category"
                    label="category"
                    placeholder="Select"
                    required
                  />

                  <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/allergy-intolerance-criticality"
                    class="required w-full"
                    label="criticality"
                    v-model="criticality"
                    placeholder="Select"
                    required
                  />
                  <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/allergyintolerance-code"
                    class="required w-full"
                    label="code"
                    v-model="code"
                    placeholder="Select"
                    required
                  />
                </div>
              </template>
            </accordion-component>
          </div>

          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Onset" :opened="false">
              <template v-slot:default>
                <div>
                  <onset-picker v-model="onsetmesurable" label="Onset" />
                </div>
              </template>
            </accordion-component>
          </div>

          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Recorded" :opened="false">
              <template v-slot:default>
                <div class="mt-8 grid grid-cols-2 gap-4 w-full">
                  <!-- <div class="">
                    <date-picker :label="'Date'"  v-model="recordDate"/>
                  </div> -->
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
                        v-model="asserterId"
                        :value="authPractitioner.id"
                      />
                    </template>
                    <!-- <template #append-inner>
                      <span class="bg-primary py-2.5 px-3 -mr-2 rounded cursor-pointer" @click="showRecorder = true">
                        <d-edit class="fill-current text-white" />
                      </span>
                    </template> -->
                  </cornie-input>
                  <div>
                    <date-time-picker
                      :label="'Last Occurence'"
                      v-model:date="setOccurence"
                      v-model:time="setOccurencetime"
                    />
                  </div>
                  <cornie-input
                    label="Note"
                    class="mb-5 w-full"
                    placeholder="Enter"
                    v-model="note"
                  >
                  </cornie-input>
                </div>
              </template>
            </accordion-component>
          </div>

          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Reaction" :opened="false">
              <template v-slot:default>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full">
                  <fhir-input
                    v-model="reaction.substance"
                    reference="http://hl7.org/fhir/ValueSet/substance-code"
                    class="required w-full"
                    label="substance"
                    placeholder="select"
                  ></fhir-input>
                  <fhir-input
                    v-model="reaction.manifestation"
                    reference="http://hl7.org/fhir/ValueSet/clinical-findings"
                    class="w-full mb-2"
                    label="manifestation"
                    placeholder="select"
                  ></fhir-input>
                  <cornie-input
                    v-model="reaction.description"
                    label="Description"
                    class="-mt-5 w-full"
                    placeholder="Enter"
                  >
                  </cornie-input>
                  <div class="-mt-5">
                    <date-picker :label="'Onset'" v-model="reaction.onset" />
                  </div>
                  <cornie-select
                    class="w-full"
                    :rules="required"
                    :items="['Mid', 'Medium', 'Severe']"
                    placeholder="Select"
                    label="Severity"
                    v-model="reaction.severity"
                  ></cornie-select>
                  <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/route-codes"
                    class="w-full mb-2"
                    label="Exposure Route"
                    placeholder="select"
                    v-model="reaction.exposureRoute"
                  ></fhir-input>
                  <cornie-input
                    v-model="reaction.note"
                    label="Note"
                    class="mb-5 w-full"
                    placeholder="Enter"
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
            Cancel
          </cornie-btn>
          <cornie-btn
            v-if="!id"
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
          <!-- <cornie-btn
            v-else
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Update
          </cornie-btn> -->
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>

  <recorder-modal v-model="showRecorder" />
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { string, date } from "yup";
import search from "@/plugins/search";

import IPractitioner from "@/types/IPractitioner";
import IAllergy, { OnSet, Reaction } from "@/types/IAllergy";
import User, { CornieUser } from "@/types/user";

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
import OnsetPicker from "./components/onset.vue";
import FhirInput from "@/components/fhir-input.vue";
import DateTimePicker from "@/components/date-time-picker.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";

import RecorderModal from "./components/recorder.vue";

const user = namespace("user");
const allergy = namespace("allergy");

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
  name: "AlergyModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
    DEdit,
    CDelete,
    CancelIcon,
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
    RecorderModal,
  },
})
export default class AlergyModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @user.Getter
  authPractitioner!: IPractitioner;

  @user.State
  user!: User;

  @allergy.Action
  getAllergyById!: (id: string) => IAllergy;

  loading = false;
  required = string().required();
  emailRule = string().email().required();
  requiredRule = string().required();
  query = "";
  showRecorder = false;

  onsetmesurable = { ...measurable };

  clinicalStatus = "active";
  verificationStatus = "unconfirmed";
  type = "";
  category = "";
  criticality = "";
  code = "";

  recorderId = "";
  asserterId = "";
  occurences = [] as any;
  setOccurence = "";
  setOccurencetime = "";
  recordDate = new Date().toString();
  note = "";

  reaction = {} as  Reaction

  // get reaction (){
  //   return {
  //     substance: "",
  //     manifestation: "",
  //     description: "",
  //     onset: "",
  //     severity: "",
  //     exposureRoute: "",
  //     note: ""
  //  }
  // }

  @Watch("id")
  idChanged() {
    this.setAllergy();
  }

  async setAllergy() {
    const allergy = await this.getAllergyById(this.id);
    if (!allergy) this.reset();
    this.clinicalStatus = allergy?.clinicalStatus;
    this.verificationStatus = allergy?.verificationStatus;
    this.type = allergy?.type;
    this.category = allergy?.category;
    this.criticality = allergy?.criticality;
    this.code = allergy?.code;
    //this.onset = allergy.onSet;
    this.occurences = allergy?.occurences;
     this.note = allergy?.note;
    this.reaction.substance = allergy?.reaction.substance;
    this.reaction.manifestation = allergy?.reaction.manifestation;
    this.reaction.description = allergy?.reaction.description;
    this.reaction.onset = allergy?.reaction.onset;
    this.reaction.severity = allergy?.reaction.severity;
    this.reaction.exposureRoute = allergy?.reaction.exposureRoute;
    this.reaction.note = allergy?.reaction.note;
    //this.recordDate = new Date(allergy.recordDate).toLocaleDateString();
    this.asserterId = allergy?.asserterId;
    this.recorderId = allergy?.recorderId;
    this.setOccurence = this?.occur?.time
    this.setOccurencetime = this.separateTime(this?.occur?.time);
  }

  getDate(allergy:any){
      return allergy.map((c:any) => c.time.join(''));
  }
  separateTime(date:string){
    const [newtime, ..._]  = new Date(date).toTimeString().split(" ")
    return date ? newtime :''
  }

   get occur(){
    if(this.occurences !== undefined) return this.occurences[0]
  }

  get patientId() {
    return this.$route.params.id as string;
  }

isEmptyObject(object:any){
  const nonNulls = Object.entries(object).filter(([k,v]) => Boolean (v))
  return nonNulls.length <1
}

 get onset() {
   const range = {
      unit: this.onsetmesurable.unit,
      min: this.onsetmesurable.min,
      max: this.onsetmesurable.max
    
    }; 
    const age = {
       unit: this.onsetmesurable.ageUnit,
        value: this.onsetmesurable.ageValue,
    
    }; 
    const period = {
       start: this.onsetmesurable.startDate,
        end: this.onsetmesurable.endDate,
        startTime: this.onsetmesurable.startTime,
        endTime: this.onsetmesurable.endTime,
    
    }; 
    return {
      range: this.isEmptyObject (range) ? undefined : range,
      age: this.isEmptyObject (age) ? undefined : age,
      string: this.onsetmesurable.string || null,
      period:this.isEmptyObject (period) ? undefined : period,
    };
  }

 get newaction() {
    return this.id ? "Edit Allergy" : "Create New";
  }

  safeBuildDateTime(dateString: string, time: string) {
    try {
      return this.buildDateTime(dateString, time);
    } catch (error) {
      return;
    }
  }
  buildDateTime(dateString: string, time: string) {
    const date = new Date(dateString);
    const [hour, minute] = time.split(":");
    date.setMinutes(Number(minute));
    date.setHours(Number(hour));
    return date.toISOString();
  }

   setOccurenceTIme(date:string, time:string){
        this.occurences?.push({time: this?.safeBuildDateTime(date, time)})
  }
    get recorder(){
     if(this.setOccurence) this.setOccurenceTIme(this.setOccurence, this.setOccurencetime)
    this.recorderId = this.authPractitioner.id;
    return this.authPractitioner.firstName +' '+ this.authPractitioner.lastName
  }
    newoccurpp = this.occurences.filter((c:any) => c.time !== undefined)

  reset(){
      this.clinicalStatus = '',
      this.verificationStatus = '',
      this.type = '',
      this.category = '',
      this.criticality = '',
      this.code = '',
      this.newoccurpp = [],
      this.recordDate = '',
      this.note = '',
      this.authPractitioner.id = '',
      this.recorderId = '', 
      this.reaction
   
  }

  get payload() {
    const newoccur = this.occurences?.filter((c:any) => c?.time != undefined)
    return {
      clinicalStatus: this.clinicalStatus,
      verificationStatus: this.verificationStatus,
      patientId: this.patientId,
      type: this.type,
      category: this.category,
      criticality: this.criticality,
      code: this.code,
      onset: this.onset,
      reaction: this.reaction,
      occurences: newoccur,
      recordDate: new Date().toISOString(),
      note: this.note || undefined,
      asserterId: this.authPractitioner.id || undefined,
      recorderId: this.authPractitioner.id || undefined,

    };
  }
  closeModal(){
    this.show = false;
  }
  async submit() {
    this.loading = true;
    if (this.id) await this.updateAllergy();
    else await this.createAllergy();
    this.loading = false;
  }


 async createAllergy() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    console.log(this.payload)
    try {
      const { data } = await cornieClient().post("/api/v1/allergy",this.payload);
      window.notify({ msg: "Allergy Saved", status: "success" });
      this.done();
      //this.reset();
    } catch (error:any) {
      window.notify({ msg: "Allergy Not Saved", status: "error" });
    }
  }

  async updateAllergy() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;

    const id = this.id;
    const url = `/api/v1/allergy/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        window.notify({
          msg: "Allergy Updated",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: "Allergy Not Updated", status: "error" });
    }
  }

  done() {
    this.$emit("allergy-added");
    this.show = false;
  }

  async created() {
    if(this.id) this.setAllergy()

  }
}
</script>

<style></style>
