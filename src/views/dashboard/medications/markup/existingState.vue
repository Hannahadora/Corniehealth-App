<template>
  <existing-root-state
    :headers="headers"
    :items="items"
    :markupId="markupId"
    :locationId="authCurrentLocation"
    @markup-saved="SerchMarkups"
  />

</template>

<script lang="ts">
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { Options, Vue } from "vue-class-component";
import search from "@/plugins/search";
import EmptyState from "./empty-state.vue";
import  IMarkup  from "@/types/IMarkup";
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

  //  markups = [] as any;

  @org.State
  organizationInfo!: any;

  @org.Action
  fetchOrgInfo!: () => Promise<void>;

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  @user.Getter
  authCurrentLocation!: any;

  locations = [] as any;

//   locationId = null;

  @markup.State
  markups!: IMarkup[];

  @markup.Action
  fetchMarkups!: () => Promise<void>;

  @markup.Action
  fetchLocationMarkups!: (locationId: string) => Promise<void>;

 

  async SerchMarkups() {
    if (this.isRoot) {
      // const markups = await cornieClient().get("/api/v1/markup-discount");
      // const response = await Promise.all([markups]);
      // this.markups = response[0].data;
      await this.fetchMarkups();
    } else {
      if (!this.authCurrentLocation) return [];
      await this.fetchLocationMarkups(this.authCurrentLocation);
      // const markups = await cornieClient().get(
      //   `/api/v1/markup-discount/location/${this.locationId}`
      // );
      // const response = await Promise.all([markups]);

      // this.markups = response[0].data;
    }
  }

  async fetchLocation() {
    const AllLocation = cornieClient().get(
      "/api/v1/location/myOrg/getMyOrgLocations"
    );

    const response = await Promise.all([AllLocation]);

    if (!this.isRoot) {
      if (!this.authCurrentLocation) return [];

      response[0].data.forEach((item: any) => {
        if (item.id === this.authCurrentLocation) {
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
      noOrder: true
    },
    {
      title: "Sample Unit Cost (NGN)",
      key: "sampleUnitCost",
      show: true,
       noOrder: true
    },
    {
      title: "MARKUP (NGN)",
      key: "markupPercentage",
      show: true,
      noOrder: true
    },
    {
      title: "CDM PRICE",
      key: "cdmPrice",
      show: true,
      noOrder: true
    },
    {
      title: "MARGIN (NGN)",
      key: "margin",
      show: true,
      noOrder: true
    },
    {
      title: "Margin (%)",
      key: "marginPercentage",
      show: true,
      noOrder: true
    },
    {
      title: "Max Allowable Discount (%)",
      key: "maxAllowedDiscount",
      show: true,
      noOrder: true
    },
    {
      title: "Minimum Price",
      key: "minPrice",
      show: true,
      noOrder: true
    },
    {
      title: "Discounted Margin (NGN)",
      key: "discountedMargin",
      show: true,
      noOrder: true
    },
    {
      title: "Discounted Margin (%)",
      key: "discountedMarginPercentage",
      show: true,
      noOrder: true
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
      const markups = this.markups.map((markup: any) => {
        const markupId = markup.id;
        this.markupId = markupId;
        let cdm = this.SUC * (markup?.markupPercentage / 100);
        let margin = Math.abs(cdm - this.SUC);
        let percentageMargin = (margin / cdm) * 100;
        let minimumPrice = Math.abs(
          cdm * (1 - markup?.maxAllowedDiscount)
        );
        let discountMargin = Math.abs(minimumPrice - this.SUC);
        let discountMarginPercentage = Math.floor(
          (discountMargin / minimumPrice) * 100
        );

        return {
          location: markup?.location?.name,
          sampleUnitCost: this.SUC,
          markupPercentage: markup?.markupPercentage,
          cdmPrice: cdm,
          margin: margin,
          marginPercentage: percentageMargin,
          maxAllowedDiscount: markup?.maxAllowedDiscount,
          minPrice: minimumPrice,
          discountedMargin: discountMargin,
          discountedMarginPercentage: discountMarginPercentage,
          default: markup.default,
          modifiable: markup.modifiable,
          id:markup.id
        };
      });

      if (!this.query) return markups;
      return search.searchObjectArray(markups, this.query);
    } else {
      const markups = this.markups.map((markup: any) => {
        const markupId = markup.id;
        this.markupId = markupId;
        let cdm = this.SUC * (markup?.markupPercentage / 100);
        let margin = Math.abs(cdm - this.SUC);
        let percentageMargin = (margin / cdm) * 100;
        let minimumPrice = Math.abs(
          cdm * (1 - markup?.maxAllowedDiscount)
        );
        let discountMargin = Math.abs(minimumPrice - this.SUC);
        let discountMarginPercentage = Math.floor(
          (discountMargin / minimumPrice) * 100
        );

        return {
          location: markup?.location?.name,
          sampleUnitCost: this.SUC,
          markupPercentage: markup?.markupPercentage,
          cdmPrice: cdm,
          margin: margin,
          marginPercentage: percentageMargin,
          maxAllowedDiscount: markup?.maxAllowedDiscount,
          minPrice: minimumPrice,
          discountedMargin: discountMargin,
          discountedMarginPercentage: discountMarginPercentage,
          default: markup.default,
          modifiable: markup.modifiable,
           id:markup.id
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
          this.authCurrentLocation = item.locationId;
        }
      });
    }

    await this.fetchLocation();

    await this.SerchMarkups();
  }
}
</script>

<style></style>
