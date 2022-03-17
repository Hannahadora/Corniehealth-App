<template>
  <div>
    <two-factor v-if="twoFactor" />
    <div class="2xl:h-3/6 block rounded-lg bg-white" v-else>
      <div class="w-full h-full flex flex-col items-center justify-center p-12">
        <h2 class="font-bold text-primary text-3xl text-center">Welcome Back!</h2>
        <div class="flex flex-col mt-10">
          <h3 class="font-bold text-danger text-xl text-center">2FA Required</h3>
          <p class="block mt-4 mb-12 text-center">
            Admin has setup a mandatory use of 2FA for user sign in. Kindly go
            to your security settings to setup your 2FA.
          </p>
        </div>
        <div class="block w-full justify-self-end mt-auto">
          <div class="w-full flex flex-col items-center justify-center text-white">
            <cornie-btn
              @click="twoFactor = true"
              class="bg-danger rounded py-1 px-5 mb-3 w-1/3"
            >
              Set up
            </cornie-btn>
            <cornie-btn
              @click="$router.replace('/dashboard')"
              class="mb-12 border-primary py-1 px-5 border-2 hover:bg-primary hover:text-white text-primary mt-2 rounded w-1/3"
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
  clicked() {}

  created() {
    this.$emit('change-path')
  }
}
</script>
