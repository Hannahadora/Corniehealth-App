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
              v-model="selectedLocation"
            >
              <template v-slot:prepend>
                <search-icon />
              </template>
            </icon-input>
          </span>
        </div>
        <div class="my-4">
          <div
            class="flex items-center mb-3"
            v-for="(option, idx) in productLocations"
            :key="idx"
          >
            <Corniecheckbox
              :name="option"
              id="pharmacy"
              :value="option"
              v-model="selectedLocation[idx]"
              @change="setLocation(option)"
            />
            <label class="cursor-pointer hover:text-danger capitalize">{{
              option
            }}</label>
          </div>
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
          <div
            class="flex items-center mb-3"
            v-for="(option, idx) in productPharmacies"
            :key="idx"
          >
            <Corniecheckbox
              class="mb-3"
              :name="option.name"
              :id="option.id"
              :value="option.id"
              v-model="selectedPharmacy[idx]"
              @change="setPharmacy(option)"
            />
            <label class="cursor-pointer hover:text-danger capitalize">{{
              option.name
            }}</label>
          </div>
        </div>
      </FilterAccordion>
      <FilterAccordion class="border-t f" title="Medication Clasification">
        <FilterAccordion
          type2
          v-for="(classification, idx) in medicationCategories"
          :key="idx"
          :title="classification.name"
        >
          <div
            class="my-2"
            v-for="(subclassification, idx) in classification.categories"
            :key="idx"
          >
            <Corniecheckbox
              class="mb-3"
              :value="subclassification"
              :label="subclassification"
              v-model="selectedSubClassifications[idx]"
              @change="setCategories(subclassification, classification)"
            />
          </div>
        </FilterAccordion>
      </FilterAccordion>
      <FilterAccordion class="border-t" title="Deals & Promotions">
        <div
          class="my-2"
          v-for="(option, idx) in dealAndPromoOptions"
          :key="idx"
        >
          <Corniecheckbox
            class="mb-3"
            :label="option"
            :value="option"
            v-model="selectedPromoOption[idx]"
          />
          <label class="cursor-pointer hover:text-danger capitalize">{{
            option.name
          }}</label>
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

import { medicationCategories } from "@/plugins/medication-categories";

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
  selectedLocation: any = [];
  pharmacyQuery: any = "";
  fulfillmentOption: any = "";
  selectedPharmacy: any = [];
  selectedClassifications: any = [];
  selectedSubClassifications: any = [];
  selectedPromoOption: any = "";

  medicationCategories: any = medicationCategories;

  fulfillmentOptions: any = [
    "All",
    "Pickup",
    "Same Day Delivery",
    "Standard Shipping",
  ];
  productPharmacies: any = [];
  productLocations: any = [];

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

  async fetchProductLocations() {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/patient-portal/catalogue-product/get-locations`
      );
      this.productLocations = data || [];
    } catch (error) {
      window.notify({
        msg: "There was an error fetching catalogue product locations",
        status: "error",
      });
    }
  }

  async fetchProductPharmacies() {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/patient-portal/catalogue-product/get-pharmacies`
      );
      this.productPharmacies = data || [];
    } catch (error) {
      window.notify({
        msg: "There was an error fetching catalogue product pharmacies",
        status: "error",
      });
    }
  }

  filterChecked(arr: any, arr2: any, value?: string) {
    const newArr = arr.filter((el: any) => el === true);
    const intersections = arr2.filter((e: any, idx: any) =>
      newArr.find((el: any, i: any) => i === idx)
    );
    const dIds = value === "id" ? intersections.map((el: any) => (el.id)) : intersections;
    return dIds;
  }
  filterCheckedCategories(arr: any, arr2: any) {
    const newArr = arr.filter((el: any) => el === true);
    const intersections = arr2.categories?.filter((e: any, idx: any) =>
      newArr.find((el: any, i: any) => i === idx)
    );
    const dIds = intersections;
    return dIds;
  }

  setPromoOption(option: any) {
    this.selectedPromoOption = option.name;
  }

  setLocation(option: any) {
    this.$emit(
      "locationQuery",
      this.filterChecked(this.selectedLocation, this.productLocations, "")
    );
  }

  setPharmacy(option: any) {
    this.$emit(
      "pharmacyQuery",
      this.filterChecked(this.selectedPharmacy, this.productPharmacies, "id")
    );
  }

  setCategories(subclassification: any, classification: any) {
    this.selectedClassifications.push(classification.name);
    this.$emit(
      "categoriesQuery",
      this.filterCheckedCategories(this.selectedSubClassifications, classification),
      this.selectedClassifications
    );
  }

  async created() {
    await this.fetchProductPharmacies();
    await this.fetchProductLocations();
  }
}
</script>

<style scoped>
.sample-img {
  height: 110px;
  width: 200px;
}
</style>
