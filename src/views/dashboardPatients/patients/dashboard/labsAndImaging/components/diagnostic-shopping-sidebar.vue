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
          </span>
        </div>
        <div class="my-4">
          <Corniecheckbox
            class="mb-3"
            v-for="(option, idx) in providerOptions"
            :key="idx"
            :label="option"
            :value="option"
            v-model="providerOption"
          />
        </div>
      </FilterAccordion>
      <FilterAccordion class="border-t" title="Diagnostics Category">
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
  import { Options, Vue } from "vue-class-component";
  import { Watch } from "vue-property-decorator";

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
    appointments: any = [];
    loading: Boolean = true;
    locationQuery: any = "";
    providerQuery: any = "";
    providerOption: any = "";
    selectedPharmacies: any = "";
    selectedClassifications: any = "";
    selectedCategories: any = "";
    selectedPromoOption: any = "";

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

    @Watch("providerQuery")
    fetchD() {
      if (!this.providerQuery) return;
      this.fetchProviders();
    }

    async fetchProviders() {
      const pending = cornieClient().get(
        `/api/v1/patient-portal/diagnostics/providers/?query=${this.providerQuery}`
      );
      const response = await Promise.all([pending]);
      console.log("diagnostics", response[0].data);
      // this.diagnostics = response[0].data;
    }
  }
</script>

<style scoped>
  .sample-img {
    height: 110px;
    width: 200px;
  }
</style>
