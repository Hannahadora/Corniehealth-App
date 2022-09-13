<template>
    <div class="w-full flex flex-col justify-center items-center h-96">
      <img src="@/assets/img/onetime.svg" />
      <h1 class="text-center text-lg mt-5 font-bold">
        No temporary access on file.
      </h1>
      <p class="text-gray-400 text-center">
        One-time access allows you share a time-bound access to your health <br>
                records with one or more providers for review purposes only. 
      </p>
      <span class="flex justify-center w-full">
        <button
          class="bg-danger rounded-lg text-white mt-5 py-2 px-3 pl-12 pr-12 font-semibold focus:outline-none hover:opacity-90"
        @click="showAccessModal= true"
          >
        Generate a Temporary Access Link
        </button>
      </span>
    </div>
    <access-modal v-model="showAccessModal" @accesssaved="accesssaved"/>
  </template>
  <script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import { namespace } from "vuex-class";

  import AccessModal from "./temporaryaccessModal.vue";
  import IOnetimeaccess from "@/types/IOnetimeaccess";
  
  const onetimeaccess = namespace("onetimeaccess");
  
  
  @Options({
    components: {
        AccessModal
    },
  })
  export default class onetimeaccessemptyState extends Vue {
    showAccessModal = false;

    @onetimeaccess.Action
    fetchOnetimeaccess!: () => Promise<void>;

    async accesssaved(){
      await this.fetchOnetimeaccess();
    }
  }
  </script>
  