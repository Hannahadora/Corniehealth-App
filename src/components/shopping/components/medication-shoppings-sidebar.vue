<template>
  <div>
    <div class="w-full flex border-b">
      <filter-by-icon class="mr-2" />
      <span class="text-sm text-primary px-2 py-3"> Filter By </span>
    </div>
    <div>
      <FilterAccordion class="border-t" title="Location">
        <div class="my-5">
          <span class="mb-2 w-full rounded-full">
            <icon-input
              autocomplete="off"
              class="border border-gray-600 rounded-full py-3 focus:outline-none"
              type="search"
              placeholder="Search"
              v-model="locationQuery"
            >
              <template v-slot:prepend>
                <search-icon />
              </template>
            </icon-input>
          </span>
        </div>
      </FilterAccordion>
      <FilterAccordion class="border-t" title="Fulfilment Options">
        <div class="my-2">
          <Corniecheckbox
            class="mb-3"
            v-for="(option, idx) in fulfillmentOptions"
            :key="idx"
            :label="option"
            :value="option"
            v-model="fulfillmentOption"
          />
        </div>
      </FilterAccordion>
      <FilterAccordion class="border-t" title="Pharmacy">
        <div class="my-2">
          <span class="mb-2 w-full rounded-full">
            <icon-input
              autocomplete="off"
              class="border border-gray-600 rounded-full py-3 focus:outline-none"
              type="search"
              placeholder="Search"
              v-model="pharmacyQuery"
            >
              <template v-slot:prepend>
                <search-icon />
              </template>
            </icon-input>
          </span>
        </div>
        <div class="my-4">
          <Corniecheckbox
            class="mb-3"
            v-for="(option, idx) in pharmacyLists"
            :key="idx"
            :label="option"
            :value="option"
            v-model="selectedPharmacies"
          />
        </div>
      </FilterAccordion>
      <FilterAccordion class="border-t" title="Medication Clasification">
        <FilterAccordion
          type2
          v-for="(classification, idx) in medicalClassifications"
          :key="idx"
          :title="classification.name"
        >
          <div class="my-2">
            <Corniecheckbox
              class="mb-3"
              v-for="(option, idx) in classification.types"
              :key="idx"
              :label="option"
              :value="option"
              v-model="selectedClassifications"
            />
          </div>
        </FilterAccordion>
      </FilterAccordion>
      <FilterAccordion class="border-t" title="Medication Category">
        <div class="my-2">
          <Corniecheckbox
            class="mb-3"
            v-for="(option, idx) in medicationCategories"
            :key="idx"
            :label="option"
            :value="option"
            v-model="selectedCategories"
          />
        </div>
      </FilterAccordion>
      <FilterAccordion class="border-t" title="Deals & Promotions">
        <div class="my-2">
          <Corniecheckbox
            class="mb-3"
            v-for="(option, idx) in dealAndPromoOptions"
            :key="idx"
            :label="option"
            :value="option"
            v-model="selectedPromoOption"
          />
        </div>
      </FilterAccordion>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import Search from "@/components/icons/search.vue";
import FiveStar from "@/components/icons/five-star.vue";
import Cancel from "@/components/icons/cancel-red-stroke.vue";
import Check from "@/components/icons/check-green-stroke.vue";
import ChevrondownRed from "@/components/icons/chevrondown-red.vue";
import FilterByIcon from "@/components/icons/FilterByIcon.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import FilterAccordion from "./filter-accordion.vue";
import Corniecheckbox from "@/components/custom-checkbox.vue";

@Options({
  name: "ShoppingSideBar",
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
    CornieBtn,
    Search,
    FiveStar,
    Cancel,
    Check,
    FilterByIcon,
    ChevrondownRed,
    IconInput,
    SearchIcon,
    FilterAccordion,
    Corniecheckbox,
  },
})
export default class ShoppingSideBar extends Vue {
  appointments: any = [];
  loading: Boolean = true;
  locationQuery: any = "";
  pharmacyQuery: any = "";
  fulfillmentOption: any = "";
  selectedPharmacies: any = "";
  selectedClassifications: any = "";
  selectedCategories: any = "";
  selectedPromoOption: any = "";

  fulfillmentOptions: any = [
    "All",
    "Pickup",
    "Same Day Delivery",
    "Standard Shipping",
  ];
  pharmacyLists: any = [
    "All",
    "Pickup",
    "Same Day Delivery",
    "Standard Shipping",
  ];
  medicalClassifications: any = [
    {
      name: "Maternal Health",
      types: ["All", "Pickup", "Same Day Delivery", "Standard Shipping"],
    },
    {
      name: "Pain",
      types: ["All", "Pickup", "Same Day Delivery", "Standard Shipping"],
    },
    {
      name: "Sexual Wellness",
      types: ["All", "Pickup", "Same Day Delivery", "Standard Shipping"],
    },
  ];
  medicationCategories: any = [
    "All",
    "Pickup",
    "Same Day Delivery",
    "Standard Shipping",
  ];
  dealAndPromoOptions: any = [
    "All",
    "Auto-reorder and save",
    "Clearance",
    "Cornie Health Cash Rewards",
    "BOGO",
    "Store Promos",
    "Weekend Promos",
    "Season Promos",
  ];

  async fetchAppointments() {
    try {
      this.loading = true;
      const { data } = await cornieClient().get(
        "/api/v1/patient-portal/appointment/get-all-user-appointment"
      );
      this.appointments = data;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching appointments",
        status: "error",
      });
    } finally {
      this.loading = false;
    }
  }

  async created() {
    await this.fetchAppointments();
  }
}
</script>

<style scoped>
.sample-img {
  height: 110px;
  width: 200px;
}
</style>
