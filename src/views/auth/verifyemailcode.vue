<template>
  <form
    class="flex flex-col w-1/2 items-center justify-center"
    @submit.prevent="submit"
  >
    <h2 class="text-center my-3 font-bold text-lg">
      Please input the code sent to your email
    </h2>
    <input
      placeholder="Code"
      class="w-full rounded mb-2 border-primary border-2 p-2"
      name="code"
      type="text"
      v-model="codeSync"
      required
    />

    <button
      type="submit"
      class="mt-3 rounded w-full text-white font-bold bg-primary pa-3 h-10"
    >
      Submit
    </button>
  </form>
</template>
<script lang="ts">
import { quantumClient } from "@/plugins/http";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";

@Options({})
export default class VerifyEmailCode extends Vue {
  @Prop({ required: false, type: String })
  userId!: string;

  @Prop({ required: false, type: String })
  code!: string;

  @PropSync("code", { required: true })
  codeSync!: string;

  @Prop({ required: false, type: Boolean })
  verified!: boolean;

  @PropSync("verified", { required: true })
  verifiedSync!: boolean;

  get payload() {
    return {
      userId: this.userId,
      emailVerificationCode: this.codeSync,
    };
  }

  async submit() {
    const errMsg = "Email not verified";
    try {
      const data = await quantumClient().post(
        "/auth/code/verify/",
        this.payload
      );
      if (!data.success) return alert(errMsg);
      this.verifiedSync = true;
    } catch (error) {
      alert(errMsg);
    }
  }
}
</script>
