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
    <div class="container-fluid" v-if="vitals?.length > 0">
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
          Vital Signs
        </span>
        <!-- <registration-chart class="w-full" :height="100" /> -->
        
      </div>

      <span class="w-full bg-danger">
          <span class="flex justify-end w-full m4-5">
            <cornie-btn
              class="bg-danger text-white m-5 p-2 font-semibold"
               @click="() => showNewModal = true"
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
          <template #actions="{ item }">
            <table-action
               @click="viewVital(item.id)"
            >
              <newview-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">View</span>
            </table-action>
            <table-action
               @click="viewVital(item.id)"
            >
              <edit-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">Edit</span>
            </table-action>
            <table-action
              @click="openUpdateStatusModal(item.id)"
            >
              <update-icon class="text-primary fill-current" />
              <span class="ml-3 text-xs">Update Status</span>
            </table-action>
          </template>
        </cornie-table>
      </div>
    </div>

    <div class="w-full" v-else>
      <empty-state />
    </div>
<!-- 
    <advanced-filter
      v-model:filtered="filteredPatients"
      v-model="filterAdvanced"
      :patients="patients"
    /> -->

    <side-modal :visible="showNewModal" :header="'New Request'" :width="990"  @closesidemodal="closeNewModal">
      <vitals-form  @closesidemodal="() => showNewModal = false" :selectedVital="selectedVital" />
    </side-modal>

    <side-modal :visible="showUpdateStatusModal" :width="590" :header="'Update Status'" @closesidemodal="closeUpdateModal">
        <div class="w-full">
          <div class="container px-6 content-con">
            <div class="w-full py-3">
              <div class="w-full my-6">
                <input-desc-rounded :label="'Current Status'" :info="''">
                  <input v-model="selectedVital.status" disabled type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                </input-desc-rounded>
              </div>

              <div class="w-full my-6">
                <input-desc-rounded :label="'Updated By'" :info="''">
                  <input v-model="selectedVital.status" disabled type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                </input-desc-rounded>
              </div>

              <div class="w-full my-6">
                <input-desc-rounded :label="'Last Date Updated'" :info="''">
                  <input :value="selectedVital.updatedAt" disabled type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                </input-desc-rounded>
              </div>

              <cornie-select v-model="updateData.status" :label="'New Status'" :items="['Active', 'Inactive']" style="width: 100%" />
            </div>

            <div class="w-full flex flex justify-end mt-12">
                <corniebtn class="text-primary p-2 cancel-btn rounded-full px-8 mx-2 cursor-pointer">
                    <span class="font-semibold">Cancel</span>
                </corniebtn>

                <CornieBtn :loading="loading" class="bg-danger p-2 rounded-full px-8 mx-2 cursor-pointer">
                    <span class="text-white font-semibold" @click="updateStatus">Update</span>
                </CornieBtn>
            </div>
          </div>
        </div>
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
import EditIcon from "@/components/icons/edit-purple.vue";
import NewviewIcon from "@/components/icons/eye-blue-bg.vue";
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
import CornieInput from "@/components/cornieinput.vue"
import DatePicker from "@/components/datepicker.vue"
import IVital from "@/types/IVital";
import InputDescRounded from "./components/input-desc-rounded.vue"
import IEncounter from "@/types/IEncounter";
import UpdateIcon from "@/components/icons/update-status-yellow.vue"
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
    status: this.selectedVital.status ?? ""
  }

  selectedVitalId = "";

  get items() {
    return this.vitals?.map(vital => {
      return {
        id: vital.id,
        identifier: "XXXXX",
        recorded: new Date(vital.date).toLocaleDateString(),
        recordType: vital?.encounter?.serviceType,
        encounter: vital?.encounter?.class,
        performer: `${vital.practitioner?.lastName} ${vital.practitioner?.firstName}`,
        dataCount: vital.datacount,
        status: vital.status,
        updatedAt: new Date(vital.updatedAt).toLocaleDateString()
      }
    })
  }

  openUpdateStatusModal(id: string) {    
    this.showUpdateStatusModal = true
    this.selectedVitalId = id;
  }

  async updateStatus() {
    try {
      this.loading = true;
      await this.updateVitalStatus({
        data: this.updateData,
        vitalId: this.selectedVitalId
      })
      this.loading = false;
      this.showUpdateStatusModal = false
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
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

  get selectedVital() {
    if (!this.selectedVitalId) return { } as IVital;
    const selected =  this.vitals.find(vital => vital.id === this.selectedVitalId);
    return selected || { } as IVital;
    
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
