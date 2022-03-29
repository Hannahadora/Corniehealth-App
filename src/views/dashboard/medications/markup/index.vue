<template>
  <EmptyState v-if="!markups" :locationId="locationId" />

  <existing-root-state
    :headers="headers"
    :items="items"
    :markupId="markupId"
    :locationId="locationId"
    v-else
    @markup-saved="fetchMarkups"
  />
  <!-- <div v-else>
    <existing-state-user
      :headers="headers"
      :items="items"
      :markupId="markupId"
      
      v-else
    />
  </div> -->
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
import IPractitioner from "@/types/IPractitioner";

const user = namespace("user");
const markup = namespace("markup");
const org = namespace("organization");
const practitioner = namespace("practitioner");

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

  markups = [] as any;

  @org.State
  organizationInfo!: any;

  @org.Action
  fetchOrgInfo!: () => Promise<void>;

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  locations = [] as any;

  locationId = null;

  async fetchMarkups() {
    if (this.isRoot) {
      const markups = await cornieClient().get("/api/v1/markup-discount");
      const response = await Promise.all([markups]);
      this.markups = response[0].data;
    } else {
      if (!this.locationId) return [];
      const markups = await cornieClient().get(
        `/api/v1/markup-discount/location/${this.locationId}`
      );
      const response = await Promise.all([markups]);

      this.markups = response[0].data;
    }
  }

  async fetchLocation() {
    const AllLocation = cornieClient().get(
      "/api/v1/location/myOrg/getMyOrgLocations"
    );

    const response = await Promise.all([AllLocation]);

    if (!this.isRoot) {
      if (!this.locationId) return [];

      response[0].data.forEach((item: any) => {
        if (item.id === this.locationId) {
          this.locations = [item];
        }
      });
    } else {
      this.locations = response[0].data;
    }
  }

  query = "";
  markupId = "";

  headers = [
    {
      title: "Location",
      key: "location",
      show: true,
    },
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
    return Boolean(this.organizationInfo?.rootUserId === this.cornieUser?.id);
  }

  SUC = 1000;
  PercentageMarkup = 200;
  MaxDiscount = 10;

  get items() {
    if (!this.isRoot) {
      const markups = this.locations.map((loc: any) => {
        const markupId = this.markups.id;
        this.markupId = markupId;
        let cdm = this.SUC * (this.markups?.markupPercentage / 100);
        let margin = Math.abs(cdm - this.SUC);
        let percentageMargin = (margin / cdm) * 100;
        let minimumPrice = Math.abs(
          cdm * (1 - this.markups?.maxAllowedDiscount)
        );
        let discountMargin = Math.abs(minimumPrice - this.SUC);
        let discountMarginPercentage = Math.floor(
          (discountMargin / minimumPrice) * 100
        );

        return {
          location: loc.name,
          sampleUnitCost: this.SUC,
          markupPercentage: this.markups?.markupPercentage,
          cdmPrice: cdm,
          margin: margin,
          marginPercentage: percentageMargin,
          maxAllowedDiscount: this.markups?.maxAllowedDiscount,
          minPrice: minimumPrice,
          discountedMargin: discountMargin,
          discountedMarginPercentage: discountMarginPercentage,
        };
      });

      if (!this.query) return markups;
      return search.searchObjectArray(markups, this.query);
    } else {
      const markups = this.locations.map((loc: any) => {
        const markupId = this.markups[0].id;
        this.markupId = markupId;
        let cdm = this.SUC * (this.markups[0]?.markupPercentage / 100);
        let margin = Math.abs(cdm - this.SUC);
        let percentageMargin = (margin / cdm) * 100;
        let minimumPrice = Math.abs(
          cdm * (1 - this.markups[0]?.maxAllowedDiscount)
        );
        let discountMargin = Math.abs(minimumPrice - this.SUC);
        let discountMarginPercentage = Math.floor(
          (discountMargin / minimumPrice) * 100
        );

        return {
          location: loc.name,
          sampleUnitCost: this.SUC,
          markupPercentage: this.markups[0]?.markupPercentage,
          cdmPrice: cdm,
          margin: margin,
          marginPercentage: percentageMargin,
          maxAllowedDiscount: this.markups[0]?.maxAllowedDiscount,
          minPrice: minimumPrice,
          discountedMargin: discountMargin,
          discountedMarginPercentage: discountMarginPercentage,
        };
      });
      if (!this.query) return markups;
      return search.searchObjectArray(markups, this.query);
    }
  }

  async created() {
    if (!this.organizationInfo) await this.fetchOrgInfo();

    if (!this.isRoot) {
      if (!this.practitioners.length) await this.fetchPractitioners();
      let currentPractiotioner = this.practitioners.find(
        (item: any) => item?.userId === this.cornieUser?.id
      );

      currentPractiotioner?.locationRoles?.forEach((item: any) => {
        if (!item.default) {
          this.locationId = item.locationId;
        }
      });
    }

    await this.fetchLocation();

    await this.fetchMarkups();
  }
}
</script>

<style></style>
