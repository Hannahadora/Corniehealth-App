<template>
  <div class="h-5/6 2xl:h-3/6 w-2/3 block rounded-lg bg-white -mt-12">
    <div
      class="w-80 lg:w-full xl:w-full md:w-full h-full block p-4 relative right-32 lg:right-0 xl:right-0 md:right-0 border-2 border-gray-300 rounded-lg"
    >
      <div class="m-12">
        <img src="@/assets/img/mail.png" class="w-40 mx-auto mt-5" />
        <p class="text-gray-900 text-center text-md mt-8">
          A password reset link has been sent to your registered email. Kindly
          go to your email to complete this action.
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import MultiInput from "@/components/multi-input.vue";

type CreatedUser = { id: string; email: string };

@Options({
  components: {
    MultiInput,
  },
})
export default class SignUp extends Vue {
  user = {} as CreatedUser;
  code = "";

  userCreated = false;
  emailVerified = false;

  @Watch("user", { deep: true })
  userChanged(user: CreatedUser) {
    if (user.id) this.userCreated = true;
  }
}
</script>
