<template>
  <div @mouseover="hovered = true" @mouseleave="hovered = false">
    <div
      class="
        flex flex-col
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
        class="
          mt-5
          flex-grow
          flex
          flex-col

          items-center
          w-full
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
import SidebarLink from "./sidebarlink.vue";

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
  },
})
export default class CorniDashboardeSideBar extends Vue {
  hovered = false;

  providerLinks = [
    { name: "Dashboard", to: "settings", icon: "dashboard-icon" },
    { name: "Experience", to: "/experience/dashboard", icon: "schedule-icon", children: [
      { text: "Dashboard", to: {name: "Patients Experience"} },
      { text: "Patients", to: "experience/patients_registration" },
      { text: "Schedules", to: "experience/schedules" },
      { text: "Appointments", to: "experience/appointments" },
      { text: "visits", to: "experience/visits" },
      { text: "Requests", to: "experience/requests" },
      { text: "Taks", to: "experience/tasks" },
      { text: "Messaging", to: "experience/messages" },
      { text: "Satisfaction & Ratings", to: "experience/ratings" },
      { text: "Questionaires", to: "experience/questionaires" },

    ]},

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
