<template>
  <screen-header :properties="properties"> Work Info </screen-header>
  <div v-if="properties">
    <div class="grid grid-cols-4 gap-8">
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Employment Type</h1>
        <h1 class="text-sm">{{ properties.employmentType || "N/A" }}</h1>
      </div>
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Speciality</h1>

        <h1 class="text-sm">{{ properties.speciality || "N/A" }}</h1>
      </div>
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Job Designation</h1>
        <h1 class="text-sm">
          {{ properties.jobDescription || "N/A" }}
        </h1>
      </div>
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Consultation Rate</h1>
        <h1 class="text-sm">
          {{ `${properties.consultationRate}/Hour` || "N/A" }}
        </h1>
      </div>
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Years in Pratice</h1>
        <h1 class="text-sm">
          {{
            `${properties.yearsOfPractice.value} ${properties.yearsOfPractice.unit}` ||
            "N/A"
          }}
        </h1>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import CalendareIcon from "@/components/icons/calendar.vue";
  import { countryCodes } from "@/plugins/countrycodes";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";
  import ScreenHeader from "./Header.vue";

  @Options({
    name: "PractitionerBio",
    components: {
      ScreenHeader,
      CalendareIcon,
    },
  })
  export default class WorkInfo extends Vue {
    @Prop({ default: {} })
    properties!: any;

    get codes() {
      return countryCodes
        .sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        })
        .map((country) => ({
          ...country,
          display: country.dialCode,
          code: country.dialCode,
          flag: `https://flagcdn.com/60x45/${country.isoCode.toLowerCase()}.png`,
        }));
    }

    get flag() {
      if (!this.codes.length && this.properties.nationality === "") return "";
      return this.codes.find(
        (country: any) =>
          country.name?.toLowerCase() ===
          this.properties.nationality?.toLowerCase()
      )?.flag;
    }

    mounted() {
      console.log("work info", this.properties);
    }
  }
</script>
