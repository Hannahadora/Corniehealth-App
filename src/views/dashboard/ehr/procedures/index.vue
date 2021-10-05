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
          <template #actions="{  }">
            <table-action
            >
              <newview-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">View</span>
            </table-action>
            <table-action
            >
              <update-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">Edit</span>
            </table-action>
            <table-action
            @click="openUpdateStatusModal"
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
      <empty-state />
    </div>

    <side-modal :visible="showNewModal" :header="'New Procedure'" :width="990"  @closesidemodal="closeNewModal">
      <div class="w-full px-4">
          <new-procedure  @closesidemodal="() => showNewModal = false"  />
      </div>
    </side-modal>

    <side-modal :visible="showUpdateStatusModal" :width="590" :header="'Update Status'" @closesidemodal="closeUpdateModal">
        <div class="w-full">
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
        </div>
    </side-modal>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieCardTitle from "@/components/cornie-card/CornieCardTitle.vue";
import CornieCardText from "@/components/cornie-card/CornieCardText.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import { namespace } from "vuex-class";
import { IPatient } from "@/types/IPatient";
import Avatar from "@/components/avatar.vue";
import EditIcon from "@/components/icons/newupdate.vue";
import NewviewIcon from "@/components/icons/newview.vue";
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
import UpdateIcon from "@/components/icons/edit.vue"
import AssertIcon from "@/components/icons/check.vue"
import FileIcon from "@/components/icons/file.vue"
import FeedbackIcon from "@/components/icons/feedback.vue"

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
    CornieCardTitle,
    CornieCardText,
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
  },
})
export default class ExistingState extends Vue {
  @userStore.State
  user!: User;

  @userStore.State
  practitionerAuthenticated!: User;

  @userStore.Action
  updatePractitionerAuthStatus!: () => Promise<void>;

  @procedure.Action
  getProcedures!: (id: string) => Promise<void>;
  
  @procedure.State
  procedures!: IProcedure[];

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
  searchResults: IPatient[] = [ ];
  loading = false;
  activeVisits: IPatient[] = [ ];
  patientId = "";
  showUpdateStatusModal = false;
  showNewModal = false;

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

  get items() {
    return [
        {
            identifier: 'Identifier',
            recorded: 'Recorded',
            basedOn: 'Based On',
            basedOf: 'Based Of',
            category: "Category",
            subject: 'Subject',
            performer: 'Performer',
            status: 'Status'
        },
        {
            identifier: 'Identifier',
            recorded: 'Recorded',
            basedOn: 'Based On',
            basedOf: 'Based Of',
            category: "Category",
            subject: 'Subject',
            performer: 'Performer',
            status: 'Status'
        },
    ]
  }

  openUpdateStatusModal(id: string) {    
    this.showUpdateStatusModal = true
    this.selectedVitalId = id;
  }

  closeUpdateModal() {
    this.showUpdateStatusModal = false;
    this.selectedVitalId = "";
  }

  closeNewModal() {
    this.showNewModal = false
    this.selectedVitalId = "";
  }

  viewVital(id: string) {
    this.selectedVitalId = id;
    this.showNewModal = true;
  }

  get searchList() {
    return this.searchResults.map((patient: any) => {
      return {
        code: patient.id,
        display: `${patient.lastname} ${patient.middlename} ${patient.firstname}`
      }
    })
  }

  get activePatientId() {
      const id = this.$route?.params?.id as string;
      return id;
  }

  async created() {
    const patientId = this.$route.params.id as string;
    await this.getProcedures(patientId);

    console.log(this.procedures);
    
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
