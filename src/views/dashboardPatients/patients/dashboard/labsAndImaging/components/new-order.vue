<template>
  <div class="bg-white mb-auto shadow-lg p-3 mt-2 rounded-lg w-full">
    <shopping-page-component
      :title="title"
      :items="items"
      :detailsUrl="detailsUrl"
      :cartQuantity="false"
    >
      <template v-slot:sidebar>
        <diagnostic-sidebar />
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
  import DiagnosticSidebar from "./diagnostic-shopping-sidebar.vue";
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
      CornieCheckbox,
      IconInput,
      SearchIcon,
      ShoppingPageComponent,
      DiagnosticSidebar,
    },
  })
  export default class ShoppingPage extends Vue {
    loading: Boolean = true;
    searchQuery: any = "";
    addToCartModal: Boolean = false;
    selectedItem: any = {};
    detailsUrl = "/dashboard/patient/diagnostics-shopping/details";
    title = "Shop Diagnostics";
    items = [
      {
        id: "657gfhjcgtdfghbvcfghjgfyytytyutyu",
        logo: require("@/assets/img/item-logo.svg"),
        location: "23, Admiralty Way, Lekki, Lagos",
        shopName: "Crestview Diagnostics",
        name: "Prostate Test",
        form: "Tablet 10mg (30 Tabs Per pack)",
        oldPrice: "N7, 000.00",
        newPrice: "N4, 850.00",
        deliveryType: [
          { type: "Visit Provider Location", mode: true },
          { type: "Home Sample Collection", mode: false },
        ],
        noOfReviews: "14",
        photo: require("@/assets/img/prostate-test.png"),
        quantity: 0,
        description:
          "The PSA test is a blood test that measures the amount of prostate specific antigen (PSA) in your blood. PSA is a protein produced by normal cells in the ... See more",
      },
      {
        id: "657gfhjcgtdfghbvcfghjgfyytytyutyu",
        logo: require("@/assets/img/item-logo.svg"),
        location: "23, Admiralty Way, Lekki, Lagos",
        shopName: "Crestview Diagnostics",
        name: "Prostate Test",
        form: "Tablet 10mg (30 Tabs Per pack)",
        oldPrice: "N7, 000.00",
        newPrice: "N4, 850.00",
        deliveryType: [
          { type: "Visit Provider Location", mode: true },
          { type: "Home Sample Collection", mode: false },
        ],
        noOfReviews: "14",
        photo: require("@/assets/img/prostate-test.png"),
        quantity: 0,
        description:
          "The PSA test is a blood test that measures the amount of prostate specific antigen (PSA) in your blood. PSA is a protein produced by normal cells in the ... See more",
      },
      {
        id: "657gfhjcgtdfghbvcfghjgfyytytyutyu",
        logo: require("@/assets/img/item-logo.svg"),
        location: "23, Admiralty Way, Lekki, Lagos",
        shopName: "Crestview Diagnostics",
        name: "Prostate Test",
        form: "Tablet 10mg (30 Tabs Per pack)",
        oldPrice: "N7, 000.00",
        newPrice: "N4, 850.00",
        deliveryType: [
          { type: "Visit Provider Location", mode: true },
          { type: "Home Sample Collection", mode: false },
        ],
        noOfReviews: "14",
        photo: require("@/assets/img/prostate-test.png"),
        quantity: 0,
        description:
          "The PSA test is a blood test that measures the amount of prostate specific antigen (PSA) in your blood. PSA is a protein produced by normal cells in the ... See more",
      },
      {
        id: "657gfhjcgtdfghbvcfghjgfyytytyutyu",
        logo: require("@/assets/img/item-logo.svg"),
        location: "23, Admiralty Way, Lekki, Lagos",
        shopName: "Crestview Diagnostics",
        name: "Prostate Test",
        form: "Tablet 10mg (30 Tabs Per pack)",
        oldPrice: "N7, 000.00",
        newPrice: "N4, 850.00",
        deliveryType: [
          { type: "Visit Provider Location", mode: true },
          { type: "Home Sample Collection", mode: false },
        ],
        noOfReviews: "14",
        photo: require("@/assets/img/prostate-test.png"),
        quantity: 0,
        description:
          "The PSA test is a blood test that measures the amount of prostate specific antigen (PSA) in your blood. PSA is a protein produced by normal cells in the ... See more",
      },
      {
        id: "657gfhjcgtdfghbvcfghjgfyytytyutyu",
        logo: require("@/assets/img/item-logo.svg"),
        location: "23, Admiralty Way, Lekki, Lagos",
        shopName: "Crestview Diagnostics",
        name: "Prostate Test",
        form: "Tablet 10mg (30 Tabs Per pack)",
        oldPrice: "N7, 000.00",
        newPrice: "N4, 850.00",
        deliveryType: [
          { type: "Visit Provider Location", mode: true },
          { type: "Home Sample Collection", mode: false },
        ],
        noOfReviews: "14",
        photo: require("@/assets/img/prostate-test.png"),
        quantity: 0,
        description:
          "The PSA test is a blood test that measures the amount of prostate specific antigen (PSA) in your blood. PSA is a protein produced by normal cells in the ... See more",
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
