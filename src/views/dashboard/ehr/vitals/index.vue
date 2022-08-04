<template>
  <div
    class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded w-full h-screen overflow-auto"
  >
    <div class="container-fluid" v-if="vitals?.length > 0">
      <div class="w-full p-2">
        <span
          class="flex flex-col w-full justify-center border-b-2 font-bold mb-5 text-xl text-primary py-2"
        >
          Vital Signs
        </span>
        <!-- <registration-chart class="w-full" :height="100" /> -->
      </div>

      <span class="w-full bg-danger">
        <span class="flex justify-end w-full m4-5">
          <cornie-btn
            class="bg-danger text-white m-5 rounded-xl font-semibold"
            @click="addNew"
          >
            New Vitals
          </cornie-btn>
        </span>
      </span>

      <div class="p-2">
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
          <template #dataCount-header>
            <div
              class="text-no-wrap flex uppercase text-xs"
              style="white-space: nowrap"
            >
              Data Count
            </div>
          </template>
          <template #recordType-header>
            <div
              class="text-no-wrap flex uppercase text-xs"
              style="white-space: nowrap"
            >
              Record Type
            </div>
          </template>
          <template #actions="{ item }">
            <table-action @click="viewVital(item.id)">
              <newview-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">View</span>
            </table-action>
            <table-action @click="viewVital(item.id)">
              <edit-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">Edit</span>
            </table-action>
            <table-action @click="openUpdateStatusModal(item.id)">
              <update-icon class="text-primary fill-current" />
              <span class="ml-3 text-xs">Update Status</span>
            </table-action>
            <table-action>
              <correct-green class="text-primary fill-current" />
              <span class="ml-3 text-xs">Correct</span>
            </table-action>
            <table-action>
              <cancel-red-bg class="text-primary fill-current" />
              <span class="ml-3 text-xs">Cancel</span>
            </table-action>
          </template>
          <template #status="{ item }">
            <div class="flex items-center">
              =
              <p
                class="text-xs bg-yellow-100 text-yellow-400 p-1 rounded"
                v-if="item.status == 'corrected'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-gray-300 p-1 rounded"
                v-if="item.status == 'unknown' || item.status == 'preliminary'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-green-100 text-green-400 p-1 rounded"
                v-if="item.status == 'final'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-red-100 text-red-600 p-1 rounded"
                v-if="item.status == 'revoked' || item.status == 'cancelled'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-purple-300 text-purple-600 p-1 rounded"
                v-if="item.status == 'Entered-in-error'"
              >
                {{ item.status }}
              </p>
              <!-- <p
              class="text-xs bg-blue-300 text-blue-600 p-1 rounded"
              v-if="item.status == 'do-not-perform'"
            >
              {{ item.status }}
            </p> -->
            </div>
          </template>
        </cornie-table>
      </div>
    </div>

    <div class="w-full" v-else>
      <empty-state
        @addnew="
          showNewModal = true;
          selectedVitalId = '';
        "
      />
    </div>

    <vitals-form
      @vitals-added="getVitals(activePatientId)"
      :id="selectedVitalId"
      :vital="selectedVital"
      v-model="showNewModal"
    />

    <update-status
      :id="selectedVitalId"
      :vital="selectedVital"
      v-model="showUpdateStatusModal"
      @status-updated="getVitals(activePatientId)"
    />
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
import EditIcon from "@/components/icons/edit-purple.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import CorrectGreen from "@/components/icons/correct-green.vue";
import NewviewIcon from "@/components/icons/eye-blue-bg.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import SettingsIcon from "@/components/icons/settings.vue";
import TableAction from "@/components/table-action.vue";
import AdvancedFilter from "../../patientexp/patients/dialogs/advanced-filter.vue";
import Modal from "@/components/modal.vue";
import SearchInput from "@/components/search-input.vue";
import SearchDropdown from "../careteam/components/search-dropdown.vue";
import User from "@/types/user";
import EmptyState from "./components/empty-state.vue";
import CornieSelect from "@/components/cornieselect.vue";
import SideModal from "@/views/dashboard/schedules/components/side-modal.vue";
import VitalsForm from "./components/vitals-form.vue";
import UpdateStatus from "./components/update-status.vue";
import CornieInput from "@/components/cornieinput.vue";
import DatePicker from "@/components/datepicker.vue";
import IVital from "@/types/IVital";
import InputDescRounded from "./components/input-desc-rounded.vue";
import IEncounter from "@/types/IEncounter";
import UpdateIcon from "@/components/icons/update-status-yellow.vue";
const userStore = namespace("user");
const vitalsStore = namespace("vitals");

@Options({
  name: "EHRPatients",
  components: {
    ...CornieCard,
    CornieInput,
    InputDescRounded,
    DatePicker,
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
    CancelRedBg,
    CorrectGreen,
    UpdateStatus,
  },
})
export default class ExistingState extends Vue {
  @userStore.State
  user!: User;

  @userStore.State
  practitionerAuthenticated!: User;

  @userStore.Action
  updatePractitionerAuthStatus!: () => Promise<void>;

  @vitalsStore.State
  vitals!: IVital[];

  @vitalsStore.State
  encounters!: IEncounter[];

  @vitalsStore.Action
  getVitals!: (patientId: string) => Promise<void>;

  @vitalsStore.Action
  getEncounters!: (patientId: string) => Promise<void>;

  @vitalsStore.Action
  updateVitalStatus!: (body: any) => Promise<void>;

  password = "";

  filterAdvanced = false;
  filteredPatients: IPatient[] = [];
  checkInPatient!: IPatient;
  checkingIn = false;
  registerNew = false;
  showAuthModal = false;
  showSearchModal = false;
  activeTab = 0;
  query = "";
  searchResults: IPatient[] = [];
  loading = false;
  activeVisits: IPatient[] = [];
  patientId = "";
  showUpdateStatusModal = false;
  showNewModal = false;

  headers = [
    {
      title: "Identifier",
      key: "identifier",
      show: false,
    },
    {
      title: "Vital Id",
      key: "vitalId",
      show: true,
    },
    {
      title: "Date Recorded",
      key: "dateRecorded",
      show: true,
    },
    {
      title: "Record Type",
      key: "recordType",
      show: true,
    },
    {
      title: "Encounter",
      key: "encounter",
      show: true,
    },
    {
      title: "Performer",
      key: "performer",
      show: true,
    },
    {
      title: "Data Count",
      key: "dataCount",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
  ];

  updateData: any = {
    status: this.selectedVital.status ?? "",
  };

  addNew() {
    this.selectedVitalId = "";
    this.showNewModal = true;
  }

  selectedVitalId = "";

  get items() {
    return this.vitals?.map((vital) => {
      return {
        id: vital.id,
        vitalId: "XXXXX",
        identifier: vital?.practitioner?.identifier,
        dateRecorded: new Date(vital?.createdAt).toLocaleDateString(),
        recordType: vital?.encounter?.serviceType,
        encounter: vital?.encounter || "N/A",
        performer: `${vital.practitioner?.lastName} ${vital.practitioner?.firstName}`,
        dataCount: this.getDataCount(vital),
        status: vital.status,
        updatedAt: new Date(vital.updatedAt).toLocaleDateString(),
      };
    });
  }

  openUpdateStatusModal(id: string) {
    this.showUpdateStatusModal = true;
    this.selectedVitalId = id;
  }

  closeUpdateModal() {
    this.showUpdateStatusModal = false;
    this.selectedVitalId = "";
  }

  closeNewModal() {
    this.showNewModal = false;
    this.selectedVitalId = "";
  }

  viewVital(id: string) {
    this.selectedVitalId = id;
    this.showNewModal = true;
  }

  getDataCount(obj: any) {
    const total = Object.keys(obj).length - 7;
    let filled = 0;
    if (obj.bloodPressure.length > 0) {
      filled++;
    }
    if (obj.bodyTemperature.value) {
      filled++;
    }
    if (obj.bodyWeight.bodyMassIndex.value) {
      filled++;
    }
    if (obj.bodyWeight.bodyWeight.value) {
      filled++;
    }
    if (obj.circumferences.bodyHeight.value) {
      filled++;
    }
    if (obj.circumferences.headCircumferences.value) {
      filled++;
    }
    if (obj.respiration.heartRate.value) {
      filled++;
    }
    if (obj.respiration.oxygenSaturation.value) {
      filled++;
    }
    if (obj.respiration.bloodGlucoseLevel.value) {
      filled++;
    }
    if (obj.respiration.respiratoryRate.value) {
      filled++;
    }

    return `${filled}/${total}`;
  }

  get selectedVital() {
    if (!this.selectedVitalId) return {} as IVital;
    const selected = this.vitals.find(
      (vital) => vital.id === this.selectedVitalId
    );
    return selected || ({} as IVital);
  }

  get searchList() {
    return this.searchResults.map((patient: any) => {
      return {
        code: patient.id,
        display: `${patient.lastname} ${patient.middlename} ${patient.firstname}`,
      };
    });
  }

  get activePatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  async created() {
    await this.getVitals(this.activePatientId);
    await this.getEncounters(this.activePatientId);
  }
}
</script>

<style scoped>
.active-tab {
  border-bottom-width: 4px;
  margin-bottom: -0.22rem;
}

.active-color {
  border-color: #fe4d3c;
}

.status-active {
  background: #f3fcf8;
  color: #35ba83;
}

.status-inactive {
  background: #fff1f0;
  color: #fe4d3c;
}

.border-b-4 {
  border-bottom: 4px solid #f0f4fe;
}

/* .content-con {
  max-width: 30.65rem;
  min-width: 500px;
} */

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
