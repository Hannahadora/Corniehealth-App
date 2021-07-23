<template>
  <div
    class="
      w-80
      lg:w-full
      xl:w-full
      md:w-full
      h-full
      block
      p-4
      relative
      right-32
      lg:right-0
      xl:right-0
      md:right-0
      border-2 border-gray-300
      rounded-lg
    "
  >
    <h2 class="font-bold text-3xl mb-10">Join Corniehealth</h2>
    <v-form class="w-full" @submit="submit">
      <div class="w-full grid grid-cols-2 gap-y-4 gap-x-3 mb-3">
        <cornie-select
          required
          class="w-full"
          :items="['Patient', 'Provider', 'HMO']"
          label="Account Type"
          v-model="accountType"
        />
        <cornie-input
          :rules="requiredString"
          v-model="fullName"
          required
          class="w-full"
          label="Full Name"
        />
        <cornie-input
          v-model="email"
          :rules="emailRule"
          class="w-full"
          label="Email Address"
        />
        <phone-input
          v-model:code="dialCode"
          v-model="phone"
          :rules="phoneRule"
          class="w-full"
          label="Phone"
        />
        <conditional-input
          class="w-full"
          :items="['BVN']"
          label="Identity Reference"
        />
      </div>
      <label for="promos" class="flex items-center">
        <input id="promos" type="checkbox" />
        <span class="ml-1 text-xs">
          Receive relevant offers and promotions from Cornie Health
        </span>
      </label>
      <label for="terms" class="mt-1 flex items-center">
        <input required id="terms" type="checkbox" />
        <span class="ml-1 text-xs">
          By continuing to sign up, I agree to Cornie Healths Terms of Service
        </span>
      </label>
      <cornie-btn
        class="font-semibold rounded-full bg-danger mt-3 w-full text-white p-2"
        type="submit"
        :loading="loading"
      >
        Continue
      </cornie-btn>
      <span class="w-full text-center block">or Sign Up with</span>
      <cornie-btn
        class="font-semibold rounded-full bg-primary mt-2 w-full text-white p-2"
      >
        Quantum
      </cornie-btn>
      <span class="w-full flex text-sm mt-2 mb-2">
        Already have an account?
        <router-link class="ml-1 text-blue-500" to="/signin"
          >Sign In</router-link
        >
      </span>
    </v-form>
  </div>
</template>
<script lang="ts">
import { quantumClient } from "@/plugins/http";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";
import ConditionalInput from "@/components/conditional-input.vue";
import { string } from "yup";
import { namespace } from "vuex-class";
import { ErrorResponse } from "@/lib/http";

const phoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

type CreatedUser = { id: string; email: string };

const user = namespace("user");
@Options({
  components: {
    CornieInput,
    CornieSelect,
    PhoneInput,
    ConditionalInput,
  },
})
export default class CreateAccount extends Vue {
  @PropSync("user", { required: false })
  userSync!: CreatedUser;

  @Prop({ required: false })
  user!: CreatedUser;

  requiredString = string().required().trim();
  phoneRule = string().matches(phoneRegex, "A valid phone number is required");
  emailRule = string().email("A valid email is required").required();

  email = "";
  phone = "";
  dialCode = "+234";
  fullName = "";
  accountType = "Provider";
  loading = false;

  @user.Mutation
  setCornieData!: (data: any) => void;

  get payload() {
    const { firstName, lastName, middleName } = this.splitName();
    return {
      lname: lastName,
      fname: firstName,
      mname: middleName,
      dialCode: this.dialCode,
      phoneNo: this.phone,
      email: this.email,
    };
  }

  splitName() {
    const names = this.fullName.split(" ");
    if (names.length < 3)
      return { firstName: names[0], middleName: "", lastName: names[1] };
    else
      return { firstName: names[0], middleName: names[3], lastName: names[2] };
  }
  setUser(payload: any) {
    this.userSync = {
      id: payload.userId,
      email: payload.email,
    };
  }

  async submit() {
    const errMsg = "Account not created";
    this.loading = true;
    try {
      const data = await quantumClient().post("/auth/signup/", this.payload);
      if (data.success) {
        this.setUser(data);
        this.setCornieData({ accountType: this.accountType });
      } else {
        window.notify({ msg: errMsg });
      }
    } catch (error) {
      if (error instanceof ErrorResponse && error.response.status == 422) {
        const errors = await error.response.json();
        let msg = "";
        errors.errors.forEach((error: any) => (msg = `${msg} ${error.msg}`));
        window.notify({ msg, status: "error" });
      } else if (
        error instanceof ErrorResponse &&
        error.response.status == 400
      ) {
        const response = await error.response.json();
        window.notify({ msg: response.message, status: "error" });
      } else {
        window.notify({ msg: errMsg });
      }
    }
    this.loading = false;
  }
}
</script>
