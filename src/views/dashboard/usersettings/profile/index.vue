<template>
  <div
    class="flex justify-center bg-white shadow-md p-3 mt-2 mb-2 pb-96 overflow-auto h-96 rounded w-full">
  <!-- <div
    class="w-full bg-white p-4 overflow-y-scroll topest"
    style="height: 100vh; overflow-y: scroll"
  >
    <div class="container-fluid flex" v-if="true">
      <div class="" style="width: 25%">
        <div class="container">
          <UserNav />
        </div>
      </div>
      <div class="border-l-2 px-2" style="width: 75%">
        <router-view></router-view>
    
      </div>
    </div>
  </div> -->
    <div class="w-full">
      <span class="w-full h-screen">

          <tabs :items="tabLinks" v-model="currentTab">
              <practitioner-section />
              <user-security />
          </tabs>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserNav from "./components/user-nav.vue";
import Tabs from "@/components/tabs.vue";
import PractitionerSection from "./components/practionerprofile.vue"
import UserSecurity from "./components/usersecurity/index.vue"

@Options({
  components: {
    UserNav,
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
