<template>
  <screen-header :properties="properties"> Education </screen-header>
  <div v-if="properties.educations.length">
    <div
      class="grid grid-cols-4 gap-1 py-3"
      v-for="(item, index) in properties.educations"
      :key="index"
      :class="
        (index + 1) % 2 === 0 ? 'border-t border-gray-400 border-dashed' : ''
      "
    >
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Issuer</h1>
        <h1 class="text-sm">{{ item.issuer }}</h1>
      </div>
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Qualification</h1>
        <div class="flex">
          <img class="mr-3 w-6 rounded-md" :src="flag" />
          <h1 class="text-sm">{{ item.qualification }}</h1>
        </div>
      </div>
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Year of Graduation</h1>
        <div class="flex">
          <calendare-icon class="mr-1" />
          <h1 class="text-sm">
            {{ new Date(item.graduationYear).toLocaleDateString() }}
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
export default class Education extends Vue {
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
