<template>
  <div
    style="min-height: 75%"
    class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded w-full overflow-auto"
  >
    <div class="w-full p-2">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-5 text-xl text-primary py-2"
      >
        {{ patientName }} (Patient Settings)
      </span>
      <h3 class="font-bold text-base">
         <span class="flex items-center mt-3">
          <span>Data Access</span> 
          <tooltip class="ml-3" right>
            <template #activator="{ on }">
              <span v-on="on">
                <info-icon />
              </span>
            </template>
            <div>
              Granting practitioners access to patient data enables the
              practitioners to access data at any given time.
            </div>
          </tooltip>
         </span>
      </h3>
      <div class="block mb-4">
        <span class="flex items-center mt-3">
          <span class="uppercase block font-semibold text-sm">
            Pre-authorize practitioner(s)
          </span>
          <tooltip class="ml-3" right>
            <template #activator="{ on }">
              <span v-on="on">
                <info-icon />
              </span>
            </template>
            <div>
              List of practitioners who are authorised to access patient record.
            </div>
          </tooltip>
        </span>
        <div class="mt-5 mb-5">
        <span class="text-danger font-bold cursor-pointer" @click="showAuthModal = true"> <span class="text-lg">+ </span> Add Practitioner</span>
        </div>
        <!-- <span class="block w-5/12">
          <search-input
            v-model="query"
            background="bg-gray-300"
            :results="results"
            @selected="selected"
          >
            <template #item="{ item }">
              <div class="w-full flex items-center justify-between">
                <div class="flex items-center">
                  <avatar :src="item.image" />
                  <div class="flex ml-1 flex-col">
                    <span class="font-semibold text-sm">
                      {{ printPractitioner(item) }}
                    </span>
                    <span class="text-xs font-semibold text-gray-500">
                      {{ item.specialty }}
                    </span>
                  </div>
                </div>
                <span class="text-danger font-semibold text-sm">
                  Grant Access
                </span>
              </div>
            </template>
          </search-input>
        </span> -->
      </div>
      <div class="w-full border-b-2 border-gray-200 mb-5 pb-3">
        <span class="w-full font-bold ">Practitioners</span>
      </div>
      <cornie-table v-model="items" :columns="headers">
        <template #name="{ item }">
          <div class="flex items-center">
            <avatar class="w-5 h-5" :src="item.photo" />
            <span class="text-xs ml-2 font-semibold">{{ item.name }}</span>
          </div>
        </template>
        <template #actions="{ item }">
          <table-action>
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </table-action>
          <table-action>
            <edit-icon class="text-primary fill-current" />
            <span class="ml-3 text-xs">Privileges</span>
          </table-action>
          <table-action @click="revoke(item)">
            <cancel-icon class="text-red-500 fill-current" />
            <span class="ml-3 text-xs">Revoke access</span>
          </table-action>
        </template>
      </cornie-table>
    </div>
  </div>
  <authorization-dialog v-model="showAuthModal" :id="id" @set-authorize="setauthorize"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Tooltip from "@/components/CornieTooltip.vue";
import InfoIcon from "@/components/icons/InformationIcon.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import TableAction from "@/components/table-action.vue";
import Avatar from "@/components/avatar.vue";
import EditIcon from "@/components/icons/edit.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import { Prop, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { IPatient, Practitioner } from "@/types/IPatient";
import { cornieClient } from "@/plugins/http";

import SearchInput from "@/components/search-input.vue";
import IPractitioner from "@/types/IPractitioner";
import practitioner from "@/store/practitioner";
import ObjectSet from "@/lib/objectset";
import AuthorizationDialog from "./AuthoriseDialog.vue";

const practitioners = namespace("practitioner");
const patients = namespace("patients");

@Options({
  name: "PatientSettings",
  components: {
    Tooltip,
    EditIcon,
    NewviewIcon,
    CancelIcon,
    Avatar,
    InfoIcon,
    IconInput,
    SearchIcon,
    CornieTable,
    TableAction,
    SearchInput,
    AuthorizationDialog,
  },
})
export default class PatientSetting extends Vue {
  @Prop({ type: String })
  id!: string;

  @patients.Action
  findPatient!: (id: string) => Promise<IPatient>;

  patient = {} as IPatient;

  practitioners: IPractitioner[] = [];
  headers = [
    { title: "Name", key: "name", show: true },
    { title: "Specialty", key: "specialty", show: true },
    { title: "Location", key: "location", show: true },
    { title: "Contact Number", key: "phone", show: true },
    { title: "Email", key: "email", show: true },
    { title: "Status", key: "status", show: true },
  ];

  get items() {
    return this.practitioners.map((p) => ({
      ...p,
      name: this.printPractitioner(p),
      specialty: p.department,
      phone: p.phone?.number || "",
      email: p.email,
      photo: p.image,
      status: p.activeState,
      location: p.address,
    }));
  }

  @practitioners.Action
  searchPractitioners!: (q: string) => Promise<IPractitioner[]>;

  query = "";
  showAuthModal = false;
  results: any[] = [];

  get patientName() {
    if (!this.patient?.id) return "";
    return `${this.patient.firstname} ${this.patient.lastname}`;
  }

  @Watch("query")
  async search(query: string) {
    if (!query) return (this.results = []);
    const practitioners = await this.searchPractitioners(query);
    this.results = practitioners.map((p) => ({
      ...p,
      display: this.printPractitioner(p),
    }));
  }

  printPractitioner(practitioner: IPractitioner) {
    return `${practitioner.jobDesignation} ${practitioner.firstName} ${practitioner.lastName}`;
  }

  async fetchPractitioners() {
    try {
      const response = await cornieClient().get(
        `/api/v1/patient/authorized/practitioners/${this.id}`
      );
      this.practitioners = response.data;
    } catch (error) {
      window.notify({ msg: "Couldn't fetch practitioners", status: "error" });
    }
  }

  async revoke(practitioner: IPractitioner) {
    const confirmed = await window.confirmAction({
      title: "Revoke access",
      message: `You are about to revoke ${this.printPractitioner(
        practitioner
      )}'s access to this patient's data, are you sure?`,
    });
    if (!confirmed) return;
    this.commitRevoke(practitioner);
  }

  async commitRevoke(revoked: IPractitioner) {
    try {
      await cornieClient().post(
        `/api/v1/patient/unauthorize/practitioner/${this.id}`,
        [revoked.id]
      );
     this.practitioners = this.practitioners.filter((p) => p.id != revoked.id);
      window.notify({
        msg: "Access revoked",
        status: "success",
      });
    } catch (error) {
      window.notify({
        msg: "There  was an error please try again",
        status: "error",
      });
    }
  }
  async selected(practitioner: IPractitioner) {
    const confirmed = await window.confirmAction({
      title: "Grant access",
      message: `You are about to grant ${this.printPractitioner(
        practitioner
      )} access to this patient's data, are you sure?`,
    });
    if (!confirmed) return;
    await this.commitSelection(practitioner);
  }

  async commitSelection(selected: IPractitioner) {
    try {
      await cornieClient().post(
        `/api/v1/patient/authorize/practitioner/${this.id}`,
        [selected.id]
      );
      const practitionersSet = new ObjectSet(
        [...this.practitioners, selected],
        "id"
      );
      this.practitioners = [...practitionersSet];
      window.notify({
        msg: "Access granted",
        status: "success",
      });
    } catch (error) {
      window.notify({
        msg: "There  was an error please try again",
        status: "error",
      });
    }
  }

  async setauthorize(){
   await this.fetchPractitioners();
  }
  async created() {
    this.fetchPractitioners();
    this.patient = await this.findPatient(this.id);
    this.patientName;
  }
}
</script>
