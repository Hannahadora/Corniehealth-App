<template>
  <div>
    <div
      class="
        flex flex-col
        py-4
        items-center
        min-h-screen
        h-screen
        w-16
        bg-primary
        shadow-md
        fixed
      "
    >
      <div
        class="
          flex flex-row
          justify-items-center
          border-b-2
          pb-1
          border-gray-300
        "
      >
        <img src="@/assets/img/logo.svg" />
      </div>
      <div class="mt-5 flex h-3/4 items-center w-full flex-col justify-between">
        <router-link
          to="/dashboard"
          active-class="flex justify-center w-3/4 py-2 rounded-2xl bg-blue-500"
          class=""
        >
          <dashboard-icon class="text-gray-300" />
        </router-link>
        <router-link
          to="/schedule"
          active-class="flex justify-center w-3/4 py-2 rounded-2xl bg-blue-500"
          class=""
        >
          <schedule-icon />
        </router-link>
        <router-link
          to="/book"
          active-class="flex justify-center w-3/4 py-2 rounded-2xl bg-blue-500"
          class=""
        >
          <book-icon />
        </router-link>
        <router-link
          to="/clinic"
          active-class="flex justify-center w-3/4 py-2 rounded-2xl bg-blue-500"
          class=""
        >
          <clinic-icon />
        </router-link>
        <router-link
          to="notes"
          active-class="flex justify-center w-3/4 py-2 rounded-2xl bg-blue-500"
        >
          <clip-board-icon />
        </router-link>
        <router-link
          to="prespcriptions"
          active-class="flex justify-center w-3/4 py-2 rounded-2xl bg-blue-500"
        >
          <pill-icon />
        </router-link>
        <router-link
          to="awards"
          active-class="flex justify-center w-3/4 py-2 rounded-2xl bg-blue-500"
        >
          <medal-icon />
        </router-link>
        <router-link
          to="payment"
          active-class="flex justify-center w-3/4 py-2 rounded-2xl bg-blue-500"
        >
          <debit-card-icon />
        </router-link>
        <router-link
          to="wallet"
          active-class="flex justify-center w-3/4 py-2 rounded-2xl bg-blue-500"
        >
          <wallet-icon />
        </router-link>
        <router-link
          to="chart"
          active-class="flex justify-center w-3/4 py-2 rounded-2xl bg-blue-500"
        >
          <chart-icon />
        </router-link>
        <router-link
          to="/refer"
          active-class="flex justify-center w-3/4 py-2 rounded-2xl bg-blue-500"
        >
          <refer-icon />
        </router-link>
      </div>
      <router-link
        to="#"
        active-class="flex justify-center w-3/4 py-2 mt-auto rounded-2xl bg-blue-500"
      >
        <support-icon />
      </router-link>
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

@Options({
  components: {
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
export default class CorniDashboardeSideBar extends Vue {}
</script>
