<template>
  <div class="w-full">
    <span class="flex justify-end">
      <button
        class="
          bg-danger
          rounded-full
          text-white
          mt-5
          py-2
          px-3
          focus:outline-none
          hover:opacity-90
          flex
        "
        @click="$router.push('add-payment-account')"
      >
        <span class="mt-2 mr-2"> <bank-add-icon /> </span>
        New Account
      </button>
    </span>
    <div class="flex w-full justify-between mt-5 items-center">
      <span class="flex items-center">
        <sort-icon class="mr-5" />
        <icon-input
          class="border border-gray-600 rounded-full focus:outline-none"
          type="search"
          v-model="query"
        >
          <template v-slot:prepend>
            <search-icon />
          </template>
        </icon-input>
      </span>
      <span class="flex justify-between items-center">
        <print-icon class="mr-7" />
        <filter-icon class="cursor-pointer" @click="showColumnFilter = true" />
      </span>
    </div>
    <Table :headers="headers" :items="items" class="tableu rounded-xl mt-5">
      <template v-slot:item="{ item }">
        <span v-if="getKeyValue(item).key == 'more'">
          <table-options>
            <li
              @click="
                $router.push(`add-payment-account/${getKeyValue(item).value}`)
              "
              class="
                list-none
                items-center
                flex
                text-xs
                font-semibold
                text-gray-700
                hover:bg-gray-100
                hover:text-gray-900
                cursor-pointer
                my-1
                py-3
              "
            >
              <eye-icon class="mr-3" /> View & Edit
            </li>
            <li
              @click="deleteItem(getKeyValue(item).value)"
              class="
                list-none
                flex
                my-1
                py-3
                items-center
                text-xs
                font-semibold
                text-gray-700
                hover:bg-gray-100
                hover:text-gray-900
                cursor-pointer
              "
            >
              <delete-icon class="mr-3" /> Delete Account
            </li>
            <li
              @click="showDeactivate(getKeyValue(item).value)"
              class="
                list-none
                flex
                my-1
                py-3
                items-center
                text-xs
                font-semibold
                text-gray-700
                hover:bg-gray-100
                hover:text-gray-900
                cursor-pointer
              "
            >
              <close-icon class="mr-3" /> Deactivate Account
            </li>
          </table-options>
        </span>
        <span v-else> {{ getKeyValue(item).value }}</span>
      </template>
    </Table>
    <column-filter
      :columns="rawHeaders"
      v-model:preferred="preferredHeaders"
      v-model:visible="showColumnFilter"
    />
    <deactivate-modal
      v-model:visible="showDeativateModal"
      :paymentId="paymentId"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import TableOptions from "@/components/table-options.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import TableSettingIcon from "@/components/icons/tablesetting.vue";
import BankAddIcon from "@/components/icons/bankadd.vue";
import extraModal from "./extraModal.vue";
import { Prop } from "vue-property-decorator";
import IPayment from "@/types/IPayment";
import search from "@/plugins/search";
import DetailsMenu from "@/components/menu.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import DeleteModal from "./deleteModal.vue";
import DeactivateModal from "./deactivateModal.vue";
import { cornieClient } from "@/plugins/http";
import ShowComfirm from "@/components/confirm.vue";
import Swal from "sweetalert2";
import { namespace } from "vuex-class";

const payment = namespace("payment");
const first = (num: number, vals: any[]) => {
  const res = [];
  for (let index = 0; index < vals.length; index++) {
    const element = vals[index];
    res.push(element);
  }
  return res;
};

@Options({
  components: {
    DeleteIcon,
    EyeIcon,
    TableOptions,
    CloseIcon,
    Table,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    BankAddIcon,
    TableSettingIcon,
    extraModal,
    ColumnFilter,
    DetailsMenu,
    DeleteModal,
    DeactivateModal,
    ShowComfirm,
  },
})
export default class BankAccountsExistingState extends Vue {
  addAccount = false;
  addPayment = false;
  update = false;
  query = "";
  newitem = "";
  paymentId = {};
  editPayments = {};
  loading = false;
  showColumnFilter = false;
  showDeativateModal = false;

  @payment.State
  payments!: IPayment[];

  @payment.Action
  deletePayment!: (id: string) => Promise<boolean>;

  preferredHeaders = [];
  rawHeaders = [
    {
      title: "ACCOUNT NAME",
      value: "accountName",
      show: true,
    },
    {
      title: "ACCOUNT NUMBER",
      value: "accountNumber",
      show: true,
    },
    {
      title: "Location(s)",
      value: "location",
      show: true,
    },
    {
      title: "PAYMENT CATEGORY(IES)",
      value: "paymentCategories",
      show: true,
    },
  ];

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "more", image: true }];
  }
  get items() {
    const payments = this.payments.map((payment) => {
      (payment as any).more = payment.id;
      return payment;
    });
    return payments;
    if (!this.query) return payments;
    return search.searchObjectArray(payments, this.query);
  }
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this payment account",
      title: "Delete Payment Account",
    });
    if (!confirmed) return;

    if (await this.deletePayment(id)) alert("Payment account deleted");
    else alert("Payment account not deleted");
  }

  updatePayment(id: string) {
    const payment = this.payments.find((d) => d.id == id);
    this.$emit("add-account", payment);
    console.log(payment);
  }

  public showDeactivate(id: string): void {
    const payment = this.payments.find((d) => d.id == id);
    this.showDeativateModal = true;
    this.paymentId = id;
  }

  getKeyValue(item: any) {
    const { data, index, ...rest } = item;
    const key = Object.values(rest)[0] as string;
    const value = data[key];
    return {
      key,
      value,
      index,
    };
  }
}
</script>
