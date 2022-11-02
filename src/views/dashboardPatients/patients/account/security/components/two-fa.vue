<template>
  <div class="container-fluid mb-9">
    <div class="container-fluid w-full flex items-center justify-between">
      <div class="border-b-2 w-11/12"></div>
      <div
        class="bg-primary border text-white w-1/11 p-1 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer"
        style="height: 24px; width: 24px"
        @click="closeSection"
      >
        ×
      </div>
    </div>

    <div class="container-fluid">
      <div class="w-full flex py-4 border-dashed-b-2 mb-4">
        <ToggleCheck
        v-model="enabled"
          :uncheckedText="`Disabled`"
          :checkedText="'Enabled'"
          style="margin-left: 1rem"
        />
      </div>

      <div class="w-full flex border-dashed-b-2 pb-4"  v-if="changed">
        <div class="w-8/12 my-3" v-if="tokenSent">
          <div class="w-full">
            <div class="w-11/12">
              <p class="m-0">
                Enter the one time password sent to you email:
                <span class="text-blue-500">{{user.email}}</span>
              </p>
              <CornieInput label="" placeholder="Enter OTP" v-model="token" /> <br />
              <!-- <a
                class="cursor-pointer text-red-500 uppercase font-semibold py-2"
                >Send Code</a
              > -->
            </div>
          </div>
        </div>
        <div class="w-4/12 my-3 mt-5" v-else>
          <CornieInput label="Confirm Password" placeholder="" v-model="password" />
        </div>
      </div>

      <div class="w-full mt-6 mb-8 flex justify-end">
        <Button :loading="false" class="focus:outline-none"  @click="submit">
          <span
            style="background: #fe4d3c"
            class="text-white-500 curved border cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-lg"
          >
          {{ tokenSent ? "Save" : "Get Token" }}
          </span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ToggleCheck from "@/components/ToogleCheck.vue";
import CornieInput from "@/components/cornieinput.vue";
import { namespace } from "vuex-class";
import User from "@/types/user";
import { quantumClient } from "@/plugins/http";
import { Watch } from "vue-property-decorator";

const user = namespace("user");

@Options({
  components: {
    ToggleCheck,
    CornieInput,
  },
})

export default class TwoFA extends Vue {
  enabled = false;
  loading = false;
  password = "";
  token = "";

  tokenSent = false;
  changed = false;
  
  @user.State
  user!: User;

  @user.State
  requiresTwoFactorAuth!: false;

  @user.Mutation
  updateTwoFA!: (val: boolean) => void;

  @Watch("requiresTwoFactorAuth")
  globalStatusChanged(val: boolean) {
    this.enabled = val;
  }

  @Watch("enabled")
  switched(val: boolean) {
    if (val == this.requiresTwoFactorAuth) this.changed = false;
    else this.changed = true;
  }

  closeSection() {
    this.$emit("closesection", "2fa");
  }
  
  get twoFAPayload() {
    return {
      userId: this.user.id,
      token: this.token,
      twoFAEnabled: this.enabled,
    };
  }

  get passwordData() {
    return {
      userId: this.user.id,
      password: this.password,
    };
  }

  async submit() {
    if (this.tokenSent) await this.save();
    else await this.getToken();
  }

  async getToken() {
    if (!this.password) return false;
    this.loading = true;
    let status = false;
    try {
      const { success } = await quantumClient().post(
        "/org/security/passwords/confirm-root-admin",
        this.passwordData
      );
      status = success;
    } catch (error) {
      status = false;
    }
    if (status)
      window.notify({
        msg: "An authorization token has been sent to your email",
        status: "success",
      });
    else window.notify({ msg: "Invalid password", status: "error" });
    this.loading = false;
    this.tokenSent = status;
  }

  async save() {
    this.loading = true;
    try {
      const { success } = await quantumClient().post(
        "/org/security/2fa/settings",
        this.twoFAPayload
      );
      if (success) {
        window.notify({ msg: "Setting updated", status: "success" });
        this.updateTwoFA(this.enabled);
      } else window.notify({ msg: "Setting not updated", status: "error" });
    } catch (error) {
      window.notify({ msg: "Setting not updated", status: "error" });
    }
    this.reset();
    this.loading = false;
    this.$emit("closesection", "2fa");
  }

  reset() {
    this.changed = false;
    this.tokenSent = true;
  }
}
</script>

<style scoped>
.border-dashed-b-2 {
  border-bottom: 1px dashed #c5c4d4;
}
</style>
