<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/practitioners.svg" />
    <h3 class="text-center mt-5">There are no Practitioners on record</h3>
    <div class="flex justify-between">
      <button
        class="rounded-lg font-semibold mt-5 mb-5 py-3 px-5 text-primary border border-primary mr-3 text-sm focus:outline-none hover:opacity-90"
        @click="showInviteModal = true"
      >
        Invite Practitioner
      </button>
      <button
        class="bg-danger text-white mt-5 mb-5 rounded-lg py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90"
        @click="$router.push('add-practitioner')"
      >
        Add a Practitioner
      </button>
    </div>
  </div>
  <invitation-modal v-model="showInviteModal" />
</template>
<script lang="ts">
  import { Options, Vue } from "vue-class-component";

  @Options({
    components: {},
  })
  export default class PractitionerEmptyState extends Vue {
    showInviteModal = false;
  }
</script>
