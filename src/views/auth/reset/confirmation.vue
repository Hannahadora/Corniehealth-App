<template>
  <div class="block rounded bg-white px-6 py-12">
    <div class="lg:w-full xl:w-full md:w-full h-full block rounded">
      <div class="flex items-center justify-center pb-9">
        <img src="../../../assets/img/confirmreset.png" alt="" />
      </div>
      <div class="">
        <h2 class="font-bold text-center text-primary text-3xl">
          Confirm reset code
        </h2>
        <p class="text-gray-900 text-center text-md mt-9">
          A password reset verification code has been sent to your registered
          email. Kindly enter the verification code sent to your email to
          continue.
        </p>
      </div>
      <div class="mt-9 flex items-center justify-center">
        <cornie-btn
          @click="show = true"
          :loading="loading"
          class="font-semibold rounded py-1 px-3 bg-danger mt-3 w-full text-white p-2"
          type="submit"
        >
          Proceed
        </cornie-btn>
      </div>
    </div>
  </div>

  <cornie-dialog v-model="show" center class="input-code-card h-full">
    <div class="block rounded bg-white px-6 py-12 mt-80">
      <div class="text-center font-bold text-2xl text-primary mb-9">
        Enter your verification Code
      </div>
      <div class="text-base text-primary mb-9">
        Enter verification code sent to {{ email }}
      </div>
      <multi-input
        :length="6"
        v-model="codeSync"
        :customClass="customClass"
        class="w-full"
      />
      <div class="text-base">
        Didn't receive code?
        <span class="text-red-500 cursor-pointer">Resend </span>
        <vue-countdown :time="500 * 1000" v-slot="{ minutes, seconds }">
          {{ minutes }} : {{ seconds }}
        </vue-countdown>
      </div>
      <div class="mt-9 flex items-center justify-center">
        <cornie-btn
          @click="verify"
          :loading="loading"
          class="font-semibold rounded py-1 px-3 bg-danger mt-3 w-full text-white p-2"
          type="submit"
        >
          Verify
        </cornie-btn>
      </div>
    </div>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import MultiInput from "@/components/multi-input.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
import { quantumClient } from "@/plugins/http";

type CreatedUser = { id: string; email: string };

@Options({
  components: {
    MultiInput,
    CornieDialog,
    VueCountdown,
  },
})
export default class SignUp extends Vue {
  loading = false;
  show = false;

  codeLength = 6;
  countDown = 10;

  codeSync = "";

  @Prop({ reuired: true, type: String })
  signature!: string;

  @Prop({ required: true, type: String })
  email!: string;

  @Prop({ required: true, type: String })
  code!: string;

  status: "loading" | "success" | "error" | "default" = "default";

  get customClass() {
    if (this.status == "loading") return "border-blue-400";
    if (this.status == "error") return "border-red-400";
    if (this.status == "success") return "border-green-400";
    return "";
  }

  get payload() {
    return {
      code: this.codeSync,
      signature: this.signature,
    };
  }
  async verify() {
    this.loading = true;
    try {
      await quantumClient().post("/auth/validate-reset-code", this.payload);
      this.verified();
    } catch (error) {
      window.notify({ msg: "Invalid code", status: "error" });
    }
    this.loading = false;
  }

  verified() {
    this.show = false;
    this.$emit("nextStep", this.codeSync);
  }
}
</script>

<style scoped>
.input-code-card {
  width: 380px;
  height: 438px;
}

@media screen and (max-width: 1024px) {
  .input-code-card {
    width: 95%;
  }
}
</style>
