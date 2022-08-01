<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/newaccount.svg" />
    <h3 class="text-center mt-5 font-bold">No Accounts on Record</h3>
    <button
    @click="showAccountModal = true"
      class="bg-danger rounded text-white mt-5 py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90"
    >
     <span class="text-xl -mt-0.5">+ </span>
      New  Account
    </button>
  </div>
   <account-modal
    v-model="showAccountModal"
    @accountAdded="accountAdded"
  />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccountModal from './accountModal.vue';
import ISpecial from "@/types/ISpecial";
import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";
import ICollection from "@/types/ICollection";

const collections = namespace("collections");
const account = namespace("user");

@Options({
  components: {
      AccountModal
  },
})
export default class AccountEmptyState extends Vue {
    showAccountModal = false;

  
  @account.Getter
  authPractitioner!: IPractitioner;
  
  @collections.State
  collectionAccounts!: ICollection[];

  @collections.Action
  fetchCollectionAccounts!: (orgId: string) => Promise<void>;


   async accountAdded(){
     await this.fetchCollectionAccounts(this.authPractitioner.organizationId);
  }
}
</script>
