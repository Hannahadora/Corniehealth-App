<template>
  <nav class="p-5 flex min-w-full items-center w-full border-b-2 h-14">
    <span class="flex items-center justify-items-center pr-2 border-r-2">
      <arrow-left-icon />
    </span>
    <h2 class="text-2xl font-semibold ml-3">Settings</h2>
    <span class="flex items-center justify-center ml-auto">
      <settings-icon />
    </span>
    <span class="flex items-center justify-center ml-5">
      <bell-icon />
    </span>
    <span class="w-10 h-10 relative ml-5">
      <div
        class="
          group
          w-full
          h-full
          rounded-full
          overflow-hidden
          shadow-inner
          text-center
          bg-purple
          table
          cursor-pointer
        "
      >
        <img
          src="@/assets/img/avatar.png"
          class="
            object-cover object-center
            w-full
            h-full
            visible
            group-hover:hidden
          "
        />
      </div>
    </span>
    <span class="font-medium ml-1"> Farouq A.L</span>
    <span class="ml-1">
      <chevron-down />
    </span>
  </nav>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ArrowLeftIcon from "./icons/arrowleft.vue";
import SettingsIcon from "./icons/settings.vue";
import BellIcon from "./icons/bell.vue";
import ChevronDown from "./icons/chevrondown.vue";

@Options({
  components: {
    ArrowLeftIcon,
    ChevronDown,
    SettingsIcon,
    BellIcon,
  },
})
export default class NavBar extends Vue {}
</script>
