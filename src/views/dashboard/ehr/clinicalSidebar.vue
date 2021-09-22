<template>
<div class="h-screen w-full overflow-auto max-h-full">
  <div class="containers">
    <div class="rounded-lg bg-white shadow-md w-full">
        <div class="flex -mb-12 justify-center">
          <avatar class="mr-2  h-24 w-24 m-5"  v-bind:src="localSrc" />
        </div>
        <div class="text-gray-400 -mb-6 text-center text-xs p-8">
          <span class="text-sm text-black font-bold">Nkechi Claire Obi</span> |
          <span>MRN-CH23022021-0010</span> 
          <span>
            21st January, 1996 (25yrs) Blood Type: 
          </span>
          <span class="text-sm text-black font-light">A+ | </span>
          <span>Genotype: <span class="text-sm text-black font-light">AA</span> </span>
        </div>
        <div class="border-dashed border-2  border-gray-100 m-3"></div>
          <div>
            <div class="flex justify-between -mb-2 space-x-2 p-3">
              <p class="text-xs text-gray-400">Policy ID</p>
              <p class="text-xs text-black flex">34567890-0987 <eye-icon class="mt-1 ml-2"/></p>
            </div>
            <div class="flex justify-between -mb-2 space-x-2 p-3">
              <p class="text-xs text-gray-400">Expires</p>
              <p class="text-xs text-black flex">24th March, 2024</p>
            </div>
            <div class="flex justify-between space-x-2 p-3">
              <p class="text-xs text-gray-400">Primary Physician</p>
              <p class="text-xs text-black flex">Dr. Obi Nduka</p>
            </div>
          </div>
          <span class="text-danger font-bold cursor-pointer p-5 text-sm flex justify-center">See More</span>
    </div>
  </div>

  <div class="containers sticky">
    <div class="mt-2 mb-5 rounded-lg bg-white  shadow-md w-full h-full max-h-full">
      <div class="w-full h-full p-2">
        <div class="flex flex-col h-full w-full overflow-auto max-h-full pr-2">
          <p class="text-black font-bold py-3 px-2">Records</p>
          <icon-input
            autocomplete="off"
            type="search"
            v-model="query"
            placeholder="Search"
            class="rounded-full w-full border-2 py-2 px-8 focus:outline-none"
          >
            <template v-slot:prepend>
              <search-icon />
            </template>
          </icon-input>
          <div class="mt-3" v-for="(setting, key, i) in settings" :key="i">
            <span>
              <div
                class="flex flex-col mt-1 text-gray-500"
                  >
                <s-bar-link
                class="mb-3"
                  :name="item.name"
                  :to="mapUrl(item.to)"
                  v-for="(item, index) in setting"
                  :key="index"
                  >
                  <template v-slot="{ active }">
                    <keep-alive>
                      <component
                        :is="item.icon"
                        :class="{ 'fill-current': active }"
                      ></component>
                    </keep-alive>
                  </template>
                </s-bar-link>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import { Options,setup, Vue } from "vue-class-component";
import IconInput from "@/components/IconInput.vue";
import Avatar from "@/components/avatar.vue";
import SearchIcon from "@/components/icons/search.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import SBarLink from "./sidebarlink.vue";
import ApprovalIcon from "@/components/icons/approval.vue";
import TrendIcon from "@/components/icons/ehrtrend.vue";
import MedicalIcon from "@/components/icons/ehrmedical.vue";
import AllergyIcon from "@/components/icons/ehrallergy.vue";
import AppointIcon from "@/components/icons/ehrappointments.vue";
import VisitIcon from "@/components/icons/ehrvisits.vue";
import VitalIcon from "@/components/icons/ehrvital.vue";
import EncounterIcon from "@/components/icons/ehrencounter.vue";
import ConditionIcon from "@/components/icons/ehrcondition.vue";
import MedicationIcon from "@/components/icons/ehrmedication.vue";
import DiagIcon from "@/components/icons/ehrdiag.vue";
import ProceedIcon from "@/components/icons/ehrprocedure.vue";
import CareIcon from "@/components/icons/ehrcare.vue";
import BillIcon from "@/components/icons/ehrbill.vue";
import CorrespondIcon from "@/components/icons/ehrcorrespond.vue";
import AttachIcon from "@/components/icons/ehrattach.vue";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import ChevronDownIcon from "@/components/icons/chevrondownprimary.vue";
import eyeIcon from "@/components/icons/yelloweye.vue";

type INav = { name: string; to: string; icon: string };

@Options({
  name: "SettingsSidebar",
  components: {
    SBarLink,
    ApprovalIcon,
    Avatar,
    eyeIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    IconInput,
    SearchIcon,
TrendIcon,
MedicalIcon,
AllergyIcon,
AppointIcon,
VisitIcon,
VitalIcon,
EncounterIcon,
ConditionIcon,
MedicationIcon,
DiagIcon,
ProceedIcon,
CareIcon,
BillIcon,
CorrespondIcon,
AttachIcon,


  },
})
export default class Settings extends Vue {
  query = "";
  open = 0;
  localSrc = require('../../../assets/img/ehr.png');
  img = setup(() => useHandleImage());
  get organization() {
    return [
      { name: "Health Trend", to: "health-trend", icon: "trend-icon" },
      { name: "Medical | Family History", to: "medical", icon: "medical-icon" },
      {
        name: "Allergies (Intolerance)",
        to: "allergy",
        icon: "allergy-icon",
      },
      {
        name: "Appointments",
        to: "appointment",
        icon: "appoint-icon",
      },
      { name: "Visits", to: "visits", icon: "visit-icon" },
      { name: "Vital Signs", to: "vital-signs", icon: "vital-icon" },
      { name: "Encounter", to: "encounter", icon: "encounter-icon" },
      { name: "Condition/Problem", to: "condition", icon: "condition-icon" }, 
      { name: "Medications", to: "medications", icon: "medication-icon" },
      { name: "Diagnostics", to: "diagnostics", icon: "diag-icon" },
      { name: "Procedure", to: "procedure", icon: "proceed-icon" },
      { name: "Care Team", to: "care-team", icon: "care-icon" },
      { name: "Billing Data", to: "billing-data", icon: "bill-icon" },
      { name: "Correspondence", to: "correspondence", icon: "correspond-icon" },
      { name: "Attachments", to: "attachments", icon: "attach-icon" },
    ];
  }

  
  get settings() {
    const provider = {
      Organization: this.filter(this.organization)
    };
    const hmo = {
      Organization: this.filter(this.organization),
      "Users & Security": this.filter([
        {
          name: "Account Security",
          to: "account-security",
          icon: "security-icon",
        },
        { name: "Domains", to: "domains", icon: "domain-icon" },
      ]),
    };

    const type = this.$route.params.type as string;
    if (type.toLowerCase() == "hmo") return hmo;
    return provider;
  }

  mapUrl(url: string) {
    const settingsBase = this.$router.resolve({ name: "Patient EHR" }).href;
    return `${settingsBase}/${url}`.replace("//", "/");
  }

  filter(navs: INav[]) {
    if (!this.query) return navs;
    return navs.filter((nav) =>
      nav.name.toLowerCase().includes(this.query.toLowerCase())
    );
  }
}
</script>
<style scoped>
.heigh {
  min-height: 30px;
}
</style>
