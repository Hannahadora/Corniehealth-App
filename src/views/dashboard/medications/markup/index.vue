<template>
  <span
    class="flex flex-col w-full justify-center border-b border-grays font-bold mb-5 text-xl text-primary p-4 pb-2"
  >
    Markup & Discount
  </span>

  <div class="w-full py-4 flex justify-end" v-if="markups.length > 0">
    <button
      class="bg-danger text-base font-bold rounded text-white py-2 px-24"
      @click="$router.push(`/dashboard/provider/settings/markup-settings/${markupId}`)"
    >
      Edit
    </button>
  </div>

  <div
    class="flex items-center flex-col justify-center h-full gap-8"
    v-if="!markups.length"
  >
    <img src="@/assets/img/bro.png" />
    <span class="text-center">
      There are no markups & discounts <br />
      Setup a new markup & discount by clicking the button below
    </span>

    <button
      class="bg-danger text-base font-bold rounded text-white py-4 px-20"
      @click="$router.push('/dashboard/provider/settings/markup-settings')"
    >
      Setup
    </button>
  </div>

  <div v-else>
    <cornie-table :columns="headers" v-model="items" :check="false">
    </cornie-table>

    <div class="flex flex-col gap-4 mt-8">
      <span class="font-bold text-sm text-jet_black"
        >Allow location admins to modify</span
      >
      <div class="flex gap-4">
        <cornie-radio
          name="confirm"
          :value="true"
          v-model="markups.locationAdminsCanSetForLocations"
          checked
          label="Yes"
        />
        <cornie-radio
          name="confirm"
          :value="false"
          v-model="markups.locationAdminsCanSetForLocations"
          label="No"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CornieRadio from "@/components/cornieradio.vue";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { Options, Vue } from "vue-class-component";
import search from "@/plugins/search";

const user = namespace("user");
const markup = namespace("markup");

@Options({
  name: "mark ",
  components: {
    CornieTable,
    CornieRadio,
  },
})
// ​/
export default class ExistingState extends Vue {
  @user.Getter
  cornieUser!: any;

   @markup.State
  markups!: any[];


  @markup.Action
  fetchMarkups!: () => Promise<void>;

  query = "";
  markupId = "";


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

 get items() {
    const markups = this.markups.map((markup) => {
      const markupId = markup.id;
      this.markupId = markupId;
      return {
        ...markup,

      };
    });
    if (!this.query) return markups;
    return search.searchObjectArray(markups, this.query);
  }


 async created() {
   await this.fetchMarkups();
  }
}
</script>

<style></style>
