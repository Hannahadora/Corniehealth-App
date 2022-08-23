<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/orgaccount.svg" />
    <h1 class="text-center text-lg mt-5 font-bold">
      This account is not currently linked to any organisation
    </h1>
    <p class="text-gray-400 text-center">
      Are you associated with any group health benefit? You can search for your
      <br />
      organisation and link your account. Once the account admin authenticates
      you, <br />
      Cornie Health will apply your healthcare coverage as defined.
    </p>

    <div class="flex space-x-4">
      <button
        class="bg-white border-2 border-primary rounded-lg text-primary mt-5 py-2 px-8 text-sm font-semibold focus:outline-none hover:opacity-90"
        @click="showOrgModal = true"
      >
        Join Organisation
      </button>
      <button
        class="bg-danger rounded-lg text-white mt-5 py-2 px-8 text-sm font-semibold focus:outline-none hover:opacity-90"
      >
        Create New
      </button>
    </div>
  </div>
  <org-modal v-model="showOrgModal" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";

import OrgModal from "../exisitingOrg.vue";

@Options({
  components: {
    OrgModal,
  },
})
export default class orgmptyState extends Vue {
  showOrgModal = false;
}
</script>
