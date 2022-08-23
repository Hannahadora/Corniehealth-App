<template>
  <div class="h-full flex justify-center">

      <span v-if="id" class="w-full">
          <family-exisiting-state :id="id" />
      </span>
      <span v-else class="w-full">
        <family-empty-state v-if="empty" @family-added="familyadded"/>
        <family-state v-else @family-added="familyadded"/>
      </span>
     
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {IPatientAssociation} from "@/types/IPatientAssociation";
import { namespace } from "vuex-class";
import FamilyEmptyState from "./emptyState.vue";
import FamilyExisitingState from "./exisitngState.vue";
import FamilyState from "./family.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";

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

  @Prop({ type: String, default: "" })
  id!: string;

  get empty() {
    return this.familyassociations.length < 1;
  }

  
    @Watch("id")
    idChanged() {
      this.fetchFamilyMember(this.id);
    }

  @patientassociation.State
  familyassociations!: IPatientAssociation[];

  @patientassociation.Action
  fetchFamilyAssociations!: () => Promise<void>;

  @patientassociation.State
  familymembers!: IPatientAssociation[];

  @patientassociation.Action
  fetchFamilyMember!: (familyId: string) => Promise<void>;



  async familyadded(){
    await this.fetchFamilyAssociations();
  }

   async created() {
     await this.fetchFamilyAssociations();
  }

}
</script>
