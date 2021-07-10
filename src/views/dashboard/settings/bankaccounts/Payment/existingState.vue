<template>
  <div class="w-full mx-5">
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
        @click="$emit('add-account')"
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
          <three-dot-icon
            class="cursor-pointer"
            @click="showMenu(item.data.id)"
          />
        </span>
        <span v-else> {{ getKeyValue(item).value }}</span>
      </template>
    </Table>
        <details-menu v-model:visible="showExtraModal" class="origin-top-right relative left-3/4 -mt-48 -top-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-lg opacity-100">
          <div class="py-1 mt-4" role="none"> 
          <div class="block p-3">
            <li  @click="updatePayment(newitem)" class="list-none flex px-4 py-2 mb-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer" role="menuitem">
              <eye-icon class="mr-3 mt-1" /> View & Edit
            </li>
            <li @click="showDelete(newitem)" class="list-none flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 mb-3 hover:text-gray-900 cursor-pointer" role="menuitem">
              <delete-icon class="mr-3" /> Delete Account
            </li>
            <li @click="deactivate(newitem)" class="list-none flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 mb-3 hover:text-gray-900 cursor-pointer" role="menuitem">
              <close-icon class="mr-3" /> Deactivate Account
            </li>
          </div>
          </div>
        </details-menu>
    <column-filter
      :columns="rawHeaders"
      v-model:preferred="preferredHeaders"
      v-model:visible="showColumnFilter"
    />
    <delete-modal v-model:visible="showDeleteModal" :paymentId="paymentId"/>
    <!-- <extra-modal v-model:visible="showExtraModal"  :payments="payments" :items="items"/>-->
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
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
import CloseIcon from "@/components/icons/close.vue";
import DeleteModal from "./deleteModal.vue";
import { cornieClient } from "@/plugins/http";
import Swal from "sweetalert2";
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
    DeleteModal
  },
})
export default class BankAccountsExistingState extends Vue {
  @Prop({ type: Array, default: [] })
  payments!: IPayment[];

  addAccount = false
  addPayment = false;
  update = false;
  query = "";
  newitem = "";
  paymentId = {};
  editPayments = {};
  showDeleteModal = false;
  showExtraModal = false;
  showColumnFilter = false;


  itemId = this.payments.map((payment) => {
    return payment.id;
  });
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
  updatePayment(id: string) {
    const payment = this.payments.find((d) => d.id == id);
    this.$emit("add-account", payment);
    console.log(payment)
  }
  public showDelete(id: string): void {
    const payment = this.payments.find((d) => d.id == id);
    this.showDeleteModal = true;

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
 async deactivate() {
    try {
      // returning error  Expected 2 arguments, but got 1.
      //const response = await cornieClient().post(`/api/v1/payments/deactivateActivatePaymentAccount/${this.paymentId}`);
      const response = await cornieClient().post('/api/v1/payments/deactivateActivatePaymentAccount/',this.paymentId);
      if (response.success) {
         Swal.fire({
          position:'top-end',
          width:300,
          padding:'0.5em',
          icon: 'success',
          title: 'Account Deactivated!',
          showConfirmButton: false,
          timer:15000
        })
      }
    } catch (error) {
      Swal.fire({
        position:'top-end',
        icon: 'error',
        width:300,
        padding:'0.5em',
        title: 'Not Deactivated!',
        showConfirmButton: false,
        timer:15000
      })
      console.error(error);
    }
  }
  public showMenu(data: string): void {
    this.showExtraModal = true;
    this.newitem = data;
  }
 
}
</script>
<style>
table thead th {
  background: #0a4269 !important;

  color: white !important;
}
table thead th:first-child {
  border-top-left-radius: 0.4rem 0.4rem !important;
}
table thead th:last-child {
  border-top-right-radius: 0.4rem 0.4rem !important;
}
table thead tr th {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}

table tbody td {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
}
table tbody tr {
  border: 1px solid #b8c3de;
}
table tbody tr:nth-child(even) {
  background-color: white !important;
}
</style>
