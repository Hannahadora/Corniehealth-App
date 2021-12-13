<template>
  <div class="mt-2 mb-5 rounded-lg bg-white w-full h-full max-h-full">
    <div class="w-full h-full max-h-full p-2">
      <div class="flex flex-col h-full w-full overflow-auto max-h-full pr-2">
        <div class="mt-3 my-4" v-for="(setting, key) in settings" :key="key">
          <span>
            <div class="w-full justify-between flex items-center">
              <router-link
                :to="setting.to"
                exact-active-class="live-link"
                :class="{
                  'live-link':
                    setting.to.includes('domain') &&
                    route.path.includes('domain'),
                }"
                class="font-semibold cursor-pointer capitalize w-full flex text-sm text-gray-500"
              >
                <span class="mr-2" v-if="key === 0"> <PractitionerIcon /></span>
                <span class="mr-2" v-if="key === 1"> <DomainIcon /></span>
                <span class="mr-2" v-if="key === 2"> <SecurityIcon /></span>
                <span class="mr-2 w-1/12" v-if="key === 3">
                  <TemplatesIcon
                /></span>
                <span class="flex justify-between w-11/12">
                  {{ setting.name }}
                  <chevron-right-icon
                    class="cursor-pointer text-white-500 ml-auto white stroke-current"
                  />
                </span>
              </router-link>
            </div>
            <div class="flex flex-col mt-1 text-gray-500"></div>
          </span>
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
import SBarLink from "../../../settings/sidebarlink.vue";
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
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import { useRoute } from "vue-router";

type INav = { name: string; to: string; icon: string };

@Options({
  name: "SettingsSidebar",
  components: {
    SBarLink,
    ApprovalIcon,
    ChevronRightIcon,
    ChevronDownIcon,
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
  open = 0;

  route: any = useRoute();
  //   get organization() {
  //     return [
  //       { name: "Organization Information", to: "org-info", icon: "org-icon" },
  //       { name: "Contact Information", to: "contact-info", icon: "contact-icon" },
  //       {
  //         name: "Location Hierarchy",
  //         to: "location",
  //         icon: "location-icon",
  //       },
  //       {
  //         name: "Organization Hierarchy",
  //         to: "org-hierarchy",
  //         icon: "hierarchy-icon",
  //       },
  //       { name: "Bank & Accounts", to: "bank-accounts", icon: "bank-icon" },
  //     ];
  //   }

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
    return [
      {
        name: "Practitioner Profile",
        to: "/dashboard/provider/user",
        icon: "security-icon",
      },
      {
        name: "Domains",
        to: "/dashboard/provider/user/domains",
        icon: "security-icon",
      },
      {
        name: "User Security",
        to: "/dashboard/providerr/user/security",
        icon: "security-icon",
      },
      {
        name: "Signature",
        to: "/dashboard/provider/user/signature",
        icon: "domain-icon",
      },
    ];
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
<style scoped>
.live-link {
  background: #080056;
  border-radius: 124px;
  color: white;
  padding: 0.8rem 1rem;
}
</style>
