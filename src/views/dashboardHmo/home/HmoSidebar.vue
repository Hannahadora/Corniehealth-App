<template>
  <div class="mt-2 mb-5 rounded-lg bg-white w-full h-full max-h-full">
    <div class="w-full h-full max-h-full p-2">
      <div class="flex flex-col h-full w-full overflow-auto max-h-full">
        <icon-input
          autocomplete="off"
          type="search"
          v-model="query"
          placeholder="Search"
          class="rounded-full w-full border-2 focus:outline-none"
        >
          <template v-slot:prepend>
            <search-icon />
          </template>
        </icon-input>
        <div class="mt-3" v-for="(setting, key, i) in settings" :key="i">
          <h2 class="font-semibold uppercase text-sm">{{ key }}</h2>
          <div class="flex flex-col mt-1 text-gray-500">
            <s-bar-link
              :name="item.name"
              :to="item.to"
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
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import OrgIcon from "@/components/icons/org.vue";
import SBarLink from "./sidebarlink.vue";
import ContactIcon from "@/components/icons/contactinfo.vue";
import LocationIcon from "@/components/icons/location.vue";
import HierarchyIcon from "@/components/icons/hierarchy.vue";
import BankIcon from "@/components/icons/bank.vue";
import SecurityIcon from "@/components/icons/security.vue";
import DomainIcon from "@/components/icons/domain.vue";
import PractitionerIcon from "@/components/icons/practitioner.vue";
import GroupIcon from "@/components/icons/group.vue";
import TeamIcon from "@/components/icons/team.vue";
import RolesIcon from "@/components/icons/roles.vue";
import ApprovalIcon from "@/components/icons/approval.vue";
import HealthServiceIcon from "@/components/icons/healthservice.vue";
import TemplatesIcon from "@/components/icons/templates.vue";
import DevicesIcon from "@/components/icons/devices.vue";
import PartnersIcon from "@/components/icons/partners.vue";

type INav = { name: string; to: string; icon: string };

@Options({
  components: {
    SBarLink,
    ApprovalIcon,
    IconInput,
    OrgIcon,
    LocationIcon,
    SearchIcon,
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
  },
})
export default class Settings extends Vue {
  query = "";
  get experiencemanagement() {
    return [
      { name: "Experience Management", to: "experience-management", icon: "org-icon" },
      { name: "Patient Registration", icon: "contact-icon" },
      {
        name: "Shifts",
        icon: "location-icon",
      },
      {
        name: "Organization Hierarchy",
        icon: "hierarchy-icon",
      },
      { name: "Bank & Accounts", to: "bank-accounts", icon: "bank-icon" },
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
      { name: "Care Team", to: "care-team", icon: "team-icon" },
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
        name: "Healthcare Services",
        to: "health-services",
        icon: "health-service-icon",
      },
      {
        name: "Practice Forms/Templates",
        to: "practice-templates",
        icon: "templates-icon",
      },
      { name: "Devices", to: "devices", icon: "devices-icon" },
      { name: "Care Partners", to: "care-partners", icon: "partners-icon" },
    ];
  }
  get settings() {
    return {
      Organization: this.filter(this.organization),
      "Users & Security": this.filter(this.userSecurity),
      HEALTHCARE: this.filter(this.healthCare),
    };
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
