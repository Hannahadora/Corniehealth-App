<template>
  <form class="flex flex-col w-1/2 justify-center" @submit.prevent="submit">
    <h2 class="text-center my-3 font-bold text-lg">Create Account Password</h2>
    <input
      placeholder="Password"
      class="w-full rounded mb-2 border-primary border-2 p-2"
      name="password"
      type="password"
      required
    />
    <input
      placeholder="Confirm Password"
      class="w-full rounded mb-2 border-primary border-2 p-2"
      type="password"
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
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import store from "@/store/";
import { quantumClient } from "@/plugins/http";

@Options({})
export default class ActivateAccount extends Vue {
  @Prop({ required: false })
  userId!: string;

  @Prop({ required: false })
  code!: string;

  password = "";
  confirmation = "";

  get payload() {
    return {
      userId: this.userId,
      emailVerificationCode: this.code,
      password: this.password,
    };
  }
  async submit() {
    if (this.password != this.confirmation) return;
    const errMsg = "Account not activated";
    try {
      const data = await quantumClient().post(
        "/auth/account/activate/",
        this.payload
      );
      if (!data.success) return alert(errMsg);
      store.commit("user/setLoginInfo", data);
      this.$router.replace("/dashboard");
    } catch (error) {
      alert(errMsg);
    }
  }
}
</script>
