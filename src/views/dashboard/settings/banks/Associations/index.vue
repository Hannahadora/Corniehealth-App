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
import IAssociate from "@/types/IAssociate";
import IPractitioner from "@/types/IPractitioner";


const association = namespace("association");
const account = namespace("user");

@Options({
  name: "AssociateIndex",
  components: {
    AccountEmptyState,
    AccountExistingState,
  },
})
export default class AssociateIndex extends Vue {

  practitionerToUpdate = {} as ISpecial;

  @account.Getter
  authPractitioner!: IPractitioner;
  
  @association.Action
  fetchAssociations!: (orgId: string) => Promise<void>;

  @association.State
  associations!: IAssociate[];


  get empty() {
    return this.associations.length < 1;
  }

   async accountAdded(){
     await this.fetchAssociations(this.authPractitioner.organizationId);
  }

   async created() {
    await this.fetchAssociations(this.authPractitioner.organizationId);
  }
}
</script>
