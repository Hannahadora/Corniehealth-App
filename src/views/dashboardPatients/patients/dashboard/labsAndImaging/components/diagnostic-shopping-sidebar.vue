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

            <div class="flex flex-col pt-4 space-y-2">
              <label
                v-for="(l, i) in displayLocations"
                :key="i"
                class="flex items-center"
              >
                <input
                  @change="locationChanged"
                  v-model="l.value"
                  type="checkbox"
                  class="mr-3 cursor-pointer"
                />
                {{ l.display }}:
              </label>
              <!-- Locations - {{ pickedLocations }} -->
            </div>
          </span>
        </div>
      </FilterAccordion>
      <FilterAccordion class="border-t" title="Provider">
        <div class="my-2">
          <span class="mb-2 w-full rounded-full">
            <icon-input
              autocomplete="off"
              class="border border-gray-600 rounded-full py-3 focus:outline-none"
              type="search"
              placeholder="Search"
              v-model="providerQuery"
            >
              <template v-slot:prepend>
                <search-icon />
              </template>
            </icon-input>

            <div class="flex flex-col pt-4 space-y-2">
              <label
                v-for="(l, i) in displayProviders"
                :key="i"
                class="flex items-center"
              >
                <input
                  @change="providerChanged"
                  v-model="l.value"
                  type="checkbox"
                  class="mr-3 cursor-pointer"
                />
                {{ l.display }}:
              </label>
              <!-- Locations - {{ pickedLocations }} -->
            </div>
          </span>
        </div>
        <div class="my-4">
          <!-- <Corniecheckbox
            class="mb-3"
            v-for="(option, idx) in providerOptions"
            :key="idx"
            :label="option"
            :value="option"
            v-model="providerOption"
          /> -->
        </div>
      </FilterAccordion>
      <FilterAccordion class="border-t" title="Diagnostics Category">
        <div class="my-4">
          <!-- <Corniecheckbox
            class="mb-3"
            v-for="(option, idx) in pharmacyLists"
            :key="idx"
            :label="option"
            :value="option"
            v-model="selectedPharmacies"
          /> -->
          <div class="flex flex-col pt-4 space-y-2">
            <label
              v-for="(l, i) in displayCategories"
              :key="i"
              class="flex items-center text-sm"
            >
              <input
                @change="categoryChanged"
                v-model="l.value"
                type="checkbox"
                class="mr-3 cursor-pointer"
              />
              {{ l.display }}:
            </label>
            <!-- Locations - {{ pickedLocations }} -->
          </div>
        </div>
      </FilterAccordion>
    </div>
  </div>
</template>

<script lang="ts">
  import CornieBtn from "@/components/CornieBtn.vue";
  import Corniecheckbox from "@/components/custom-checkbox.vue";
  import IconInput from "@/components/IconInput.vue";
  import Cancel from "@/components/icons/cancel-red-stroke.vue";
  import Check from "@/components/icons/check-green-stroke.vue";
  import ChevrondownRed from "@/components/icons/chevrondown-red.vue";
  import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
  import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
  import FilterByIcon from "@/components/icons/FilterByIcon.vue";
  import FiveStar from "@/components/icons/five-star.vue";
  import {
    default as Search,
    default as SearchIcon,
  } from "@/components/icons/search.vue";
  import FilterAccordion from "@/components/shopping/components/filter-accordion.vue";
  import { cornieClient } from "@/plugins/http";
  import querystring from "query-string";
  import { Options, Vue } from "vue-class-component";
  import { PropSync, Watch } from "vue-property-decorator";

  @Options({
    name: "DiagnosticsShoppingSideBar",
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
  export default class DiagnosticsShoppingSideBar extends Vue {
    @PropSync("modelValue", { type: Array, default: [] })
    services!: any;

    appointments: any = [];
    loading: Boolean = true;
    locationQuery: any = "";
    providerQuery: any = "";
    providerOption: any = "";
    selectedPharmacies: any = "";
    selectedClassifications: any = "";
    selectedCategories: any = "";
    selectedPromoOption: any = "";
    locations = [];
    pickedLocations = [] as any;
    providers = [];
    pickedProviders = [] as any;

    providerOptions: any = [
      "All",
      "Mecure",
      "Evercare",
      "Wellness+",
      "Crestview",
    ];
    pharmacyLists: any = [
      "Anatomical Pathology",
      "Pathology - Clinical Chemistry",
      "Pathology - General",
      "Pathology - Genetics",
      "Pathology - Haemotology",
      "Pathology - Immunology",
      "Pathology - Microbiology",
      "Diagnostic Radiology/Xray/CT/Fluoroscopy",
      "Interventional Radiology",
      "Diagnostics Ultrasound",
      "Magnectic Resonance Imaging (MRI)",
      "Nuclear Medicine",
      "Obstetric/Gynaecological  Ultrasound",
    ];

    pickedPharmacyLists: any = [];

    get displayLocations() {
      return this.locations.map((x) => {
        return {
          display: x,
          value: false,
        };
      });
    }

    get displayProviders() {
      return this.providers.map((x: any) => {
        return {
          display: x?.name,
          value: false,
        };
      });
    }

    get displayCategories() {
      return this.pharmacyLists.map((x: any) => {
        return {
          display: x,
          value: false,
        };
      });
    }

    async locationChanged() {
      this.pickedLocations = this.displayLocations
        .filter((x) => x.value == true)
        .map((x) => x.display);
      await this.fetchServices();
    }

    async providerChanged() {
      this.pickedProviders = this.displayProviders
        .filter((x) => x.value == true)
        .map((x) => x.display);
      await this.fetchServices();
    }

    async categoryChanged() {
      this.pickedPharmacyLists = this.displayCategories
        .filter((x: any) => x.value == true)
        .map((x: any) => x.display);
      await this.fetchServices();
    }

    @Watch("providerQuery")
    fetchD() {
      if (!this.providerQuery) {
        this.providers = [];
        return;
      }
      this.fetchProviders();
    }

    @Watch("locationQuery")
    fetchL() {
      if (!this.locationQuery) {
        this.locations = [];
        return;
      }

      this.fetchLocations();
    }

    get queryString() {
      const a = querystring.stringify({
        subSpecialties: this.pickedPharmacyLists,
        locations: this.pickedLocations,
        providers: this.pickedProviders,
      });
      console.log("queryParams", a);
      return a;
    }

    async fetchServices() {
      try {
        const pending = cornieClient().get(
          `/api/v1/patient-portal/diagnostics/services/?${this.queryString}`
        );
        const response = await Promise.all([pending]);
        console.log("services", response[0].data);
        // this.diagnostics = response[0].data;
        this.services = response[0].data;
      } catch (error) {
        this.services = ["hello"];
      }
    }

    async fetchProviders() {
      const pending = cornieClient().get(
        `/api/v1/patient-portal/diagnostics/providers?query=${this.providerQuery}`
      );
      const response = await Promise.all([pending]);
      console.log("diagnostics", response[0].data);
      this.providers = response[0].data;
    }

    async fetchLocations() {
      const pending = cornieClient().get(
        `/api/v1/patient-portal/diagnostics/locations?query=${this.locationQuery}`
      );
      const response = await Promise.all([pending]);
      console.log("locations", response[0].data);
      this.locations = response[0].data;
    }
  }
</script>

<style scoped>
  .sample-img {
    height: 110px;
    width: 200px;
  }
</style>
