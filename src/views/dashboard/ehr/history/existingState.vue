<template>
  <div class="w-full pb-80">
    <div>
      <span class="flex justify-end w-full mb-8">
        <button
          @click="showHistory('false')"
          class="bg-danger rounded-lg text-white mt-5 py-2 pr-12 pl-12 px-3 mb-5 font-semibold focus:outline-none hover:opacity-90"
        >
          New History
        </button>
      </span>
      <cornie-table :columns="headers" v-model="sortHistory">
        <template #actions="{ item }">
          <!-- <div
            @click="deleteItem(item.id)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <new-view-icon class="text-red-800 fill-current" />
            <span class="ml-3 text-xs">Delete</span>
          </div> -->
          <div
            @click="viewHistory(item.id)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <new-view-icon class="text-blue-300 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            @click="showHistory(item.id)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <edit-icon class="text-purple-700 fill-current" />
            <span class="ml-3 text-xs">Edit</span>
          </div>
          <div
            @click="showStatus(item.id)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <update-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs"> Update Status </span>
          </div>
        </template>
        <template #member>
          <p>John Paschal</p>
          <span class="text-xs text-gray-300">Child</span>
        </template>
        <template #status>
          <div class="flex items-center">
            <p
              class="text-xs bg-yellow-100 text-yellow-400 p-1 rounded"
            >
             Partial
            </p>

          </div>
        </template>
        <!-- <template #status="{ item }">
          <div class="flex items-center">
            <p
              class="text-xs bg-gray-300 p-1 rounded"
              v-if="item.status == 'draft'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-yellow-100 text-yellow-400 p-1 rounded"
              v-if="item.status == 'partial'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-green-100 text-green-500 p-1 rounded"
              v-if="item.status == 'completed'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-gray-300 p-1 rounded"
              v-if="item.status == 'health-unknown'"
            >
              {{ item.status }}
            </p>
            
            <p
              class="text-xs bg-purple-300 text-purple-600 p-1 rounded"
              v-if="item.status == 'entered-in-error'"
            >
              {{ item.status }}
            </p>

          </div>
        </template> -->
      </cornie-table>
    </div>
    <history-modal
      v-if="historyId == 'false'"
      @history-added="historyAdded"
      @show:modal="showHistory"
      v-model="showHistoryModal"
    />

    <history-modal
      v-else
      :id="historyId"
      @history-added="historyAdded"
      @show:modal="showHistory"
      v-model="showHistoryModal"
    />

    <status-modal
      :id="historyId"
      :updatedBy="updatedBy"
      :currentStatus="currentStatus"
      :dateUpdated="update"
      @history-added="historyAdded"
      @update:preferred="showStatus"
      v-model="showStatusModal"
    />

    <view-modal
      :id="historyId"
      :updatedBy="updatedBy"
      :currentStatus="currentStatus"
      :dateUpdated="update"
      :practitionerId="practitionerId"
      @history-added="historyAdded"
      @show:modal="viewHistory"
      v-model="viewHistoryModal"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import EditIcon from "@/components/icons/edit.vue";
import Ihistory from "@/types/Ihistory";
import NewViewIcon from "@/components/icons/newview.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import HistoryIcon from "@/components/icons/history.vue";
import PlusIcon from "@/components/icons/plus.vue";
import StatusUpdate from "./status-update.vue";
import HistoryModal from "./historyDialog.vue";
import { namespace } from "vuex-class";
import search from "@/plugins/search";
import { IPatient } from "@/types/IPatient";
import IAllergy from "@/types/IAllergy";
import StatusModal from "./status-update.vue";
import ViewModal from "./viewHistory.vue";

const history = namespace("history");
const patients = namespace("patients");
const allergy = namespace("allergy");

@Options({
  name: "HistoryExistingState",
  components: {
    CornieTable,
    HistoryModal,
    StatusUpdate,
    EditIcon,
    NewViewIcon,
    UpdateIcon,
    PlusIcon,
    HistoryIcon,
    StatusModal,
    ViewModal,
  },
})
export default class ExistingState extends Vue {
  @patients.State
  patients!: IPatient[];

  @history.State
  historys!: Ihistory[];

  @history.Action
  deleteHistory!: (id: string) => Promise<boolean>;

  @history.Action
  fetchHistorys!: (patientId: string) => Promise<void>;

  @allergy.State
  allergys!: IAllergy[];

  @allergy.Action
  fetchAllergys!: (patientId: string) => Promise<void>;

  addingCondition = false;
  addingOccurence = false;
  updatingStatus = false;
  addingNotes = false;
  recordingAbatement = false;
  viewingCondition = false;
  showHistoryModal = false;
  showStatusModal = false;
  viewHistoryModal = false;
  historyId = "";
  loading = false;
  query = "";
  updatedBy = "";
  currentStatus = "";
  update = "";
  practitionerId = "";

  headers = [
    {
      title: "identifier",
      key: "identifier",
      show: true,
      noOrder: true,
    },
    {
      title: "recorded",
      key: "createdAt",
      show: true,
    },
    {
      title: "member",
      key: "member",
      show: true,
    },
    {
      title: "condition",
      key: "condition",
      show: true,
    },
    {
      title: "deceased?",
      key: "deceased",
      show: true,
    },
    {
      title: "status",
      key: "status",
      show: true,
    },
    // {
    //   title: "Clinical Status",
    //   key: "clinicalStatus",
    //   show: true,
    // },
  ];
  get activepatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  get items() {
    const historys = this.allergys.map((history) => {
      // (history as any).createdAt = new Date(
      //   (history as any).createdAt
      // ).toLocaleDateString("en-US");
      // this.practitionerId = (history as any).practitionerId;
      // this.updatedBy = this.getPatientName(history.patientId as string);
      // this.currentStatus = history.basicInfo.status;
      // this.update = (history as any).updatedAt = new Date(
      //   (history as any).updatedAt
      // ).toLocaleDateString("en-US");
      return {
        ...history,
        action: history.id,
        keydisplay: "XXXXXXX",
        identifier:"xxxxxxx",
        createdAt:"19-07-21",
        condition:"Accident Prone",
        deceased: "No",
        // relationship: history.basicInfo.relationship,
        // condition: history.conditionRelatedPerson.outcome,
        // deceased: history.deceased.deceased,
        // status: history.basicInfo.status,
      };
    });

    if (!this.query) return historys;
    return search.searchObjectArray(historys, this.query);
  }
  getPatientName(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    return pt ? `${pt.firstname} ${pt.lastname}` : "";
  }
  get sortHistory() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
  historyAdded() {
    this.fetchHistorys(this.activepatientId);
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this Family history",
      title: "Delete family history",
    });
    if (!confirmed) return;

    if (await this.deleteHistory(id))
      window.notify({ msg: "Family history deleted", status: "success" });
    else window.notify({ msg: "Family history noy deleted", status: "error" });
  }

  async viewHistory(value: string) {
    this.viewHistoryModal = true;
    this.historyId = value;
  }
  async showStatus(value: string) {
    this.showStatusModal = true;
    this.historyId = value;
  }

  async showHistory(value: string) {
    this.showHistoryModal = true;
    this.historyId = value;
  }
  async created() {
    this.sortHistory;
     if (this.activepatientId) await this.fetchHistorys(this.activepatientId);
     if (this.activepatientId) await this.fetchAllergys(this.activepatientId);
  }
}
</script>
