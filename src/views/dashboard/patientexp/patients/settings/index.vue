<template>
  <div
    style="min-height: 75%"
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
        Daniel Johnson (Patient Settings)
      </span>
      <h3 class="font-bold text-base">Data Access</h3>
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
              Granting practitioners access to patient data enables the
              practitioners to access data at any given time.
            </div>
          </tooltip>
        </span>
        <span class="block w-1/3">
          <icon-input
            autocomplete="off"
            type="search"
            placeholder="Search"
            class="rounded-full w-full border-2 focus:outline-none"
          >
            <template v-slot:prepend>
              <search-icon />
            </template>
          </icon-input>
        </span>
      </div>
      <cornie-table v-model="items" :columns="headers">
        <template #name="{ item }">
          <div class="flex items-center">
            <avatar class="w-5 h-5" :src="item.photo" />
            <span class="text-xs ml-2 font-semibold">{{ item.name }}</span>
          </div>
        </template>
        <template #actions>
          <table-action>
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </table-action>
          <table-action>
            <edit-icon class="text-primary fill-current" />
            <span class="ml-3 text-xs">Privileges</span>
          </table-action>
          <table-action>
            <cancel-icon class="text-red-500 fill-current" />
            <span class="ml-3 text-xs">Revoke access</span>
          </table-action>
        </template>
      </cornie-table>
    </div>
  </div>
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
  },
})
export default class PatientSetting extends Vue {
  headers = [
    { title: "Name", key: "name", show: true },
    { title: "Specialty", key: "specialty", show: true },
    { title: "Location", key: "location", show: true },
    { title: "Contact Number", key: "phone", show: true },
    { title: "Email", key: "email", show: true },
    { title: "Status", key: "status", show: true },
  ];
  items = [
    {
      name: "Dr. Daniel Johnson",
      specialty: "Gynaecology",
      location: "Reddington Hospital VI",
      phone: "08033214321",
      status: "Ok",
      email: "me@gmail.com",
      photo: require("@/assets/img/avatar.png"),
    },
  ];
}
</script>
