<template>
  <div class="w-full h-full flex flex-col p-8">
    <h2 class="font-bold text-3xl">Welcome Back</h2>
    <div class="flex flex-col mt-16">
      <h3 class="font-bold text-primary text-xl">2FA Required</h3>
      <p class="block mt-4">
        Admin has setup a mandatory use of 2FA for user sign in. Kindly go to
        your security settings to setup your 2FA.
      </p>
    </div>
    <div class="block w-full justify-self-end mt-auto">
      <div class="w-full flex flex-col items-end text-white">
        <cornie-btn
          @click="$router.replace('/dashboard/settings/account-security')"
          class="bg-danger rounded-full p-3 w-2/6 md:w-1/2"
        >
          Go to settings
        </cornie-btn>

        <cornie-btn
          @click="$router.replace('/dashboard/')"
          class="bg-primary mt-2 rounded-full p-3 w-2/6 md:w-1/2"
        >
          Skip For later
        </cornie-btn>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Recommendation extends Vue {
  clicked() {
    console.log("Clicked");
  }
}
</script>
