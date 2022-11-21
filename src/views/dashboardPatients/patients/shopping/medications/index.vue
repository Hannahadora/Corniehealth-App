<template>
  <div class="bg-white mb-auto shadow-lg p-3 mt-2 rounded-lg w-full">
    <shopping-page-component
      :title="title"
      :items="items"
      :detailsUrl="detailsUrl"
      :deliveryTypes="deliveryTypes"
      @searchQuery="getQuery"
    >
      <template v-slot:sidebar>
        <medication-shopping-sidebar
          @locationQuery="getLocations"
          @pharmacyQuery="getPharmacies"
          @categoriesQuery="getCategories"
        />
      </template>
    </shopping-page-component>

    <add-to-cart-confirmation
      v-model="addToCartModal"
      :item="selectedItem"
      :id="selectedItem.id"
    />
  </div>
</template>

<script lang="ts">
import { cornieClient } from "@/plugins/http";
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

import ShoppingPageComponent from "@/components/shopping/index.vue";
import AddToCartConfirmation from "../components/add-to-cart-confirmation.vue";
import MedicationShoppingSidebar from "../components/medication-shoppings-sidebar.vue";

@Options({
  name: "ShoppingPage",
  components: {
    MedicationShoppingSidebar,
    AddToCartConfirmation,
    ShoppingPageComponent,
  },
})
export default class ShoppingPage extends Vue {
  loading: Boolean = true;
  searchQuery: any = "";
  addToCartModal: Boolean = false;
  selectedItem: any = {};
  detailsUrl = "/dashboard/patient/shopping/details";
  title = "Shop Medications";
  query = "";
  deliveryTypes = [
    { type: "Pickup", mode: false },
    { type: "Same Day Delivery", mode: true },
    { type: "Standard Shipping", mode: false },
  ];
  items = [] as any;

  selectedPharmacies = "";
  selectedClassifications = "";
  selectedSubClassifications = "";
  selectedLocations = "";

  get queryPayload() {
    return {
      query: this.query,
      pharmacies: this.selectedPharmacies,
      classifications: this.selectedClassifications,
      subClassifications: this.selectedSubClassifications,
      locations: this.selectedLocations,
    };
  }

  getPharmacy(value: any) {}

  async fetchMedications(queries: any) {
    const queryString = Object.keys(queries)
      .map((filter) => {
        if (queries[filter] || Number.isInteger(queries[filter])) {
          return `${filter}=${queries[filter]}`;
        }
        return null;
      })
      .filter((item) => item)
      .join("&");
    try {
      const { data } = await cornieClient().get(
        `/api/v1/patient-portal/catalogue-product/search-catalogue?${queryString}`
      );
      this.items = data || [];
    } catch (error) {
      window.notify({
        msg: "There was an error fetching medications",
        status: "error",
      });
    }
  }

  getQuery(query: any) {
    this.query = query;
  }
  getLocations(location: any) {
    this.selectedLocations = location;
  }
  getPharmacies(pharmacy: any) {
    this.selectedPharmacies = pharmacy;
  }
  getCategories(subclassifications: any, classifications: any) {
    this.selectedSubClassifications = subclassifications;
    this.selectedClassifications = classifications;
  }

  getInitial(str?: any) {
    return str?.charAt(0) || "";
  }

  @Watch("query")
  @Watch("selectedLocations")
  @Watch("selectedPharmacies")
  @Watch("selectedClassifications")
  @Watch("selectedSubClassifications")
  onUpdate() {
    this.fetchMedications(this.queryPayload);
  }

  async created() {}
}
</script>

<style scoped>
.sample-img {
  height: 110px;
  width: 200px;
}
</style>
