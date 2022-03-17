<template>
  <EmptyState v-if="!markups.length" />

  <div v-else>
    <existing-root-state
      :headers="headers"
      :items="items"
      v-if="isRoot"
      :markupId="markupId"
    />
    <existing-state-user
      :headers="headers"
      :items="items"
      :markupId="markupId"
      v-else
    />
  </div>
</template>

<script lang="ts">
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { Options, Vue } from "vue-class-component";
import search from "@/plugins/search";
import EmptyState from "./empty-state.vue";
import { IOrganization } from "@/types/IOrganization";
import ExistingStateUser from "./Components/existing-state.vue";
import ExistingRootState from "./Components/existing-root-state.vue";

const user = namespace("user");
const markup = namespace("markup");
const org = namespace("organization");

@Options({
  name: "mark ",
  components: {
    EmptyState,
    ExistingStateUser,
    ExistingRootState,
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

  @org.State
  organizationInfo!: any;

  @org.Action
  fetchOrgInfo!: () => Promise<void>;

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

  get isRoot() {
    return Boolean(this.organizationInfo.rootUserId === this.cornieUser.id);
  }

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
    if (!this.organizationInfo) await this.fetchOrgInfo();
  }
}
</script>

<style></style>
