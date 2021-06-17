<template>
  <div class="w-full h-full flex items-center bg-gray-200 justify-center">
    <div
      class="
        rounded-lg
        w-1/2
        h-3/4
        flex
        items-center
        justify-center
        bg-white
        shadow-lg
      "
    >
      <create-account v-model:user="user" v-if="!userCreated" />
      <verify-email-code
        v-model:code="code"
        :userId="user.id"
        v-if="userCreated && !emailVerified"
        v-model:verified="emailVerified"
      />
      <activate-account :userId="user.id" :code="code" v-if="emailVerified" />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CreateAccount from "./createaccount.vue";
import VerifyEmailCode from "./verifyemailcode.vue";
import ActivateAccount from "./activateaccount.vue";
import { Watch } from "vue-property-decorator";

type CreatedUser = { id: string; email: string };

@Options({
  components: {
    VerifyEmailCode,
    CreateAccount,
    ActivateAccount,
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
