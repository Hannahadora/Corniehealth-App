<template>
  <div
    class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded w-full overflow-auto"
  >
    <div class="w-full p-2">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-5 text-xl text-primary py-2"
      >
        Patients
      </span>
      <registration-chart class="w-full" :height="100" />
      <span class="w-full bg-danger">
        <span class="flex justify-end w-full mb-5">
          <cornie-btn class="text-primary border border-primary m-5">
            Export Register
          </cornie-btn>
          <cornie-btn
            @click="registerNew = true"
            class="bg-danger text-white m-5"
          >
            Register New
          </cornie-btn>
        </span>
      </span>
    </div>
    <div class="p-2">
      <cornie-table
        v-model="items"
        :columns="headers"
        @filter="filterAdvanced = true"
        @refresh="fetchPatients"
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
import RegistrationDialog from "./registration-dialog.vue";
import RegistrationChart from "./registration-chart.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import CheckInDialog from "./dialogs/checkin-dialog.vue";
import AdvancedFilter from "./dialogs/advanced-filter.vue";

const patients = namespace("patients");
@Options({
  name: "PatientExistingState",
  components: {
    ...CornieCard,
    CheckInDialog,
    CheckinIcon,
    RegistrationChart,
    RegistrationDialog,
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
  },
})
export default class ExistingState extends Vue {
  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @patients.Action
  deletePatient!: (id: string) => Promise<boolean>;

  filterAdvanced = false;
  filteredPatients: IPatient[] = [];
  checkInPatient!: IPatient;
  checkingIn = false;
  registerNew = false;

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
      mrn: patient.mrn,
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
