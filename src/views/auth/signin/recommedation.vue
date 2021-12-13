<template>
  <div>
    <two-factor v-if="twoFactor" />
    <div class="h-5/6 2xl:h-3/6 w-2/3 block rounded-lg bg-white" v-else>
      <div class="w-full h-full flex flex-col p-12">
        <h2 class="font-bold text-3xl">Welcome Back!</h2>
        <div class="flex flex-col mt-10">
          <h3 class="font-bold text-danger text-xl">2FA Required</h3>
          <p class="block mt-4 mb-5">
            Admin has setup a mandatory use of 2FA for user sign in. Kindly go
            to your security settings to setup your 2FA.
          </p>
        </div>
        <div class="block w-full justify-self-end mt-auto">
          <div class="w-full flex flex-col items-end text-white">
            <cornie-btn
              @click="$router.push('/dashboard/providerr/user/security')"
              class="bg-danger rounded-full py-1 px-3 w-full mb-3"
            >
              Set up
            </cornie-btn>
            <cornie-btn
              @click="$router.replace('/dashboard')"
              class="mb-12 border-primary py-1 px-3 border-2 hover:bg-primary hover:text-white text-primary mt-2 rounded-full p-3 w-full"
            >
              Skip
            </cornie-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TwoFactor from "./twofactor.vue";
@Options({
  components: {
    TwoFactor,
  },
})
export default class Recommendation extends Vue {
  twoFactor = false;
  clicked() {
    ;
  }
}
</script>
