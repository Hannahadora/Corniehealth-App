<template>
  <form class="flex flex-col w-1/2 justify-center" @submit.prevent="submit">
    <h2 class="text-center my-3 font-bold text-lg">Create Account</h2>
    <input
      placeholder="first name"
      class="w-full rounded mb-2 border-primary border-2 p-2"
      name="firstName"
      type="text"
      required
      v-model="firstName"
    />
    <input
      placeholder="last name"
      class="w-full rounded mb-2 border-primary border-2 p-2"
      type="text"
      required
      v-model="lastName"
    />
    <input
      placeholder="phone"
      class="w-full rounded mb-2 border-primary border-2 p-2"
      type="tel"
      required
      v-model="phone"
    />
    <input
      required
      placeholder="email"
      class="w-full rounded border-primary border-2 p-2"
      type="email"
      v-model="email"
    />
    <button
      type="submit"
      class="mt-3 rounded text-white font-bold bg-primary pa-3 h-10"
    >
      Submit
    </button>
  </form>
</template>
<script lang="ts">
import { quantumClient } from "@/plugins/http";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";

type CreatedUser = { id: string; email: string };
@Options({})
export default class CreateAccount extends Vue {
  @PropSync("user", { required: false })
  syncedUser!: CreatedUser;

  @Prop({ required: false })
  user!: CreatedUser;

  firstName = "";
  lastName = "";
  email = "";
  phone = "";

  get payload() {
    return {
      lname: this.lastName,
      fname: this.firstName,
      dialCode: "+234",
      phoneNo: this.phone,
      email: this.email,
    };
  }
  setUser(payload: any) {
    this.syncedUser = {
      id: payload.userId,
      email: payload.email,
    };
  }

  async submit() {
    const errMsg = "Account not created";
    try {
      const data = await quantumClient().post("/auth/signup/", this.payload);
      if (!data.success) alert(errMsg);
      this.setUser(data);
    } catch (error) {
      alert(errMsg);
      console.log(error);
    }
  }
}
</script>
