<template>
  <div class="w-full">
    <span class="flex justify-end">
      <button
        class="bg-danger rounded-full text-white mt-5 py-3 px-3 pl-5 pr-5 mb-5 focus:outline-none hover:opacity-90 flex"
        @click="$router.push('add-payment-account')"
      >
        <bank-add-icon class="mt-1 mr-2" />
        New Account
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="sortPayments" :check="false">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="$router.push(`add-payment-account/${item.id}`)"
        >
          <eye-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteItem(item.id)"
        >
          <delete-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Delete</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showDeactivate(item.id)"
        >
          <close-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Deactivate Account</span>
        </div>
      </template>
    </cornie-table>
    <deactivate-modal v-model="showDeativateModal" :paymentId="paymentId" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
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
import IPayment from "@/types/IPayment";
import DetailsMenu from "@/components/menu.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import DeleteModal from "./deleteModal.vue";
import DeactivateModal from "./deactivateModal.vue";

import ShowComfirm from "@/components/confirm.vue";
import { namespace } from "vuex-class";
import search from "@/plugins/search";

const payment = namespace("payment");

@Options({
  components: {
    DeleteIcon,
    EyeIcon,
    TableOptions,
    CloseIcon,
    CornieTable,
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

  rawHeaders = [
    {
      title: "ACCOUNT NAME",
      key: "accountName",
      show: true,
    },
    {
      title: "ACCOUNT NUMBER",
      key: "accountNumber",
      show: true,
    },
    {
      title: "Location(s)",
      key: "location",
      show: false,
    },
    {
      title: "PAYMENT CATEGORY(IES)",
      key: "paymentCategories",
      show: true,
    },
  ];

  get items() {
    const payments = this.payments.map((payment) => {
      (payment as any).more = payment.id;
      return payment;
    });
    if (!this.query) return payments;
    return search.searchObjectArray(payments, this.query);
  }
  get sortPayments() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this payment account",
      title: "Delete Payment Account",
    });
    if (!confirmed) return;

    if (await this.deletePayment(id))
      window.notify({ msg: "Payment account  deleted", status: "success" });
    else window.notify({ msg: "Payment account not deleted", status: "error" });
  }

  updatePayment(id: string) {
    const payment = this.payments.find((d) => d.id == id);
    this.$emit("add-account", payment);
    ;
  }

  public showDeactivate(id: string): void {
    const payment = this.payments.find((d) => d.id == id);
    this.showDeativateModal = true;
    this.paymentId = id;
  }
}
</script>
