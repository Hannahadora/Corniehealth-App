<template>
  <screen-header :properties="properties"> Contact </screen-header>
  <div v-if="properties">
    <div class="grid grid-cols-4 gap-8">
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Phone Number</h1>
        <div class="flex">
          <mobile-icon class="fill-current text-green-500 mr-1" />
          <h1 class="text-sm">
            {{ `${properties.phone.dialCode} ${properties.phone.number}` }}
          </h1>
        </div>
      </div>
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Email</h1>
        <h1 class="text-sm">
          {{ properties.email }}
        </h1>
      </div>
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Country</h1>
        <div class="flex">
          <img class="mr-3 w-6 rounded-md" :src="flag" />
          <h1 class="text-sm">{{ properties.country }}</h1>
        </div>
      </div>
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">State</h1>
        <h1 class="text-sm">
          {{ properties.state }}
        </h1>
      </div>
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">City</h1>
        <h1 class="text-sm capitalize">
          {{ properties.city }}
        </h1>
      </div>
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Zip or Post Code</h1>
        <div class="flex">
          <h1 class="text-sm">
            {{ properties.postCode }}
          </h1>
        </div>
      </div>
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Apartment or House Number</h1>
        <div class="flex">
          <h1 class="text-sm">
            {{ properties.aptNumber }}
          </h1>
        </div>
      </div>
      <div class="flex flex-col">
        <h1 class="text-gray-400 mb-1 text-sm">Address</h1>
        <div class="flex">
          <h1 class="text-sm">
            {{ properties.address }}
          </h1>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full border-b border-gray-400 border-dashed my-3"></div>
  <div>
    <h1 class="font-bold text-sm my-4">Emergency Contact</h1>
    <div>
      <div class="flex items-center mb-3">
        <h1 class="text-sm">Flex Beth</h1>
        <div class="mx-3 h-3 border-r-2 border-gray-200"></div>
        <h1 class="text-sm">Husband</h1>
      </div>
      <div class="flex mb-3 items-center">
        <email-icon class="mr-2 fill-current text-yellow-400" />
        <h1 class="text-xs text-gray-400">john@john.com</h1>
      </div>
      <div class="flex items-center mb-2">
        <mobile-icon class="mr-3 fill-current text-green-500" />
        <h1 class="text-xs text-gray-400">+2347038516899</h1>
      </div>
      <div class="flex items-center">
        <location-icon class="mr-2 fill-current text-blue-500" />
        <h1 class="text-xs text-gray-400">Kubwa, Abuja</h1>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import LocationIcon from "@/components/icons/location.vue";
  import EmailIcon from "@/components/icons/mail.vue";
  import MobileIcon from "@/components/icons/mobile.vue";
  import { countryCodes } from "@/plugins/countrycodes";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";
  import ScreenHeader from "./Header.vue";

  @Options({
    name: "Contact",
    components: {
      ScreenHeader,
      MobileIcon,
      EmailIcon,
      LocationIcon,
    },
  })
  export default class Contact extends Vue {
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
      if (!this.codes.length && this.properties.country === "") return "";
      return this.codes.find(
        (country: any) =>
          country.name?.toLowerCase() === this.properties.country?.toLowerCase()
      )?.flag;
    }
  }
</script>
