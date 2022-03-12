<template>
  <screen-header :properties="properties"> Bio </screen-header>
  <div v-if="properties">
    <div class="grid grid-cols-4 gap-1">
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Full Name</h1>
        <h1 class="text-sm">{{ properties.name }}</h1>
      </div>
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Nationality</h1>
        <div class="flex">
          <img class="mr-3 w-6 rounded-md" :src="flag" />
          <h1 class="text-sm">{{ properties.nationality }}</h1>
        </div>
      </div>
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Gender</h1>
        <h1 class="text-sm capitalize">
          {{
            `${properties.gender}(${properties.gender
              .substr(0, 1)
              .toUpperCase()})`
          }}
        </h1>
      </div>
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Date of Birth</h1>
        <div class="flex">
          <calendare-icon class="mr-1" />
          <h1 class="text-sm">
            {{ new Date(properties.dob).toLocaleDateString() }}
          </h1>
        </div>
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
  name: "PractitionerBio",
  components: {
    ScreenHeader,
    CalendareIcon,
  },
})
export default class Bio extends Vue {
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
