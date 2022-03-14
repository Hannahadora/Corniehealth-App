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
      <div class="w-1/3 mb-4">
        <span v-if="tokenSent">
          <h2 class="cursor-default text-xs font-semibold mt-4">
            Enter token to confirm
          </h2>
          <cornie-input v-model="token" placeholder="enter token" />
          <cornie-btn
            :loading="loading"
            @click="submit"
            class="text-white mt-3 rounded-lg bg-danger w-full"
          >
            Activate
          </cornie-btn>
        </span>
        <span v-if="deactivate">
          <h2 class="cursor-default text-xs font-semibold mt-4">
            Enter password to deactivate
          </h2>
          <password-input
            placeholder="enter password"
            class="border border-gray-300"
            v-model="password"
          />
          <cornie-btn
            :loading="loading"
            @click="submit"
            class="text-white mt-3 rounded-lg bg-danger w-full"
          >
            Deactivate
          </cornie-btn>
        </span>
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

  @Watch("enabled")
  switched() {
    if (this.enabled) {
      this.getToken();
    } else {
      this.handleDeactivate();
    }
  }

  deactivate = false;

  handleDeactivate() {
    this.deactivate = true;
    this.tokenSent = false;
  }

  async deactivate2Fa() {
    if (this.password === "") return;
    try {
      const { success } = await quantumClient().post(
        "/org/security/2fa/status/off",
        {
          userId: this.user.id,
          password: this.password,
        }
      );

      if (success) {
        window.notify({
          msg: "Two factor authentication has been successfully deactivate",
          status: "success",
        });
        this.updateTwoFA(false);
        this.enabled = false;
      }
    } catch (err) {
      window.notify({
        msg: "An error occured!",
        status: "error",
      });

      this.enabled = true;
    }
  }

  async getToken() {
    try {
      const { success } = await quantumClient().post("/org/security/2fa/otp", {
        userId: this.user.id,
      });

      if (success) {
        this.tokenSent = success;
        this.deactivate = false;
        window.notify({
          msg: "An authorization token has been sent to your email",
          status: "success",
        });
      }
    } catch (error) {
      this.tokenSent = false;
      window.notify({
        msg: "An error occured while sending authorization token",
        status: "error",
      });
    }
  }

  async submit() {
    if (this.tokenSent) await this.save();

    if (this.deactivate) await this.deactivate2Fa();
  }

  async save() {
    if (this.token === "") return;
    this.loading = true;
    try {
      const { success } = await quantumClient().post(
        "/org/security/2fa/setup",
        {
          userId: this.user.id,
          token: this.token,
        }
      );
      if (success) {
        window.notify({
          msg: "Two factor authentication activated!",
          status: "success",
        });
        this.deactivate = false;
        this.tokenSent = false;
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
    this.tokenSent = true;
  }
}
</script>
