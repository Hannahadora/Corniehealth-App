<template>
  <div class="w-full flex flex-col mt-6">
    <span class="w-full block pb-2 border-b-2 border-dashed border-gray-200">
      <toogle-check
        v-model="enabled"
        checkedText="Enabled"
        uncheckedText="Disabled"
      />
    </span>
    <span class="w-full mt-6">
      <div class="w-1/3 mb-4" v-if="changed">
        <span v-if="tokenSent">
          <h2 class="cursor-default text-xs font-semibold mt-4">
            Enter token to confirm
          </h2>
          <cornie-input v-model="token" placeholder="enter token" />
        </span>
        <span v-else>
          <h2 class="cursor-default text-xs font-semibold mt-4">
            Enter password to get token
          </h2>
          <password-input
            placeholder="enter password"
            class="border border-gray-300"
            v-model="password"
          />
        </span>

        <cornie-btn
          :loading="loading"
          @click="submit"
          class="text-white mt-3 rounded-lg bg-danger w-full"
        >
          {{ tokenSent ? "Save" : "Get Token" }}
        </cornie-btn>
      </div>
    </span>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ToogleCheck from "@/components/ToogleCheck.vue";
import CustomCheck from "@/components/custom-checkbox.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import CornieModal from "@/components/modal.vue";
import { namespace } from "vuex-class";
import User from "@/types/user";
import { quantumClient } from "@/plugins/http";
import { Watch } from "vue-property-decorator";
import CornieInput from "@/components/cornieinput.vue";

const user = namespace("user");

@Options({
  name: "TwoFactorSettings",
  components: {
    ToogleCheck,
    CornieInput,
    CornieModal,
    CustomCheck,
    PasswordInput,
  },
})
export default class TwoFactor extends Vue {
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

  get passwordData() {
    return {
      email: this.user.email,
      password: this.password,
    };
  }

  async getToken() {
    if (!this.password) return false;
    this.loading = true;
    let status = false;
    console.log(this.passwordData);
    try {
      const { success } = await quantumClient().post(
        "/auth/login",
        this.passwordData
      );

      console.log(success);
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

  get twoFAPayload() {
    return {
      userId: this.user.id,
      token: this.token,
    };
  }

  async submit() {
    if (this.tokenSent) await this.save();
    else await this.getToken();
  }

  async save() {
    this.loading = true;
    try {
      const { success } = await quantumClient().post(
        "/org/security/2fa/setup",
        this.twoFAPayload
      );
      if (success) {
        window.notify({
          msg: "Two factor authentication activated!",
          status: "success",
        });
        this.updateTwoFA(this.enabled);
      } else
        window.notify({
          msg: "Two factor authentication not activated",
          status: "error",
        });
    } catch (error) {
      window.notify({
        msg: "Two factor authentication not activated",
        status: "error",
      });
    }
    this.reset();
    this.loading = false;
  }

  reset() {
    this.changed = false;
    this.tokenSent = true;
  }
}
</script>
