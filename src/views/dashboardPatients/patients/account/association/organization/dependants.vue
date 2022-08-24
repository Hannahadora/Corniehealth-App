<template>
  <cornie-dialog v-model="show" right class="w-2/3 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Dependants
          </h2>
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <div class="w-full pb-7">
          <span class="flex justify-end w-full mb-3">
            <button
              @click="addMember = true"
              class="bg-danger items-center flex space-x-4 justify-between rounded-md text-white font-semibold text-sm mt-5 py-3 px-8 focus:outline-none hover:opacity-90"
            >
              <span> Add Member </span>
            </button>
          </span>
          <cornie-table
            :columns="rawHeaders"
            v-model="items"
            :check="false"
            :fixeHeight="true"
          >
            <template #actions>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="showViewProvider = true"
              >
                <eye-icon class="text-yellow-400 fill-current" />
                <span class="ml-3 text-xs">View</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
              >
                <edit-icon class="text-primary fill-current" />
                <span class="ml-3 text-xs">Edit</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
              >
                <delete-icon class="text-danger fill-current" />
                <span class="ml-3 text-xs">Deactivate</span>
              </div>
            </template>
            <template #status>
              <span
                class="bg-green-200 text-green-700 text-center rounded-md py-2 px-4 bg-opacity-20"
              >
                Active
              </span>
            </template>
          </cornie-table>
        </div>
      </cornie-card-text>
    </cornie-card>
    <member-modal v-model="addMember" />
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import DeleteIcon from "@/components/icons/deactivate.vue";
import LocationIcon from "@/components/icons/location.vue";
import EyeIcon from "@/components/icons/newview.vue";
import EditIcon from "@/components/icons/edit.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import { IPatientDependent } from "./types";
import MemberModal from "./memberModal.vue";

@Options({
  name: "Dependants",
  components: {
    ...CornieCard,
    CornieIconBtn,
    MemberModal,
    ArrowLeftIcon,
    CornieDialog,
    SearchIcon,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,
    CornieRadio,
    CornieTable,
    DeleteIcon,
    LocationIcon,
    EyeIcon,
    EditIcon,
    ChevronDownIcon,
  },
})
export default class Dependants extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String })
  associationId!: string;

  @Prop({ type: String, default: "" })
  id!: string;

  addMember = false;

  dependents = [] as IPatientDependent[];
  rawHeaders = [
    { title: "DATE ADDED", key: "date", noOrder: true, show: true },
    { title: "MRN #", key: "mrn", noOrder: true, show: true },
    {
      title: "NAME",
      key: "name",
      show: true,
      noOrder: true,
    },
    {
      title: "DATE OF BIRTH",
      key: "dob",
      noOrder: true,
      show: true,
    },
    {
      title: "GENDER",
      key: "gender",
      noOrder: true,
      show: true,
    },
    {
      title: "Payment Account",
      key: "payment",
      noOrder: true,
      show: true,
    },
    {
      title: "Status",
      key: "status",
      noOrder: true,
      show: true,
    },
  ];

  get items() {
    return this.dependents.map((dependent) => ({
      date: new Date(dependent.dateAdded).toLocaleDateString(),
      mrn: dependent.mrn,
      name: dependent.name,
      dob: new Date(dependent.dob).toLocaleDateString(),
      gender: dependent.gender,
      payment: dependent.paymentAccount ?? "",
      status: dependent.status,
    }));
  }

  @Watch("associationId")
  async fetchDependents() {
    if (!this.associationId) return;
    try {
      const { data } = await cornieClient().get(
        `/api/v1/employer/${this.associationId}/dependent`
      );
      this.dependents = data;
    } catch (error) {
      window.notify({ msg: "Failed to fetch dependents", status: "error" });
    }
  }
}
</script>

<style>
.border-r-0 {
  border-right-width: 0px !important;
}
.border-l-0 {
  border-left-width: 0px !important;
}
</style>
