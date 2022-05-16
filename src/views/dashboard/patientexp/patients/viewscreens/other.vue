<template>
  <div>
    <div class="mt-5 mb-5 w-ful">
      <screen-header :properties="properties"> Bio </screen-header>
    </div>
    <div class="mt-16" v-if="properties">
      <accordion-component :title="'Emergency Contact'" :modelValue="true">
        <template v-slot:default>
          <div class="w-full" v-for="(item, index) in properties?.emergencyContacts" :key="index">
              <p class="font-bold">{{ item?.firstname +' '+ item?.middlename +' '+ item?.lastname }}</p>
              <span class="text-gray-400 text-sm font-bold">{{ item?.phone?.dialCode +''+ item?.phone?.number +'.'+ item?.email  }}</span>
          </div>
           <div class="grid grid-cols-4 gap-4 mt-5" v-for="(item, index) in properties?.emergencyContacts" :key="index">
                   <div class="flex space-x-4">
                        <relationship-icon class="mr-4"/>
                        <div>
                            <p class="font-bold">Relationship</p>
                            <span class="text-sm text-gray-400"> {{ item?.relationship }}</span>
                        </div>
                   </div>
                    <div class="flex space-x-4">
                        <location-icon class="mr-4"/>
                        <div>
                            <p class="font-bold">Location & Postcode</p>
                            <span class="text-sm text-gray-400"> {{ item?.state +' , '+ item?.country +' . '+ item?.postalCode}}</span>
                        </div>
                   </div>
                    <div class="flex space-x-4">
                        <mail-icon class="mr-4"/>
                        <div>
                            <p class="font-bold">Mailing Address</p>
                            <span class="text-sm text-gray-400"> {{ 'No' +  item?.aptNumber +' , '+ item?.mailingAddress +' , '+ item?.country}}</span>
                        </div>
                   </div>
                    <div class="flex space-x-4">
                        <org-icon class="mr-4"/>
                        <div>
                            <p class="font-bold">Organization</p>
                            <span class="text-sm text-gray-400"> {{ item?.country}}</span>
                        </div>
                   </div>
          </div>
        </template>
      </accordion-component>

    <div class="mt-5">
            <accordion-component
            :title="'Primary Doctor'"
            :modelValue="true"
            >
            <template v-slot:default>
                <div class="grid grid-cols-4 gap-4 mt-5">
                <div
                    class="broder-r-2 border-gray-200 pr-5"
                    v-for="(assoc, index) in properties?.generalPractitioners"
                    :key="index"
                >
                    <div
                    class="flex items-center px-3">
                    <div class="flex items-center mr-10">
                    <avatar :src="assoc.image"/>
                        <div class="flex-1">
                        <h1 class="text-sm">{{ assoc?.firstName +''+  assoc?.lastName }}
                            <span class="text-blue-500">{{ assoc?.default }}</span>
                        </h1>
                        <h1 class="text-xs">
                            {{ assoc?.email }}
                        </h1>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </template>
            </accordion-component>
      </div>
      <div class="mt-5">
            <accordion-component
            :title="'Guarantor'"
            :modelValue="true"
            >
            <template v-slot:default>
                <div class="grid grid-cols-4 gap-4 mt-5">
                <div
                    class="broder-r-2 border-gray-200 pr-5"
                    v-for="(assoc, index) in properties?.guarantor"
                    :key="index"
                >
                    <div
                    class="flex items-center px-3">
                    <div class="flex items-center mr-10">
                    <avatar :src="assoc.image"/>
                        <div class="flex-1">
                        <h1 class="text-sm">{{ assoc.firstName +''+  assoc.lastName || "xxxxxx" }}
                        </h1>
                        <h1 class="text-xs">
                            {{ new Date(assoc.period?.start).toLocaleDateString() +' - '+  new Date(assoc.period?.end).toLocaleDateString() }}
                        </h1>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </template>
            </accordion-component>
      </div>
      <div class="mt-5">
           <accordion-component :title="'Bio'" :modelValue="true">
        <template v-slot:default>
          <div class="grid grid-cols-4 gap-4 mt-5">
            <div>
              <p class="text-gray-400 text-sm">Language</p>
              <span class="text-sm">{{ properties?.demographicsData?.primaryLanguage || "xxxxxx" }}</span>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Secondary Language</p>
              <span class="text-sm">{{ properties?.demographicsData?.secondaryLanguage || "xxxxxx" }}</span>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Race</p>
              <span class="text-sm">{{ properties?.demographicsData?.race || "xxxxxx" }}</span>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Ethnicity</p>
              <div class="flex mt-1">
                <img class="mr-3 w-6 rounded-md" :src="flag" />
                <span class="text-sm">{{ properties?.demographicsData?.primaryEthnicity || "xxxxxx" }}</span>
              </div>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Select Preferred Contact Channel</p>
                <span class="text-sm">{{ properties?.demographicsData?.preferredContactChannel || "xxxxxx" }}</span>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Secondary Ethnicity</p>
              <span class="text-sm">{{ properties?.demographicsData?.secondaryEthnicity || "xxxxxx" }}</span>
            </div>

          </div>
        </template>
      </accordion-component>
      </div>

    
    </div>
  </div>
</template>
<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { countryCodes } from "@/plugins/countrycodes";

import CalendareIcon from "@/components/icons/calendar.vue";
import AccordionComponent from "@/components/accordion-component-care-team.vue";
import Avatar from "@/components/avatar.vue";

import ScreenHeader from "./Header.vue";
import RelationshipIcon from "./icons/relationship.vue";
import LocationIcon from "./icons/location.vue";
import MailIcon from "./icons/mail.vue";
import OrgIcon from "./icons/org.vue";

@Options({
  name: "OtherInfo",
  components: {
    ScreenHeader,
    CalendareIcon,
    AccordionComponent,
    RelationshipIcon,
    LocationIcon,
    MailIcon,
    OrgIcon,
    Avatar,
  },
})
export default class OtherInfo extends Vue {
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
