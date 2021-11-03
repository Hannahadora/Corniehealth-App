<template>
  <detail-card height="313px" title="Allergies" :showTotal="true" :total="totalAllergeis">
    <template #actions>
     <add-icon class="cursor-pointer"   @click="showAllergy"/>
   </template>
  <div class="w-full grid grid-cols-1 gap-y-4">
      <div class="w-full flex justify-between pb-2 border-b" v-for="(input, index) in items" :key="index">
        <div class="w-full flex items-center">

          <div class="text-xs flex flex-col">
            <span class="font-semibold text-primary">
              {{input.manifestation}}
            </span>
            <span class="">
              <span class="text-gray-600"> <h5> {{input.reaction.description}} </h5></span>
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
   <allergy-modal
      v-model="showAllergyModal"
    />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";
import { namespace } from "vuex-class";
import IAllergy from "@/types/IAllergy";
import AddIcon from "@/components/icons/add.vue";
import { mapDisplay } from "@/plugins/definitions";
import { string } from "yup/lib/locale";
import AllergyModal from "@/views/dashboard/ehr/allergy/allergydialog.vue";


const allergy = namespace("allergy");
@Options({
  name: "AllergyCard",
  components: {
    DetailCard,
    AddIcon,
    AllergyModal
  },
})
export default class AllergyCard extends Vue {

  medicationMapper = (code:string) => ""
   
   //medicationMapper2:  (code: string) => string = null;
showAllergyModal = false;
  async showAllergy() {
    this.showAllergyModal = true;
  }
   manifestation= "";

   @allergy.State
   allergys!: IAllergy[];

  @allergy.Action
  fetchAllergys!: (patientId: string) => Promise<void>;

 get newallergys () { 
  return this.sortAllergys.slice(0, 3) 
  }
get sortAllergys() {
    return this.allergys.slice().sort(function (a:any, b:any) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
    get patientId() {
       return this.$route.params.id as string;
     }

 get totalAllergeis(){
      return this.allergys.length
    }
    async createMapper(){
        this.medicationMapper = await mapDisplay("http://hl7.org/fhir/ValueSet/clinical-findings");
    }
    
    get items(){
      if (!this.medicationMapper) return [ ];
      const newallergys = this.newallergys.map((allergy) => {
        const manifestationStatus =   this.medicationMapper(allergy.reaction.manifestation);
        this.manifestation = manifestationStatus as string;
        return {
        ...allergy,
        manifestation: this.manifestation,
        };
    });
    return newallergys;
     }
    
    async created(){
      await this.createMapper();
      console.log( this.medicationMapper,"fdejeghetjkg");
       await this.fetchAllergys(this.patientId);
     ///  this.medicationMapper = this.createMapper();
    }
}
</script>
