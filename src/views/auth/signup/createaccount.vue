<template>
  <div class="w-80 lg:w-full xl:w-full md:w-full h-full block p-4 relative right-32 lg:right-0 xl:right-0 md:right-0 border-2 border-gray-300 rounded-lg">
    <h2 class="font-bold text-3xl mb-10">Join Corniehealth</h2>
    <form class="w-full" @submit.prevent="submit">
      <div class="w-full grid grid-cols-2 gap-y-4 gap-x-3 mb-3">
        <cornie-select
          class="w-full"
          :items="['Patient', 'Provider', 'Payer']"
          label="Account Type"
        />
        <cornie-input
          v-model="fullName"
          required
          class="w-full"
          label="Full Name"
        />
        <cornie-input
          v-model="email"
          required
          class="w-full"
          label="Email Address"
        />
        <phone-input
          v-model:code="dialCode"
          v-model="phone"
          required
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
      >
        Continue
      </cornie-btn>
      <span class="w-full text-center block">or Sign Up with</span>
      <cornie-btn
        class="font-semibold rounded-full bg-primary mt-2 w-full text-white p-2"
      >
        Quantum
      </cornie-btn>
    </form>
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

type CreatedUser = { id: string; email: string };

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

  email = "";
  phone = "";
  dialCode = "";
  fullName = "";

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
    try {
      const data = await quantumClient().post("/auth/signup/", this.payload);
      if (!data.success) {
        alert(errMsg);
      }
      this.setUser(data);
    } catch (error) {
      alert(errMsg);
    }
  }
}
</script>
