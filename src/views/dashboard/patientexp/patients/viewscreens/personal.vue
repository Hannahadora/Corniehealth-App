<template>
  <div>
    <div class="mt-5 mb-5 w-ful">
      <screen-header :properties="properties"> Bio </screen-header>
    </div>
    <div class="mt-16" v-if="properties">
      <accordion-component :title="'Bio'" :modelValue="true">
        <template v-slot:default>
          <div class="grid grid-cols-4 gap-4 mt-5">
            <div>
              <p class="text-gray-400 text-sm">First Name</p>
              <span class="text-sm">{{ properties.firstName }}</span>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Middle Name</p>
              <span class="text-sm">{{ properties.middleName }}</span>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Last Name</p>
              <span class="text-sm">{{ properties.lastName }}</span>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Nationality</p>
              <div class="flex mt-1">
                <img class="mr-3 w-6 rounded-md" :src="flag" />
                <span class="text-sm">{{ properties?.nationality || "-" }}</span>
              </div>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Date of Birth</p>
              <div class="flex mt-1">
                <calendare-icon class="mr-1" />
                <span class="text-sm">{{ properties?.dob || "-" }}</span>
              </div>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Sex</p>
              <span class="text-sm">{{ properties?.gender || "-" }}</span>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Blood Group</p>
              <span class="text-sm">{{ properties?.bloodGroup || "-" }}</span>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Genotype</p>
              <span class="text-sm">{{ properties?.genotype || "-" }}</span>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Marital Status</p>
              <span class="text-sm">{{
                properties?.maritalStatus || "-"
              }}</span>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Number of Children</p>
              <span class="text-sm">{{
                properties?.numberOfChildren || "-"
              }}</span>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Multiple Birth?</p>
              <span class="text-sm">{{ properties?.multiple || "-" }}</span>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Number of Multiple Births</p>
              <span class="text-sm">{{
                properties?.multipleBirthInteger || "-"
              }}</span>
            </div>
          </div>
        </template>
      </accordion-component>
      <div class="mt-5">
        <accordion-component
          :title="'Identity & Association'"
          :modelValue="true"
        >
          <template v-slot:default>
            <div class="grid grid-cols-4 gap-4 mt-5">
              <div>
                <p class="text-gray-400 text-sm">Identity NO</p>
                <span class="text-sm">{{ properties.idType +' : '+ properties.idNumber }}</span>
              </div>
            </div>
            <div class="grid grid-cols-4 gap-4 mt-5">
              <div
                v-for="(assoc, index) in properties.associates"
                :key="assoc.id"
              >
                <div
                  class="flex items-center px-3"
                  :class="
                    index !== properties.associates.length - 1
                      ? 'border-r border-gray-400'
                      : ''
                  "
                >
                  <div class="flex items-center mr-10">
                    <div
                      class="
                        w-8
                        h-8
                        p-4
                        rounded-full
                        bg-blue-500
                        text-white
                        mr-2
                        flex
                        justify-center
                        items-center
                      "
                    >
                      {{ assoc.name.substr(0, 2).toUpperCase() }}
                    </div>
                    <div class="flex-1">
                      <h1 class="text-sm">{{ assoc.name }}</h1>
                      <h1 class="text-xs">
                        {{ assoc.associationType }}\{{ assoc.relationship }}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </accordion-component>
      </div>
      <div class="mt-5 mb-20">
        <accordion-component :title="'Contact Info'" :modelValue="true">
            <template v-slot:default>
            <div class="grid grid-cols-4 gap-4 mt-5" v-for="(item, index) in properties.contactInfo" :key="index">
                <div>
                <p class="text-gray-400 text-sm">Country</p>
                <div class="mt-1 flex">
                    <img class="mr-3 w-6 rounded-md" :src="flag" />
                    <span class="text-sm">{{ item.country }}</span>
                </div>
                </div>
                <div>
                <p class="text-gray-400 text-sm">State/Region</p>
                <span class="text-sm">{{ item.state }}</span>
                </div>
                <div>
                <p class="text-gray-400 text-sm">City</p>
                <span class="text-sm">{{ item.city }}</span>
                </div>
                <div>
                <p class="text-gray-400 text-sm">Post Code</p>
                <span class="text-sm">{{ item?.postalCode || "-" }}</span>
                </div>
                <div>
                <p class="text-gray-400 text-sm">Address</p>
                <span class="text-sm">{{ item?.primaryAddress || "-" }}</span>
                </div>
                <div>
                <p class="text-gray-400 text-sm">Apartment</p>
                <span class="text-sm">{{ item?.secondaryAddress || "-" }}</span>
                </div>
                <div>
                <p class="text-gray-400 text-sm">Email</p>
                <span class="text-sm">{{ item?.email || "-" }}</span>
                </div>
                <div>
                <p class="text-gray-400 text-sm">Mobile</p>
                <div class="flex mt-1">
                    <img class="mr-3 w-6 rounded-md" :src="flag" />
                    <span class="text-sm">{{ item?.phone?.dialCode +' '+ item?.phone?.number|| "-" }}</span>
                </div>
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
import ScreenHeader from "./Header.vue";
import CalendareIcon from "@/components/icons/calendar.vue";
import { Prop } from "vue-property-decorator";
import { countryCodes } from "@/plugins/countrycodes";
import AccordionComponent from "@/components/accordion-component-care-team.vue";

@Options({
  name: "PractitionerBio",
  components: {
    ScreenHeader,
    CalendareIcon,
    AccordionComponent,
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
