<template>
  <div class="w-full h-full block p-8">
    <h2 class="font-bold text-3xl mb-10">Welcome Back</h2>
    <form class="w-full" @submit.prevent="submit">
      <div class="w-full gap-y-2 grid-cols-1 grid mb-3">
        <cornie-select
          class="w-full mb-2"
          :items="['Patient', 'Provider', 'Payer']"
          label="Domain"
        />
        <cornie-input
          v-model="email"
          required
          class="w-full"
          label="Mobile Number or Email"
        />
        <label for="password" class="mt-6 flex flex-col">
          <span class="block uppercase mb-1 text-xs font-semibold">
            Password
          </span>
          <password-input
            id="password"
            required
            v-model="password"
            class="border rounded"
          />
          <router-link
            to="/reset/password"
            class="text-xs text-right mt-1 text-blue-500"
          >
            Forgot Password?
          </router-link>
        </label>
      </div>
      <cornie-btn
        :loading="loading"
        class="font-semibold rounded-full bg-danger mt-3 w-full text-white p-2"
        type="submit"
      >
        Continue
      </cornie-btn>
      <span class="w-full text-center block my-1">or Sign Up with</span>
      <cornie-btn
        class="font-semibold rounded-full bg-primary mt-2 w-full text-white p-2"
      >
        Quantum
      </cornie-btn>
      <span class="w-full flex text-sm mt-2">
        Don't have an account?
        <router-link class="ml-1 text-blue-500" to="/signup">
          Sign Up
        </router-link>
      </span>
    </form>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import { quantumClient } from "@/plugins/http";
import store from "@/store";

@Options({
  components: {
    CornieInput,
    CornieSelect,
    PasswordInput,
  },
})
export default class Signin extends Vue {
  email = "";
  password = "";
  loading = false;
  get payload() {
    return {
      email: this.email,
      authPassword: this.password,
    };
  }

  async submit() {
    this.loading = true;
    try {
      const data = await quantumClient().post("/auth/login", this.payload);
      store.commit("user/setLoginInfo", data);
      this.$emit("logged-in");
    } catch (error) {
      console.log("login failed ", error);
    }
    this.loading = false;
  }
}
</script>
