<template>
  <div class="block rounded-lg bg-white px-6 py-12">
    <div class="lg:w-full xl:w-full md:w-full block">
      <div class="flex items-center justify-center pb-9">
        <img src="../../../assets/img/passwordreset.png" alt="" />
      </div>
      <form class="" @submit.prevent="submit">
        <h2 class="font-bold text-center text-primary text-3xl">
          Password Reset
        </h2>
        <p class="mt-2 mb-9 text-center text-base">
          Enter the email associated with your account and we will send an email
          with instructions to reset your password.
        </p>
        <cornie-input
          v-model="email"
          class="w-full"
          placeholder="Enter"
          :rules="requiredEmailRule"
          label="Email Address"
        />
        <div class="mt-9 flex items-center justify-between">
          <cornie-btn
            :loading="loading"
            class="font-semibold rounded py-1 px-3 bg-danger mt-3 w-full text-white p-2"
            type="submit"
          >
            Send
          </cornie-btn>
        </div>

        <div
          @click="$router.push('/signin')"
          class="text-lg text-red-500 text-center mt-9"
        >
          Go Back
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
import User, { CornieUser } from "@/types/user";
import { namespace } from "vuex-class";
import { string } from "yup";

const user = namespace("user");

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
  @user.State
  cornieData!: any;

  @user.State
  user!: User;

  @user.Getter
  cornieUser!: CornieUser;

  code = "";
  signature = "";

  email = "";
  loading = false;

  requiredEmailRule = string().email().required();

  get payload() {
    return {
      email: this.email.toLowerCase(),
    };
  }

  async submit() {
    this.loading = true;
    const errMsg = "Email not verified";
    try {
      const data = await quantumClient().post(
        "/auth/send-recovery-code/",
        this.payload
      );
      if (data.success) {
        this.signature = data.data.signature;
        this.next(this.signature, this.email);
        this.loading = false;
      } else {
        window.notify({ msg: errMsg });
      }
    } catch (error) {
      window.notify({ msg: errMsg });
    } finally {
      this.loading = false;
    }
  }

  next(signature: any, email: any) {
    this.$emit("nextStep", signature, email);
  }

  async created() {
    this.payload;
  }
}
</script>
