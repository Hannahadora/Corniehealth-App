<template>
  <clinical-dialog
    v-model="show"
    :title="'Pay Bill'"
    class="md:w-1/4 h-full w-full"
  >
    <div class="flex flex-col space-y-7">
      <div class="flex md:space-x-4 text-xs">
        <div class="md:flex-1">
          Total for Bill ID #{{ paybillPayload?.billDisplay }}
        </div>
        <div class="md:flex-none">
          ₦ {{ paybillPayload?.billAmount }}
          <span class="ml-2">
            <a>View Details</a>
          </span>
        </div>
      </div>
      <div class="text-black bg-blue-100">
        Select your preferred payment method to continue
      </div>
      <div v-if="allPatientAccount.length > 0">
        <div class="flex">
          <div class="flex-1 space-x-3">
            <cornie-select
              label="Payment Method"
              v-model="paymentMethod"
              placeholder="Select"
              :items="allPaymentMethods"
            />
          </div>
        </div>
      </div>
      <div v-else>No Payment Method found. Add a payment method</div>
    </div>
    <div class="absolute bottom-0 w-full">
      <div class="flex justify-end space-x-3 px-6 py-2 bg-white">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-1 mr-3 rounded-xl text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          @click="next"
          :loading="loading"
          class="text-white bg-danger px-6 rounded-xl"
        >
          {{ step == 1 ? "Next" : "Pay" }}
        </cornie-btn>
      </div>
    </div>
  </clinical-dialog>
</template>
<script lang="ts">
  import CornieSelect from "@/components/cornieselect.vue";
  import { cornieClient } from "@/plugins/http";
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync } from "vue-property-decorator";

  @Options({
    components: {
      ClinicalDialog,
      CornieSelect,
    },
  })
  export default class PayBill extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    // @Prop({ required: true })
    // accountId!: string;

    @Prop({ required: true, type: Object })
    paybillPayload!: any;

    paymentMethod = "";
    paymentMethodArray = ["Wallet", "Paystack"];
    step = 1;
    loading = false;
    allPatientAccount = [];

    get payload() {
      return {
        accountId: this.paymentMethod,
        billId: this.paybillPayload?.billId,
      };
    }

    async getBill() {
      try {
        this.loading = true;
        if (!this.paymentMethod || !this.paybillPayload?.billId) return;
        const response = await cornieClient().post(
          `/api/v1/patient-portal/billing`,
          this.payload
        );
        console.log("response:", response.data);
        this.loading = false;
        window.notify({
          msg: "Successful",
          status: "success",
        });
        this.show = false;
      } catch (error) {
        this.loading = false;
        window.notify({
          msg: "There was an error getting your payment",
          status: "error",
        });
      }
    }

    get allPaymentMethods() {
      const items =
        this.allPatientAccount.length > 0
          ? this.allPatientAccount
              .filter(
                (x: any) =>
                  x?.type == "card" ||
                  x?.type == "insurance" ||
                  x?.type == "wallet"
              )
              .map((p: any) => {
                return {
                  paymentType: this.getpaymentType(p?.type) || "",
                  //@ts-ignore
                  display: `${this.getAccountName(p)?.accountName} - ${
                    this.getpaymentType(p?.type) || ""
                  }`,
                  //@ts-ignore
                  code: this.getAccountName(p)?.id,
                };
              })
          : [];

      return items;
    }

    async fetchPaymentAccounts() {
      const response = await cornieClient().get(
        `/api/v1/patient-portal/payment`
      );
      this.allPatientAccount = response.data;
    }

    getAccountName(p: any) {
      const paymentType = this.getpaymentType(p?.type);
      if (paymentType == "Card") {
        const { card } = p;
        console.log("card account name", card);
        if (!card) return "XXXXXXX";
        return {
          accountName: `**** **** **${card?.lastFourDigits}`, //card?.name,
          accountId: `**** **** **${card?.lastFourDigits}`,
          expiryDate: `${card?.expiryMonth}-${card?.expiryYear}`,
          id: p.id,
        };
      } else if (paymentType == "Insurance") {
        const { insurance } = p;
        if (!insurance) return "XXXXXXX";
        return {
          accountName: `${insurance?.payer}|${insurance?.plan}`,
          accountId: `${insurance?.policyNo}`,
          expiryDate: `${insurance?.policyExpiry}`,
          id: p.id,
        };
      } else if (paymentType == "Wallet") {
        const { wallet } = p;
        return {
          accountName: `${wallet.walletName}`,
          accountId: `${wallet.accountId}`,
          expiryDate: `Not Applicable`,
        };
      }
    }

    getpaymentType(type: string) {
      let t = "";
      if (type == "cc" || type == "dc") return "Card";
      if (
        type == "insure-emp" ||
        type == "insure-pri" ||
        type == "flerxi" ||
        type == "corp-bill-acct" ||
        type == "insurance"
      )
        return "Insurance";

      if (type == "wallet") return "Wallet";
      return "Card";
    }

    next() {
      if (this.step == 1) {
        this.getBill();
        return;
      }
      this.step = this.step + 1;
    }

    async mounted() {
      await this.fetchPaymentAccounts();
    }
  }
</script>
