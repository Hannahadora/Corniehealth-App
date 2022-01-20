<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full">
      <button
        class="bg-danger rounded-full text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90"
        @click="showAddCarePartners = true"
      >
        Add a Care Partner
      </button>
    </span>
    <cornie-table :columns="headers" v-model="items">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deletePartner(item.id)"
        >
          <delete-icon />
          <span class="ml-3 text-xs">Delete</span>
        </div>
      </template>
    </cornie-table>
    <cornie-dialog v-model="showAddCarePartners" right class="w-4/12 h-full">
      <add-care-partners @close="showAddCarePartners = false" class="h-full" />
    </cornie-dialog>
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
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import ICarePartner from "@/types/ICarePartner";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import AddCarePartners from "./AddCarePartner.vue";
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
      title: "Organisation Name",
      key: "name",
      //   orderBy: (a: ICarePartner, b: ICarePartner) => a.name < b.name ? -1 : 1,
      show: true,
    },
    {
      title: "Organisation Type",
      key: "organisationType",
      //   orderBy: (a: ICarePartner, b: ICarePartner) => a.organisationType < b.organisationType ? -1 : 1,
      show: true,
    },
    {
      title: "Address",
      key: "address",
      // orderBy: (a: ICarePartner, b: ICarePartner) => (a.address as string) < (b.address as string) ? -1 : 1,
      show: true,
    },
    {
      title: "Email",
      key: "email",
      //   orderBy: (a: ICarePartner, b: ICarePartner) => a.email < b.email ? -1 : 1,
      show: true,
    },
    {
      title: "Phone",
      key: "phone",
      //   orderBy: (a: ICarePartner, b: ICarePartner) => (a.phone as string) < (b.phone as string) ? -1 : 1,
      show: true,
    },
  ];

  get items() {
    return this.carePartners.map((partner) => {
      return {
        ...partner,
        action: partner.id,
        email: (partner.email as unknown as IEmail).address,
        phone:
          (partner.phone as unknown as IPhone).dialCode ||
          "+234" + (partner.phone as unknown as IPhone).number,
      };
    });
  }

  async deletePartner(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this care partner",
    });
    if (!confirmed) return;
    const partner = this.carePartners.find((element) => element.id == id);
    if (partner && (await this.delete(partner)))
      notify({ msg: "Care partner deleted", status: "success" });
    else notify({ msg: "Care partner not deleted", status: "error" });
  }
}
</script>
