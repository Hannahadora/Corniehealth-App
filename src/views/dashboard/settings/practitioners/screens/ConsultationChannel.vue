<template>
  <screen-header :properties="properties"> Consultation Channel </screen-header>
  <div v-if="properties">
    <div class="grid grid-cols-4 gap-1">
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Consultation Channel</h1>
        <h1 class="text-sm">{{ properties.consultationChannel }}</h1>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import ScreenHeader from "./Header.vue";
import CalendareIcon from "@/components/icons/calendar.vue";
import { Prop } from "vue-property-decorator";
import { countryCodes } from "@/plugins/countrycodes";

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
