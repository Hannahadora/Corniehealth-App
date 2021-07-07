<template>
   <div class="w-80 lg:w-full xl:w-full md:w-full h-full block p-4 relative right-32 lg:right-0 xl:right-0 md:right-0 border-2 border-gray-300 rounded-lg">
        <form class="m-8" @submit.prevent="submit">
            <h2 class="font-bold text-gray-900 mb-16 text-3xl">
            Reset Password
            </h2>
            <div class="mb-8 mt-5">
                <cornie-select
                class="w-full"
                value=" "
                :items="['Patient', 'Provider', 'Payer']"
                label="DOMAIN"
                />
                <p class="text-blue-900 text-sm mt-2">
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
            </div>
            <div class="flex items-center justify-between">
            <cornie-btn class="font-semibold rounded-full  bg-danger mt-3 w-full text-white p-2" type="submit">
                Submit
            </cornie-btn>
            </div>
        </form>
    </div>
</template>
<script lang="ts">
import { quantumClient } from "@/plugins/http";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import { Watch } from "vue-property-decorator";
import MultiInput from "@/components/multi-input.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";

type CreatedUser = { id: string; email: string };

@Options({
  components: {
    MultiInput,
    CornieInput,
    CornieSelect
  },
})
export default class SignUp extends Vue {
@PropSync("user", { required: false })
  userSync!: CreatedUser;

  @Prop({ required: false })
  user!: CreatedUser;
  code = "";

  previousPassword = "";
  newPassword = "";
  email = "";

  get payload() {
    return {
      previousPassword: this.previousPassword,
      newPassword: this.newPassword,
      email: this.email,
    };
  }

 setUser(payload: any) {
    this.userSync = {
      id: payload.userId,
      email: payload.email
    };
  }


  userCreated = false;
  emailVerified = false;

  @Watch("user", { deep: true })
  userChanged(user: CreatedUser) {
    if (user.id) this.userCreated = true;
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
