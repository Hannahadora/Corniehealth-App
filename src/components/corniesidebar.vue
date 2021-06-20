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
      "
      :class="{ 'w-20': !hovered, 'w-56': hovered }"
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
          to="/dashboard/settings"
          text="Dashboard"
          :hovered="hovered"
        >
          <dashboard-icon />
        </sidebar-link>
        <sidebar-link
          to="/dashboard/engagements"
          text="Engagements"
          :hovered="hovered"
        >
          <schedule-icon />
        </sidebar-link>
        <sidebar-link
          to="/dashboard/clinical"
          :hovered="hovered"
          text="Clinical"
        >
          <book-icon />
        </sidebar-link>
        <sidebar-link
          to="/dashboard/in-patient"
          :hovered="hovered"
          text="In-Patient"
        >
          <clinic-icon />
        </sidebar-link>
        <sidebar-link
          to="/dasboard/diagnostics"
          :hovered="hovered"
          text="Diagnostics"
        >
          <clip-board-icon />
        </sidebar-link>
        <sidebar-link
          to="/dashboard/medications"
          :hovered="hovered"
          text="Medications"
        >
          <pill-icon />
        </sidebar-link>
        <sidebar-link
          to="/dashboard/certificates"
          :hovered="hovered"
          text="Certificates"
        >
          <medal-icon />
        </sidebar-link>
        <sidebar-link
          to="/dashboard/payments"
          :hovered="hovered"
          text="Bills & Payments"
        >
          <debit-card-icon />
        </sidebar-link>
        <sidebar-link
          to="/dashboard/accounting"
          :hovered="hovered"
          text="Accounting"
        >
          <wallet-icon />
        </sidebar-link>
        <sidebar-link
          to="/dashboard/analytics"
          :hovered="hovered"
          text="Analytics"
        >
          <chart-icon />
        </sidebar-link>
        <sidebar-link
          to="/dashboard/referrals"
          :hovered="hovered"
          text="Referrals"
        >
          <refer-icon />
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
}
</script>
