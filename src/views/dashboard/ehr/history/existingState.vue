<template>
  <div class="w-full pb-80">
    <div>
      <span class="flex justify-end w-full mb-8">
        <button
          @click="showHistoryModal = true"
          class="bg-danger rounded-lg text-white mt-5 py-2 pr-12 pl-12 px-3 mb-5 font-semibold focus:outline-none hover:opacity-90"
        >
           Create New
        </button>
      </span>
      <cornie-table :columns="headers" v-model="sortHistory" @refresh="fetchHistorys">
        <template #actions="{ item }">
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
            @click="showStatus(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <update-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs"> Update Status </span>
          </div>
           <!-- <div
              class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="deleteItem(item.id)">
              <cancel-icon class="text-danger fill-current" />
              <span class="ml-3 text-xs">Cancel</span>
            </div>  -->
        </template>
        <template #status="{ item }">
          <div class="flex items-center">
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
              class="text-xs bg-red-100 text-red-600 p-1 rounded"
              v-if="item.status == 'entered-in-error'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-blue-300 text-blue-600 p-1 rounded"
              v-if="item.status == 'health-unknown'"
            >
              {{ item.status }}
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

  </div>
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
      :updatedBy="updatedBy"
      :currentStatus="currentStatus"
      :dateUpdated="update"
      :practitionerId="practitionerId"
      @history-added="historyAdded"
      @show:modal="viewHistory"
      v-model="viewHistoryModal"
    />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import search from "@/plugins/search";

import { IPatient } from "@/types/IPatient";
import IAllergy from "@/types/IAllergy";
import Ihistory from "@/types/Ihistory";

import CornieTable from "@/components/cornie-table/CornieTable.vue";
import EditIcon from "@/components/icons/edit.vue";
import NewViewIcon from "@/components/icons/newview.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import HistoryIcon from "@/components/icons/history.vue";
import PlusIcon from "@/components/icons/plus.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";

import StatusUpdate from "./status-update.vue";
import HistoryModal from "./historyDialog.vue";
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
    CancelIcon,
    PlusIcon,
    HistoryIcon,
    StatusModal,
    ViewModal,
  },
})
export default class ExistingState extends Vue {
  @Prop({ type: String, default: "" })
  patientId!: string;


  @patients.State
  patients!: IPatient[];

  @history.State
  historys!: Ihistory[];

  @history.Action
  deleteHistory!: (id: string) => Promise<boolean>;

  @history.Action
  fetchHistorys!: (patientId: string) => Promise<void>;



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
  selectedItem = [] as any;

  headers = [
    {
      title: "history id",
      key: "identifier",
      show: true,
    },
    {
      title: "date recorded",
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
      key: "conditionCode",
      show: true,
    },
    {
      title: "deceased?",
      key: "deceased",
      show: true,
    },
    {
      title:"reference code",
      key: "reasonCode",
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

  get items() {
    const historys = this.historys.map((history:any) => {
      (history as any).createdAt = new Date(
        (history as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...history,
        action: history.id,
        member: history.patient.firstname +''+ history.patient.lastname,
      
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
  async historyAdded() {
    await this.fetchHistorys(this.patientId);
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this Family history",
      title: "Delete family history",
    });
    if (!confirmed) return;

    if (await this.deleteHistory(id))
      window.notify({ msg: "Family history deleted", status: "success" });
    else window.notify({ msg: "Family history not deleted", status: "error" });
  }

  async viewHistory(value: string) {
    this.viewHistoryModal = true;
    this.historyId = value;
  }
  async showStatus(item: any) {
    this.showStatusModal = true;
    this.selectedItem = item;
  }

  async showHistory(value: string) {
    this.showHistoryModal = true;
    this.historyId = value;
  }
  async created() {
    await this.fetchHistorys(this.patientId);
  }
}
</script>
