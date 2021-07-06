<template>
  <div class="w-full pb-5 border-b">
    <form class="w-3/4">
      <h2 class="text-sm">Enter verification code sent to {{ user.email }}</h2>
      <span class="mt-4 w-full flex">
        <multi-input
          :length="6"
          v-model="codeSync"
          :customClass="customClass"
        />
        <check-icon class="my-auto ml-3" v-if="verifiedSync" />
      </span>
    </form>
  </div>
</template>
<script lang="ts">
import { quantumClient } from "@/plugins/http";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import MultiInput from "@/components/multi-input.vue";
import CheckIcon from "@/components/icons/check.vue";

@Options({
  components: {
    MultiInput,
    CheckIcon,
  },
})
export default class VerifyEmailCode extends Vue {
  @Prop({ required: false, type: Object })
  user!: { id: string; email: string };

  @Prop({ required: false, type: String })
  code!: string;

  @PropSync("code", { required: true })
  codeSync!: string;

  @Prop({ required: false, type: Boolean })
  verified!: boolean;

  @PropSync("verified", { required: true })
  verifiedSync!: boolean;
  codeLength = 6;

  status: "loading" | "success" | "error" | "default" = "default";

  @Watch("code")
  codeChanged(code: string) {
    if (code.length < this.codeLength) return;
    setTimeout(() => this.submit(), 20);
  }
  get customClass() {
    if (this.status == "loading") return "border-blue-400";
    if (this.status == "error") return "border-red-400";
    if (this.status == "success") return "border-green-400";
    return "";
  }
  get payload() {
    return {
      userId: this.user.id,
      emailVerificationCode: this.codeSync,
    };
  }

  async submit() {
    this.status = "loading";
    const errMsg = "Email not verified";
    try {
      const data = await quantumClient().post(
        "/auth/code/verify/",
        this.payload
      );
      if (data.success) {
        this.verifiedSync = true;
        this.status = "success";
      } else {
        this.status = "error";
        alert(errMsg);
        setTimeout(() => (this.status = "default"), 5000);
      }
    } catch (error) {
      this.status = "error";
      alert(errMsg);
      setTimeout(() => (this.status = "default"), 5000);
    }
  }
}
</script>
