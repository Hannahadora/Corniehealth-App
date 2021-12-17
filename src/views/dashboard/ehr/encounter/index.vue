<template>
  <div
    class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded w-full h-screen overflow-auto"
  >
    <div class="container-fluid" v-if="true">
      <div class="w-full p-2">
        <span
          class="flex flex-col w-full justify-center border-b-2 font-bold mb-5 text-xl text-primary py-2"
        >
          Episodes | Encounter
        </span>
        <!-- <registration-chart class="w-full" :height="100" /> -->
      </div>

      <div class="w-full border-b-4 curved flex mb-8">
        <div class="container-fluid flex font-semibold text-lg">
          <a
            class="px-4 py-2 active-tab cursor-pointer"
            :class="{
              'active-color': activeTab === 1,
              'text-gray-500': activeTab !== 1,
            }"
            @click="() => (activeTab = 1)"
            >Encounters</a
          >
          <a
            class="px-4 py-2 active-tab cursor-pointer"
            :class="{
              'active-color text-dark': activeTab === 0,
              'text-gray-500': activeTab !== 0,
            }"
            @click="() => (activeTab = 0)"
            >Episodes</a
          >
        </div>
      </div>

      <div class="w-full">
        <span class="w-full bg-danger">
          <span class="flex justify-end w-full m4-5" v-if="activeTab === 1">
            <cornie-btn
              class="bg-danger text-white m-5 p-2 font-semibold"
              @click="() => (showNewEncounterModal = true)"
            >
              New Encounter
            </cornie-btn>
          </span>
          <span class="flex justify-end w-full m4-5" v-if="activeTab === 0">
            <cornie-btn
              class="bg-danger text-white m-5 p-2 font-semibold"
              @click="() => (showNewEpisodeModal = true)"
            >
              New Episode
            </cornie-btn>
          </span>
        </span>
      </div>

      <div class="p-2" v-if="activeTab === 0">
        <cornie-table
          v-model="episodesList"
          :columns="headers"
          @filter="filterAdvanced = true"
        >
          <template #name="{ item }">
            <div class="flex items-center">
              <avatar class="w-5 h-5" :src="item.profilePhoto" />
              <span class="text-xs ml-2 font-semibold">{{ item.name }}</span>
            </div>
          </template>
          <template #actions="{}">
            <table-action>
              <newview-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">View</span>
            </table-action>
            <table-action>
              <update-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">Update Status</span>
            </table-action>
            <table-action>
              <add-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">Admit Patient</span>
            </table-action>
            <table-action>
              <newview-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">View Status History</span>
            </table-action>
            <table-action>
              <newview-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">View Class History</span>
            </table-action>
            <table-action>
              <cancel-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">Cancel</span>
            </table-action>
          </template>
        </cornie-table>
      </div>

      <div class="p-2" v-if="activeTab === 1">
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
          <template #actions="{ item }">
            <table-action>
              <newview-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">View</span>
            </table-action>
            <table-action @click="showUpdateModal(item)">
              <update-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">Update Status</span>
            </table-action>
            <table-action>
              <add-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">Admit Patient</span>
            </table-action>
            <table-action>
              <newview-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">View Status History</span>
            </table-action>
            <table-action>
              <newview-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">View Class History</span>
            </table-action>
            <table-action>
              <cancel-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">Cancel</span>
            </table-action>
          </template>
        </cornie-table>
      </div>
    </div>

    <div class="w-full" v-else>
      <empty-state />
    </div>

    <side-modal
      :visible="showNewEncounterModal"
      :width="990"
      @closesidemodal="() => (showNewEncounterModal = false)"
      :header="'New Encounter'"
    >
      <new-encounter />
    </side-modal>

    <side-modal
      :visible="showNewEpisodeModal"
      :width="990"
      @closesidemodal="() => (showNewEpisodeModal = false)"
      :header="'New Episode'"
    >
      <new-episode :items="practitioners" />
    </side-modal>

    <side-modal
      :visible="showUpdateStatusModal"
      :width="590"
      :header="'Update Status'"
      @closesidemodal="closeUpdateModal"
    >
      <update-status
        :updateData="updateData"
        @changed="newStatusSelected"
        @closesidemodal="closeUpdateModal"
      >
        <template #submit>
          <CornieBtn
            :loading="loading"
            class="bg-danger p-2 rounded-full px-8 mx-2 cursor-pointer"
            @click="updateEncounterStatus"
          >
            <span class="text-white font-semibold">Update</span>
          </CornieBtn>
        </template>
      </update-status>
    </side-modal>
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
import Modal from "@/components/modal.vue";
import SearchInput from "@/components/search-input.vue";
import SearchDropdown from "../careteam/components/search-dropdown.vue";
import User from "@/types/user";
import EmptyState from "./components/empty-state.vue";
import CornieSelect from "@/components/cornieselect.vue";
import SideModal from "@/views/dashboard/schedules/components/side-modal.vue";
import VitalsForm from "./components/vitals-form.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import AddIcon from "@/components/icons/add.vue";
import NewEncounter from "./components/new-encounter.vue";
import NewEpisode from "./components/new-episode.vue";
import IEncounter from "@/types/IEncounter";
import IEpisode from "@/types/IEpisode";
import UpdateStatus from "./components/update-status.vue";
import IUpdateStatus, { Item } from "@/types/IUpdateModel";

const userStore = namespace("user");
const patients = namespace("patients");
const visitsStore = namespace("visits");
const practitioner = namespace("practitioner");
const vital = namespace("vitals");

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
    UpdateStatus,
  },
})
export default class ExistingState extends Vue {
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

  @vital.State
  encounters!: IEncounter[];

  @vital.Action
  getEncounters!: (patientId: string) => Promise<void>;

  @vital.Action
  updateStatusOfEncounter!: (body: any) => Promise<void>;

  @vital.State
  episodes!: IEpisode[];

  @vital.Action
  getEpisodes!: (patientId: string) => Promise<void>;

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
  activeTab = 1;
  query = "";
  searchResults: IPatient[] = [];
  loading = false;
  showUpdateStatusModal = false;
  activeVisits: IPatient[] = [];
  patientId = "";
  selectedEncounterId = "";

  newStatus = "";
  encounterStatus: Item[] = [
    { code: "active", display: "Active" },
    { code: "inactive", display: "Inactive" },
  ];

  updateData = {} as IUpdateStatus;

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
      key: "serviceType",
      show: true,
    },
    {
      title: "Based On",
      key: "Based On",
      show: false,
    },
    {
      title: "Practitioner",
      key: "practitioner",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
  ];

  get items() {
    if (this.encounters?.length === 0) return [];
    return this.encounters.map((encounter) => {
      return {
        id: encounter.id,
        identifier: encounter.id,
        recorded: new Date(encounter.createdAt).toLocaleDateString(),
        type: encounter.type,
        conditionRole: "Encounter",
        serviceType: encounter.serviceType,
        role: "Role",
        careManager: "Performer",
        encounters: "Encounter",
        practitioner: `${encounter?.practitioner?.firstName} ${encounter?.practitioner?.lastName}`,
        basedOn: "Based On",
        status: encounter.status,
      };
    });
  }

  get episodesList() {
    if (this.episodes?.length === 0) return [];
    return this.episodes.map((episode) => {
      return {
        identifier: episode.id,
        recorded: new Date(episode.createdAt).toLocaleDateString(),
        type: episode.type,
        conditionRole: episode.condition,
        role: episode.role,
        careManager: `${episode?.careManager?.firstName} ${episode?.careManager?.lastName}`,
        episodes: "episode",
        // practitioner: `${episode?.practitioner?.firstName} ${episode?.practitioner?.lastName}`,
        status: episode.status,
        encounters: this.encounters?.filter(
          (encounter) => encounter.episodeId === episode.id
        ).length,
      };
    });
  }

  get searchList() {
    return this.searchResults.map((patient: any) => {
      return {
        code: patient.id,
        display: `${patient.lastname} ${patient.middlename} ${patient.firstname}`,
      };
    });
  }

  get practitionersList() {
    if (this.practitioners?.length === 0) return [];
    return this.practitioners;
  }

  closeUpdateModal() {
    this.showUpdateStatusModal = false;
    this.newStatus = "";
    this.selectedEncounterId = "";
  }

  showUpdateModal(item: IEncounter) {
    this.selectedEncounterId = item?.id;
    alert(item.id);
    this.updateData = {
      currentStatus: item.status,
      lastUpdated: "",
      updatedBy: "",
      statuses: this.encounterStatus,
    };
    this.showUpdateStatusModal = true;
  }

  newStatusSelected(status: string) {
    this.newStatus = status;
  }

  async updateEncounterStatus() {
    try {
      this.loading = true;
      const response = await this.updateStatusOfEncounter({
        data: { status: this.newStatus },
        patientId: this.selectedEncounterId,
      });
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  }

  async created() {
    this.patientId = this.$route.params.id as string;

    if (this.practitioners?.length === 0) await this.fetchPractitioners();
    if (this.encounters?.length === 0) await this.getEncounters(this.patientId);
    if (this.episodes?.length <= 0) await this.getEpisodes(this.patientId);
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
