<template>
  <big-dialog v-model="show" :title="newaction" class="">
    <v-form ref="form">
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component title="Basic Info" :opened="true">
          <div class="grid grid-cols-2 gap-3 mt-3">
            <cornie-input
              :rules="required"
              label="Name"
              class="w-full"
              v-model="name"
              required
            />
            <fhir-input
              reference="http://hl7.org/fhir/ValueSet/v3-FamilyMember"
              class="w-full"
              v-model="relationship"
              label="Relationship"
              placeholder="Select"
              :rules="required"
              required
            />
            <!-- <cornie-select
              class="w-full"
              label="Relationship"
              :rules="required"
              :items="[
                'Brother',
                'Sister',
              ]"
              :placeholder="'Select'"
              v-model="relationship"
            /> -->
            <cornie-select
              class="w-full"
              label="Sex"
              :rules="required"
              :items="['Male', 'Female', 'Other']"
              :placeholder="'Select'"
              v-model="sex"
              required
            />
          </div>
        </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component title="Born" :opened="false">
          <born-picker
            label="Year"
            v-model="bornTimeable"
            class="w-full mb-5"
            required
          />
        </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component title="Age" :opened="false">
          <age-measurable label="Age" v-model="agemesurable" />
          <div class="mt-5">
            <span class="text-sm font-semibold mb-3 text-black"
              >Estimated Age?
            </span>
            <div class="flex space-x-4 mt-5">
              <cornie-radio
                name="estimate"
                :value="true"
                label="Yes"
                v-model="estimatedAge"
              />
              <cornie-radio
                name="estimate"
                :label="'No'"
                :value="false"
                v-model="estimatedAge"
              />
            </div>
          </div>
        </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component :opened="false" title="Deceased">
          <div class="mt-5">
            <span class="text-sm font-semibold mb-3 text-black">Deceased</span>
            <div class="flex space-x-4 mt-5">
              <cornie-radio
                name="Deceased"
                :value="true"
                label="Yes"
                v-model="deceased"
              />
              <cornie-radio
                name="Deceased"
                label="No"
                :value="false"
                v-model="deceased"
              />
            </div>
            <deaceased-measurable
              label="Deceased Age"
              v-model="deceasedmeasurable"
              v-if="deceased == true"
            />
            <div class="mt-5" v-if="deceased == true">
              <span class="text-sm font-semibold mb-3 text-black"
                >Estimated Age?</span
              >
              <div class="flex space-x-4 mt-5">
                <cornie-radio
                  name="estimate"
                  :value="true"
                  label="Yes"
                  v-model="estimatedDeceased"
                />
                <cornie-radio
                  name="estimate"
                  label="No"
                  :value="false"
                  v-model="estimatedDeceased"
                />
              </div>
            </div>
          </div>
          <!-- <div class="grid grid-cols-3 gap-4 w-full mt-5 mb-5">
              <div class="bg-white shadow-md rounded-lg p-3" v-for="(item, i) in references"
                                  :key="i">
                <span class="text-danger font-bold">Reason Reference</span>
                <div class="flex space-x-4 w-full mt-4 mb-3">
                  <div class="w-full">
                    <p class="text-sm text-black font-bold">{{ item?.category }}</p>
                    <p class="text-gray-400 text-xs">xxxxxxx</p>
                    <p class="text-xs text-black">Dr. {{ getPractitionerName(item?.practitionerId) }} <span class="text-gray-400 text-xs">{{ getPractitonerJob(item?.practitionerId) }}</span></p>
                  </div>
                  <div class="flex w-full justify-end">
                    <delete-icon @click="deleteRef(i)"/>
                  </div>

                </div>

              </div>
            </div> -->
        </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component
          :opened="false"
          title="Reason for History (Patient)"
        >
          <div class="grid grid-cols-2 gap-2 mt-5">
            <fhir-input
              reference="http://hl7.org/fhir/ValueSet/clinical-findings"
              class="w-full"
              label="Reason Code"
              :rules="required"
              :placeholder="'--Select--'"
              v-model="reasonCode"
              required
            />
            <!-- <cornie-select
                    class="w-full"
                    label="Reason Code"
                    :items="[
                      'Anxiety disorder of childhood OR adolescence',
                      'Choroidal hemorrhage',
                      'Accident-prone',
                      'Injury of ascending right colon without open wound into abdominal cavity',
                      'Poisoning by sawfly larvae',
                    ]"
                    :rules="required"
                    :placeholder="'--Select--'"
                    v-model="reasonCode"
                  /> -->
            <div>
              <p class="text-sm text-black font-semibold mb-1">
                Reason Reference
              </p>
              <div
                class="flex w-full border-2 border-gray-200 bg-gray-100 rounded-lg py-2 px-4 cursor-pointer"
                @click="showRefModal = true"
              >
                <span class="w-full">{{ reasonReference }}</span>
                <span class="flex justify-end w-full">
                  <plusIcon class="fill-current text-danger mt-1" />
                </span>
              </div>
            </div>
            <!-- <cornie-select
                    v-model="reasonReference"
                    label="Reason Reference"
                    class="w-full"
                    :items="[
                      'Anxiety disorder of childhood OR adolescence',
                      'Spontaneous abortion with laceration of cervix',
                      'Spontaneous abortion with laceration of cervix',
                      '	Homoiothermia',
                      '	Decreased hair growth',
                      '	Chronic pharyngitis',
                      'Normal peripheral vision',
                    ]"
                    :rules="required"
                    :placeholder="'--Select--'"
                  /> -->
            <cornie-input
              v-model="note"
              class="w-full"
              label="Note"
              :placeholder="'Enter'"
            />
          </div>
        </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component :opened="false" title="Condition (Related Person)">
          <div class="grid grid-cols-2 gap-2 mt-5">
            <fhir-input
              reference="http://hl7.org/fhir/ValueSet/condition-code"
              class="w-full"
              label="Condition Code"
              :rules="required"
              :placeholder="'--Select--'"
              v-model="conditionCode"
              required
            />
            <!-- <cornie-select
                    class="w-full"
                    v-model="conditionCode"
                    label="Condition Code"
                    :items="[
                      'Anxiety disorder of childhood OR adolescence',
                      'Choroidal hemorrhage',
                      'Accident-prone',
                      'Injury of ascending right colon without open wound into abdominal cavity',
                      'Poisoning by sawfly larvae',
                    ]"
                    :rules="required"
                    :placeholder="'--Select--'"
                  /> -->
            <fhir-input
              reference="http://hl7.org/fhir/ValueSet/condition-outcome"
              class="w-full"
              label="Outcome"
              :rules="required"
              :placeholder="'--Select--'"
              v-model="conditionOutcome"
              required
            />
            <!-- <cornie-select
                    v-model="conditionOutcome"
                    label="Outcome"
                    class="w-full"
                    :items="[
                      'Anxiety disorder of childhood OR adolescence',
                      'Spontaneous abortion with laceration of cervix',
                      'Spontaneous abortion with laceration of cervix',
                      '	Homoiothermia',
                      '	Decreased hair growth',
                      '	Chronic pharyngitis',
                      'Normal peripheral vision',
                    ]"
                    :rules="required"
                    :placeholder="'--Select--'"
                  /> -->
            <div class="mt-5">
              <span class="text-sm font-semibold mb-3 text-black"
                >Contributed to Death?</span
              >
              <div class="flex space-x-4 mt-5">
                <cornie-radio
                  name="to"
                  :value="true"
                  label="Yes"
                  v-model="conditionContributedToDeath"
                />
                <cornie-radio
                  name="to"
                  label="No"
                  :value="false"
                  v-model="conditionContributedToDeath"
                />
              </div>
            </div>
          </div>
        </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component :opened="false" title="Onset">
          <onset-picker v-model="onsetmesurable" label="Onset" />
          <cornie-text-area
            v-model="onsetNote"
            placeholder="Placeholder"
            label="Notes"
            class="w-full"
            rows="4"
          />
        </accordion-component>
      </div>
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
        @click="apply"
        class="text-white bg-danger px-3 rounded-xl"
      >
        Save
      </cornie-btn>
    </template>
  </big-dialog>
  <reference-modal @ref-value="refvalue" v-model="showRefModal" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { string } from "yup";
import { cornieClient } from "@/plugins/http";

import { IPatient } from "@/types/IPatient";
import IPractitioner from "@/types/IPractitioner";
import Period from "@/types/IPeriod";

import BigDialog from "@/components/bigdialog.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieNumInput from "@/components/cornienuminput.vue";
import CornieTextArea from "@/components/textarea.vue";
import AgeMeasurable from "./components/ageMeasurable.vue";
import DeaceasedMeasurable from "./components/deaceasedMeasurable.vue";
import plusIcon from "@/components/icons/plus.vue";
import AutoComplete from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import TimeablePicker from "@/components/timeable.vue";
import DeceasedPicker from "@/components/deaceased.vue";
import BornPicker from "@/components/bornable.vue";
import OnsetPicker from "@/components/onset.vue";
import DeleteIcon from "@/components/icons/deleteorange.vue";
import CornieRadio from "@/components/cornieradio.vue";
import FhirInput from "@/components/fhir-input.vue";

import DatePicker from "./datepicker.vue";
import ReferenceModal from "./reference.vue";

const practitioner = namespace("practitioner");

import Ihistory, {
  OnSet,
  Age,
  Born,
} from "@/types/Ihistory";

const history = namespace("history");
const patients = namespace("patients");

const timeable = {
  age: null,
  startDate: null,
  startTime: null,
  endDate: null,
  endTime: null,
  date: null,
  time: null,
};

const measurable = {
  age: null,
  ageUnit: null,
  ageValue: null,
  day: null,
  unit: "years",
  min: null,
  max: null,
  string: null,
  startDate: null,
  startTime: null,
  endDate: null,
   minUnit: null,
 maxUnit: null,
};
@Options({
  name: "HistoryDialog",
  components: {
    BigDialog,
    TimeablePicker,
    CornieNumInput,
    CornieBtn,
    DeleteIcon,
    AutoComplete,
    DeceasedPicker,
    DatePicker,
    OnsetPicker,
    AgeMeasurable,
    DeaceasedMeasurable,
    plusIcon,
    AccordionComponent,
    ReferenceModal,
    CornieSelect,
    CornieInput,
    CornieRadio,
    CornieTextArea,
    BornPicker,
    FhirInput,
  },

})
export default class HistoryDialog extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @PropSync("modelValue")
  show!: boolean;

  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @history.Action
  gethistoryById!: (id: string) => Ihistory;

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  required = string().required();

  @Watch("id")
  idChanged() {
    this.setHistory();
  }

  historymodel = {} as Ihistory;

  showRefModal = false;
  condtions = [];
  allergy = [];
  refItems = [];
  references = [] as any;
  loading = false;


  name = "";
  relationship =  "";
  sex = "";
  status = "completed";
  // born = { ...timeable };

  // age = { ...measurable };
  estimatedAge = false;
  ageValue = "";
  ageUnit = "";
  deceased = false;
  estimatedDeceased = false;
  // deceasedAge = { ...measurable };

  reasonCode = "";
  reasonReference = "Reason Reference";
  note = "";
  conditionCode = "";
  conditionOutcome = "";
  conditionContributedToDeath = false;



  // startAndEndDateTimeStart = "";
  // startAndEndDateTimeEnd = "";
  // bornDateTime = "";
  bornTimeable = { ...timeable };
  yearString = "";

  agemesurable = { ...measurable };
  oneage = 0;


  deceasedtimeable = { ...timeable };
  deceasedmeasurable = { ...measurable };

  diseasedBoolean = false;
  deceasedRangeMin = "";
  deceasedRangeMax = "";
  deceasedDate = "";
  deceasedString = "";
  condition = "condition";
  code = "";
  outcome = "";
  contributedToDeath = false;


  onsetmesurable = { ...measurable };
  onsetNote = "";


  get patientId() {
    return this.$route.params.id as string;
  }
  // get asinglename() {
  //   return this.PatientName.firstname + " " + this.PatientName.lastname;
  // }
  getPatientName(id:string) {
    const pt = this.patients.find((i: any) => i.id === id);
    return pt ? `${pt.firstname} ${pt.lastname}` : "";
  }
  getPractitionerName(id: string) {
        const pt = this.practitioners.find((i: any) => i.id === id);
        return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }

  getPractitonerJob(id: string) {
        const pt = this.practitioners.find((i: any) => i.id === id);
        return pt ? `${pt.jobDesignation}` : "";
  }

  deleteRef(index: number) {
        this.references.splice(index, 1);
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
    // const period = {
    //    start: this.onsetmesurable.startDate,
    //     end: this.onsetmesurable.endDate,
    //     startTime: this.onsetmesurable.startTime,
    //     endTime: this.onsetmesurable.endTime,
    
    // }; 
    return {
      range: this.isEmptyObject (range) ? undefined : range,
      age: this.isEmptyObject (age) ? undefined : age,
      year: this.onsetmesurable.string || null,
     // period:this.isEmptyObject (period) ? undefined : period,
    };
  }




  get born() {
     const period = {
      start: this.bornTimeable.startDate,
          end: this.bornTimeable.endDate
    
    }; 
    return {
      //bornDateTimePeriod: { start: this.bornTimeable.startDate, end: this.bornTimeable.endDate },
     period:this.isEmptyObject (period) ? undefined : period,
      dateTime: this.bornTimeable.date || null,
      year: this.bornTimeable.age || null,
    };
  }


  get age() {
    const range = {
       unit: this.agemesurable.minUnit,
        min: this.agemesurable.min,
        max: this.agemesurable.max,
    
    }; 
    const age = {
      unit: this.agemesurable.ageUnit,
        value: this.agemesurable.ageValue,
    
    }; 
    return {
      estimated: this.estimatedAge || null,
      year: this.agemesurable.string || null,
      range: this.isEmptyObject (range) ? undefined : range,
     age: this.isEmptyObject (age) ? undefined : age,

    };
  }

  get deceasedAge() {
      const range = {
       unit: this.deceasedmeasurable.minUnit,
          min:  this.deceasedmeasurable.min,
          max: this.deceasedmeasurable.max
    
    }; 
    const age = {
       unit: this.deceasedmeasurable.ageUnit,
          value: this.deceasedmeasurable.ageValue,
    
    };
    return {
       estimated: this.estimatedDeceased,
        year: this.deceasedmeasurable.string || null,
        range: this.isEmptyObject (range) ? undefined : range,
      age: this.isEmptyObject (age) ? undefined : age,
    };
  }
  async setNewHistoryModel() {
    this.historymodel = JSON.parse(JSON.stringify(this.payload));
  }

  async setHistory() {
    const history = await this.gethistoryById(this.id);
    if (!history) return;
    this.historymodel = history;

     this.onsetmesurable.ageUnit = history?.onset?.age?.unit || null;
     this.onsetmesurable.ageValue = history?.onset?.age?.value || null;
     this.onsetmesurable.unit = history?.onset?.range?.unit
     this.onsetmesurable.max = history?.onset?.range?.max || null;
     this.onsetmesurable.min = history?.onset?.range?.min || null;
     this.onsetmesurable.startDate = history?.onset?.period?.start || null;
     this.onsetmesurable.endDate = history?.onset?.period?.end || null;
     this.onsetNote = history?.onsetNote;
     this.deceased = history?.deceased;
     this.deceasedmeasurable.ageUnit = history?.deceasedAge?.age?.unit || null;
     this.deceasedmeasurable.ageValue = history?.deceasedAge?.age?.value || null;
     this.deceasedmeasurable.unit = history?.deceasedAge?.range?.unit;
     this.deceasedmeasurable.max = history?.deceasedAge?.range?.max;
     this.deceasedmeasurable.min = history?.deceasedAge?.range?.min|| null;
     this.deceasedmeasurable.string = history?.deceasedAge?.year || null;
     this.reasonCode = history?.reasonCode;
     this.reasonReference = history?.reasonReference;
     this.note = history?.note;
     this.agemesurable.ageUnit = history?.age?.age?.unit || null;
     this.agemesurable.ageValue = history?.age?.age?.value || null;
     this.agemesurable.unit = history?.age?.range?.unit;
     this.agemesurable.max = history?.age?.range?.max || null;
     this.agemesurable.min = history?.age?.range?.min || null;
     this.agemesurable.string = history?.age?.year || null;
     this.estimatedAge = history?.age?.estimated;
     this.relationship = history?.relationship;
     this.sex = history?.sex;
     this.conditionCode = history?.conditionCode;
     this.conditionOutcome = history?.conditionOutcome;
     this.conditionContributedToDeath = history?.conditionContributedToDeath;
     this.onsetNote = history?.onsetNote;
     this.name = history?.name;
     this.bornTimeable.age = history?.born?.year || null;
     this.bornTimeable.date = history?.born?.dateTime || null;
     this.bornTimeable.startDate = history?.born?.period?.start || null;
     this.bornTimeable.endDate = history?.born?.period?.end || null;
     this.status = history.status;

  }

  get payload() {
    return {
      patientId: this.patientId,
      born: this.born,
      age: this.age,
      status: this.status,
      deceased: this.deceased,
      onset: this.onset,
      reasonCode: this.reasonCode,
      reasonReference: this.reasonReference,
      note: this.note || undefined,
      conditionCode: this.conditionCode,
      conditionOutcome: this.conditionOutcome,
      conditionContributedToDeath: this.conditionContributedToDeath,
      name: this.name,
      relationship: this.relationship,
      sex: this.sex,
      deceasedAge: this.deceased == false ? undefined : this.deceasedAge,

    };
  }
  reset(){
    this.status ="";
    this.reasonCode = "";
    this.reasonReference ="";
    this.note = "";
    this.conditionCode = "";
    this.conditionOutcome = "";
    this.conditionContributedToDeath = false;
    this.name = "";
    this.relationship = "";
    this.sex = "";
  }
  get newaction() {
    return this.id ? "Update History" : "Create New";
  }
  async showRef(value: any) {
    this.showRefModal = true;
    this.reasonReference = value;
  }
  refvalue(value:any, type:string){
    this.references.push(value);
    this.reasonReference = type;
    console.log(value, 'npm install numeral');
  }
  done() {
    this.$emit("history-added");
    this.show = false;
  }
  async apply() {
    this.loading = true;
    if (this.id) await this.updatehistory();
    else await this.createhistory();
    this.loading = false;
  }
  async createhistory() {
     const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;

    try {
      const response = await cornieClient().post(
        "/api/v1/family-history",
        this.payload
      );
      if (response.success) {
        window.notify({
          msg: "Medical family history created",
          status: "success",
        });
        this.done();
        this.reset();
      }
    } catch (error:any) {
      window.notify({
        msg: "Medical family history not created",
        status: "error",
      });
    }
  }
  async updatehistory() {
    const url = `/api/v1/family-history/${this.id}`;
    const payload = {
      ...this.payload,
    };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Medical history  updated", status: "success" });
        this.done();
      }
    } catch (error) {
      window.notify({ msg: "Medical history not updated", status: "error" });
    }
  }
  async fetchAllergy() {
    const AllAllergy = cornieClient().get(
      `/api/v1/allergy/findAllByPatient/${this.patientId}`
    );
    const response = await Promise.all([AllAllergy]);
    this.allergy = response[0].data;
  }

  async created() {
    this.setHistory();
    if(this.patientId) this.fetchAllergy();
    await this.fetchPractitioners();
  }
}
</script>
<style scoped>
.aadd {
  float: right;
  position: relative;
  bottom: 30px;
  margin-right: 10px;
}
</style>
