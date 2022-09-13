<template>
    <div class="h-screen">
      <div
        class="bg-white mb-auto h-full shadow-lg p-3 mt-2 rounded-lg w-full"
      >
        <div class="w-full">
          <span
            class="flex flex-row w-full justify-between border-b-2 font-bold mb-10 text-xl text-primary py-2"
          >
          One Time Access
          </span>
        </div>
  
      <div>
        <onetime-access-empty-state  v-if="empty"/>
         <onetime-access-existing-state
         v-else
          />
      </div>
      </div>
  
    </div>
  </template>
  
  <script lang="ts">
  import { cornieClient } from "@/plugins/http";
  import { IPatientAssociation } from "@/types/IPatientAssociation";
  import { Options, Vue } from "vue-class-component";
  import { namespace } from "vuex-class";
  import OnetimeAccessEmptyState from "./emptyState.vue";
  import OnetimeAccessExistingState from "./existingState.vue";
  import IOnetimeaccess from "@/types/IOnetimeaccess";
  
  const onetimeaccess = namespace("onetimeaccess");
  
  @Options({
    name: "onetimeAccessIndex",
    components: {
        OnetimeAccessEmptyState,
        OnetimeAccessExistingState,
    },
  })
  export default class onetimeAccessIndex extends Vue {
    get empty() {
      return this.onetimeaccesses.length < 1;
    }
  
    @onetimeaccess.State
    onetimeaccesses!: IOnetimeaccess[];
  
    @onetimeaccess.Action
    fetchOnetimeaccess!: () => Promise<void>;
  
   
    created() {
      this.fetchOnetimeaccess();
    }
  }
  </script>
  