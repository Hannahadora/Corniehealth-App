<template>
  <form class="w-full h-full flex flex-col p-8">
    <div class="flex flex-col">
      <h3 class="font-bold text-primary text-xl">Sign-In Protection</h3>
      <p class="block text-sm">
        This helps us verify your identity. You can enable or disable this in
        your profile account settings.
      </p>
    </div>
    <div class="flex flex-col mt-8 w-3/4">
      <h3 class="font-bold text-primary text-lg">
        1 of 2: Enter your 2FA Verification Code
      </h3>
      <span class="items-center flex">
        <multi-input :length="6" class="mt-2" />
        <check-icon class="ml-2" />
      </span>
    </div>
    <div class="flex flex-col mt-8 w-full">
      <h3 class="font-bold text-primary text-lg">
        2 of 2: Answer your security question
      </h3>
      <span class="text-xs text-primary font-semibold block mb-3">
        Please answer your security question to complete your login
      </span>
      <label>
        <span class="font-semibold">What is your mother’s maiden name?</span>
        <cornie-input placeholder="Answer" class="w-full" />
        <span
          class="text-right text-xs text-primary block w-full font-semibold"
        >
          Forgot Answer?
        </span>
      </label>
    </div>
    <div class="flex mt-auto w-full justify-end">
      <cornie-btn
        type="submit"
        class="
          p-3
          w-2/6
          md:w-1/2
          bg-danger
          text-white
          font-semibold
          rounded-full
        "
      >
        Submit
      </cornie-btn>
    </div>
  </form>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MultiInput from "@/components/multi-input.vue";
import CornieInput from "@/components/cornieinput.vue";
import CheckIcon from "@/components/icons/check.vue";
@Options({
  components: {
    MultiInput,
    CornieInput,
    CheckIcon,
  },
})
export default class TwoFactor extends Vue {}
</script>
