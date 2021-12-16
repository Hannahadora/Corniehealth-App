<template>
  <span
    class="flex flex-col w-full justify-center border-b border-grays font-bold mb-5 text-xl text-primary p-4 pb-2"
  >
    Markup & Discount
  </span>

  <div
    class="flex items-center flex-col justify-center h-full gap-8"
    v-if="false"
  >
    <img src="@/assets/img/bro.png" />
    <span class="text-center">
      There are no markups & discounts <br />
      Setup a new markup & discount by clicking the button below
    </span>

    <button
      class="bg-danger text-base font-bold rounded-full text-white py-4 px-20"
      @click="$router.push('/dashboard/provider/settings/markup-settings')"
    >
      Setup
    </button>
  </div>

  <div v-else>
    <cornie-table v-model="items" :columns="headers"> </cornie-table>

    <div class="flex flex-col">
      <span class="font-bold text-sm">Allow location admins to modify</span>
         <cornie-radio name="confirm" value="pay-to-confirm" v-model="appointmentConfirmation" checked label="Pay to Confirm" />
            <cornie-radio name="confirm" value="pay-later" v-model="appointmentConfirmation" label="Confirm and pay later" />
    </div>
  </div>
</template>

<script lang="ts">
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CornieRadio from "@/components/cornieradio.vue";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { Options, Vue } from "vue-class-component";

const user = namespace("user");

@Options({
  name: "mark ",
  components: {
    CornieTable, CornieRadio,
  },
})
// ​/
export default class ExistingState extends Vue {
  @user.Getter
  cornieUser!: any;

  tableData = [];

  headers = [
    {
      title: "Sample Unit Cost (NGN)",
      key: "sampleUnitCost",
      show: true,
    },
    {
      title: "MARKUP (NGN)",
      key: "markupPercentage",
      show: true,
    },
    {
      title: "CDM PRICE",
      key: "cdmPrice",
      show: true,
    },
    {
      title: "MARGIN (NGN)",
      key: "margin",
      show: true,
    },
    {
      title: "Margin (%)",
      key: "marginPercentage",
      show: true,
    },
    {
      title: "Max Allowable Discount (%)",
      key: "maxAllowedDiscount",
      show: true,
    },
    {
      title: "Minimum Price",
      key: "minPrice",
      show: true,
    },
    {
      title: "Discounted Margin (NGN)",
      key: "discountedMargin",
      show: true,
    },
    {
      title: "Discounted Margin (%)",
      key: "discountedMarginPercentage",
      show: true,
    },
  ];

  async fetchClinicalImpressions() {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/markup-discount/findAllByOrgId/${this.cornieUser.organizationId}`
      );

      this.tableData = data;
    } catch (error) {
      window.notify({
        msg: "There was an error when fetching mark details",
        status: "error",
      });
    }
  }

  created() {
    console.log(this?.cornieUser?.organizationId);
    this.fetchClinicalImpressions();
  }
}
</script>

<style></style>
