<template>
  <div class="flex flex-col">
    <div class="flex items-center">
      <div class="font-bold">{{ selectedAccount }}</div>
      <div class="text-red-500">Change Billing Account</div>
    </div>
    <cornie-select
      v-if="changeAccount"
      v-bind="$attrs"
      :rules="required"
      :items="AllAccount"
      v-model="selectedAccount"
      label="Change Billing Account"
      placeholder="--Select--"
      class="w-full capitalize"
    />
  </div>
</template>
<script lang="ts">
  import { cornieClient } from "@/plugins/http";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync } from "vue-property-decorator";

  @Options({
    name: "Billing account component",
  })
  export default class BillingAccountComponent extends Vue {
    @PropSync("modelValue", { default: "insurance" })
    account!: string;

    @Prop({ type: String, required: true })
    patientId!: string;

    allAccounts = [];
    changeAccount = false;
    selectedAccount = "insurance";

    get AllAccount() {
      return this.allAccounts.length > 0
        ? this.allAccounts.map((x: any) => {
            return {
              card: x.card,
            };
          })
        : [];
    }

    async getAccounts() {
      const url = `/api/v1/patient/payment-account/patient/${this.patientId}`;
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

    async mounted() {
      await this.getAccounts();
    }
  }
</script>
