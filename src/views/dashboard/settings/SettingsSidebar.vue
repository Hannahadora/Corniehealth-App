<template>
  <div class="mt-2 mb-5 rounded-lg bg-white w-full h-full max-h-full">
    <div class="w-full h-full max-h-full p-2">
      <div class="flex flex-col h-full w-full overflow-auto max-h-full pr-2">
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
          <span>
            <div
              class="w-full justify-between flex xl:pr-4 md:pr-2 items-center"
            >
              <h2
                @click="open = open == i ? -1 : i"
                class="font-semibold cursor-pointer uppercase text-sm"
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
              class="flex flex-col mt-1 text-gray-500"
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
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import ChevronDownIcon from "@/components/icons/chevrondownprimary.vue";

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
  get organization() {
    return [
      { name: "Organization Information", to: "org-info", icon: "org-icon" },
      { name: "Contact Information", to: "contact-info", icon: "contact-icon" },
      {
        name: "Location Hierarchy",
        to: "location",
        icon: "location-icon",
      },
      {
        name: "Organization Hierarchy",
        to: "org-hierarchy",
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
    const provider = {
      Organization: this.filter(this.organization),
      "Users & Security": this.filter(this.userSecurity),
      HEALTHCARE: this.filter(this.healthCare),
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
