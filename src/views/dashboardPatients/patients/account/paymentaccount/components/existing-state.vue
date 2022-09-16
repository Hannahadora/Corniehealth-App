<template>
  <div class="w-full">
    <div>
      <div class="flex justify-end w-full mb-8">
        <button
          @click="newPaymentAccount"
          class="bg-danger rounded-lg text-white mt-5 py-4 px-8 mb-5 font-semibold focus:outline-none hover:opacity-90"
        >
          Add New Account
        </button>
      </div>
      <cornie-table :columns="headers" v-model="items">
        <template #code="{ item }">
          <div class="flex flex-col text-sm">
            <span class="">
              {{ item.code.display }}
            </span>
            <span class="text-xs text-gray-400">
              {{ item.code.code }}
            </span>
          </div>
        </template>
        <template #recorder="{ item }">
          <div class="flex flex-col text-sm">
            <span class="">
              {{ item.recorder.name }}
            </span>
            <span class="text-xs text-gray-400">
              {{ item.recorder.department }}
            </span>
          </div>
        </template>
        <template #status="{ item: { status } }">
          <span
            :class="{
              'bg-success text-success': status == 'Active',
              ' bg-danger text-danger': status == 'Inactive',
              ' bg-warning text-warning': status == 'recurrence',
              ' bg-blue-yonder text-blue-yonder': status == 'relapse',
              ' bg-blue-800 text-blue-800': status == 'preparation',
              ' bg-gray-800 text-gray-800': status == 'resolved',
            }"
            class="px-1 text-center rounded-md p-1 bg-opacity-20"
          >
            {{ status }}
          </span>
        </template>
        <template #actions="{ item }">
          <div
            v-if="item.paymentType !== 'Card'"
            @click="viewPayment(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <new-view-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>

          <div
            v-if="item.paymentType !== 'Card'"
            @click="editPayment(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <edit-icon class="text-primary fill-current" />
            <span class="ml-3 text-xs"> Edit </span>
          </div>
          <div
            @click="deleteAccount(item.id)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <delete-icon class="text-danger fill-current cursor-pointer" />
            <span class="ml-3 text-xs">Delete</span>
          </div>
        </template>
      </cornie-table>
    </div>
  </div>
</template>
<script lang="ts">
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import DeleteIcon from "@/components/icons/cancel.vue";
  import EditIcon from "@/components/icons/edit.vue";
  import HistoryIcon from "@/components/icons/history.vue";
  import UpdateIcon from "@/components/icons/newupdate.vue";
  import NewViewIcon from "@/components/icons/newview.vue";
  import PlusIcon from "@/components/icons/plus.vue";
  import { cornieClient } from "@/plugins/http";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";

  @Options({
    name: "PaymentAccountExistingState",
    components: {
      CornieTable,
      EditIcon,
      NewViewIcon,
      UpdateIcon,
      PlusIcon,
      HistoryIcon,
      DeleteIcon,
    },
    emits: [
      "newpaymentaccount",
      "reloadPayment",
      "viewPaymentAccount",
      "editPaymentAccount",
    ],
  })
  export default class PaymentAccountExistingState extends Vue {
    @Prop()
    patientAccounts!: any[];

    headers = [
      {
        title: "Account Type",
        key: "accountType",
        show: true,
        noOrder: true,
      },
      {
        title: "Payment Type",
        key: "paymentType",
        show: true,
      },
      {
        title: "Account Name",
        key: "accountName",
        show: true,
      },
      {
        title: "Account ID#",
        key: "accountId",
        show: true,
      },
      {
        title: "Expiry Date",
        key: "expiryDate",
        show: true,
      },
      {
        title: "status",
        key: "status",
        show: true,
      },
    ];

    //insure-emp, insure-pri, flerxi, wallet, cash, dc, cc, corp-bill-acct

    get items() {
      const items =
        this.patientAccounts.length > 0
          ? this.patientAccounts.map((p) => {
              return {
                accountType: p?.accountType,
                paymentType: this.getpaymentType(p?.type) || "",
                //@ts-ignore
                accountName: this.getAccountName(p)?.accountName,
                //@ts-ignore
                accountId: this.getAccountName(p)?.accountId,
                //@ts-ignore
                expiryDate: this.getAccountName(p)?.expiryDate,
                status: p?.status || "XXXXXX",
                ...p,
              };
            })
          : [];

      return items;
    }

    getAccountName(p: any) {
      const paymentType = this.getpaymentType(p?.type);
      if (paymentType == "Card") {
        const { card } = p;
        console.log("card account name", card);
        if (!card) return "XXXXXXX";
        return {
          accountName: card?.name,
          accountId: `**** **** **${card?.lastFourDigits}`,
          expiryDate: `${card?.expiryMonth}-${card?.expiryYear}`,
        };
      } else if (paymentType == "Insurance") {
        const { insurance } = p;
        if (!insurance) return "XXXXXXX";
        return {
          accountName: `${insurance?.payer}|${insurance?.plan}`,
          accountId: `${insurance?.policyNo}`,
          expiryDate: `${insurance?.policyExpiry}`,
        };
      } else if (paymentType == "Wallet") {
        const { wallet } = p;
        return {
          accountName: `${wallet.walletName}`,
          accountId: `${wallet.walletId}`,
          expiryDate: `Not Applicable`,
        };
      }
    }

    getpaymentType(type: string) {
      let t = "";
      if (type == "card") return "Card";
      if (type == "insurance") return "Insurance";

      if (type == "wallet") return "Wallet";
      return "Card";
    }

    async deleteAccount(id: string) {
      try {
        const response = await cornieClient().delete(
          `/api/v1/patient-portal/payment/${id}`
        );
        window.notify({
          msg: "Payment account deactivated successfully",
          status: "success",
        });
        this.$emit("reloadPayment");
      } catch (error) {
        window.notify({
          msg: "Error deactivating payment account",
          status: "error",
        });
      }
    }
    printRecorded(dateR: any) {
      const dateString = dateR;
      const date = new Date(dateString);
      return date.toLocaleDateString();
    }
    newPaymentAccount() {
      this.$emit("newpaymentaccount");
    }

    viewPayment(item: any) {
      const { paymentType, id, insurance, wallet } = item;
      this.$emit("viewPaymentAccount", {
        paymentType,
        accountId: id,
        insurance,
        wallet,
      });
    }

    editPayment(item: any) {
      const { paymentType, id, insurance, wallet } = item;
      this.$emit("editPaymentAccount", {
        paymentType,
        accountId: id,
        insurance,
        wallet,
      });
    }
  }
</script>
