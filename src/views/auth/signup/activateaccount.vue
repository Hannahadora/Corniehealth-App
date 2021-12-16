<template>
  <div class="w-full block mt-3">
    <form class="mt-3" @submit.prevent="submit">
      <label for="password">
        <span class="block uppercase mb-1 text-xs font-bold">Password</span>
        <password-input
          v-model="password"
          required
          id="password"
          class="border rounded"
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
        <span class="block uppercase mb-1 text-xs font-bold"
          >Confirm Password</span
        >
        <password-input
          id="confirm"
          required
          v-model="confirmation"
          class="border rounded"
          :class="{ 'border-red-500': confirmation != password }"
        />
        <span v-if="confirmation != password" class="text-xs text-red-500"
          >Passwords do not match</span
        >
      </label>

      <div class="block mt-2 mb-2">
        <h6 class="font-semibold text-sm mb-3">Password Requirements:</h6>
        <ul class="text-xs text-gray-500">
          <li class="mb-1 flex items-center">
            <tick-icon v-if="oneUpperCase" class="mr-1" /> least 1 Upper Case
          </li>
          <li class="mb-1 flex items-center">
            <tick-icon v-if="oneLowerCase" class="mr-1" /> At least 1 Lower Case
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
      <div class="w-full">
        <cornie-btn
          class="font-semibold rounded-full bg-danger mt-3 w-full text-white p-2"
          :disabled="!emailVerified"
          :loading="loading"
          type="submit"
          :class="{ 'bg-gray-600': !emailVerified || !valid }"
        >
          Create Account
        </cornie-btn>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import store from "@/store/";
import { cornieClient, quantumClient } from "@/plugins/http";
import PasswordInput from "@/components/PasswordInput.vue";
import EllipseIcon from "@/components/icons/ellipse.vue";
import TickIcon from "@/components/icons/tick.vue";
import { namespace } from "vuex-class";
import { fetchCornieData } from "@/plugins/auth";
import { ErrorResponse } from "@/lib/http";
const user = namespace("user");
type CreatedUser = { id: string; email: string };
@Options({
  components: {
    PasswordInput,
    EllipseIcon,
    TickIcon,
  },
})
export default class ActivateAccount extends Vue {
  @Prop({ required: false })
  userId!: string;

  @Prop({ required: false })
  code!: string;

  @Prop({ required: false, default: false })
  emailVerified!: boolean;

  @PropSync("user", { required: false })
  userSync!: CreatedUser;
  user = {} as CreatedUser;

  password = "";
  confirmation = "";

  loading = false;
  showText = false;
  userCreated = false;

  @user.State
  cornieData!: any;

  setUser(payload: any) {
    this.userSync = {
      id: payload.userId,
      email: payload.email,
    };
  }
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
    const password = this.password;
    for (let i = 0; i < this.password.length; i++) {
      const char = password.charAt(i);
      if (char.toUpperCase() == char && char.toLowerCase() != char)
        passed = true;
    }
    return passed;
  }

  get oneLowerCase() {
    let passed = false;
    const password = this.password;
    for (let i = 0; i < this.password.length; i++) {
      const char = password.charAt(i);
      if (char.toLowerCase() == char && char.toUpperCase() != char)
        passed = true;
    }
    return passed;
  }

  get oneNumber() {
    let passed = false;
    const password = this.password;
    for (let i = 0; i < this.password.length; i++) {
      const char = password.charAt(i);
      if (!isNaN(Number(char))) passed = true;
    }
    return passed;
  }

  get oneSymbol() {
    const password = this.password;
    const format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    return format.test(password);
  }

  get eightChars() {
    return this.password.length >= 8;
  }

  get payload() {
    return {
      userId: this.userId,
      emailVerificationCode: this.code,
      password: this.password,
    };
  }
  async saveCornieData() {
    const payload = this.cornieData;
    try {
      await cornieClient().post("/api/v1/account/set-type", payload);
    } catch (error) {}
  }

  async submit() {
    if (this.password != this.confirmation) return;
    if (!this.valid) return;
    const errMsg = "Account not activated";
    try {
      const data = await quantumClient().post(
        "/auth/account/activate/",
        this.payload
      );

      if (!data.success) {
        this.showText = true;
        return window.notify({ msg: errMsg });
      }
      store.commit("user/setLoginInfo", data);
      await this.saveCornieData();
      this.$router.replace("/dashboard");
    } catch (error) {
      if (error instanceof ErrorResponse) {
        const msg = error.response.data.message;
        window.notify({ msg });
      } else {
        window.notify({ msg: "Account not activated" });
      }
    }
  }
}
</script>
