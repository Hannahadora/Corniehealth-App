<template>
  <big-dialog
    v-model="show"
    title="View  History"
    class=""
    :id="newhistoryId"
    :horizontal="true"
  >
    <div class="w-full">
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component title="Basic Info" :opened="true">
          <div class="grid grid-cols-2 gap-3 mt-3">
            <cornie-input
              label="Name"
              class="w-full"
              v-model="selectedItem.name"
              :disabled="true"
            />
            <cornie-input
              label="Relationship"
              class="w-full"
              v-model="selectedItem.relationship"
              :disabled="true"
            />
            <cornie-input
              label="Sex"
              class="w-full"
              v-model="selectedItem.sex"
              :disabled="true"
            />
          </div>
        </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component title="Born" :opened="true">
          <div class="mt-5">
              <cornie-radio v-if="selectedItem.born.dateTime" name="date/time" label="Date/Time" :disabled="true"/>
              <cornie-radio v-if="selectedItem.born.year" name="yer" label="Year" :disabled="true"/>
              <cornie-radio v-if="selectedItem.born.period" name="period" label="Period" :disabled="true"/>

          </div>
           <div class="grid grid-cols-2 gap-4 mt-3 w-full">
              <date-time-picker
              v-if="selectedItem.born.dateTime"
                v-model:date="selectedItem.born.dateTime"
                v-model:time="selectedItem.born.dateTime"
                label="Date/Time"
                class="w-full"
                 :disabled="true"
              />
              <cornie-input
                v-if="selectedItem.born.year"
                v-model="selectedItem.born.year"
                label="Year"
                class="w-full"
                placeholder="year"
                :disabled="true"
              />
              <date-time-picker
               v-if="selectedItem.born.period"
                v-model:date="selectedItem.born.period.start"
                v-model:time="selectedItem.born.period.start"
                label="Start Date/Time"
                class="w-full"
                 :disabled="true"
              />
              <date-time-picker
               v-if="selectedItem.born.period"
                v-model:date="selectedItem.born.period.end"
                v-model:time="selectedItem.born.period.end"
                label="End Date/Time"
                class="w-full"
                 :disabled="true"
              />
            </div>
        </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component title="Age" :opened="true">
          <div class="mt-5">
              <cornie-radio v-if="selectedItem.age.year" name="year" label="Year" :disabled="true"/>
              <cornie-radio v-if="selectedItem.age.range" name="range" label="Range" :disabled="true"/>
              <cornie-radio v-if="selectedItem.age.age" name="age" label="Age" :disabled="true"/>
          </div>
           <div class="grid grid-cols-2 gap-4 mt-4"  v-if="selectedItem.age.age">
              <div class="w-full -mt-1">
                  <span class="text-sm font-semibold mb-3">Age</span>
                  <div class="flex  w-full">
                      <cornie-input
                      placeholder="0"
                      class="grow w-full px-0"
                      :setfull="true"
                      v-model="selectedItem.age.age.value"
                      :disabled="true"
                      />
                      <div class="bg-primary rounded-lg h-11 w-32 px-0 mt-1"><p class="text-white p-5 -mt-3">{{ selectedItem.age.age.unit }}</p></div>
                  </div>
              </div>
          </div>
           <div class="grid grid-cols-3 gap-3 mt-4 w-full" v-if="selectedItem.age.range">
              <div class="w-full -mt-1">
                  <span class="text-sm font-semibold mb-3">Range (min)</span>
                  <div class="flex space-x-2 w-full">
                      <cornie-input
                      placeholder="0"
                      class="grow w-full"
                      :setfull="true"
                      v-model="selectedItem.age.range.min"
                      :disabled="true"
                      />
                      <div class="bg-primary rounded-lg h-11 w-32 px-0 mt-1"><p class="text-white p-5 -mt-3">{{ selectedItem.age.range.unit }}</p></div>
                  </div>
              </div>
              <div class="w-full -mt-1">
                  <span class="text-sm font-semibold mb-3">Range (max)</span>
                  <div class="flex space-x-2 w-full">
                      <cornie-input
                      placeholder="0"
                      class="grow w-full"
                      :setfull="true"
                      v-model="selectedItem.age.range.max"
                     :disabled="true"
                      />
                      <div class="bg-primary rounded-lg h-11 w-32 px-0 mt-1"><p class="text-white p-5 -mt-3">{{ selectedItem.age.range.unit }}</p></div>
                  </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-4" v-if="selectedItem.age.year">
              <cornie-input label="Year" v-model="selectedItem.age.year"  :disabled="true"/>
            </div>
            <div class="mt-5">
              <span class="text-sm font-semibold mb-3 text-black">Estimated Age?</span>
              <div class="flex space-x-4 mt-5">
                <cornie-radio
                v-if="selectedItem.age.estimatedAge == true"
                  name="estimateage"
                  :value="true"
                  label="Yes"
                  v-model="selectedItem.age.estimatedAge"
                  :disabled="true"
                />
                 <cornie-radio
                v-if="selectedItem.age.estimatedAge == false"
                  name="estimateage"
                  :value="true"
                  label="No"
                  v-model="selectedItem.age.estimatedAge"
                  :disabled="true"
                />
              </div>
            </div>


        </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component title="Deceased" :opened="true">
          <div class="mt-5">
              <span class="text-sm font-semibold mb-3 text-black">Deceased?</span>
              <div class="flex space-x-4 mt-5">
                <cornie-radio
                v-if="selectedItem.deceased == true"
                  name="estimatede"
                  :value="true"
                  label="Yes"
                  v-model="selectedItem.deceased"
                  :disabled="true"
                />
                 <cornie-radio
                v-if="selectedItem.deceased == false"
                  name="estimatede"
                  :value="true"
                  label="No"
                  v-model="selectedItem.deceased"
                  :disabled="true"
                />
              </div>
            </div>
          <div class="mt-5">
              <cornie-radio v-if="selectedItem.deceasedAge.year" name="year" label="Year" :disabled="true"/>
              <cornie-radio v-if="selectedItem.deceasedAge.range" name="range" label="Range" :disabled="true"/>
              <cornie-radio v-if="selectedItem.deceasedAge.age" name="age" label="Age" :disabled="true"/>
          </div>
           <div class="grid grid-cols-2 gap-4 mt-4"  v-if="selectedItem.deceasedAge.age">
              <div class="w-full -mt-1">
                  <span class="text-sm font-semibold mb-3">Age</span>
                  <div class="flex  w-full">
                      <cornie-input
                        placeholder="0"
                        class="grow w-full px-0"
                        :setfull="true"
                        v-model="selectedItem.deceasedAge.age.value"
                        :disabled="true"
                      />
                      <div class="bg-primary rounded-lg h-11 w-32 px-0 mt-1"><p class="text-white p-5 -mt-3">{{ selectedItem.deceasedAge.age.unit }}</p></div>
                  </div>
              </div>
          </div>
           <div class="grid grid-cols-3 gap-3 mt-4 w-full" v-if="selectedItem.age.range">
              <div class="w-full -mt-1">
                  <span class="text-sm font-semibold mb-3">Range (min)</span>
                  <div class="flex space-x-2 w-full">
                      <cornie-input
                      placeholder="0"
                      class="grow w-full"
                      :setfull="true"
                      v-model="selectedItem.deceasedAge.range.min"
                      :disabled="true"
                      />
                      <div class="bg-primary  rounded-lg h-11 w-32 px-0 mt-1"><p class="text-white p-5 -mt-3">{{ selectedItem.deceasedAge.range.unit }}</p></div>
                  </div>
              </div>
              <div class="w-full -mt-1">
                  <span class="text-sm font-semibold mb-3">Range (max)</span>
                  <div class="flex space-x-2 w-full">
                      <cornie-input
                      placeholder="0"
                      class="grow w-full"
                      :setfull="true"
                      v-model="selectedItem.deceasedAge.range.max"
                     :disabled="true"
                      />
                      <div class="bg-primary rounded-lg h-11 w-32 px-0 mt-1"><p class="text-white p-5 -mt-3">{{ selectedItem.deceasedAge.range.unit }}</p></div>
                  </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-4" v-if="selectedItem.deceasedAge.year">
              <cornie-input label="Year" v-model="selectedItem.deceasedAge.year"  :disabled="true"/>
            </div>
            <div class="mt-5">
              <span class="text-sm font-semibold mb-3 text-black">Estimated Age?</span>
              <div class="flex space-x-4 mt-5">
                <cornie-radio
                v-if="selectedItem.deceasedAge.estimated == true"
                  name="estima"
                  :value="true"
                  label="Yes"
                  v-model="selectedItem.deceasedAge.estimated"
                  :disabled="true"
                />
                 <cornie-radio
                v-if="selectedItem.deceasedAge.estimated == false"
                  name="estima"
                  :value="true"
                  label="No"
                  v-model="selectedItem.deceasedAge.estimated"
                  :disabled="true"
                />
              </div>
            </div>


        </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component title="Reason for History (Patient)" :opened="true">
          <div class="grid grid-cols-2 gap-3 mt-3">
            <cornie-input
              label="Reason Code"
              class="w-full"
              v-model="selectedItem.reasonCode"
              :disabled="true"
            />
            <cornie-input
              label="Reason Reference"
              class="w-full"
              v-model="selectedItem.reasonReference"
              :disabled="true"
            />
            <cornie-input
              label="Note"
              class="w-full"
              v-model="selectedItem.note"
              :disabled="true"
            />
          </div>
        </accordion-component>
      </div>
       <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component title="Condition (Related Person)" :opened="true">
          <div class="grid grid-cols-2 gap-3 mt-3">
            <cornie-input
              label="Condition Code"
              class="w-full"
              v-model="selectedItem.conditionCode"
              :disabled="true"
            />
            <cornie-input
              label="Outcome"
              class="w-full"
              v-model="selectedItem.conditionOutcome"
              :disabled="true"
            />
               <div class="mt-5">
              <span class="text-sm font-semibold mb-3 text-black">Contributed to Death?</span>
              <div class="flex space-x-4 mt-5">
                <cornie-radio
                v-if="selectedItem.conditionContributedToDeath == true"
                  name="death"
                  :value="true"
                  label="Yes"
                  v-model="selectedItem.conditionContributedToDeath"
                  :disabled="true"
                />
                 <cornie-radio
                v-if="selectedItem.conditionContributedToDeath == false"
                  name="death"
                  :value="true"
                  label="No"
                  v-model="selectedItem.conditionContributedToDeath"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component title="Onset" :opened="true">
          <div class="mt-5">
              <cornie-radio v-if="selectedItem.onset.year" name="year" label="Year" :disabled="true"/>
              <cornie-radio v-if="selectedItem.onset.range" name="range" label="Range" :disabled="true"/>
              <cornie-radio v-if="selectedItem.onset.age" name="age" label="Age" :disabled="true"/>
          </div>
           <div class="grid grid-cols-2 gap-4 mt-4"  v-if="selectedItem.onset.age">
              <div class="w-full -mt-1">
                  <span class="text-sm font-semibold mb-3">Age</span>
                  <div class="flex  w-full">
                      <cornie-input
                      placeholder="0"
                      class="grow w-full px-0"
                      :setfull="true"
                      v-model="selectedItem.onset.age.value"
                      :disabled="true"
                      />
                      <div class="bg-primary rounded-lg h-11 w-32 px-0 mt-1"><p class="text-white p-5 -mt-3">{{ selectedItem.onset.age.unit }}</p></div>
                  </div>
              </div>
          </div>
           <div class="grid grid-cols-3 gap-3 mt-4 w-full" v-if="selectedItem.onset.range">
              <div class="w-full -mt-1">
                  <span class="text-sm font-semibold mb-3">Range (min)</span>
                  <div class="flex space-x-2 w-full">
                      <cornie-input
                      placeholder="0"
                      class="grow w-full"
                      :setfull="true"
                      v-model="selectedItem.onset.range.min"
                      :disabled="true"
                      />
                      <div class="bg-primary rounded-lg h-11 w-32 px-0 mt-1"><p class="text-white p-5 -mt-3">{{ selectedItem.onset.range.unit }}</p></div>
                  </div>
              </div>
              <div class="w-full -mt-1">
                  <span class="text-sm font-semibold mb-3">Range (max)</span>
                  <div class="flex space-x-2 w-full">
                      <cornie-input
                      placeholder="0"
                      class="grow w-full"
                      :setfull="true"
                      v-model="selectedItem.onset.range.max"
                     :disabled="true"
                      />
                      <div class="bg-primary rounded-lg h-11 w-32 px-0 mt-1"><p class="text-white p-5 -mt-3">{{ selectedItem.onset.range.unit }}</p></div>
                  </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-4" v-if="selectedItem.onset.year">
              <cornie-input label="Year" v-model="selectedItem.onset.year"  :disabled="true"/>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-4">
                <cornie-input
                label="Note"
                class="w-full"
                v-model="selectedItem.onsetNote"
                :placeholder="'Autoloaded'"
                :disabled="true"
              />
            </div>
           

        </accordion-component>
      </div>

    </div>
    <template #actions>
      <cornie-btn
        @click="show = false"
        class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
      >
        Close
      </cornie-btn>
    </template>
    <template #menuactions>
       <div
            @click="viewHistory(selectedItem)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <new-view-icon class="text-blue-300 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            @click="showHistory(selectedItem.id)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <edit-icon class="text-purple-700 fill-current" />
            <span class="ml-3 text-xs">Edit</span>
          </div>
          <div
            @click="showStatus(selectedItem)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <update-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs"> Update Status </span>
          </div>
    </template>
    <history-modal
      :id="historyId"
      @history-added="historyAdded"
      v-model="showHistoryModal"
    />

    <status-modal
      :id="historyId"
      :selectedItem="selectedItem"
      @history-added="historyAdded"
      v-model="showStatusModal"
    />

    <view-modal
      :id="historyId"
      :selectedItem="selectedItem"
      :updatedBy="updatedBy"
      :currentStatus="currentStatus"
      :practitionerId="practitionerId"
      @history-added="historyAdded"
      @show:modal="viewHistory"
      v-model="viewHistoryModal"
    />
  </big-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { string } from "yup";

import { IPatient } from "@/types/IPatient";

import BigDialog from "@/components/bigdialog.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import HospitalIcon from "@/components/icons/hospital.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import EditIcon from "@/components/icons/edit.vue";
import NewViewIcon from "@/components/icons/newview.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import Avatar from "@/components/avatar.vue";
import NoteIcon from "@/components/icons/note.vue";
import InformationIcon from "@/components/icons/info.vue";
import FhirInput from "@/components/fhir-input.vue";
import CornieRadio from "@/components/cornieradio.vue";
import DateTimePicker from "@/components/date-time-picker.vue";

import BornIcon from "./components/born.vue";
import HistoryModal from "./historyDialog.vue";
import StatusModal from "./status-update.vue";
import ViewModal from "./viewHistory.vue";

import Ihistory, {
  OnSet,
  Age,
  Born,
} from "@/types/Ihistory";

const history = namespace("history");
const patients = namespace("patients");
const userStore = namespace("user");

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
  name: "ViewMedicalHistory",
  components: {
    BigDialog,
    NewViewIcon,
    UpdateIcon,
    EditIcon,
    CornieBtn,
    HospitalIcon,
    AccordionComponent,
    BornIcon,
    InformationIcon,
    NoteIcon,
    Avatar,
    CornieSelect,
    CornieInput,
    FhirInput,
    CornieRadio,
    DateTimePicker,
    HistoryModal,
    StatusModal,
    ViewModal,
  },
})
export default class AddCondition extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @Prop({ type: String, default: "" })
  updatedBy!: string;
  @Prop({ type: String, default: "" })
  currentStatus!: string;
  @Prop({ type: String, default: "" })
  dateUpdated!: string;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  practitionerId!: string;

  @PropSync("modelValue")
  show!: boolean;

  @patients.State
  patients!: IPatient[];

  @Prop({ type: Object, default: {} })
  selectedItem!: any;

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @history.Action
  gethistoryById!: (id: string) => Ihistory;

  @userStore.Getter
  authPractitioner!: any;

  @history.Action
  fetchHistorys!: (patientId: string) => Promise<void>;



  required = string().required();
  @Watch("id")
  idChanged() {
    this.setHistory();
  }


  historymodel = {} as Ihistory;

  showRefModal = false;
  showHistoryModal = false;
  showNewStatusModal = false;
  condtions = [];
  allergy = [];
  refItems = [];
  loading = false;
  newhistoryId = "";
  instantiatesCanonical = "";
  instantiatesUri = "";
  status = "";
  dataAbsentReason = "";
  date = "";
  name = "John Sins";
  localSrc = require("../../../../assets/img/placeholder.png");
  // name = this.PatientName.firstname +' '+ this.PatientName.lastname;
  relationship = "";
  sex = "";

  // startAndEndDateTimeStart = "";
  // startAndEndDateTimeEnd = "";
  // bornDateTime = "";
  bornTimeable = { ...timeable };
  bornString = "";

  agemesurable = { ...measurable };
  oneage = 0;

  deceasedtimeable = { ...timeable };
  deceasedmeasurable = { ...measurable };

  reasonCode = "";
  reasonReference = "";
  note = "";
  conditionCode = "";
  conditionOutcome = "";
  conditionContributedToDeath = false;


  diseasedBoolean = false;
  deceasedRangeMin = "";
  deceasedRangeMax = "";
  deceasedDate = "";
  deceasedString = "";
  condition = "condition";
  code = "";
  outcome = "";
  contributedToDeath = "";
  estimatedAge = false;
  onsetNote = "";
  ageValue = "";
  ageUnit = "";
  deceased = false;
  estimatedDeceased = false;
  historyId = "";
  showStatusModal = false;
  viewHistoryModal = false;

  onsettimeable = { ...timeable };
  onsetmesurable = { ...measurable };
  onsetAge = "";
  onsetstartAndEndDateTimeStart = "";
  onsetstartAndEndDateTimeEnd = "";
  onsetRangeMin = "";
  onsetRangeMax = "";
  onsetnote = "";
  onsetString = "";

  async showNewStatus() {
    this.showNewStatusModal = true;
  }

  get patientId() {
    return this.$route.params.patientId;
  }
  async viewHistory(item: any) {
    this.viewHistoryModal = true;
     this.selectedItem = item;
    this.historyId = item.id;
  }
  async showStatus(item: any) {
    this.showStatusModal = true;
    this.selectedItem = item;
  }

  async showHistory(value: string) {
    this.showHistoryModal = true;
    this.historyId = value;
  }
   async historyAdded() {
    await this.fetchHistorys(this.onepatientId);
  }


  get onset() {
    return {
      range: {
        unit: this.onsetmesurable.unit,
        min: this.onsetmesurable.min,
        max: this.onsetmesurable.max,
      },
      age: {
        unit: this.onsetmesurable.ageUnit,
        value: this.onsetmesurable.ageValue,
      },
      period: {
        start: this.onsetmesurable.startDate,
        end: this.onsetmesurable.endDate,
      },
    };
  }

  get born() {
    return {
      //bornDateTimePeriod: { start: this.bornTimeable.startDate, end: this.bornTimeable.endDate },
      period: { start: this.bornTimeable.startDate, end: this.bornTimeable.endDate },
      dateTime: this.bornTimeable.date,
      year: this.bornTimeable.age,
    };
  }

  get conditionRelatedPerson() {
    return {
      code: this.code,
      outcome: this.outcome,
      contributedToDeath: this.contributedToDeath,
    };
  }

  get age() {
    return {
      estimated: this.estimatedAge,
      year: this.agemesurable.string,
      range: {
        unit: this.agemesurable.unit,
        min: this.agemesurable.min,
        max: this.agemesurable.max
      },
      age: {
        unit: this.agemesurable.ageUnit,
        value: this.agemesurable.ageValue,
      },
     
    };
  }

  get deceasedAge() {
    return {
       estimated: this.estimatedDeceased,
        year: this.deceasedmeasurable.string,
        range:  {
          unit: this.deceasedmeasurable.unit,
          min:  this.deceasedmeasurable.min,
          max: this.deceasedmeasurable.max
        },
        age: {
          unit: this.deceasedmeasurable.ageUnit,
          value: this.deceasedmeasurable.ageValue,
        },
    };
  }

  async setNewHistoryModel() {
    this.historymodel = JSON.parse(JSON.stringify(this.payload));
  }
   get onepatientId() {
       return this.$route.params.id as string;
    }

  async setHistory() {
    const history = await this.gethistoryById(this.id);
    if (!history) return;
    this.historymodel = history;


     this.onsetmesurable.ageValue = history.onset.age.value;
     this.onsetmesurable.unit = history.onset.range.unit;
     this.onsetmesurable.max = history.onset.range.max;
     this.onsetmesurable.min = history.onset.range.min;
     this.onsetmesurable.startDate = history.onset.period.start;
     this.onsetmesurable.endDate = history.onset.period.end;
     this.onsetNote = history.onsetNote;
     this.deceased = history.deceased;
    // this.deceasedmeasurable.ageUnit = history.deceasedAge.age.unit;
     this.deceasedmeasurable.ageValue = history.deceasedAge.age.value;
     this.deceasedmeasurable.unit = history.deceasedAge.range.unit;
     this.deceasedmeasurable.max = history.deceasedAge.range.max;
     this.deceasedmeasurable.min = history.deceasedAge.range.min;
     this.deceasedmeasurable.string = history.deceasedAge.year;
     this.reasonCode = history.reasonCode;
     this.reasonReference = history.reasonReference;
     this.note = history.note;
    // this.agemesurable.ageUnit = history.age.age.unit;
     this.agemesurable.ageValue = history.age.age.value;
     this.agemesurable.unit = history.age.range.unit;
     this.agemesurable.max = history.age.range.max;
     this.agemesurable.min = history.age.range.min;
     this.agemesurable.string = history.age.year;
     this.estimatedAge = history.age.estimated;
     this.relationship = history.relationship;
     this.sex = history.sex;
     this.conditionCode = history.conditionCode;
     this.conditionOutcome = history.conditionOutcome;
     this.conditionContributedToDeath = history.conditionContributedToDeath;
    // this.outcome = history.conditionRelatedPerson.outcome;
    // this.contributedToDeath = history.conditionRelatedPerson.contributedToDeath;
    // this.bornTimeable.startDate = history.born.bornDateTimePeriod;
    // this.bornTimeable.date = history.born.bornDateTime;
    // this.yearString = history.born.yearString;
  }
  async setId() {
    this.newhistoryId = this.id;
  }
  
  get payload() {
    return {
      patientId: this.patientId,
      conditionRelatedPerson: this.conditionRelatedPerson,
      born: this.born,
      age: this.age,
      deceased: this.deceased,
      onset: this.onset,
    };
  }
  get newaction() {
    return this.id ? "Update" : "New";
  }
  async showRef(value: any) {
    this.showRefModal = true;
    this.reasonReference = value;
  }

  mounted() {
    this.setId();
  }

  async created() {
    this.setId();
    this.setHistory();
  }
}
</script>
