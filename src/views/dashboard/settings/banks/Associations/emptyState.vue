<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/newaccount.svg" />
    <h1 class="text-center mt-5 font-bold">No Associations on Record</h1>
    <button
    @click="showAccountModal = true"
      class="bg-danger rounded text-white mt-5 py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90"
    >
     <span class="text-xl -mt-0.5">+ </span>
     New  Location
    </button>
  </div>
   <location-modal
    v-model="showAccountModal"
    @accountAdded="accountAdded"
  />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LocationModal from './associateModal.vue';
import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";
import IAssociate from "@/types/IAssociate";



const association = namespace("association");
const collections = namespace("collections");
const account = namespace("user");

@Options({
  components: {
      LocationModal
  },
})
export default class AssociateEmptyState extends Vue {
    showAccountModal = false;

  
  @account.Getter
  authPractitioner!: IPractitioner;
  
   @association.Action
  fetchAssociations!: (orgId: string) => Promise<void>;

  @association.State
  associations!: IAssociate[];


   async accountAdded(){
     await this.fetchAssociations(this.authPractitioner.organizationId);
  }
}
</script>
