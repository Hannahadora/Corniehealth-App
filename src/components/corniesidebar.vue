<template>
  <div @mouseover="hovered = true" @mouseleave="hovered = false">
    <div
      class="
        flex flex-col
        py-4
        px-1
        items-center
        min-h-screen
        h-screen
        bg-primary
        shadow-md
        fixed
        justify-center
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
          :children="link.children"
          :hovered="hovered"
        >
          <keep-alive>
            <component :is="link.icon"></component>
          </keep-alive>
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
import PatientIcon from "./icons/PatientIcon.vue";
import SidebarLink from "./sidebarlink.vue";

interface ISidebarLink {
  name: string;
  to: string | { name: string };
  icon?: string;
  children?: ISidebarLink[];
}

@Options({
  components: {
    SidebarLink,
    SupportIcon,
    ChartIcon,
    ReferIcon,
    DebitCardIcon,
    WalletIcon,
    MedalIcon,
    DashboardIcon,
    ScheduleIcon,
    BookIcon,
    ClinicIcon,
    PillIcon,
    ClipBoardIcon,
    PatientIcon,
  },
})
export default class CorniDashboardeSideBar extends Vue {
  hovered = false;

  providerLinks: ISidebarLink[] = [
    { name: "Dashboard", to: "home", icon: "dashboard-icon" },
    {
      name: "Experience",
      to: "experience",
      icon: "patient-icon",
      children: [
        { name: "Patients", to: { name: "Patients" } },
        { name: "Schedules", to: "/dashboard/experience/schedules" },
        { name: "Appointments", to: { name: "Appointment" } },
        { name: "visits", to: "/dashboard/experience/visits" },
        { name: "Requests", to: { name: "Requests" } },
        { name: "Tasks", to: { name: "Tasks" } },
        { name: "Messaging", to: "/dashboard/experience/messages" },
        { name: "Satisfaction & Ratings", to: "/dashboard/experience/ratings" },
        { name: "Questionaires", to: "/dashboard/experience/questionaires" },
      ],
    },
    { name: "Clinical", to:  { name: "Clinical" }, icon: "book-icon" },
    { name: "In-Patient", to: "in-patient", icon: "clinic-icon" },
    { name: "Diagnostics", to: "diagnostics", icon: "clip-board-icon" },
    { name: "Medications", to: "medications", icon: "pill-icon" },
    { name: "Certificates", to: "certificates", icon: "medal-icon" },
    { name: "Bills & Payments", to: "bills", icon: "debit-card-icon" },
    { name: "Accounting", to: "accounting", icon: "wallet-icon" },
    { name: "Analytics", to: "analytics", icon: "chart-icon" },
    { name: "Referrals", to: "refs", icon: "refer-icon" },
  ];

  hmoLinks: ISidebarLink[] = [
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

  get links() {
    const accType = this.accType?.toLowerCase();
    let links = [];
    if (accType == "hmo") links = [...this.hmoLinks];
    else links = [...this.providerLinks];
    return links.map((link) => {
      return {
        ...link,
        to: `/dashboard/${accType}/${link.to}/`,
      };
    });
  }
}
</script>
