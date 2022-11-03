<template>
  <div>
    <div class="flex items-center">
      <span
        @click="$router.push('/signup')"
        class="px-6 py-4 text-white font-bold cursor-pointer text-lg"
      >
        Sign Up
      </span>
      <span
        class="px-6 py-4 text-white font-bold cursor-pointer bg-red-500 text-lg"
      >
        Sign In
      </span>
    </div>
    <div class="h-full flex justify-center bg-white px-9 py-10">
      <div class="w-full block">
        <form class="w-full" @submit.prevent="submit">
          <h2 class="font-bold text-3xl mb-12">Sign In to CornieHealth</h2>
          <div class="w-full gap-y-2 grid-cols-1 grid">
            <div class="flex items-start w-full mb-6">
              <div class="md:w-10/12 w-1/2">
                <div class="relative">
                  <img
                    class="absolute left-24 ml-1"
                    src="../../../assets/img/reg.png"
                  />
                  <cornie-input
                    v-model="domainName"
                    class="w-full"
                    placeholder="--Enter--"
                    label="Domain Name"
                  />
                </div>
              </div>
              <div
                class="ml-1 rounded px-4 py-3 text-xs text-white italic mt-6"
                style="background: #080056"
              >
                corniehealth.com/
              </div>
            </div>
            <cornie-input
              v-model="email"
              :rules="emailRule"
              class="w-full mb-2"
              label="Email Address"
            />
            <label for="password" class="flex flex-col">
              <span class="block mb-1 text-xs font-bold"> Password </span>
              <password-input
                id="password"
                :rules="requiredRule"
                v-model="password"
                class="border rounded"
              />
            </label>
          </div>
          <span class="flex item-center justify-between mb-12">
            <div class="flex item-center">
              <cornie-checkbox />
              <span class="ml-2 text-xs mt-3">Keep me logged in</span>
            </div>
            <span
              class="text-right text-gray-400 text-xs cursor-pointer"
              @click="$router.push('/reset/password')"
            >
              Forgot Password?</span
            >
          </span>
          <div class="flex items-center justify-center">
            <cornie-btn
              :loading="loading"
              class="font-semibold rounded-lg bg-danger mt-3 mb-5 text-white py-1 px-5 w-full"
              type="submit"
            >
              Sign In
            </cornie-btn>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import QuantumIcon from "@/components/icons/quantum.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import DomainInput from "@/components/domain-input.vue";
import store from "@/store";
import { login, setAuthDomain } from "@/plugins/auth";
import { string } from "yup";
import { namespace } from "vuex-class";
import User from "@/types/user";

const user = namespace("user");

@Options({
  components: {
    CornieInput,
    CornieSelect,
    PasswordInput,
    QuantumIcon,
    CornieCheckbox,
    DomainInput,
  },
})
export default class Signin extends Vue {
  email = "";
  password = "";
  loading = false;
  domainName = "";

  @user.State
  user!: User;

  @user.State
  requiresTwoFactorAuth!: false;

  @user.Mutation
  updateTwoFA!: (val: boolean) => void;

  get payload() {
    const payload: any = {
      email: this.email.toLowerCase(),
      authPassword: this.password,
    };
    if (this.domainName) payload.accountId = this.domainName;
    return payload;
  }

  get userId() {
    return store.state.user.user.id
  }

  requiredRule = string().required();
  emailRule = string().email();

  async submit() {
    this.loading = true;
    try {
      const res: any = await login(this.payload);
      if (
        !res.data.requiresTwoFactorAuth ||
        !res.data.requiresSecurityQuestion
      ) {
        if (this.$route.query.practitioner) {
          location.href = `http://corniehealth-bookingsite.s3-website.eu-west-3.amazonaws.com/patients/appointment/doctor/${this.$route.query.practitioner}/confirm-payment?token=${store.state.user.authToken}`;
        } if (this.$route.query.redirect) {
          location.href = `http://corniehealth-bookingsite.s3-website.eu-west-3.amazonaws.com/${this.$route.query.redirect}?token=${store.state.user.authToken}`;
        }else this.$router.push("/dashboard");
      } else {
        console.log('yessssssss')
        this.$emit("logged-in");
        console.log("2fa");
      }

      if (this.domainName) setAuthDomain(this.domainName);
    } catch (error: any) {
      if (!error.response) {
        window.notify({
          msg: "Error connecting to remote host",
          status: "error",
        });
      } else {
        window.notify({
          msg: "Username or password incorrect",
          status: "error",
        });
      }
    }
    this.loading = false;
  }

  async created() {
    this.userId;
  }
}
</script>
<style scoped>
input[type="checkbox"]:after {
  border: 1px solid #ccc;
  display: none;
}
input[type="checkbox"]:before {
  border: 1px solid #ccc;
  display: none;
}
</style>
