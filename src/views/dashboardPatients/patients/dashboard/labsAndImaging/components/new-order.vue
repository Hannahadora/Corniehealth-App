<template>
  <div class="bg-white mb-auto shadow-lg p-3 mt-2 rounded-lg w-full">
    <shopping-page-component
      :title="title"
      :items="items"
      :detailsUrl="detailsUrl"
      :cartQuantity="false"
    >
      <template v-slot:sidebar>
        <diagnostic-sidebar v-model="items" />
      </template>
      <template v-slot:default="{ itemprops }">
        <tabs :items="tabLinks" v-model="currentTab">
          <preset-test />
          <popular-test v-bind="itemprops" />
        </tabs>
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
  import Tabs from "@/components/tabs.vue";
  import { Options, Vue } from "vue-class-component";

  import ShoppingPageComponent from "@/components/shopping/index.vue";
  import { Watch } from "vue-property-decorator";
  import DiagnosticSidebar from "./diagnostic-shopping-sidebar.vue";
  import PopularTest from "./popular-test.vue";
  import PresetTest from "./preset-test.vue";

  @Options({
    name: "ShoppingPage",
    components: {
      ShoppingPageComponent,
      DiagnosticSidebar,
      Tabs,
      PresetTest,
      PopularTest,
    },
  })
  export default class ShoppingPage extends Vue {
    loading: Boolean = true;
    searchQuery: any = "";
    addToCartModal: Boolean = false;
    selectedItem: any = {};
    detailsUrl = "/dashboard/patient/diagnostics-shopping/details";
    title = "Shop Diagnostics";
    item = [
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
    tabLinks = ["Preset Tests", "Popular Tests"];
    currentTab = 0;
    items = [];
    get itemss() {
      return;
    }
    openCartConfirmation(item: any) {
      this.selectedItem = item;
      this.addToCartModal = true;
    }

    @Watch("items")
    s() {
      console.log("itttem", this.items);
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
