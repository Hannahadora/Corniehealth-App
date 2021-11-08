<template>
  <div
    class="
      flex-col
      justify-center
      bg-white
      shadow-md
      p-3
      mb-2
      rounded
      w-full
      h-screen
      overflow-auto
    "
  >
    <div class="container-fluid" v-if="items?.length > 0">
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
          Procedure
        </span>
        <!-- <registration-chart class="w-full" :height="100" /> -->
        
      </div>

      <span class="w-full bg-danger">
          <span class="flex justify-end w-full m4-5">
            <cornie-btn
              class="bg-danger text-white m-5 p-2 font-semibold"
              @click="() => showNewModal = true"
            >
             Add Procedure
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
          <template #actions="{ item }">
            <table-action
              @click="viewProcedure(item)"
            >
              <newview-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">View</span>
            </table-action>
            <table-action
            @click="viewProcedure(item)"
            >
              <update-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">Edit</span>
            </table-action>
            <table-action
            @click="openUpdateStatusModal(item)"
            >
              <edit-icon class="text-primary fill-current" />
              <span class="ml-3 text-xs">Update Status</span>
            </table-action>
            <table-action
            >
              <assert-icon class="text-primary fill-current" />
              <span class="ml-3 text-xs">Assert</span>
            </table-action>
            <table-action
            >
              <file-icon class="text-primary fill-current" />
              <span class="ml-3 text-xs">Attach Form/Questionnaire</span>
            </table-action>
            <table-action
            >
              <file-icon class="text-primary fill-current" />
              <span class="ml-3 text-xs">Progress Note</span>
            </table-action>
            <table-action
            >
              <feedback-icon class="text-primary fill-current" />
              <span class="ml-3 text-xs">Feedback</span>
            </table-action>
          </template>
        </cornie-table>
      </div>
    </div>

    <div class="w-full" v-else>
      <empty-state>
        <template #newProcedure>
            <button
          class="
              text-white
              font-semibold
              bg-danger
              rounded-full
              mt-5
              py-2
              px-4
              mx-3
              focus:outline-none
              hover:opacity-90
          "
          @click="() => showNewModal = true"
          >
          Add Procedure
          </button>
        </template>
      </empty-state>
    </div>

    <side-modal :visible="showNewModal" :header="'New Procedure'" :width="990"  @closesidemodal="closeNewModal">
      <div class="w-full px-4">
          <new-procedure  @closesidemodal="() => showNewModal = false" :item="selectedProcedure"  />
      </div>
    </side-modal>

    <side-modal :visible="showUpdateStatusModal" :width="590" :header="'Update Status'" @closesidemodal="closeUpdateModal">
       <update-status :updateData="updateData" @changed="newStatusSelected" @closesidemodal="closeUpdateModal">
          <template #submit>
            <CornieBtn :loading="loading" class="bg-danger p-2 rounded-full px-8 mx-2 cursor-pointer" @click="updateProcedureStatus">
              <span class="text-white font-semibold">Update</span>
            </CornieBtn>
          </template>
        </update-status>
        <!-- <div class="w-full">
          <div class="container px-6 content-con">
            <div class="w-full py-3">
              <div class="w-full my-6">
                <input-desc-rounded :label="'Current Status'" :info="''">
                  <input disabled type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                </input-desc-rounded>
              </div>

              <div class="w-full my-6">
                <input-desc-rounded :label="'Updated By'" :info="''">
                  <input disabled type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                </input-desc-rounded>
              </div>

              <div class="w-full my-6">
                <input-desc-rounded :label="'Last Date Updated'" :info="''">
                  <input disabled type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                </input-desc-rounded>
              </div>

              <cornie-select :label="'New Status'" :items="['Active', 'Inactive']" style="width: 100%" />
            </div>

            <div class="w-full flex flex justify-end mt-12">
                <corniebtn class="text-primary p-2 cancel-btn rounded-full px-8 mx-2 cursor-pointer">
                    <span class="font-semibold">Cancel</span>
                </corniebtn>

                <CornieBtn :loading="loading" class="bg-danger p-2 rounded-full px-8 mx-2 cursor-pointer">
                    <span class="text-white font-semibold">Update</span>
                </CornieBtn>
            </div>
          </div>
        </div> -->
    </side-modal>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import { namespace } from "vuex-class";
import { IPatient } from "@/types/IPatient";
import Avatar from "@/components/avatar.vue";
import EditIcon from "@/components/icons/newupdate.vue";
import NewviewIcon from "@/components/icons/eye-blue-bg.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import SettingsIcon from "@/components/icons/settings.vue";
import TableAction from "@/components/table-action.vue";
import Modal from "@/components/modal.vue"
import SearchInput from "@/components/search-input.vue"
import User from "@/types/user";
import EmptyState from "./components/empty-state.vue"
import CornieSelect from "@/components/cornieselect.vue"
import SideModal from "@/views/dashboard/schedules/components/side-modal.vue"
import CornieInput from "@/components/cornieinput.vue"
import DatePicker from "@/components/datepicker.vue"
import NewProcedure from "./components/new-procedure.vue"
import IProcedure from "@/types/IProcedure";
import UpdateIcon from "@/components/icons/edit-purple.vue"
import AssertIcon from "@/components/icons/check.vue"
import FileIcon from "@/components/icons/file.vue"
import FeedbackIcon from "@/components/icons/feedback.vue"
import UpdateStatus from "@/views/dashboard/ehr/encounter/components/update-status.vue"
import IUpdateStatus, { Item } from "@/types/IUpdateModel";
import helperFunctions from "./helper/helper"

const userStore = namespace("user");
const procedure = namespace("procedure");

@Options({
  name: "EHRPatients",
  components: {
    CornieInput,
    DatePicker,
    TableAction,
    SettingsIcon,
    EditIcon,
    NewviewIcon,
    CancelIcon,
    Avatar,
    CornieBtn,
    CornieTable,
    Modal,
    SearchInput,
    EmptyState,
    CornieSelect,
    SideModal,
    NewProcedure,
    UpdateIcon,
    AssertIcon,
    FileIcon,
    FeedbackIcon,
    UpdateStatus,
  },
})
export default class ExistingState extends Vue {
  @userStore.State
  practitionerAuthenticated!: User;

  @userStore.Action
  updatePractitionerAuthStatus!: () => Promise<void>;

  @procedure.Action
  getProcedures!: (id: string) => Promise<void>;

  @procedure.Action
  updateProcedure!: (procedure: IProcedure) => Promise<IProcedure>;
  
  @procedure.State
  procedures!: IProcedure[];

  updateData = { } as IUpdateStatus;

  loading = false;
  patientId = "";
  showUpdateStatusModal = false;
  showNewModal = false;
  statuses = [ 
    { code: 'preparation', display: 'Preparation' },
    { code: 'in-progress', display: 'In Progress' },
    { code: 'on-hold', display: 'On Hold' },
    { code: 'not-done', display: 'Not Done' },
    { code: 'stopped', display: 'Stopped' },
    { code: 'completed', display: 'completed' },
   ] as Item[];

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
      title: "Based On",
      key: "basedOn",
      show: true,
    },
    {
      title: "Based Of",
      key: "basedOf",
      show: true,
    },
    {
      title: "Category",
      key: "category",
      show: true,
    },
    {
      title: "Subject",
      key: "subject",
      show: false,
    },
    {
      title: "Performer",
      key: "status",
      show: false,
    },
    {
      title: "Status",
      key: "status",
      show: false,
    },
  ];

  selectedVitalId = "";
  selectedProcedureId = "";
  newStatus = ""

  get items() {
    if (this.procedures?.length === 0) return [ ];
    return this.procedures.map(procedure => {
      return {
        id: procedure.id,
        identifier: procedure.id,
        recorded: new Date(procedure.createdAt).toLocaleDateString(),
        basedOn: 'Based On',
        basedOf: 'Based Of',
        category: procedure.category,
        subject: 'Subject',
        performer: `${procedure.recorder.firstName} ${procedure.recorder.lastName}`,
        status: procedure.status
      }
    })
  }

  get selectedProcedure() {
    if (!this.selectedProcedureId) return { } as IProcedure;
    return this.procedures.find(procedure => procedure.id === this.selectedProcedureId) ?? { };
  }

  openUpdateStatusModal(item: IProcedure) {
    this.selectedProcedureId = item?.id; 
    this.updateData = {
      currentStatus: item.status,
      lastUpdated: "",
      updatedBy: "",
      statuses: this.statuses
    }
    this.showUpdateStatusModal = true;
  }

  newStatusSelected(status: string) {
    this.newStatus = status;
  }

  closeUpdateModal() {
    this.showUpdateStatusModal = false;
    this.selectedProcedureId = "";
  }

  closeNewModal() {
    this.showNewModal = false
    this.selectedVitalId = "";
  }

  viewProcedure(item: IProcedure) {
    this.selectedProcedureId = item.id;
    this.showNewModal = true;
  }

  async updateProcedureStatus() {
    try {
      const procedure = this.procedures.find(procedure => procedure.id === this.selectedProcedureId);
      if (!procedure?.id) return false;
      this.loading = true;
      procedure.status = this.newStatus;
      const response = await this.updateProcedure(helperFunctions.formatReqBody(procedure));
      if (response?.id) this.showUpdateStatusModal = false;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  }

  async created() {
    const patientId = this.$route.params.id as string;
    if (this.procedures?.length === 0) await this.getProcedures(patientId);
    
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
