<template>
  <div class="container-fluid">
    <div class="w-full my-9">
      <div class="flex items-center justify-between py-2">
        <span class="font-semibold"
          >Your account is part of a family account</span
        >
        <!-- <div class="w-3/12 flex justify-end">
          <Button :loading="false" class="focus:outline-none">
            <span
              @click="leaveFamilyAccountModal = true"
              class="bg-red-500 cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-lg"
            >
              Leave Family Account
            </span>
          </Button>
        </div> -->
      </div>
    </div>

    <div
      class="cursor-pointer w-full mb-9"
      @click="$router.push('/dashboard/patient/account-security')"
    >
      <div class="py-2">
        <h2 class="font-semibold text-lg mb-2">Account Security</h2>
        <div class="flex justify-between">
          <p>Update your password, configure 2FA and security questions</p>
          <accordion-right class="cursor-pointer" />
        </div>
      </div>
    </div>

    <div
      class="cursor-pointer w-full mb-9"
      @click="$router.push('/dashboard/patient/access-control')"
    >
      <div class="py-2">
        <h2 class="mb-2 font-semibold text-lg">Access Control & Privileges</h2>
        <div class="flex justify-between">
          <p>
            Control who can have access to your records and specify the
            timeframe
          </p>
          <accordion-right class="cursor-pointer" />
        </div>
      </div>
    </div>

    <div class="w-full" style="height: 100px"></div>
    <leave-family-account v-model="leaveFamilyAccountModal" />
  </div>
</template>

<script lang="ts">
  import Button from "@/components/globals/corniebtn.vue";
  import AccordionRight from "@/components/icons/accordion-right.vue";
  import { Options, Vue } from "vue-class-component";
  import { namespace } from "vuex-class";
  import LeaveFamilyAccount from "./components/leavefamilyaccount.vue";

  const userSettingsStore = namespace("usersettings");
  const userStore = namespace("user");

  @Options({
    components: {
      Button,
      AccordionRight,
      LeaveFamilyAccount,
    },
  })
  export default class PatientSecurity extends Vue {
    leaveFamilyAccountModal = false;
  }
</script>

<style scoped>
  .topest {
    overflow-x: scroll;
    height: 100vh;
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  .topest::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .topest {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  button:disabled {
    opacity: 0.5 !important;
  }
</style>
