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
        <!-- <vertical-tabs :items="tabLinks" v-model="currentTab"></vertical-tabs> -->
        <div>
          <ul>
            <li v-for="(t, i) in tabLinks" :key="i">
              <router-link
                active-class="border-danger border-l-2 font-bold h-6"
                class="px-1 py-0.5 my-2 text-sm cursor-pointer hover:bg-gray-300 hover:bg-opacity-20 block"
                :to="t.to"
              >
                {{ t.name }}
              </router-link>
            </li>
            <li>
              <div class="my-2 text-sm cursor-pointer block">
                <div
                  class="flex px-1 py-0.5 mb-3 items-center justify-between cursor-pointer"
                  @click="expand = !expand"
                >
                  <div>Transactions</div>
                  <div v-if="expand" class>
                    <chevron-down-icon
                      class="cursor-pointer stroke-current"
                      :class="{ 'text-primary': expand }"
                      @click="expand = false"
                    />
                  </div>
                  <div v-else>
                    <chevron-right-icon
                      class="cursor-pointer stroke-current"
                      :class="{ 'text-primary': expand }"
                      @click="expand = true"
                    />
                  </div>
                </div>
                <div
                  v-if="expand"
                  class="pl-10 my-1"
                  v-for="(l, i) in transactionLinks"
                  :key="i"
                >
                  <router-link
                    active-class="border-danger p-2 font-bold bg-gray-300 bg-opacity-20"
                    class="text-sm p-2 cursor-pointer hover:bg-gray-300 hover:bg-opacity-20 block"
                    :to="{ name: l.to }"
                    >{{ l.name }}
                  </router-link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-span-9 bg-white h-full rounded-md p-3">
      <!-- <component :is="showComponent" :properties="properties" /> -->

      <router-view :properties="properties" />
    </div>
  </div>
</template>
<script lang="ts">
  import ChevronDownIcon from "@/components/icons/chevrondownprimary.vue";
  import ChevronRightIcon from "@/components/icons/chevronright.vue";
  import { IPatient } from "@/types/IPatient";
  import { Options, setup, Vue } from "vue-class-component";
  import { namespace } from "vuex-class";

  import AutoComplete from "@/components/autocomplete.vue";
  import {
    default as Avatar,
    default as CornieAvatarField,
  } from "@/components/avatar.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieRadio from "@/components/cornieradio.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import CornieCheckbox from "@/components/custom-checkbox.vue";
  import DatePicker from "@/components/datepicker.vue";
  import PeriodPicker from "@/components/daterangepicker.vue";
  import AccordionComponent from "@/components/form-accordion.vue";
  import {
    default as AddBlueIcon,
    default as AddIcon,
  } from "@/components/icons/addblue.vue";
  import DeleteRed from "@/components/icons/delete-red.vue";
  import EditIcon from "@/components/icons/edit.vue";
  import InfoIcon from "@/components/icons/info.vue";
  import PlusIcon from "@/components/icons/plus.vue";
  import OperationHours from "@/components/new-operation-hours.vue";
  import PhoneInput from "@/components/phone-input.vue";
  import VerticalTabs from "@/components/tabs-vert-patient.vue";
  import { useCountryStates } from "@/composables/useCountryStates";
  import IPractitioner from "@/types/IPractitioner";
  import { Prop } from "vue-property-decorator";

  import patientAppointments from "./viewscreens/appointment.vue";
  import FamilyInfo from "./viewscreens/family.vue";
  import OtherInfo from "./viewscreens/other.vue";
  import PersonalInfo from "./viewscreens/personal.vue";
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
      ChevronDownIcon,
      ChevronRightIcon,
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
      patientAppointments,
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
    expand = false;
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
    demographics = {} as any;
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
      this.demographics = patient.demographicsData || null;
    }

    get properties() {
      return this.patient;
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
          return "transaction";
        default:
          return "personal-info";
      }
    }

    currentTab = 3;
    tabLinks = [
      {
        name: "Personal Info",
        to: "personal",
      },
      {
        name: "Other Info Optional",
        to: "other-info",
      },
      {
        name: "Family",
        to: "family",
      },
    ];
    transactionLinks = [
      {
        name: "Appointments",
        to: "Patients Appointments",
      },
      {
        name: "Specialist Referrals",
        to: "Patients Specialist Refferals",
      },
      {
        name: "Visits",
        to: "Patients Visits",
      },
      {
        name: "Medications",
        to: "Patients Medication",
      },
      {
        name: "Diagnostics",
        to: "Patients Diagnostics",
      },
      {
        name: "Bills",
        to: "Patients Bills",
      },
    ];

    async created() {
      await this.fetchPatients();
      if (this.id) this.setPateint();
    }
  }
</script>
<style scoped></style>
