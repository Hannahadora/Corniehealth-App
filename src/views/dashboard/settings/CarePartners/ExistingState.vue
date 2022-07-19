<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full">
      <button
        class="bg-danger rounded-md text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90"
        @click="showAddCarePartners = true"
      >
        Add a Care Partner
      </button>
    </span>
    <cornie-table :columns="headers" v-model="items">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="viewPartner(item)"
        >
          <edit-icon />
          <span class="ml-3 text-xs">View & Edit</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deactivatePartner(item.id)"
        >
          <not-allowed class="fill-current text-red-500" />
          <span class="ml-3 text-xs">Deactivate</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deletePartner(item.id)"
        >
          <delete-icon />
          <span class="ml-3 text-xs">Delete</span>
        </div>
      </template>
    </cornie-table>

    <add-care-partners
      :visible="showAddCarePartners"
      @close-add-care-partner="showAddCarePartners = false"
      @open-add-care-partner="showAddCarePartners = true"
      :partnerToEdit="partnerToEdit"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete-red.vue";
import EyeIcon from "@/components/icons/eye.vue";
import NotAllowed from "@/components/icons/not-allowed.vue";
import EditIcon from "@/components/icons/edit-purple.vue";
import ICarePartner from "@/types/ICarePartner";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import AddCarePartners from "./components/AddCarePartners.vue";
import IEmail from "@/types/IEmail";
import IPhone from "@/types/IPhone";

const CarePartnersStore = namespace("CarePartnersStore");

@Options({
  components: {
    CornieTable,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    DeleteIcon,
    EyeIcon,
    ColumnFilter,
    TableOptions,
    CornieDialog,
    AddCarePartners,
    CardText,
    EditIcon,
    NotAllowed,
  },
})
export default class CarePartnersExistingState extends Vue {
  showAddCarePartners = false;

  @CarePartnersStore.State
  carePartners!: ICarePartner[];

  @CarePartnersStore.Action
  delete!: (partner: ICarePartner) => Promise<boolean>;

  headers = [
    {
      title: "Practice ID",
      key: "identifier",
      //   orderBy: (a: ICarePartner, b: ICarePartner) => a.name < b.name ? -1 : 1,
      show: true,
      noOrder: true,
    },
    {
      title: "Organisation Name",
      key: "name",
      //   orderBy: (a: ICarePartner, b: ICarePartner) => a.name < b.name ? -1 : 1,
      show: true,
      noOrder: true,
    },
    {
      title: "Organisation Type",
      key: "organisationType",
      //   orderBy: (a: ICarePartner, b: ICarePartner) => a.organisationType < b.organisationType ? -1 : 1,
      show: true,
      noOrder: true,
    },
    {
      title: "Address",
      key: "address",
      // orderBy: (a: ICarePartner, b: ICarePartner) => (a.address as string) < (b.address as string) ? -1 : 1,
      show: true,
      noOrder: true,
    },
    {
      title: "Status",
      key: "status",
      //   orderBy: (a: ICarePartner, b: ICarePartner) => a.email < b.email ? -1 : 1,
      show: true,
    },
  ];

  get items() {
    return this.carePartners.map((partner) => {
      return {
        ...partner,
        action: partner.id,
        email: (partner?.email as unknown as IEmail)?.address,
        phone:
          (partner?.phone as unknown as IPhone)?.dialCode ||
          "+234" + (partner?.phone as unknown as IPhone)?.number,
        identifier: partner?.identifier ? partner?.identifier : "Not specified",
        status: "Unknown",
      };
    });
  }

  partnerToEdit = {} as ICarePartner;

  async viewPartner(partner: ICarePartner) {
    console.log(partner);
    this.partnerToEdit = partner;
    this.showAddCarePartners = true;
  }

  async deactivatePartner(id: string) {
    console.log(id);
  }

  async deletePartner(id: string) {
    const confirmed = await window.confirmAction({
      title: "Delete Care Partner",
      message:
        "Are you sure you want to delete this care partner? This action cannot be undone.",
    });
    if (!confirmed) return;
    const partner = this.carePartners.find((element) => element.id == id);
    if (partner && (await this.delete(partner)))
      notify({ msg: "Care partner deleted", status: "success" });
    else notify({ msg: "Care partner not deleted", status: "error" });
  }
}
</script>
