<template>
  <div
    class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded w-full h-full overflow-auto"
  >
    <div class="w-full p-2">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-5 text-xl text-primary py-2"
      >
        Patients
      </span>
      <!-- <registration-chart class="w-full" :height="100" /> -->
    </div>

    <div class="w-full border-b-4 curved flex mb-8">
      <div class="container-fluid flex font-semibold text-lg">
        <a
          class="px-4 py-2 text-sm active-tab cursor-pointer"
          :class="{
            'active-color text-dark': activeTab === 0,
            'text-gray-500': activeTab !== 0,
          }"
          @click="() => (activeTab = 0)"
          >All Patients</a
        >
        <a
          class="px-4 py-2 text-sm active-tab cursor-pointer"
          :class="{
            'active-color': activeTab === 1,
            'text-gray-500': activeTab !== 1,
          }"
          @click="() => (activeTab = 1)"
          >Active Visits</a
        >
      </div>
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
        <template #actions="{ item }">
          <table-action @click="goToEHR(item.id)">
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View chart</span>
          </table-action>
          <table-action
            @click="
              $router.push(
                `/dashboard/provider/experience/view-patient/${item.id}`
              )
            "
          >
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View patient details</span>
          </table-action>
          <table-action @click="encounterPatient(item)">
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">Start Encounter</span>
          </table-action>
          <table-action
            @click="
              $router.push(
                `/dashboard/provider/experience/view-patient/${item.id}`
              )
            "
          >
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View patient details</span>
          </table-action>
          <table-action
            @click="
              $router.push(
                `/dashboard/provider/experience/edit-patient/${item.id}`
              )
            "
          >
            <edit-icon class="text-primary fill-current" />
            <span class="ml-3 text-xs">Edit</span>
          </table-action>
          <table-action @click="removePatient(item.id)">
            <cancel-icon class="text-red-500 fill-current" />
            <span class="ml-3 text-xs">Remove Patient</span>
          </table-action>
          <table-action
            @click="
              $router.push(`/dashboard/provider/experience/settings/${item.id}`)
            "
          >
            <settings-icon class="text-red-500 fill-current" />
            <span class="ml-3 text-xs">Patient Settings</span>
          </table-action>
          <table-action @click="checkIn(item)">
            <checkin-icon />
            <span class="ml-3 text-xs">Check-In</span>
          </table-action>
        </template>
      </cornie-table>
    </div>

    <div class="p-2" v-if="activeTab === 1">
      <cornie-table
        v-model="activeVisits"
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
          <table-action @click="() => (showAuthModal = true)">
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View Chart</span>
          </table-action>
          <table-action @click="goToEHR(item.id)">
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View patient details</span>
          </table-action>
          <table-action
            @click="
              $router.push(
                `/dashboard/provider/experience/edit-patient/${item.id}`
              )
            "
          >
            <edit-icon class="text-primary fill-current" />
            <span class="ml-3 text-xs">Edit</span>
          </table-action>
          <table-action @click="removePatient(item.id)">
            <cancel-icon class="text-red-500 fill-current" />
            <span class="ml-3 text-xs">Remove Patient</span>
          </table-action>
          <table-action
            @click="
              $router.push(`/dashboard/provider/experience/settings/${item.id}`)
            "
          >
            <settings-icon class="text-red-500 fill-current" />
            <span class="ml-3 text-xs">Patient Settings</span>
          </table-action>
        </template>
      </cornie-table>
    </div>
    <check-in-dialog :patientId="checkInPatient?.id" v-model="checkingIn" />
    <registration-dialog v-model="registerNew" />
    <advanced-filter
      v-model:filtered="filteredPatients"
      v-model="filterAdvanced"
      :patients="patients"
    />


    <modal :visible="showSearchModal">
      <template #title>
        <div class="w-full">
          <div class="container p-6 content-con">
            <p class="text-primary text-2xl font-semibold pb-3">
              Welcome Back, Dr. Obi
            </p>
            <span style="color: #667499" class="text-secondary text-base"
              >Search a patient to continue
            </span>

            <div class="w-full py-4">
              <!-- <search-dropdown :results="searchList" /> -->
              <search-input
                class="p-2"
                :placehoder="'Search by patient name, mrn, email, unique ID'"
                v-model="query"
              />
            </div>
            <div class="w-full pt-2 pb-8">
              <button
                class="bg-red-500 p-2 rounded-full w-full cursor-pointer"
                @click="searchForPatient"
              >
                <span class="text-white font-semibold">{{
                  loading ? "Searching" : "Search"
                }}</span>
                <div
                  class="loadingio-spinner-rolling-pciy0fvd3t mt-auto"
                  v-if="loading"
                >
                  <div class="ldio-s45rszdrvn">
                    <div></div>
                  </div>
                </div>
              </button>
            </div>

            <div class="w-full flex justify-around items-center mb-5">
              <div
                class="w-5/12"
                style="border-bottom: 1px dashed #c2c7d6"
              ></div>
              <div class="w-1/12"><span>Or</span></div>
              <div
                class="w-5/12"
                style="border-bottom: 1px dashed #c2c7d6"
              ></div>
            </div>

            <div class="w-full flex justify-around">
              <corniebtn
                class="bg-primary p-2 cancel-btn rounded-full px-8 mx-4 cursor-pointer"
              >
                <span class="font-semibold text-white" @click="closeAndViewAll"
                  >View all patients</span
                >
              </corniebtn>

              <corniebtn
                class="bg-white primary-border p-2 rounded-full px-8 mx-4 cursor-pointer"
              >
                <span
                  class="text-primary-500 font-semibold"
                  @click="viewActiveVisits"
                  >Go to active visits</span
                >
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
import Modal from "@/components/modal.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import SearchInput from "@/components/search-input.vue";
import SearchDropdown from "../careteam/components/search-dropdown.vue";
import ehrHelper from "./helper/ehr-service";
import User from "@/types/user";
import IPractitioner from "@/types/IPractitioner";
import { cornieClient } from "@/plugins/http";

const userStore = namespace("user");
const patients = namespace("patients");
const visitsStore = namespace("visits");


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
    PasswordInput,
    SearchInput,
    SearchDropdown,
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

  @userStore.Getter
  authCurrentLocation!: string;



  @userStore.Getter
  authPractitioner!: IPractitioner;

  @userStore.State
  practitionerAuthenticated!: boolean;

  @userStore.State
  domain!: string;

  @userStore.Action
  updatePractitionerAuthStatus!: (value: boolean) => Promise<void>;

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
  time: any;

  

  headers = [
    {
      title: "Name",
      key: "name",
      show: true,
    },
    {
      title: "MRN",
      key: "mrn",
      show: true,
    },
    {
      title: "GENDER",
      key: "gender",
      show: true,
    },
    {
      title: "D.O.B",
      key: "dateOfBirth",
      show: true,
    },
    {
      title: "EMAIL",
      key: "email",
      show: true,
    },
    {
      title: "PHONE NUMBER",
      key: "phone",
      show: true,
    },
  ];

  get items() {
    return this.patients.map((patient) => {
      // ;
      const contact = patient?.contactInfo?.find(
        (contact) => contact.phone?.number
      );
      return {
        ...patient,
        name: `${patient.firstname} ${patient.lastname}`,
        phone: `${contact?.phone?.dialCode}${contact?.phone?.number}`,
        email: contact?.email,
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

  goToEHR(patientId: string) {
    if (!this.practitionerAuthenticated) {
      this.patientId = patientId;
      this.showAuthModal = true;
    } else {
      this.$router.push({ name: "Health Trend", params: { id: patientId } });
    }
  }
  async encounterPatient(patient: IPatient) {
    const body ={
      patientId: patient.id,
      practitionerId: this.authPractitioner.id,
      locationId: this.authCurrentLocation,
      status: 'active',
      class: 'consultation',
      serviceType: 'consultation'
    }
     try {
      const response = await cornieClient().post(
        "/api/v1/encounter",
       body
      );
      if (response.success) {
       this.$router.push({ name: "Health Trend", params: { id: patient.id } });
      }
    } catch (error: any) {
      window.notify({ msg: "Encounter error", status: "error" });
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
    try {
      this.loading = true;
      const data = await ehrHelper.searchPatient(this.query);
      this.loading = false;
      if (data && data.length > 0) {
        this.$router.push(
          `/dashboard/provider/clinical/${data[0].id}/health-trend`
        );
        // this.searchResults = data;
      } else {
        window.notify({ msg: "No match found", status: "info" });
      }
    } catch (error) {
      this.loading = false;
    }
  }

  logout() {
    this.updatePractitionerAuthStatus(false);
  }

  resetTimer() {
    clearTimeout(this.time);
    this.time = setTimeout(this.logout, 180000);
  }

  mounted() {
    window.onload = this.resetTimer;
    // DOM Events
    document.onmousemove = this.resetTimer;
    document.onkeydown = this.resetTimer;
  }

  async created() {
    if (!this.practitionerAuthenticated) this.showAuthModal = true;
    await this.fetchPatients();
    if (!this.visits || this.visits.length === 0) await this.getVisits();
    this.visits?.map((visit: any) => {
      if (visit.practitioners?.length === 0) {
        visit.practitioners.push({
          id: "87e846a3-bac0-43b9-a4db-0b2605426c42",
        });
      }
      return visit;
    });
    const activeVisits = ehrHelper.getActiveVisits(
      this.visits,
      this.user.id,
      this.patients
    );
    this.activeVisits = activeVisits?.map((visit: any) => {
      const patient = this.patients?.find((patient) => patient.id === visit.id);
      const contact = patient?.contactInfo?.find(
        (contact) => contact.phone?.number
      );
      const data: any = { ...patient };
      if (patient?.id) {
        (data.phone = `${contact?.phone?.dialCode}${contact?.phone?.number}`),
          (data.email = contact?.email);
      }
      return patient?.id ? patient : visit;
    });
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
