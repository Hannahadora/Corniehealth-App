<template>
  <div class="h-full flex justify-center">

        <family-empty-state v-if="empty"/>
        <!-- <family-exisiting-state v-else/> -->
        <family-state v-else/>
     
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {IPatientAssociation} from "@/types/IPatientAssociation";
import { namespace } from "vuex-class";
import FamilyEmptyState from "./emptyState.vue";
import FamilyExisitingState from "./exisitngState.vue";
import FamilyState from "./family.vue";

const patientassociation = namespace("patientassociation");

@Options({
  name: "familytypeIndex",
  components: {
    FamilyEmptyState,
    FamilyExisitingState,
    FamilyState,
  },
})
export default class familytypeIndex extends Vue {

  get empty() {
    return this.familyassociations.length < 1;
  }

  @patientassociation.State
  familyassociations!: IPatientAssociation[];

  @patientassociation.Action
  fetchFamilyAssociations!: () => Promise<void>;

   async specialadded(){
     await this.fetchFamilyAssociations();
  }

   created() {
     this.fetchFamilyAssociations();
  }

}
</script>
