<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/familytype.svg" />
    <h1 class="text-center text-lg mt-5 font-bold">No Family Profile have been created</h1>
    <p class="text-gray-400 text-center">Want to manage another person’s Profile? You can create a new profile <br/> for a child or request access to an existing profile</p>
    
    <div class="flex space-x-4">
         <button
            class="bg-white border-2 border-primary rounded-lg text-primary mt-5 py-2 px-8 text-sm font-semibold focus:outline-none hover:opacity-90"
            >
           Add Existing
        </button>
        <button
            class="bg-danger rounded-lg text-white mt-5 py-2 px-8 text-sm font-semibold focus:outline-none hover:opacity-90"
            >
           Add Member
        </button>
    </div>
    
  </div>

</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";
import IAssociate from "@/types/IAssociate";


@Options({
  components: {
  },
})
export default class familyemptyState extends Vue {
  
  
}
</script>
