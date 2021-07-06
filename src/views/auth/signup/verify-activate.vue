<template>
  <div class="w-full h-full block p-8">
    <verify-email-code
      v-model:code="code"
      :user="user"
      v-model:verified="emailVerified"
    />
    <activate-account
      :userId="user.id"
      :code="code"
      :emailVerified="emailVerified"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import ActivateAccount from "./activateaccount.vue";
import VerifyEmailCode from "./verifyemailcode.vue";

@Options({
  components: {
    ActivateAccount,
    VerifyEmailCode,
  },
})
export default class VerifyAndActivate extends Vue {
  @Prop({ type: Object, required: true })
  user!: { id: string; email: string };

  code = "";

  emailVerified = false;
}
</script>
