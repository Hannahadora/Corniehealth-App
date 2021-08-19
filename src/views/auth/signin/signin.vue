<template>
 
  <div class="h-4/6 2xl:h-3/6 w-2/3 block rounded-lg bg-white" v-if="!login">
    <div class="w-full h-44 block p-12">
      <div>
              <h2 class="font-bold text-2xl mb-5">Welcome Back</h2>
              <p class="text-black mb-10">Login to your corniehealth account</p>
              <cornie-btn @click="login = true" class="font-semibold rounded-full bg-danger mt-3 w-full text-white p-2" type="button">
              Continue with  Email
              </cornie-btn>
              <span class="w-full text-center block my-1">or</span>
              <cornie-btn class="font-semibold rounded-full mb-5 border-primary border-2 hover:bg-primary hover:text-white mt-2 w-full text-primary p-2">
                <span class="inline-flex justify-center mt-1"><quantum-icon class="mr-2 pt-1"/></span>Quantum
              </cornie-btn>
              <span class="w-full flex text-sm mt-2">
                Don't have an account?
                <router-link class="ml-1 text-danger" to="/signup">
                  Sign Up
                </router-link>
              </span>
        </div>
    </div>
  </div>
  <div v-else class="h-full 2xl:h-3/6 w-2/3 block rounded-lg bg-white -mt-12">
    <div class="w-full h-44 block p-12">
      <form class="w-full" @submit.prevent="submit">
          <h2 class="font-bold text-2xl mb-5">Login to CornieHealth</h2>
          <div class="w-full gap-y-2 grid-cols-1 grid">
            <cornie-select
              class="w-full"
              v-model="domainName"
              :items="['Patient', 'Provider', 'Payer']"
              label="Domain Name"
            />
            <span class="text-right text-gray-400 mb-2 text-xs">Forgot Domain?</span>
            <cornie-input
              v-model="email"
              :rules="emailRule"
              class="w-full mb-2"
              label="Mobile Number or Email Address"
            />
            <label for="password" class="mt-6 flex flex-col">
              <span class="block uppercase mb-1 text-xs font-bold">
                Password
              </span>
              <password-input
                id="password"
                :rules="requiredRule"
                v-model="password"
                class="border rounded"
              />
              <router-link
                to="/reset/password"
                class="text-xs text-right mt-1 text-gray-400"
              >
                Forgot Password?
              </router-link>
            </label>
          </div>
          <span class="flex item-center mb-3">
            <label class="inline-flex items-center mt-3">
                <input type="checkbox">
            </label>
            <span class="mt-3 ml-3 text-xs">Keep me logged in</span>
          </span>
          <cornie-btn
            :loading="loading"
            class="font-semibold rounded-full bg-danger mt-3 mb-5 w-full text-white p-2"
            type="submit"
            >
            Login
          </cornie-btn>
         <!-- <span class="w-full text-center block my-1">or Sign Up with</span>
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
          </span>-->
      </form>
    </div>
  </div>

</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import QuantumIcon from "@/components/icons/quantum.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import { quantumClient } from "@/plugins/http";
import store from "@/store";
import { fetchCornieData } from "@/plugins/auth";
import { string } from "yup";
@Options({
  components: {
    CornieInput,
    CornieSelect,
    PasswordInput,
    QuantumIcon
  },
})
export default class Signin extends Vue {
  email = "";
  password = "";
  domainName = "";
  loading = false;
  login = false;
  get payload() {
    return {
      email: this.email,
      authPassword: this.password,
    };
  }

  async showLogin(){
    this.login = true;
  }

  requiredRule = string().required();
  emailRule = string().email();
  async submit() {
    this.loading = true;
    try {
      const data = await quantumClient().post("/auth/login", this.payload);
      store.commit("user/setLoginInfo", data.data);
      const cornieData = await fetchCornieData();
      store.commit("user/setCornieData", cornieData);
      this.$emit("logged-in");
    } catch (error) {
      window.notify({ msg: "Username or password incorrect", status: "error" });
    }
    this.loading = false;
  }
}
</script>
<style scoped>
input[type="checkbox"]:after {
        border: 1px solid #ccc;
        display:none;
}
input[type="checkbox"]:before {
        border: 1px solid #ccc;
        display:none;
}
</style>
