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
  BasicInfo,
  OnSet,
  Age,
  ConditionRelatedPerson,
  Born,
} from "@/types/Ihistory";

const history = namespace("history");
const patients = namespace("patients");
const userStore = namespace("user");

const timeable = {
  age: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  date: "",
  time: "",
};

const measurable = {
  unit: "",
  min: 0,
  max: 0,
  string: "",
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
  estimatedAge = 0;

  deceasedtimeable = { ...timeable };
  deceasedmeasurable = { ...measurable };

  diseasedBoolean = false;
  deceasedAge = 0;
  deceasedRangeMin = "";
  deceasedRangeMax = "";
  deceasedDate = "";
  deceasedString = "";
  reasonCode = "";
  reasonReference = "";
  note = "";
  condition = "condition";
  code = "";
  outcome = "";
  contributedToDeath = "";

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
      onsetPeriodAge: this.onsettimeable.age,
      startAndEndDateTime: {
        start: this.onsettimeable.startDate,
        end: this.onsettimeable.endDate,
      },
      onsetRangeString: this.onsetmesurable.string,
      unitOfMesurement: this.onsetmesurable.unit,
      onsetRangeMin: this.onsetmesurable.min,
      onsetRangeMax: this.onsetmesurable.max,
    };
  }

  get born() {
    return {
      //bornDateTimePeriod: { start: this.bornTimeable.startDate, end: this.bornTimeable.endDate },
      bornDateTimePeriod: this.bornTimeable.startDate,
      bornDateTime: this.bornTimeable.date,
      bornString: this.bornString,
    };
  }

  get conditionRelatedPerson() {
    return {
      code: this.code,
      outcome: this.outcome,
      contributedToDeath: this.contributedToDeath,
    };
  }
  get basicInfo() {
    return {
      patientId: this.patientId,
      instantiatesCanonical: this.instantiatesCanonical,
      instantiatesUri: this.instantiatesUri,
      status: this.status,
      dataAbsentReason: this.dataAbsentReason,
      date: this.date,
      relationship: this.relationship,
      sex: this.sex,
    };
  }

  get age() {
    return {
      age: this.oneage,
      ageRangeString: this.agemesurable.string,
      unitOfMesurement: this.agemesurable.unit,
      ageRangeMin: this.agemesurable.min,
      ageRangeMax: this.agemesurable.max,
      estimatedAge: this.estimatedAge,
    };
  }

  get deceased() {
    return {
      deceased: this.diseasedBoolean,
      deceasedDateAge: this.deceasedtimeable.age,
      deceasedDate: this.deceasedtimeable.date,
      deceasedRangeString: this.deceasedmeasurable.string,
      unitOfMesurement: this.deceasedmeasurable.unit,
      deceasedRangeMin: this.deceasedmeasurable.min,
      deceasedRangeMax: this.deceasedmeasurable.max,
      reasonCode: this.reasonCode,
      reasonReference: this.reasonReference,
      notes: this.note,
    };
  }
  async setNewHistoryModel() {
    this.historymodel = JSON.parse(JSON.stringify(this.payload));
  }

  async setHistory() {
    const history = await this.gethistoryById(this.id);
    if (!history) return;
    this.historymodel = history;

    this.onsettimeable.age = history.onset.onsetPeriodAge;
    this.onsettimeable.startDate = history.onset.startAndEndDateTime
      .start as string;
    this.onsettimeable.endDate = history.onset.startAndEndDateTime
      .end as string;
    this.onsetmesurable.string = history.onset.onsetRangeString;
    this.onsetmesurable.unit = history.onset.unitOfMesurement;
    this.onsetmesurable.min = history.onset.onsetRangeMin;
    this.onsetmesurable.max = history.onset.onsetRangeMax;
    this.diseasedBoolean = history.deceased.deceased;
    this.deceasedtimeable.age = history.deceased.deceasedDateAge;
    this.deceasedtimeable.date = history.deceased.deceasedDate;
    this.deceasedmeasurable.string = history.deceased.deceasedRangeString;
    this.deceasedmeasurable.unit = history.deceased.unitOfMesurement;
    this.deceasedmeasurable.min = history.deceased.deceasedRangeMin;
    this.deceasedmeasurable.max = history.deceased.deceasedRangeMax;
    this.reasonCode = history.deceased.reasonCode;
    this.reasonReference = history.deceased.reasonReference;
    this.note = history.deceased.note;
    this.oneage = history.age.age;
    this.agemesurable.string = history.age.ageRangeString as string;
    this.agemesurable.unit = history.age.unitOfMesurement;
    this.agemesurable.min = history.age.ageRangeMin;
    this.agemesurable.max = history.age.ageRangeMax;
    this.estimatedAge = history.age.estimatedAge;
    this.instantiatesCanonical = history.basicInfo.instantiatesCanonical;
    this.instantiatesUri = history.basicInfo.instantiatesUri;
    this.status = history.basicInfo.status;
    this.dataAbsentReason = history.basicInfo.dataAbsentReason;
    this.date = history.basicInfo.date;
    this.relationship = history.basicInfo.relationship;
    this.sex = history.basicInfo.sex;
    this.code = history.conditionRelatedPerson.code;
    this.outcome = history.conditionRelatedPerson.outcome;
    this.contributedToDeath = history.conditionRelatedPerson.contributedToDeath;
    this.bornTimeable.startDate = history.born.bornDateTimePeriod;
    this.bornTimeable.date = history.born.bornDateTime;
    this.bornString = history.born.bornString;
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
      basicInfo: this.basicInfo,
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
