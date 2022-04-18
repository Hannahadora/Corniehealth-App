<template>
  <big-dialog
    v-model="show"
    title="View Family History"
    class=""
    :id="newhistoryId"
    :horizontal="true"
  >
    <div class="w-full">
      <div class="border-b-2 border-gray-100 border-dashed pb-5">
        <div class="">
            <div class="flex space-x-8">
                  <avatar class="mr-2 w-16 h-16" v-if="authPractitioner.image" :src="authPractitioner?.image" />
                <avatar class="mr-2 w-16 h-16" v-else :src="localSrc" />
                <div class="float-right w-full flex justify-end">
                    <div>
                        <p class="font-bold mb-2 text-right">{{ authPractitioner?.department }}</p>
                        <p class="text-right mb-2">{{ authPractitioner?.address }}</p>
                        <p class="text-right mb-2">{{ authPractitioner?.phone?.dialCode +''+ authPractitioner?.phone?.number }}<span class="font-bold text-2xl text-gray-400">.</span> Info@saintnicholashospital.com</p>
                        <p class="text-right mb-2"> <span class="text-gray-300">Practice ID #:</span>{{ authPractitioner?.identifier }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4 w-full mt-5">
          <div class="mt-4">
            <span class="text-lg text-black font-bold">Patient Information</span>
            <div>
              <div class="w-full flex space-x-3 mt-5">
              <avatar class="mr-2 h-14 w-14" v-if="authPractitioner.image" :src="authPractitioner?.image" />
                <avatar class="mr-2" v-else :src="localSrc" />
              </div>
              <p class="font-semibold mb-5">Nkechi Claire Obi</p>
              <p class="text-sm text-gray-400 mb-3">MRN-CH23022021-0010</p>
              <p class="text-sm mb-3">87 Montagomery Close, Friend’s Colony Estate, Lekki</p>
              <p class="text-sm mb-3">08032545678</p>
              <p class="text-sm">Nkechi@gmail.com</p>
            </div>
          </div>

        </div>
      </div>
      <div class="w-full grid grid-cols-2 gap-4 mt-5">
        <div>
          <div class="flex space-x-3">
            <information-icon class="fill-current text-gray-400 mt-1"/>
            <span class="text-lg text-danger font-bold">Basic-Info</span>
          </div>
          <div class="grid grid-cols-3 gap-4 mt-5 w-full">
            <div>
              <p class="text-sm text-gray-400">Instantiates Canonical</p>
              <p class="text-sm">XXXXXX</p>
            </div>
            <div>
              <p class="text-sm text-gray-400">Instantiates Uri</p>
              <p class="text-sm">XXXXXX</p>
            </div>
            <div>
              <p class="text-sm text-gray-400">Status</p>
              <p class="text-sm">XXXXXX</p>
            </div>
            <div>
              <p class="text-sm text-gray-400">Data Absent Reason</p>
              <p class="text-sm">XXXXXX</p>
            </div>
            <div>
              <p class="text-sm text-gray-400">Date</p>
              <p class="text-sm">XXXXXX</p>
            </div>
            <div>
              <p class="text-sm text-gray-400">Relationship</p>
              <p class="text-sm">XXXXXX</p>
            </div>
            <div>
              <p class="text-sm text-gray-400">Sex</p>
              <p class="text-sm">XXXXXX</p>
            </div>

          </div>
        </div>
        <div>
          <div>
            <div class="flex space-x-3">
              <born-icon/>
              <span class="text-lg font-bold text-black">Born/Age</span>
            </div>
              <div class="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-400">Selected</p>
                    <p class="text-sm">Born</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-400">Date/Time</p>
                    <p class="text-sm">21/10-2021 <span class="text-gray-400">15:00</span></p>
                  </div>

              </div>
          </div>
           <div class="mt-4">
             <div class="flex space-x-3">
              <born-icon/>
              <span class="text-lg font-bold text-black">Deceased</span>
             </div>
              <div class="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-400">Deceased?</p>
                    <p class="text-sm">Yes</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-400">Date/Time</p>
                    <p class="text-sm">21/10-2021 <span class="text-gray-400">15:00</span></p>
                  </div>
                   <div>
                    <p class="text-sm text-gray-400">Reason Code</p>
                    <p class="text-sm">xxxxxxx</p>
                  </div>
                   <div>
                    <p class="text-sm text-gray-400">Reason Reference</p>
                    <p class="text-sm">xxxxxxx</p>
                  </div>

              </div>
          </div>
        </div>
        
      </div>

      <div class="w-full grid grid-cols-2 gap-4 mt-5">
        <div>
          <div>
            <div class="flex space-x-3">
              <born-icon/>
              <span class="text-lg font-bold text-black">Condition (Related Person)</span>
            </div>
              <div class="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-400">Code</p>
                    <p class="text-sm">xxxxxxx</p>
                  </div>
                   <div>
                    <p class="text-sm text-gray-400">Outcome</p>
                    <p class="text-sm">xxxxxxx</p>
                  </div>
                   <div>
                    <p class="text-sm text-gray-400">Contributed to Death?</p>
                    <p class="text-sm">xxxxxxx</p>
                  </div>
                  

              </div>
          </div>
           <div class="mt-4">
             <div class="flex space-x-3">
              <born-icon/>
              <span class="text-lg font-bold text-black">Onset</span>
             </div>
              <div class="mt-4 grid grid-cols-2 gap-4">
                    <div>
                    <p class="text-sm text-gray-400">Start Date & Time</p>
                    <p class="text-sm">21/10-2021 <span class="text-gray-400">15:00</span></p>
                  </div>
                    <div>
                    <p class="text-sm text-gray-400">End Date & Time</p>
                    <p class="text-sm">21/10-2021 <span class="text-gray-400">15:00</span></p>
                  </div>
              </div>
          </div>
        </div>
        <div>
            <div>
              <span class="text-black font-bold text-lg flex space-x-3">
                <note-icon/>  <span> Deceased Note</span>
              </span>
              <p class="text-sm mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque tortor, elit, ac.</p>
            </div>
            <div class="mt-4">
              <span class="text-black font-bold text-lg flex space-x-3">
                <note-icon/> <span> Onset Note</span>
              </span>
              <p class="text-sm mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque tortor, elit, ac.</p>
            </div>
        </div>
        
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
      <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
        <new-view-icon class="text-blue-300 fill-current" />
        <span class="ml-3 text-xs">View</span>
      </div>
      <div
        @click="showHistory()"
        class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
      >
        <edit-icon class="text-purple-700 fill-current" />
        <span class="ml-3 text-xs">Edit</span>
      </div>
      <div
        @click="showNewStatus"
        class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
      >
        <update-icon class="text-danger fill-current" />
        <span class="ml-3 text-xs"> Update Status </span>
      </div>
    </template>
  </big-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { string } from "yup";

import { IPatient } from "@/types/IPatient";

import BigDialog from "@/components/bigdialog.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
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

import BornIcon from "./components/born.vue";
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

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @history.Action
  gethistoryById!: (id: string) => Ihistory;

  @userStore.Getter
  authPractitioner!: any;

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
  // get PatientName() {
  //      var id = this.$route.params.patientId;
  //     const pt = this.patients.find((i: any) => i.id === id);
  //     return {
  //         ...pt
  //     }
  // }

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

  async setHistory() {
    const history = await this.gethistoryById(this.id);
    if (!history) return;
    this.historymodel = history;

     this.onsetmesurable.ageUnit = history.onset.age.unit;
     this.onsetmesurable.ageValue = history.onset.age.value;
     this.onsetmesurable.unit = history.onset.range.unit;
     this.onsetmesurable.max = history.onset.range.max;
     this.onsetmesurable.min = history.onset.range.min;
     this.onsetmesurable.startDate = history.onset.period.start;
     this.onsetmesurable.endDate = history.onset.period.end;
     this.onsetNote = history.onsetNote;
     this.deceased = history.deceased;
     this.deceasedmeasurable.ageUnit = history.deceasedAge.age.unit;
     this.deceasedmeasurable.ageValue = history.deceasedAge.age.value;
     this.deceasedmeasurable.unit = history.deceasedAge.range.unit;
     this.deceasedmeasurable.max = history.deceasedAge.range.max;
     this.deceasedmeasurable.min = history.deceasedAge.range.min;
     this.deceasedmeasurable.string = history.deceasedAge.year;
     this.reasonCode = history.reasonCode;
     this.reasonReference = history.reasonReference;
     this.note = history.note;
     this.agemesurable.ageUnit = history.age.age.unit;
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
  async showHistory() {
    this.showHistoryModal = true;
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
