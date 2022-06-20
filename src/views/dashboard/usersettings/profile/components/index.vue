<template>
  <div
    class="flex justify-center bg-white shadow-md p-3 mt-2 mb-2 pb-96 overflow-auto rounded w-full"
  >
    <div class="w-full">
      <span class="w-full h-screen">
        <tabs :items="tabLinks" v-model="currentTab">
          <empty-state v-if="empty" />
          <practitioner-section v-else />
          <bio />
          <user-security />
        </tabs>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Tabs from "@/components/tabs.vue";
import PractitionerSection from "./practionerprofile.vue";
import UserSecurity from "./usersecurity/index.vue";
import Bio from "./bio.vue";
import { namespace } from "vuex-class";
import User from "@/types/user";
import IPractitioner from "@/types/IPractitioner";
import { useHandleImage } from "@/composables/useHandleImage";
import Avatar from "@/components/avatar.vue";
import EmptyState from "./empty-state.vue";

const userStore = namespace("user");

@Options({
  components: {
    Tabs,
    PractitionerSection,
    UserSecurity,
    Bio,
    EmptyState,
  },
})
export default class UserProfile extends Vue {
  @userStore.Getter
  authPractitioner!: IPractitioner;

  currentTab = 0;
  tabLinks = ["Practitioner Profile", "Bio", "User Security"];

  get empty() {
    return !Boolean(this.authPractitioner);
  }
}
</script>
<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.topest::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.topest {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
