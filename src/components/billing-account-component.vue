<template>
  <div class="flex flex-col">
    <div class="flex items-center mb-3">
      <div class="font-bold flex-1 capitalize">
        {{ accountNumber }} - {{ selectedAccount }}
      </div>
      <div
        @click="changeAccount = true"
        class="text-red-500 cursor-pointer flex-none font-bold"
      >
        Change Billing Account
      </div>
    </div>
    <cornie-select
      v-if="changeAccount"
      v-bind="$attrs"
      :items="AllAccount"
      placeholder="--Select--"
      class="w-full capitalize"
      label="Change Billing Account"
      @selected="update"
    />
  </div>
</template>
<script lang="ts">
  import CornieSelect from "@/components/autocomplete.vue";
  import { cornieClient } from "@/plugins/http";
  import IPaymentAccount from "@/types/IPaymentAccount";
  import { nextTick } from "vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync } from "vue-property-decorator";

  @Options({
    name: "Billing account component",
    components: {
      CornieSelect,
    },
  })
  export default class BillingAccountComponent extends Vue {
    @PropSync("modelValue")
    account!: string;

    @Prop({ required: true })
    patientId!: any[];

    allAccounts: IPaymentAccount[] = [];
    changeAccount = false;
    selectedAccount: any = "insurance";
    accountNumber: any = "";

    get AllAccount() {
      return this.allAccounts.length > 0
        ? this.allAccounts.map((x) => {
            return {
              code: x.id,
              display: x.type,
            };
          })
        : [];
    }

    async getAccounts() {
      // if(!this.patientId)
      const url = `/api/v1/patient/payment-account/patient/${this.patientId[0]?.patientId}`;
      try {
        const response = await cornieClient().get(url);
        if (response.success) {
          this.allAccounts = response.data;
        }
      } catch (error: any) {
        window.notify({
          msg: "Error retrieving billing accounts",
          status: "error",
        });
      }
    }

    update(paymentId: any) {
      nextTick(() => {
        console.log("payment id", paymentId);
        this.accountNumber = this.allAccounts.find(
          (x) => x.id == paymentId
        )?.accountNo;
        this.selectedAccount = this.allAccounts.find(
          (x) => x.id == paymentId
        )?.type;
        this.$emit("update:modelValue", paymentId);
      });
    }

    async mounted() {
      console.log("patient", this.patientId);
      await this.getAccounts();
    }
  }
</script>
