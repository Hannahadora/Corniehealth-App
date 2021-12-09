<template>
  <big-dialog
    v-model="show"
    title="View Family History"
    class=""
    :id="newhistoryId"
    :horizontal="true"
  >
    <div class="w-full">
      <div class="w-full bg-white shadow p-5">
        <span class="flex space-x-4">
          <hospital-icon />
          <span class="text-lg text-black font-bold">Evergreen Hospital</span>
        </span>
        <div class="grid grid-cols-3 gap-1 mt-3">
          <span class="flex space-x-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 4C0 1.79086 1.79086 0 4 0H14C16.2091 0 18 1.79086 18 4V14C18 16.2091 16.2091 18 14 18H4C1.79086 18 0 16.2091 0 14V4Z"
                fill="white"
              />
              <path
                d="M12.924 10.8C12.996 10.206 13.05 9.612 13.05 9C13.05 8.388 12.996 7.794 12.924 7.2H15.966C16.11 7.776 16.2 8.379 16.2 9C16.2 9.621 16.11 10.224 15.966 10.8H12.924ZM11.331 15.804C11.871 14.805 12.285 13.725 12.573 12.6H15.228C14.3561 14.1014 12.9727 15.2388 11.331 15.804ZM11.106 10.8H6.894C6.804 10.206 6.75 9.612 6.75 9C6.75 8.388 6.804 7.785 6.894 7.2H11.106C11.187 7.785 11.25 8.388 11.25 9C11.25 9.612 11.187 10.206 11.106 10.8ZM9 16.164C8.253 15.084 7.65 13.887 7.281 12.6H10.719C10.35 13.887 9.747 15.084 9 16.164ZM5.4 5.4H2.772C3.63497 3.89449 5.01732 2.75534 6.66 2.196C6.12 3.195 5.715 4.275 5.4 5.4ZM2.772 12.6H5.4C5.715 13.725 6.12 14.805 6.66 15.804C5.02076 15.2385 3.64036 14.1009 2.772 12.6ZM2.034 10.8C1.89 10.224 1.8 9.621 1.8 9C1.8 8.379 1.89 7.776 2.034 7.2H5.076C5.004 7.794 4.95 8.388 4.95 9C4.95 9.612 5.004 10.206 5.076 10.8H2.034ZM9 1.827C9.747 2.907 10.35 4.113 10.719 5.4H7.281C7.65 4.113 8.253 2.907 9 1.827ZM15.228 5.4H12.573C12.2913 4.28531 11.8742 3.20931 11.331 2.196C12.987 2.763 14.364 3.906 15.228 5.4ZM9 0C4.023 0 0 4.05 0 9C0 11.3869 0.948211 13.6761 2.63604 15.364C3.47177 16.1997 4.46392 16.8626 5.55585 17.3149C6.64778 17.7672 7.8181 18 9 18C11.3869 18 13.6761 17.0518 15.364 15.364C17.0518 13.6761 18 11.3869 18 9C18 7.8181 17.7672 6.64778 17.3149 5.55585C16.8626 4.46392 16.1997 3.47177 15.364 2.63604C14.5282 1.80031 13.5361 1.13738 12.4442 0.685084C11.3522 0.232792 10.1819 0 9 0Z"
                fill="#667499"
              />
            </svg>
            <span class="text-xs text-gray-500">
              www.evergreenhospital.com
            </span>
          </span>
          <span class="flex space-x-2">
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 0H2C1.175 0 0.5075 0.675 0.5075 1.5L0.5 10.5C0.5 11.325 1.175 12 2 12H14C14.825 12 15.5 11.325 15.5 10.5V1.5C15.5 0.675 14.825 0 14 0ZM14 3L8 6.75L2 3V1.5L8 5.25L14 1.5V3Z"
                fill="#114FF5"
              />
            </svg>

            <span class="text-xs text-gray-500">
              hello.evergreenhospital.ng
            </span>
          </span>
          <span class="flex space-x-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.965 6.0925C4.045 8.215 5.785 9.9475 7.9075 11.035L9.5575 9.385C9.76 9.1825 10.06 9.115 10.3225 9.205C11.1625 9.4825 12.07 9.6325 13 9.6325C13.4125 9.6325 13.75 9.97 13.75 10.3825V13C13.75 13.4125 13.4125 13.75 13 13.75C5.9575 13.75 0.25 8.0425 0.25 1C0.25 0.5875 0.5875 0.25 1 0.25H3.625C4.0375 0.25 4.375 0.5875 4.375 1C4.375 1.9375 4.525 2.8375 4.8025 3.6775C4.885 3.94 4.825 4.2325 4.615 4.4425L2.965 6.0925Z"
                fill="#35BA83"
              />
            </svg>

            <span class="text-xs text-gray-500">
              08167743034, 08032244859
            </span>
          </span>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-5">
        <patient-card :practitionerId="practitionerId" />
        <div class="w-full bg-white shadow p-5 rounded">
          <span class="text-sm text-black font-bold"> Basic Info </span>
          <div class="grid grid-cols-2 gap-1 mt-5">
            <span class="flex space-x-2">
              <span class="text-sm">Canonical - </span>
              <span class="text-xs mt-1 text-gray-400">{{
                instantiatesCanonical
              }}</span>
            </span>
            <span class="flex space-x-2">
              <span class="text-sm">Uri - </span>
              <span class="text-xs mt-1 text-gray-400">{{
                instantiatesUri
              }}</span>
            </span>
            <span class="flex space-x-2 mt-4">
              <span class="text-sm">Status - </span>
              <span class="text-xs mt-1 text-gray-400">{{ status }}</span>
            </span>
            <span class="flex space-x-2 mt-4">
              <span class="text-sm">Date - </span>
              <span class="text-xs mt-1 text-gray-400">{{
                new Date(date ?? Date.now()).toLocaleDateString()
              }}</span>
            </span>
            <span class="flex space-x-2 mt-4">
              <span class="text-sm">Relationship - </span>
              <span class="text-xs mt-1 text-gray-400">{{ relationship }}</span>
            </span>
            <span class="flex space-x-2 mt-4">
              <span class="text-sm">Sex - </span>
              <span class="text-xs mt-1 text-gray-400">{{ sex }}</span>
            </span>
            <span class="flex space-x-2 mt-4">
              <span class="text-sm">Canonical - </span>
              <span class="text-xs mt-1 text-gray-400">{{
                instantiatesCanonical
              }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-5">
        <div class="w-full bg-blue-50 shadow rounded p-5">
          <span class="text-sm text-black font-bold"> Born </span>
          <span class="flex space-x-4 mt-4">
            <span class="text-sm float-left">Date/time </span>
            <span class="text-xs mt-1 text-gray-400">{{
              new Date(bornDateTime ?? Date.now()).toLocaleDateString()
            }}</span>
            <span class="text-sm float-right">String </span>
            <span class="text-xs mt-1 text-gray-400">{{ bornString }}</span>
          </span>
        </div>
        <div class="w-full bg-blue-50 shadow rounded p-5">
          <span class="text-sm text-black font-bold"> Age </span>
          <span class="flex space-x-4 mt-4">
            <span class="text-sm float-left">Age </span>
            <span class="text-xs mt-1 text-gray-400">{{ oneage }} Year</span>
            <span class="text-sm float-right">String </span>
            <span class="text-xs mt-1 text-gray-400">{{
              agemesurable.string
            }}</span>
          </span>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-5">
        <div class="w-full bg-white shadow rounded p-5">
          <span class="text-sm text-black font-bold"> Deceased </span>
          <span class="flex space-x-4 mt-4">
            <span class="text-sm float-left">Date/time </span>
            <span class="text-xs mt-1 text-gray-400">{{
              new Date(deceasedtimeable.date ?? Date.now()).toLocaleDateString()
            }}</span>
            <span class="text-sm float-right">String </span>
            <span class="text-xs mt-1 text-gray-400">{{
              deceasedmeasurable.string
            }}</span>
          </span>
          <span class="flex space-x-4 mt-4">
            <span class="text-sm float-left">Range (min) </span>
            <span class="text-xs mt-1 text-gray-400">{{
              deceasedmeasurable.min
            }}</span>
            <span class="text-sm float-right">Range (max) </span>
            <span class="text-xs mt-1 text-gray-400">{{
              deceasedmeasurable.max
            }}</span>
          </span>
        </div>
        <div class="w-full bg-white shadow rounded p-5">
          <span class="text-sm text-black font-bold">
            Condition (Related Problem)
          </span>
          <span class="flex space-x-4 mt-4">
            <span class="text-sm float-left">Code </span>
            <span class="text-xs mt-1 text-gray-400">{{ code }} </span>
            <span class="text-sm float-right">Outcome </span>
            <span class="text-xs mt-1 text-gray-400">{{ outcome }}</span>
          </span>
          <span class="flex space-x-4 mt-4">
            <span class="text-sm float-left">Contributed to Death? </span>
            <span class="text-xs mt-1 text-gray-400">{{
              contributedToDeath
            }}</span>
          </span>
        </div>
      </div>
    </div>
    <template #actions>
      <cornie-btn
        @click="show = false"
        class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
      >
        Cancel
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
  <status-modal
    :id="id"
    :updatedBy="updatedBy"
    :currentStatus="currentStatus"
    :dateUpdated="dateUpdated"
    v-model="showNewStatusModal"
  />
  <history-modal
    :id="id"
    @history-added="historyAdded"
    @show:modal="showHistory"
    v-model="showHistoryModal"
  />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import BigDialog from "@/components/bigdialog.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import HospitalIcon from "@/components/icons/hospital.vue";
import CornieNumInput from "@/components/cornienuminput.vue";
import CornieTextArea from "@/components/textarea.vue";
import DatePicker from "./datepicker.vue";
import Measurable from "@/components/measurable.vue";
import ReferenceModal from "./reasonref.vue";
import { IPatient } from "@/types/IPatient";
import AutoComplete from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import TimeablePicker from "@/components/timeable.vue";
import PatientCard from "@/components/patientcard.vue";
import { namespace } from "vuex-class";
import { string } from "yup";
import HistoryModal from "./historyDialog.vue";
import StatusModal from "./status-update.vue";
import Ihistory from "@/types/Ihistory";
import EditIcon from "@/components/icons/edit.vue";
import NewViewIcon from "@/components/icons/newview.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";

const history = namespace("history");
const patients = namespace("patients");

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
    TimeablePicker,
    CornieNumInput,
    NewViewIcon,
    UpdateIcon,
    EditIcon,
    CornieBtn,
    AutoComplete,
    StatusModal,
    DatePicker,
    Measurable,
    HospitalIcon,
    AccordionComponent,
    ReferenceModal,
    HistoryModal,
    CornieSelect,
    CornieInput,
    CornieTextArea,
    PatientCard,
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
    console.log("Turth");
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
