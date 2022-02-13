<template>
  <div
    class="flex justify-center bg-white shadow-md p-3 mt-2 mb-2 pb-96 overflow-auto h-96 rounded w-full">
    <div class="w-full">
      <span class="w-full h-screen">

          <tabs :items="tabLinks" v-model="currentTab">
              <practitioner-section :showSetup="showSetup"/>
              <user-security />
          </tabs>
      </span>
    </div>
  </div>
  
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Tabs from "@/components/tabs.vue";
import PractitionerSection from "./practionerprofile.vue"
import UserSecurity from "./usersecurity/index.vue"

@Options({
  components: {
    Tabs,
    PractitionerSection,
    UserSecurity
  },
})
export default class UserProfile extends Vue {

   currentTab = 0;
     tabLinks = [
    "Practitioner Profile",
    "User Security",
  ];
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
