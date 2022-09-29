<template>
    <div class="w-full flex flex-col justify-center items-center h-96">
      <img src="@/assets/img/invite.svg" />
      <h1 class="text-center text-lg mt-5 font-bold">
        Invite friends to join Cornie Health
      </h1>
      <p class="text-gray-400 text-center">
        Refer a family or friend to Cornie Health and earn
      </p>
      <span class="flex justify-center w-full">
        <button
          class="bg-danger rounded-lg text-white mt-5 py-2 px-3 pl-12 pr-12 font-semibold focus:outline-none hover:opacity-90"
        @click="showRefferalModal= true"
          >
          Invite
        </button>
      </span>
    </div>
    <refferal-modal v-model="showRefferalModal" @inviteAdded="inviteAdded"/>
  </template>
  <script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import { namespace } from "vuex-class";

  import RefferalModal from "./refferalModal.vue";

  import  IUserrefferal  from "@/types/IUserrefferal";
   const userreferal = namespace("userreferal");
  
  @Options({
    components: {
        RefferalModal
    },
  })
  export default class refferalemptyState extends Vue {
    showRefferalModal = false;

    @userreferal.State
    userrefferals!: IUserrefferal[];
  
    @userreferal.Action
    fetchUserrefferral!: () => Promise<void>;

    @userreferal.State
    refferedaccounts!: IUserrefferal[];
  
    @userreferal.Action
    fetchRefferredAccounts!: () => Promise<void>;

     async inviteAdded(){
      await this.fetchRefferredAccounts();
     }
     async created() {
      await this.fetchUserrefferral();
    }
  }
  </script>
  