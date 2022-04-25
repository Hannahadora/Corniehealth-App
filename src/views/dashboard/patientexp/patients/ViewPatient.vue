<template>
  <div class="h-full grid grid-cols-12 gap-3 bg-transparent">
    <div class="col-span-3 bg-white rounded-md h-full p-3">
      <div
        class="w-full h-40 rounded-md bg-gray-50 flex flex-col items-center p-3"
      >
        <div class="flex items-center">
          <avatar v-if="image" class="h-20 w-20" :src="image" />
          <div class="w-full h-full bg-gray-500" v-else></div>
        </div>
        <div class="font-bold text-xs my-0.5">
          {{ firstName + "" + lastName }}
        </div>
        <div class="text-xs text-gray-400 my-0.5">
          {{ mrn }}
        </div>
        <div class="text-xs text-gray-400">Rating:</div>
        <div class="text-xs text-gray-400">EMR</div>
      </div>
      <div class="w-full border-b border-gray-400 border-dashed my-4"></div>
      <div>
        <vertical-tabs :items="tabLinks" v-model="currentTab"></vertical-tabs>
      </div>
    </div>
    <div class="col-span-9 bg-white h-full rounded-md p-3">
      <component :is="showComponent" :properties="properties" />
      <router-view/>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string, date } from "yup";

import { Demographics, Guarantor, IPatient } from "@/types/IPatient";

import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";
import OperationHours from "@/components/new-operation-hours.vue";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import DatePicker from "@/components/datepicker.vue";
import { Prop, Watch } from "vue-property-decorator";
import { useHandleImage } from "@/composables/useHandleImage";
import PeriodPicker from "@/components/daterangepicker.vue";
import CornieAvatarField from "@/components/avatar.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import InfoIcon from "@/components/icons/info.vue";
import AddBlueIcon from "@/components/icons/addblue.vue";
import Multiselect from "@vueform/multiselect";
import Avatar from "@/components/avatar.vue";
import Period from "@/types/IPeriod";
import { createDate } from "@/plugins/utils";
import PlusIcon from "@/components/icons/plus.vue";
import DeleteRed from "@/components/icons/delete-red.vue";
import EditIcon from "@/components/icons/edit.vue";
import CornieRadio from "@/components/cornieradio.vue";
import { useCountryStates } from "@/composables/useCountryStates";
import AutoComplete from "@/components/autocomplete.vue";
import AddIcon from "@/components/icons/addblue.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import VerticalTabs from "@/components/tabs-vert-patient.vue";

import PersonalInfo from "./viewscreens/personal.vue";
import OtherInfo from "./viewscreens/other.vue";
import FamilyInfo from "./viewscreens/family.vue";
import Transaction from "./viewscreens/transaction.vue";

const patients = namespace("patients");

@Options({
  name: "viewPatient",
  components: {
    VerticalTabs,
    CornieCheckbox,
    PlusIcon,
    CornieInput,
    CornieSelect,
    AccordionComponent,
    InfoIcon,
    PhoneInput,
    AddIcon,
    PeriodPicker,
    OperationHours,
    DatePicker,
    Avatar,
    AutoComplete,
    CornieAvatarField,
    AddBlueIcon,
    DeleteRed,
    EditIcon,
    CornieRadio,
    PersonalInfo,
    OtherInfo,
    FamilyInfo,
    Transaction,
  },
})
export default class viewPatient extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @patients.State
  patients!: IPatient[];

  @patients.Action
  getPatientById!: (id: string) => Promise<IPractitioner>;

  idOptions = ["NIN", "BVN"];
  genderOptions = [
    { code: "male", display: "Male" },
    { code: "female", display: "Female" },
    { code: "other", display: "Other" },
  ];
  multipleBirthOptions = [
    { code: true, display: "Yes" },
    { code: false, display: "No" },
  ];

  loading = false;

  nationality = "";
  numberOfChildren = "";
  genotype = "";

  vip = false;
  multipleBirth = false;
  multipleBirthInteger = 0;
  gender = "";
  idType = "NIN";
  mrn = "" as any;
  firstName = "";
  middleName = "";
  lastName = "";
  dateOfBirth = "";
  image = "";
  idNumber = "";
  bloodGroup = "";
  nationState = setup(() => useCountryStates());

  contacts = [] as any;
  emergencyContacts = [] as any;
  providers = [] as any;
  guarantor = "";
  insurances = [] as any;
  labs = [] as any;
  pharmacies = [] as any;
  associations = [] as any;
  demographics = {};
  practitioners = [] as any;
  relatedPersons = [] as any;

  maritalStatus = "";
  guarantorLength = 0;
  demographicsLength = 0;

  showEmergencyContactDialog = false;
  showGuarantorDialog = false;
  showAssociationsDialog = false;
  showInsuranceDialog = false;
  showProvidersDialog = false;
  showPractitionersDialog = false;
  showDemographicsDialog = false;
  addPaymentsDialog = false;

  contactsCompleted = false;

  get patient() {
    return this.patients.find((p) => p.id === this.id);
  }
  async setPateint() {
    const patient = this.patient;
    console.log(patient, "PATIENTR");
    if (!patient) return;
    this.firstName = patient.firstname;
    this.mrn = patient?.mrn;
    this.lastName = patient.lastname;
    this.middleName = patient.middlename || "";
    this.multipleBirth = patient.multipleBirths || false;
    this.multipleBirthInteger = patient.multipleBirthInteger || 0;
    this.gender = patient.gender || "";
    this.maritalStatus = patient.maritalStatus || "";
    this.vip = patient.vip || false;
    this.dateOfBirth = patient.dateOfBirth || "";
    this.bloodGroup = patient.bloodGroup || "";
    this.genotype = patient.genotype || "";
    this.associations = patient.associates || [];
    this.contacts = patient.contactInfo || [];
    this.numberOfChildren = patient.numberOfChildren || "";
    this.multipleBirth = patient.multipleBirth || false;
    this.multipleBirthInteger = patient.multipleBirthInteger || 0;
    const identityNos = patient.identityNos || [];
    const [identity, ...rest] = identityNos;
    if (identity) {
      this.idType = identity.type;
      this.idNumber = identity.number;
    }
    this.image = patient.profilePhoto || "";
    this.emergencyContacts = patient.emergencyContacts || [];
    this.practitioners = patient.generalPractitioners || [];
    this.relatedPersons = patient.guarantor || [];
    this.demographics = patient.demographicsData || {};
  }

  get properties() {
    switch (this.currentTab) {
      case 0:
        return {
          id: this.id,
          mrn: this.mrn,
          firstName: this.firstName,
          lastName: this.lastName,
          nationality: this.nationality,
          middleName: this.middleName,
          gender: this.gender,
          dob: this.dateOfBirth,
          maritalStatus: this.maritalStatus,
          vip: this.vip,
          idType: this.idType,
          idNumber: this.idNumber,
          image: this.image,
          bloodGroup: this.bloodGroup,
          genotype: this.genotype,
          numberOfChildren: this.numberOfChildren,
          multiple: this.multipleBirth,
          multipleBirthInteger: this.multipleBirthInteger,
          associates: this.associations,
          contactInfo: this.contacts,
        };
      case 1:
        return {
          id: this.id,
          emergencyContacts: this.emergencyContacts,
          generalPractitioners: this.practitioners,
          guarantor: this.relatedPersons,
          demographicsData: this.demographics,
        };
      case 2:
        return {
          id: this.id,
          patients: this.patients,
        };
      case 3:
        return {
          id: this.id,
        };
      case 4:
        return {
          id: this.id,
        };
      default:
        return {
          id: this.id,
        };
    }
  }

  get showComponent() {
    switch (this.currentTab) {
      case 0:
        return "personal-info";
      case 1:
        return "other-info";
      case 2:
        return "family-info";
      case 3:
        return "transactions";
      default:
        return "personal-info";
    }
  }

  currentTab = 0;
  tabLinks = [
    {
      name: "Personal Info",
    },
    {
      name: "Other Info Optional",
    },
    {
      name: "Family",
    },
    {
      name: "Transactions",
      children: [
        {
          name: "Appointments",
           to: "transactions/appointments",
        },
        {
          name: "Specialist Referrals",
        to: "transactions/specialist",
        },
        {
          name: "Visits",
          to: "transactions/visits",
        },
        {
          name: "Medications",
        to: "transactions/medications",
        },
        {
          name: "Diagnostics",
           to: "transactions/diagonostics",
        },
        {
          name: "Bills",
           to: "transactions/bills",
        },
      ],
    },
  ];

  async created() {
    await this.fetchPatients();
    if (this.id) this.setPateint();
  }
}
</script>
<style scoped>
</style>
