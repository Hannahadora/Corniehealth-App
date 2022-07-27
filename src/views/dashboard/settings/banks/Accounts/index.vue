<template>
  <div class="h-full flex justify-center">
    <div class="w-full">
      <span class="w-full">
        <account-empty-state  v-if="empty"/>
        <account-existing-state v-else  @accountAdded="accountAdded"/>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ISpecial from "@/types/ISpecial";
import { namespace } from "vuex-class";
import AccountEmptyState from "./emptyState.vue";
import AccountExistingState from "./exisitngState.vue";
import ICollection from "@/types/ICollection";
import IPractitioner from "@/types/IPractitioner";


const collections = namespace("collections");
const account = namespace("user");

@Options({
  name: "AccountIndex",
  components: {
    AccountEmptyState,
    AccountExistingState,
  },
})
export default class AccountIndex extends Vue {

  practitionerToUpdate = {} as ISpecial;

    @account.Getter
  authPractitioner!: IPractitioner;
  
  @collections.State
  collectionAccounts!: ICollection[];

  @collections.Action
  fetchCollectionAccounts!: (orgId: string) => Promise<void>;


  get empty() {
    return this.collectionAccounts.length < 1;
  }

   async accountAdded(){
     await this.fetchCollectionAccounts(this.authPractitioner.organizationId);
  }

   async created() {
    await this.fetchCollectionAccounts(this.authPractitioner.organizationId);
  }
}
</script>
