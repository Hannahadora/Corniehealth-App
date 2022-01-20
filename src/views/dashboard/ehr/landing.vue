<template>
  <!-- <div class="w-full"> -->
  <!-- <h1>Hello</h1> -->
  <router-view></router-view>
  <!-- </div> -->
  <div class="w-full">
    <modal :visible="!practitionerAuthenticated">
      <auth-modal />
    </modal>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Modal from "@/components/modal.vue";
import AuthModal from "./auth-modal.vue";
import { namespace } from "vuex-class";

const userStore = namespace("user");

@Options({
  components: {
    AuthModal,
    Modal,
  },
})
export default class EHRHome extends Vue {
  @userStore.Action
  updatePractitionerAuthStatus!: () => Promise<void>;

  @userStore.State
  practitionerAuthenticated!: boolean;
}
</script>
