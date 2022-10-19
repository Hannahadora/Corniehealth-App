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
        <medication-shopping-sidebar />
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
import CornieBtn from "@/components/CornieBtn.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import IconInput from "@/components/IconInput.vue";
import ArrowLeftWhite from "@/components/icons/arrow-left-white.vue";
import ArrowRightWhite from "@/components/icons/arrow-right-white.vue";
import CalendarWhite from "@/components/icons/calendar-white.vue";
import Cancel from "@/components/icons/cancel-red-stroke.vue";
import Check from "@/components/icons/check-green-stroke.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronWhiteDown from "@/components/icons/chevronwhitedown.vue";
import ChevronWhiteUp from "@/components/icons/chevronwhiteup.vue";
import DeliveryBadge from "@/components/icons/delivery-badge.vue";
import DoctorWhite from "@/components/icons/doctor-white.vue";
import DrugWhite from "@/components/icons/drug-white.vue";
import FiveStar from "@/components/icons/five-star.vue";
import NoteWhite from "@/components/icons/note-white.vue";
import QualityBadge from "@/components/icons/quality-badge.vue";
import SavingsBadge from "@/components/icons/savings-badge.vue";
import { cornieClient } from "@/plugins/http";
import {
  default as Search,
  default as SearchIcon,
} from "@/components/icons/search.vue";
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

import ShoppingPageComponent from "@/components/shopping/index.vue";
import AddToCartConfirmation from "../components/add-to-cart-confirmation.vue";
import MedicationShoppingSidebar from "../components/medication-shoppings-sidebar.vue";

@Options({
  name: "ShoppingPage",
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
    CornieBtn,
    Search,
    QualityBadge,
    DeliveryBadge,
    SavingsBadge,
    CalendarWhite,
    DoctorWhite,
    DrugWhite,
    NoteWhite,
    FiveStar,
    Cancel,
    Check,
    ArrowLeftWhite,
    ArrowRightWhite,
    ChevronWhiteDown,
    ChevronWhiteUp,
    MedicationShoppingSidebar,
    CornieCheckbox,
    IconInput,
    SearchIcon,
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

  async fetchMedications(
    query?: string,
    pharmacies?: string,
    classifications?: string,
    subClassifications?: string,
    locations?: string
  ) {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/patient-portal/catalogue-product/search-catalogue?query=${query}`
      )
      this.items = data || [];
    } catch (error) {
      window.notify({
        msg: "There was an error fetching medications",
        status: "error",
      });
    }
  }

  getQuery(query: any) {
    this.query = query
  }

  getInitial(str?: any) {
    return str?.charAt(0) || "";
  }

  @Watch("query")
  typed(query: string) {
    this.fetchMedications(query);
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
