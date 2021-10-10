<template>
    <div class="w-full" style="max-width: 530px">
        <div class="container p-6 content-con">
        <p class="text-primary text-xl font-semibold pb-3">You need to be authenticated to view health records.</p>

      <div class="w-full py-6">
        <label for="password" class="flex flex-col">
          <span class="block uppercase mb-1 text-xs font-bold"> Password </span>
          <password-input
            id="password"
            v-model="password"
            class="border rounded"
            placeholder="Type in your password"
            />               
        </label>
      </div>
      <div class="w-full flex justify-end">
        <corniebtn
          class="bg-white p-2 cancel-btn rounded-full px-8 mx-4 cursor-pointer"
          style="border: 1px solid #0a4269"
        >
          <span class="font-semibold" @click="() => $router.go(-1)"
            >Cancel</span
          >
        </corniebtn>

        <CornieBtn
          :loading="loading"
          class="bg-red-500 p-2 rounded-full px-8 mx-4 cursor-pointer"
        >
          <span class="text-white font-semibold" @click="authenticateUser"
            >Submit</span
          >
        </CornieBtn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieBtn from "@/components/CornieBtn.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import ehrHelper from "./landing/helper/ehr-service";
import User from "@/types/user";
import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";

const AUTH_TIME_OUT = process.env.NODE_ENV == "production" ? 180000 : 10000000;

const userStore = namespace("user");

@Options({
  components: {
    CornieBtn,
    PasswordInput,
  },
})
export default class AuthModal extends Vue {
  @userStore.State
  user!: User;

  @userStore.Getter
  authPractitioner!: IPractitioner;

  @userStore.State
  domain!: string;

  @userStore.Action
  updatePractitionerAuthStatus!: (authenticated: boolean) => Promise<void>;

  loading = false;
  password = "";
  time: any;

  showAuthModal = false;

  async authenticateUser() {
    try {
      this.loading = true;
      const verified = await ehrHelper.authenticateUser({
        email: this.authPractitioner?.email,
        authPassword: this.password,
        accountId: this.domain ? this.domain : "",
      });
      this.password = "";
      this.loading = false;
      if (verified) {
        this.showAuthModal = false;
        this.updatePractitionerAuthStatus(true);
      }
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  }

  logout() {
    this.updatePractitionerAuthStatus(false);
  }

  resetTimer() {
    clearTimeout(this.time);
    this.time = setTimeout(this.logout, AUTH_TIME_OUT);
  }

  created() {
    window.onload = this.resetTimer;
    document.onmousemove = this.resetTimer;
    document.onkeydown = this.resetTimer;
  }
}
</script>
