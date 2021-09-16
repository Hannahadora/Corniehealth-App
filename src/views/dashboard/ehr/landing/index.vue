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
      overflow-auto
    "
  >
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
        Patients
      </span>
      <!-- <registration-chart class="w-full" :height="100" /> -->
      
    </div>

    <div class="w-full border-b-4 curved flex mb-8">
        <div class="container-fluid flex font-semibold text-lg">
            <a class="px-4 py-2 active-tab cursor-pointer" :class="{ 'active-color text-dark': activeTab === 0, 'text-gray-500': activeTab !== 0 }"
            @click="() => activeTab = 0"
            >All Patients</a>
            <a class="px-4 py-2 active-tab cursor-pointer" :class="{ 'active-color': activeTab === 1, 'text-gray-500': activeTab !== 1 }"
            @click="() => activeTab = 1"
            >Active Visits</a>
        </div>
    </div>

    <div class="p-2">
      <cornie-table
        v-model="items"
        :columns="headers"
        @filter="filterAdvanced = true"
      >
        <template #name="{ item }">
          <div class="flex items-center">
            <avatar class="w-5 h-5" :src="item.photo" />
            <span class="text-xs ml-2 font-semibold">{{ item.name }}</span>
          </div>
        </template>
        <template #actions="{ item }">
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
    <check-in-dialog :patientId="checkInPatient?.id" v-model="checkingIn" />
    <registration-dialog v-model="registerNew" />
    <advanced-filter
      v-model:filtered="filteredPatients"
      v-model="filterAdvanced"
      :patients="patients"
    />
    <modal :visible="false">
      <template #title>
        <div class="w-full">
          <div class="container p-6 content-con">
            <p class="text-primary text-2xl font-semibold pb-3">You need to be authenticated to view health records.</p>
            <span style="color:#667499" class="text-secondary text-base">Type in your access code	</span>

            <div class="w-full py-6">
              <cornie-input :label="'Access Code'" style="width: 100%" placeholder="Enter" />
            </div>
            <div class="w-full flex flex justify-end">
                <corniebtn class="bg-white p-2 cancel-btn rounded-full px-8 mx-4">
                    <span class="font-semibold">Cancel</span>
                </corniebtn>

                <corniebtn class="bg-red-500 p-2 rounded-full px-8 mx-4">
                    <span class="text-white font-semibold">Save</span>
                </corniebtn>
            </div>
          </div>
        </div>
      </template>
    </modal>

    <modal :visible="false">
      <template #title>
        <div class="w-full">
          <div class="container p-6 content-con">
            <p class="text-primary text-2xl font-semibold pb-3">Welcome Back, Dr. Obi	</p>
            <span style="color:#667499" class="text-secondary text-base">Search a patient to continue	</span>

            <div class="w-full py-4">
              <search-input placehoder="Ssearch by patient name, mrn" />
            </div>
            <div class="w-full pt-2 pb-8">
              <button class="bg-red-500 p-2 rounded-full w-full">
                <span class="text-white font-semibold">Search</span>
              </button>
            </div>
            <div class="w-full flex flex justify-around">
                <corniebtn class="bg-primary p-2 cancel-btn rounded-full px-8 mx-4">
                    <span class="font-semibold text-white">View all patients</span>
                </corniebtn>

                <corniebtn class="bg-white primary-border p-2 rounded-full px-8 mx-4">
                    <span class="text-primary-500 font-semibold ">Go to active visits</span>
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
// import RegistrationDialog from "./registration-dialog.vue";
// import RegistrationChart from "./registration-chart.vue";
// import CheckinIcon from "@/components/icons/checkin.vue";
// import CheckInDialog from "./dialogs/checkin-dialog.vue";
import AdvancedFilter from "../../patientexp/patients/dialogs/advanced-filter.vue";
import Modal from "@/components/modal.vue"
import CornieInput from "@/components/cornieinput.vue"
import SearchInput from "@/components/search-input.vue"

const patients = namespace("patients");
@Options({
  name: "EHRPatients",
  components: {
    ...CornieCard,
    // CheckInDialog,
    // CheckinIcon,
    // RegistrationChart,
    // RegistrationDialog,
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
    CornieInput,
    SearchInput,
  },
})
export default class ExistingState extends Vue {
  @patients.State
  patients!: IPatient[];

  @patients.Action
  deletePatient!: (id: string) => Promise<boolean>;

  filterAdvanced = false;
  filteredPatients: IPatient[] = [];
  checkInPatient!: IPatient;
  checkingIn = false;
  registerNew = false;
  activeTab = 0;

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
      key: "dob",
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
    const patients = this.filteredPatients;
    return patients.map((patient) => ({
      name: `${patient.firstname} ${patient.lastname}`,
      dob: this.printDOB(patient.dateOfBirth),
      email: this.printEmail(patient),
      phone: this.printPhone(patient),
      mrn: this.printMRN(patient.mrn),
      gender: patient.gender,
      photo: patient.profilePhoto,
      id: patient.id,
    }));
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
