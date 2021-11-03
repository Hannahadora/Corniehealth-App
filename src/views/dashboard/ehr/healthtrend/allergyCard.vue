<template>
  <detail-card height="313px" title="Allergies" :showTotal="true" :total="totalAllergeis">
    <template #actions>
     <add-icon/>
   </template>
  <div class="w-full grid grid-cols-1 gap-y-4">
      <div class="w-full flex justify-between pb-2 border-b">
        <div class="w-full flex items-center">

          <div class="text-xs flex flex-col">
            <span class="font-semibold text-primary">
              Asthma
            </span>
            <span class="">
              <span class="text-gray-600"> <h5> Undergoing treatment for 5 years now </h5></span>
            </span>
          </div>
        </div>
        <div class="text-xs text-primary">
          <span class="flex items-center">
            <chevron-right-icon/>
          </span>
        </div>
      </div>

      <div class="w-full flex justify-end pb-2">
        <div class="text-xs text-danger font-semibold">
          <span class="">
            View all
          </span>
        </div>
      </div>
  </div>
  </detail-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";
import { namespace } from "vuex-class";
import IAllergy from "@/types/IAllergy";
import AddIcon from "@/components/icons/add.vue";


const allergy = namespace("allergy");
@Options({
  name: "AllergyCard",
  components: {
    DetailCard,
    AddIcon
  },
})
export default class AllergyCard extends Vue {
   @allergy.State
   allergys!: IAllergy[];

  @allergy.Action
  fetchAllergys!: (patientId: string) => Promise<void>;

    get patientId() {
       return this.$route.params.id as string;
     }

 get totalAllergies(){
      return this.allergys.length
    }
     created(){
        this.fetchAllergys(this.patientId);
     }
}
</script>
