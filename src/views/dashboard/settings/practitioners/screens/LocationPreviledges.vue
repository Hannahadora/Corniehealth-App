<template>
  <screen-header :properties="properties">
    Location & Privileges
  </screen-header>
  <div v-if="properties">
    <div class="grid grid-cols-4 gap-4">
      <div
        class="flex space-x-4 mt-5 border-r-2 border-gray-100 pr-5"
        v-for="(access, index) in properties.locationRoles"
        :key="index"
      >
        <div class="flex">
          <div
            class="w-10 h-10 rounded-full flex justify-center items-center bg-blue-600 text-white text-lg text-center font-bold mr-2"
          >
            {{
              `${getLocationName(access?.locationId)
                .substr(0, 1)
                ?.toUpperCase()}${getRoleName(access?.roleId)
                ?.substr(0, 1)
                ?.toUpperCase()}` ||
              `${getLocationName(access?.locationId)
                .substr(0, 1)
                ?.toUpperCase()}${getRoleName(access?.roleId)
                ?.substr(0, 1)
                ?.toUpperCase()}`
            }}
          </div>
          <div>
            <div class="text-black flex text-sm">
              {{ getLocationName(access?.locationId) }}
              <div class="text-black ml-1" v-if="access?.default">•</div>
              <span class="text-blue-600 ml-1 text-xs">
                {{ access?.default ? "Default" : "" }}</span
              >
            </div>
            <p class="text-xs text-gray-400 mb-1">
              {{ getRoleName(access.roleId) }}
            </p>
            <span
              class="text-danger text-xs font-semibold cursor-pointer"
              @click="
                $router.push('/dashboard/provider/settings/roles-privileges')
              "
              >View privileges</span
            >
          </div>
        </div>
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
  export default class LocationPreviledges extends Vue {
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

    getLocationName(id: string) {
      const pt = this.properties.locations.find((i: any) => i.id === id);
      return pt ? `${pt.name}` : "";
    }

    getRoleName(id: string) {
      const pt = this.properties.roles.find((i: any) => i.id === id);
      return pt ? `${pt.name}` : "";
    }
  }
</script>
