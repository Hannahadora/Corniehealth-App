<template>
  <div class="bg-white mb-auto shadow-lg p-3 mt-2 rounded-lg w-full">
    <shopping-page-component
      :title="title"
      :items="items"
      :detailsUrl="detailsUrl"
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
  import {
    default as Search,
    default as SearchIcon,
  } from "@/components/icons/search.vue";
  import { Options, Vue } from "vue-class-component";

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
    items = [
      {
        id: "ghfa47fhe84v2454545fiuur4hej235454q",
        logo: require("@/assets/img/item-logo.svg"),
        location: "23, Admiralty Way, Lekki, Lagos",
        shopName: "MedPlus",
        name: "Anti-malaria  bundle",
        form: "Tablet 10mg (30 Tabs Per pack)",
        oldPrice: "N13, 950.00",
        newPrice: "N13, 950.00",
        deliveryType: [
          { type: "Pickup", mode: false },
          { type: "Same Day Delivery", mode: true },
          { type: "Standard Shipping", mode: false },
        ],
        noOfReviews: "14",
        photo: require("@/assets/img/panadol-item.svg"),
        quantity: 0,
      },
      {
        id: "ghfa47fhe84v465354refrfiuur4hejhh",
        logo: require("@/assets/img/item-logo.svg"),
        location: "23, Admiralty Way, Lekki, Lagos",
        shopName: "MedPlus",
        name: "Anti-malaria  bundle",
        form: "Tablet 10mg (30 Tabs Per pack)",
        oldPrice: "N13, 950.00",
        newPrice: "N13, 950.00",
        deliveryType: [
          { type: "Pickup", mode: true },
          { type: "Same Day Delivery", mode: false },
          { type: "Standard Shipping", mode: true },
        ],
        noOfReviews: "14",
        photo: require("@/assets/img/panadol-item.svg"),
        quantity: 0,
      },
      {
        id: "ghfa47ertr53w5433fhe84vfiuur4hhhhej",
        logo: require("@/assets/img/item-logo.svg"),
        location: "23, Admiralty Way, Lekki, Lagos",
        shopName: "MedPlus",
        name: "Anti-malaria  bundle",
        form: "Tablet 10mg (30 Tabs Per pack)",
        oldPrice: "N13, 950.00",
        newPrice: "N13, 950.00",
        deliveryType: [
          { type: "Pickup", mode: false },
          { type: "Same Day Delivery", mode: true },
          { type: "Standard Shipping", mode: true },
        ],
        noOfReviews: "14",
        photo: require("@/assets/img/panadol-item.svg"),
        quantity: 0,
      },
    ];

    openCartConfirmation(item: any) {
      this.selectedItem = item;
      this.addToCartModal = true;
    }

    // async fetchAppointments() {
    //   try {
    //     this.loading = true;
    //     const { data } = await cornieClient().get(
    //       "/api/v1/patient-portal/appointment/get-all-user-appointment"
    //     );
    //     this.appointments = data;
    //   } catch (error) {
    //     window.notify({
    //       msg: "There was an error fetching appointments",
    //       status: "error",
    //     });
    //   } finally {
    //     this.loading = false;
    //   }
    // }

    async created() {}
  }
</script>

<style scoped>
  .sample-img {
    height: 110px;
    width: 200px;
  }
</style>
