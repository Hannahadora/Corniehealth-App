<template>
  <screen-header :properties="properties"> Visit Type </screen-header>
  <div v-if="properties">
    <div class="grid grid-cols-4 gap-1">
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Visit Type</h1>
        <h1 v-if="properties.visitTypes.length > 0" class="text-sm">
          {{ properties.visitTypes.join(" ") }}
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
    name: "ConsultationChannel",
    components: {
      ScreenHeader,
      CalendareIcon,
    },
  })
  export default class ConsultationChannel extends Vue {
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
  }
</script>
