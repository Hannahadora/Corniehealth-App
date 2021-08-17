<template>
  <div @mouseover="hovered = true" @mouseleave="hovered = false">
    <div
      class="
        flex flex-col
        z-10
        py-4
        items-center
        min-h-screen
        h-screen
        bg-primary
        shadow-md
        fixed
        justify-center
        px-3
        w-auto
      "
    >
      <div
        class="
          flex flex-row
          justify-between
          border-b-2
          pb-1
          items-center
          border-gray-300
        "
      >
        <img src="@/assets/img/logo.svg" />
        <h2 class="text-white text-xl font-semibold ml-1" v-if="hovered">
          CornieHealth
        </h2>
      </div>
     <div
      v-if="routeName == 'Organization Informtation'"
        class="
          mt-5
          flex
          h-3/4
          items-center
          w-full
          flex-col
          justify-between
          text-white text-lg
          overflow-y-auto
        "
      >
        <sidebar-link
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :text="link.name"
          :hovered="hovered"
        >
          <keep-alive>
            <component :is="link.icon"></component>
          </keep-alive>
        </sidebar-link>
      </div>
        <div
        v-else
        class="
          mt-5
          flex
          h-3/4
          items-center
          w-full
          flex-col
          justify-between
          text-white text-lg
          overflow-y-auto
        "
      >
        <sidebar-link
          v-model="opened"
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :text="link.name"
          :hovered="hovered"
        >
          <keep-alive>
            <component :is="link.icon"></component>
          </keep-alive>
        </sidebar-link>
        <sidebar-link
          v-for="(link, i) in settings"
          :children="settings"
          :key="i"
          :to="link.to"
          :text="link.name"
          :hovered="hovered"
        >
        </sidebar-link>
      </div>
      <sidebar-link
        to="support"
        :hovered="hovered"
        text="Feedback & Support"
        class="
          mt-auto
          bg-opacity-20 bg-white
          text-white
          py-2
          rounded-2xl
          w-full
          px-3
        "
      >
        <support-icon class="" />
      </sidebar-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DashboardIcon from "./icons/dashboard.vue";
import ScheduleIcon from "./icons/schedule.vue";
import BookIcon from "./icons/book.vue";
import ClinicIcon from "./icons/clinic.vue";
import ClipBoardIcon from "./icons/clipboard.vue";
import PillIcon from "./icons/pill.vue";
import MedalIcon from "./icons/medal.vue";
import DebitCardIcon from "./icons/debitcard.vue";
import WalletIcon from "./icons/wallet.vue";
import ChartIcon from "./icons/chart.vue";
import ReferIcon from "./icons/refer.vue";
import SupportIcon from "./icons/support.vue";
import SidebarLink from "./sidebarlink.vue";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import ChevronDownIcon from "@/components/icons/chevrondownprimary.vue";

type INav = { name: string; to: string };
@Options({
  components: {
    SidebarLink,
    SupportIcon,
    ChartIcon,
    ReferIcon,
    DebitCardIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    WalletIcon,
    MedalIcon,
    DashboardIcon,
    ScheduleIcon,
    BookIcon,
    ClinicIcon,
    PillIcon,
    ClipBoardIcon,
  },
})
export default class CorniDashboardeSideBar extends Vue {
  hovered = false;
  opened = true;
  open = 0;
  query = "";
  get engagements() {
    return [
      { name: "Patient Registration", to: "org-info" },
      { name: "Shift", to: "contact-info" },
      { name: "Availability", to: "location" },
      { name: "Appointment", to: "org-hierarchy" },
      { name: "Service Request", to: "bank-accounts" },
    ];
  }
  providerLinks = [
    { name: "Dashboard", to: "settings", icon: "dashboard-icon" },
    { name: "Engagements", to: "engagements", icon: "schedule-icon" },
    { name: "Clinical", to: "clinical", icon: "book-icon" },
    { name: "In-Patient", to: "in-patient", icon: "clinic-icon" },
    { name: "Diagnostics", to: "diagnostics", icon: "clip-board-icon" },
    { name: "Medications", to: "medications", icon: "pill-icon" },
    { name: "Certificates", to: "certificates", icon: "medal-icon" },
    { name: "Bills & Payments", to: "bills", icon: "debit-card-icon" },
    { name: "Accounting", to: "accounting", icon: "wallet-icon" },
    { name: "Analytics", to: "analytics", icon: "chart-icon" },
    { name: "Referrals", to: "refs", icon: "refer-icon" },
  ];

  hmoLinks = [
    { name: "Dashboard", to: "settings", icon: "dashboard-icon" },
    { name: "Experience", to: "experience", icon: "refer-icon" },
    { name: "Health Plans", to: "health-plans", icon: "book-icon" },
    { name: "Bills & Payments", to: "bills", icon: "debit-card-icon" },
    { name: "Accounting", to: "accounting", icon: "wallet-icon" },
    { name: "Analytics", to: "analytics", icon: "chart-icon" },
    { name: "Approvals", to: "analytics", icon: "chart-icon" },
  ];
  get accType() {
    return this.$route.params.type as string;
  }
  get routeName() {
    return this.$route.name as string;
  }

  get settings() {
    const provider = {
      Engagements: this.filter(this.engagements),
    };
    return provider;
  }
  filter(navs: INav[]) {
    if (!this.query) return navs;
    return navs.filter((nav) =>
      nav.name.toLowerCase().includes(this.query.toLowerCase())
    );
  }
  mapUrl(url: string) {
    console.log(url);
    console.log("url");
    const settingsBase = this.$router.resolve({
      name: "Patient Experience Management",
    }).href;
    return `${settingsBase}/${url}`;
  }
  get links() {
    const accType = this.accType?.toLowerCase();
    let links = [];
    if (accType == "hmo") links = [...this.hmoLinks];
    else links = [...this.providerLinks];
    return links.map((link) => {
      return {
        ...link,
        to: `/${link.name}/${accType}/${link.to}/`,
      };
    });
  }
}
</script>
