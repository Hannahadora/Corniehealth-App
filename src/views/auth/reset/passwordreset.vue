<template>
  <div class=" w-2/3 block rounded-lg bg-white -mt-4">
    <div
      class="w-80 lg:w-full xl:w-full md:w-full block"
    >
      <form class="m-8" @submit.prevent="submit">
        <h2 class="font-bold text-primary mb-5 text-xl">Reset Password</h2>
        <label for="password" class=" flex flex-col">
          <span class="block capitalize mb-1 w-full text-sm font-bold"
            >Previous Password</span
          >
          <password-input
            v-model="previousPassword"
            required
            id="password"
            class="border rounded py-2 w-full"
          />
          <span class="flex w-2/3 justify-between items-center">
            <span class="text-xs text-gray-500">Password Strength</span>
            <span class="flex">
              <ellipse-icon
                v-for="i in 5"
                :key="i"
                :class="{ 'fill-current text-green-400': i <= passedReqs }"
                class="mx-1"
              />
            </span>
          </span>
        </label>
        <label for="confirm" class="mt-6 flex flex-col">
          <span class="block capitalize mb-1 text-sm font-bold"
            >New Password</span
          >
          <password-input
            id="confirm"
            required
            v-model="newPassword"
            class="border rounded py-2"
            :class="{ 'border-red-500': confirmation != password }"
          />
          <span v-if="confirmation != password" class="text-xs text-red-500"
            >Passwords do not match</span
          >
        </label>
        <!--<div class="mb-8 mt-5">
                <cornie-select
                class="w-full"
                placeholder="--select--"
                v-model="domain"
                :items="['Patient', 'Provider', 'Payer']"
                label="DOMAIN"
                />
                <p class="text-gray-900 text-sm mt-2">
                    <a href="#">Forgot Domain?</a>
                </p>
            </div>
            <div class="mb-8">
                <cornie-input
                v-model="email"
                required
                placeholder="Enter email"
                class="w-full"
                label="Email"
                />
            </div>-->
        <div class="block mt-2 mb-2">
          <h4 class="font-bold">Password Requirements:</h4>
          <ul class="text-xs text-gray-500">
            <li class="mb-1 flex items-center">
              <tick-icon v-if="oneUpperCase" class="mr-1" /> least 1 Upper Case
            </li>
            <li class="mb-1 flex items-center">
              <tick-icon v-if="oneLowerCase" class="mr-1" /> At least 1 Lower
              Case
            </li>
            <li class="mb-1 flex items-center">
              <tick-icon v-if="oneNumber" class="mr-1" /> At least 1 Number
            </li>
            <li class="mb-1 flex items-center">
              <tick-icon v-if="oneSymbol" class="mr-1" /> At least 1 Special
              Character/Symbol
            </li>
            <li class="mb-1 flex items-center">
              <tick-icon v-if="eightChars" class="mr-1" />At least 8 Characters
            </li>
          </ul>
        </div>
        <div class="flex items-center justify-between">
          <cornie-btn
            :loading="loading"
            class="font-semibold rounded py-1 px-3 bg-danger mt-3 w-full text-white p-2"
            type="submit"
          >
            Submit
          </cornie-btn>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { quantumClient } from "@/plugins/http";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import { Watch } from "vue-property-decorator";
import PasswordInput from "@/components/PasswordInput.vue";
import EllipseIcon from "@/components/icons/ellipse.vue";
import TickIcon from "@/components/icons/tick.vue";
import MultiInput from "@/components/multi-input.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import store from "@/store";
import { namespace } from "vuex-class";

@Options({
  components: {
    MultiInput,
    CornieInput,
    CornieSelect,
    PasswordInput,
    EllipseIcon,
    TickIcon,
  },
})
export default class SignUp extends Vue {
  code = "";

  domain = "";
  previousPassword = "";
  newPassword = "";
  email = "";

  get payload() {
    return {
      userId:"",
      previousPassword: this.previousPassword,
      newPassword: this.newPassword,
    };
  }

  userCreated = false;
  emailVerified = false;
  loading = false;

  get valid() {
    return this.passedReqs >= 5;
  }

  get passedReqs() {
    return (
      Number(this.oneUpperCase) +
      Number(this.oneLowerCase) +
      Number(this.oneNumber) +
      Number(this.oneSymbol) +
      Number(this.eightChars)
    );
  }

  get oneUpperCase() {
    let passed = false;
    const password = this.newPassword;
    for (let i = 0; i < this.newPassword.length; i++) {
      const char = password.charAt(i);
      if (char.toUpperCase() == char && char.toLowerCase() != char)
        passed = true;
    }
    return passed;
  }

  get oneLowerCase() {
    let passed = false;
    const password = this.newPassword;
    for (let i = 0; i < this.newPassword.length; i++) {
      const char = password.charAt(i);
      if (char.toLowerCase() == char && char.toUpperCase() != char)
        passed = true;
    }
    return passed;
  }

  get oneNumber() {
    let passed = false;
    const password = this.newPassword;
    for (let i = 0; i < this.newPassword.length; i++) {
      const char = password.charAt(i);
      if (!isNaN(Number(char))) passed = true;
    }
    return passed;
  }

  get oneSymbol() {
    const password = this.newPassword;
    const format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    return format.test(password);
  }

  get eightChars() {
    return this.newPassword.length >= 8;
  }

  async submit() {
    this.loading = true;
    const errMsg = "Account not created";
    try {
      const data = await quantumClient().post(
        "/auth/change-password/",
        this.payload
      );
      this.loading = false;
      if (data.success) {
        window.notify({ msg: "Password updated", status: "success" });
      } else {
        window.notify({ msg: errMsg, status: "error" });
      }
      //   this.setUser(data);
    } catch (error) {
      window.notify({ msg: "Password Not updated" });
      this.loading = false;
    }
  }

  async created() {
    this.payload;
  }
}
</script>
