<template>
    <div class="h-screen mx-4 w-full">
      <div class="bg-white mb-auto h-full shadow-lg p-3 mt-2 rounded-lg w-full">
        <div class="w-full">
          <span
            class="flex flex-row w-full justify-between border-b-2 font-bold mb-10 text-xl text-primary py-2"
          >
          Referrals
          </span>
        </div>
  
        <div>
            <!-- <invite-empty-state  /> -->
            <invite-existing-state
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
  import InviteEmptyState from "./emptyState.vue";
  import InviteExistingState from "./existingState.vue";
  import  ISpecialistrefferal  from "@/types/ISpecialistrefferal";
  
  const specialistrefferal = namespace("specialistrefferal");
  
  @Options({
    name: "InviteIndex",
    components: {
        InviteEmptyState,
        InviteExistingState,
    },
  })
  export default class InviteIndex extends Vue {
    get empty() {
      return this.specialistrefferals.length < 1;
    }
  
    @specialistrefferal.State
    specialistrefferals!: ISpecialistrefferal[];
  
    @specialistrefferal.Action
    fetchSpecialistRefferal!: () => Promise<void>;
  
   
    created() {
      this.fetchSpecialistRefferal();
    }
  }
  </script>
  