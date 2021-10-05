<template>
  <div
    class="
      flex-col
      justify-center
      bg-white
      shadow-md
      p-3
      mt-2
      mb-2
      rounded
      w-full
      h-screen
      overflow-auto
    "
  >
    <div class="container-fluid" v-if="true">
      <div class="w-full p-2">
        <span
          class="
            flex flex-col
            w-full
            justify-center
            border-b-2
            font-bold
            mb-5
            text-xl text-primary
            py-2
          "
        >
          Episodes | Encounter
        </span>
        <!-- <registration-chart class="w-full" :height="100" /> -->
        
      </div>

      <div class="w-full border-b-4 curved flex mb-8">
          <div class="container-fluid flex font-semibold text-lg">
              <a class="px-4 py-2 active-tab cursor-pointer" :class="{ 'active-color': activeTab === 1, 'text-gray-500': activeTab !== 1 }"
              @click="() => activeTab = 1"
              >Encounters</a>
              <a class="px-4 py-2 active-tab cursor-pointer" :class="{ 'active-color text-dark': activeTab === 0, 'text-gray-500': activeTab !== 0 }"
              @click="() => activeTab = 0"
              >Episodes</a>
          </div>
      </div>

      <div class="w-full">
        <span class="w-full bg-danger">
          <span class="flex justify-end w-full m4-5" v-if="activeTab === 1">
            <cornie-btn
              class="bg-danger text-white m-5 p-2 font-semibold"
               @click="() => showNewEncounterModal = true"
            >
              New Encounter
            </cornie-btn>
          </span>
          <span class="flex justify-end w-full m4-5"  v-if="activeTab === 0">
            <cornie-btn
              class="bg-danger text-white m-5 p-2 font-semibold"
              @click="() => showNewEpisodeModal = true"
            >
              New Episode
            </cornie-btn>
          </span>
        </span>
      </div>

      <div class="p-2" v-if="activeTab === 0">
        <cornie-table
          v-model="items"
          :columns="headers"
          @filter="filterAdvanced = true"
        >
          <template #name="{ item }">
            <div class="flex items-center">
              <avatar class="w-5 h-5" :src="item.profilePhoto" />
              <span class="text-xs ml-2 font-semibold">{{ item.name }}</span>
            </div>
          </template>
          <template #actions="{  }">
            <table-action
            >
              <newview-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">View</span>
            </table-action>
            <table-action
            >
              <update-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">Update Status</span>
            </table-action>
            
          </template>
        </cornie-table>
      </div>

      <div class="p-2"  v-if="activeTab === 1">
        <cornie-table
          v-model="items"
          :columns="rawHeaders"
          @filter="filterAdvanced = true"
        >
          <template #name="{ item }">
            <div class="flex items-center">
              <avatar class="w-5 h-5" :src="item.profilePhoto" />
              <span class="text-xs ml-2 font-semibold">{{ item.name }}</span>
            </div>
          </template>
          <template #actions="{  }">
            <table-action
            >
              <newview-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">View</span>
            </table-action>
            <table-action
            >
              <update-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">Update Status</span>
            </table-action>
            
          </template>
        </cornie-table>
      </div>
    </div>

    <div class="w-full" v-else>
      <empty-state />
    </div>

    <advanced-filter
      v-model:filtered="filteredPatients"
      v-model="filterAdvanced"
      :patients="patients"
    />

    <side-modal :visible="showNewEncounterModal" :width="990" @closesidemodal="() => showNewEncounterModal = false" :header="'New Encounter'">
      <new-encounter />
    </side-modal>

    <side-modal :visible="showNewEpisodeModal" :width="990" @closesidemodal="() => showNewEpisodeModal = false" :header="'New Episode'">
      <new-episode :items="practitioners" />
    </side-modal>

    <modal :visible="false">
      <template #title>
        <div class="w-full">
          <div class="container p-6 content-con">
            <p class="text-primary text-2xl font-semibold">Update Status	</p>

            <div class="w-full py-3">
              <!-- <search-dropdown :results="searchList" /> -->
              <p style="color:#667499" class="text-secondary text-base py-2">Update status of this vital sign	</p>
              <cornie-select :items="['Active', 'Inactive']" style="width: 100%" />
            </div>

            <div class="w-full flex flex justify-end">
                <corniebtn class="text-primary p-2 cancel-btn rounded-full px-8 mx-2 cursor-pointer">
                    <span class="font-semibold">Cancel</span>
                </corniebtn>

                <corniebtn class="bg-danger p-2 rounded-full px-8 mx-2 cursor-pointer">
                    <span class="text-white font-semibold " @click="viewActiveVisits">Update</span>
                </corniebtn>
            </div>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieCard from "@/components/cornie-card";
import CornieCardTitle from "@/components/cornie-card/CornieCardTitle.vue";
import CornieCardText from "@/components/cornie-card/CornieCardText.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import { namespace } from "vuex-class";
import { IPatient } from "@/types/IPatient";
import Avatar from "@/components/avatar.vue";
import EditIcon from "@/components/icons/edit.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import SettingsIcon from "@/components/icons/settings.vue";
import TableAction from "@/components/table-action.vue";
import AdvancedFilter from "../../patientexp/patients/dialogs/advanced-filter.vue";
import Modal from "@/components/modal.vue"
import SearchInput from "@/components/search-input.vue"
import SearchDropdown from '../careteam/components/search-dropdown.vue'
import User from "@/types/user";
import EmptyState from "./components/empty-state.vue"
import CornieSelect from "@/components/cornieselect.vue"
import SideModal from "@/views/dashboard/schedules/components/side-modal.vue"
import VitalsForm from "./components/vitals-form.vue"
import UpdateIcon from "@/components/icons/newupdate.vue"
import AddIcon from "@/components/icons/add.vue"
import NewEncounter from "./components/new-encounter.vue";
import NewEpisode from "./components/new-episode.vue";

const userStore = namespace("user");
const patients = namespace("patients");
const visitsStore = namespace("visits");
const practitioner  = namespace('practitioner');

@Options({
  name: "EHRPatients",
  components: {
    ...CornieCard,
    TableAction,
    SettingsIcon,
    EditIcon,
    NewviewIcon,
    CancelIcon,
    Avatar,
    CornieCardTitle,
    CornieCardText,
    CornieBtn,
    CornieTable,
    AdvancedFilter,
    Modal,
    SearchInput,
    SearchDropdown,
    EmptyState,
    CornieSelect,
    SideModal,
    VitalsForm,
    UpdateIcon,
    AddIcon,
    NewEncounter,
    NewEpisode,
  },
})
export default class ExistingState extends Vue {
  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @patients.Action
  deletePatient!: (id: string) => Promise<boolean>;

  @visitsStore.Action
  getVisits!: () => Promise<void>;

  @visitsStore.State
  visits!: any;

  @userStore.State
  user!: User;

  @practitioner.State
  practitioners!: User;

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  @userStore.State
  practitionerAuthenticated!: User;

  @userStore.Action
  updatePractitionerAuthStatus!: () => Promise<void>;

  password = "";

  filterAdvanced = false;
  showNewEpisodeModal = false;
  showNewEncounterModal = false;
  filteredPatients: IPatient[] = [];
  checkInPatient!: IPatient;
  checkingIn = false;
  registerNew = false;
  showAuthModal = false;
  showSearchModal = false;
  activeTab = 0;
  query = "";
  searchResults: IPatient[] = [ ];
  loading = false;
  activeVisits: IPatient[] = [ ];
  patientId = ""

  headers = [
    {
      title: "Identifier",
      key: "identifier",
      show: true,
    },
    {
      title: "Recorded",
      key: "recorded",
      show: true,
    },
    {
      title: "Type",
      key: "type",
      show: true,
    },
    {
      title: "Condition",
      key: "conditionRole",
      show: true,
    },
    {
      title: "Role",
      key: "role",
      show: true,
    },
    {
      title: "Care Manager",
      key: "careManager",
      show: true,
    },
    {
      title: "Encounters",
      key: "encounters",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: false,
    },
  ];

  rawHeaders = [
    {
      title: "Identifier",
      key: "identifier",
      show: true,
    },
    {
      title: "Recorded",
      key: "recorded",
      show: true,
    },
    {
      title: "Condition",
      key: "conditionRole",
      show: true,
    },
    {
      title: "Service Type",
      key: "type",
      show: true,
    },
    {
      title: "Based On",
      key: "Based On",
      show: true,
    },
    {
      title: "Practitioner",
      key: "practitioner",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: false,
    },
  ];

  get items() {
    return [
      {
        identifier: "XXXXX",
        recorded: "21-03-21",
        type: "Record Type",
        conditionRole: "Encounter",
        role: "Role",
        careManager: "Performer",
        encounters: "Encounter",
        practitioner: "Practioner",
        basedOn: "Based On",
        status: "Active"
      },
      {
        identifier: "XXXXX",
        recorded: "21-03-21",
        type: "Record Type",
        conditionRole: "Encounter",
        role: "Role",
        careManager: "Performer",
        basedOn: "Based On",
        practitioner: "Practitioner",
        encounters: "Encounter",
        status: "Active"
      },
    ]
  }

  get searchList() {
    return this.searchResults.map((patient: any) => {
      return {
        code: patient.id,
        display: `${patient.lastname} ${patient.middlename} ${patient.firstname}`
      }
    })
  }

  get practitionersList() {
    if (this.practitioners?.length === 0) return [ ];
    return this.practitioners;
  }

  goToEHR(patientId: string) {
    if (!this.practitionerAuthenticated) {
      this.patientId = patientId;
      this.showAuthModal = true;
    } else {
      this.$router.push({ name: 'Health Trend', params: { patientId }})
    }
  }

  viewActiveVisits() {
    this.showSearchModal = false;
    this.activeTab = 1;
  }

  checkIn(patient: IPatient) {
    this.checkInPatient = patient;
    this.checkingIn = true;
  }
  printPhone(patient: IPatient) {
    if (!patient.contactInfo) return "N/A";
    const phone = patient.contactInfo[0].phone;
    return phone?.number || "N/A";
  }

  printEmail(patient: IPatient) {
    if (!patient.contactInfo) return "N/A";
    return patient.contactInfo[0].email || "N/A";
  }
  printDOB(dateOfBirth?: string) {
    if (!dateOfBirth) return "N/A";
    const date = new Date(dateOfBirth);
    return date.toLocaleDateString("en-NG");
  }
  printMRN(mrn?: string) {
    return `XXXXX${mrn?.substr(31)}`;
  }

  closeAndViewAll() {
    this.showSearchModal = false;
    this.activeTab = 0;
  }

  async removePatient(id: string) {
    const confirmed = await window.confirmAction({
      message: `Are you sure you want to delete this patient?
       Removing patient from your register means patient
      will no longer be associated with this provider`,
      title: "Remove Patient",
    });
    if (!confirmed) return;
    const deleted = await this.deletePatient(id);
    if (deleted) window.notify({ msg: "Patient deleted", status: "success" });
    else window.notify({ msg: "Patient not deleted", status: "error" });
  }

  async searchForPatient() {
    // try {
    //   this.loading = true;
    //   const data = await ehrHelper.searchPatient(this.query);
    //   this.loading = false;
    //   if (data && data.length > 0) {        
    //     this.$router.push({ name: 'Health Trend', params: { patientId: data[0].id }})
    //     // this.searchResults = data;        
    //   } else {
    //     window.notify({ msg: "No match found", status: "info" });
    //   }
    // } catch (error) {
    //   this.loading = false;
    //   console.log(error);
      
    // }
  }

  async created() {
    await this.fetchPatients();
    await this.fetchPractitioners();
  }
}
</script>

<style scoped>
.active-tab {
    border-bottom-width: 4px;
    margin-bottom: -0.22rem;
}

.active-color {
    border-color: #FE4D3C;
}

.status-active {
    background: #F3FCF8;
    color: #35BA83;
    
}

.status-inactive {
    background: #FFF1F0;
    color: #FE4D3C;
}

.border-b-4 {
    border-bottom: 4px solid #F0F4FE;
}

.content-con {
  max-width: 30.65rem;
  min-width: 590px;
}

.cancel-btn {
  border: 1px solid #080056;
  box-sizing: border-box;
  border-radius: 124px;
  color: #080056;
}

.primary-border {
  border: 1px solid #080056;
  box-sizing: border-box;
  border-radius: 124px;
}
</style>
