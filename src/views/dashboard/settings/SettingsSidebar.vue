<template>
  <cornie-dialog
    v-model="show"
    right
    class="w-4/12 h-full animated fadeIn z-50"
  >
    <cornie-card height="100%" class="flex flex-col animated fadeInUp">
      <cornie-card-title class="w-full p-3">
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Admin Settings
          </h2>
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <div class="flex flex-col h-full w-full overflow-auto max-h-full">
          <div class="mt-3" v-for="(setting, key, i) in settings" :key="i">
            <span>
              <div
                class="w-full justify-between flex xl:pr-4 md:pr-2 items-center"
              >
                <h2
                  @click="open = open == i ? -1 : i"
                  class="font-bold cursor-pointer capitalize mb-3 text-sm"
                >
                  {{ key }}
                </h2>

                <chevron-down-icon
                  v-if="open == i"
                  @click="open = -1"
                  class="cursor-pointer"
                />
                <chevron-right-icon
                  @click="open = i"
                  v-else
                  class="cursor-pointer"
                />
              </div>
              <div
                class="flex flex-col mt-1 text-black font-light text-xs"
                :class="{ hidden: open != i }"
              >
                <s-bar-link
                  :name="item.name"
                  :to="mapUrl(item.to)"
                  v-for="(item, index) in setting"
                  :key="index"
                >
                  <template v-slot="{ active }">
                    <keep-alive>
                      <component
                        :is="item.icon"
                        :class="{ fill: active }"
                      ></component>
                    </keep-alive>
                  </template>
                </s-bar-link>
              </div>
            </span>
          </div>
        </div>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import OrgIcon from "@/components/icons/org.vue";
import SBarLink from "./sidebarlink.vue";
import ContactIcon from "@/components/icons/contactinfo.vue";
import LocationIcon from "@/components/icons/location.vue";
import HierarchyIcon from "@/components/icons/hierarchy.vue";
import BankIcon from "@/components/icons/bank.vue";
import SecurityIcon from "@/components/icons/security.vue";
import FormIcon from "@/components/icons/questionnaire.vue";
import DomainIcon from "@/components/icons/domain.vue";
import PractitionerIcon from "@/components/icons/practitioner.vue";
import GroupIcon from "@/components/icons/group.vue";
import TeamIcon from "@/components/icons/team.vue";
import RolesIcon from "@/components/icons/roles.vue";
import ApprovalIcon from "@/components/icons/approval.vue";
import HealthServiceIcon from "@/components/icons/healthservice.vue";
import TemplatesIcon from "@/components/icons/questionnaire.vue";
import DevicesIcon from "@/components/icons/devices.vue";
import PartnersIcon from "@/components/icons/partners.vue";
import ChevronRightIcon from "@/components/icons/dialogchevronright.vue";
import ChevronDownIcon from "@/components/icons/dialogchevrondown.vue";
import MarkupIcon from "@/components/icons/markup.vue";
import KycIcon from "@/components/icons/kyc.vue";

type INav = { name: string; to: string; icon: string };

@Options({
  name: "SettingsSidebar",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    SBarLink,
    ApprovalIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    FormIcon,
    IconInput,
    OrgIcon,
    LocationIcon,
    SearchIcon,
    KycIcon,
    HierarchyIcon,
    GroupIcon,
    SecurityIcon,
    HealthServiceIcon,
    BankIcon,
    PractitionerIcon,
    DomainIcon,
    ContactIcon,
    RolesIcon,
    TemplatesIcon,
    DevicesIcon,
    TeamIcon,
    PartnersIcon,
    MarkupIcon,
  },
})
export default class Settings extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  query = "";
  open = 0;
  get organization() {
    return [
      { name: "Organization Information", to: "org-info", icon: "org-icon" },
      { name: "Contact Information", to: "contact-info", icon: "contact-icon" },
       { name: "KYC", to: "kyc", icon: "kyc-icon" },
      {
        name: "Location",
        to: "location",
        icon: "location-icon",
      },
      {
        name: "Organization Hierarchy",
        to: "org-hierarchy",
        icon: "hierarchy-icon",
      },
    ];
  }

  get userSecurity() {
    return [
      {
        name: "Account Security",
        to: "account-security",
        icon: "security-icon",
      },
      { name: "Domains", to: "domains", icon: "domain-icon" },
      { name: "Practitioners", to: "practitioners", icon: "practitioner-icon" },
      { name: "Group", to: "group", icon: "group-icon" },
      { name: "Care Team", to: "care-teams", icon: "team-icon" },
      {
        name: "Roles and Privileges",
        to: "roles-privileges",
        icon: "roles-icon",
      },
      { name: "Approval", to: "approval", icon: "approval-icon" },
    ];
  }
  get healthCare() {
    return [
       {
        name: "Catalogue Services",
        to: "catalogues",
        icon: "health-service-icon",
      },
      { name: "Markup & Discounts", to: "markup", icon: "markup-icon" },
      { name: "Devices", to: "devices", icon: "devices-icon" },
      { name: "Care Partners", to: "care-partners", icon: "partners-icon" },
      { name: "Billing Accounts", to: "bank-accounts", icon: "bank-icon" },
    ];
  }
  get PracticeManagement() {
    return [
      {
        name: "Forms & Questionnaires",
        to: "practise-management/forms-questionnaires",
        icon: "templates-icon",
      },
      {
        name: "Booking Site",
        to: "practise-management/booking-site",
        icon: "security-icon",
      },
      //  {
      //   name: "Forms & Questionnaires",
      //   to: "forms-questionnaires",
      //   icon: "form-icon",
      // },
    ];
  }
  get Pricing() {
    return [
      {
        name: "Markup and Discounts",
        to: "markup",
        icon: "roles-icon",
      },
      // {
      //   name: "Markup Settings",
      //   to: "markup-settings",
      //   icon: "bank-icon",
      // },
    ];
  }

  get settings() {
    const provider = {
      "Account Info": this.filter(this.organization),
      "Users & Security": this.filter(this.userSecurity),
      Commercial: this.filter(this.healthCare),
      "Practise Management": this.filter(this.PracticeManagement),
      // PRICING: this.filter(this.Pricing),
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
    const settingsBase = this.$router.resolve({ name: "Settings" }).href;
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
<style scoped></style>
