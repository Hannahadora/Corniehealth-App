<template>
  <div class="w-full" style="max-width: 530px">
    <div class="container p-6 content-con">
      <p class="text-primary text-xl font-semibold pb-3">
        You need to be authenticated to view health records.
      </p>

      <div class="w-full py-6">
        <label for="password" class="flex flex-col">
          <span class="block uppercase mb-1 text-xs font-bold"> Password </span>
          <password-input
            id="password"
            v-model="password"
            class="border rounded"
            placeholder="Type in your password"
            autocomplete="off"
          />
        </label>
      </div>
      <div class="w-full flex justify-end">
        <CornieBtn
          class="border-primary border-2  rounded px-8 mr-2 py-1 text-primary cursor-pointer"
          @click="() => $router.go(-1)"
        >
          Cancel
        </CornieBtn>
        <CornieBtn
          :loading="loading"
          class="bg-danger  rounded px-8 py-1 text-white cursor-pointer"
          @click="authenticateUser"
        >
          Submit
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

  @userStore.Getter
  authPractitionerDomain!: string;

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
        accountId: this.domain || "",
      });
      this.password = "";
      this.loading = false;
      if (verified) {
        this.showAuthModal = false;
        this.updatePractitionerAuthStatus(true);
      }
    } catch (error) {
      this.loading = false;
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
