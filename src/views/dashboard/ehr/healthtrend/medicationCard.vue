<template>
  <detail-card height="313px" title="Current Medications" :showTotal="true" :total="totalMedication">
   <template #actions>
     <add-icon class="cursor-pointer"  @click="showMedication"/>
   </template>
    <div class="p-5" v-if="medicationMapper.length ===0">
        <nodrug-icon class="flex mt-5 justify-center w-full text-center"/>
        <p class="mt-8 text-sm text-gray-500 text-center">No Medicationss</p>
    </div>
   <div class="w-full grid grid-cols-1 gap-y-4" v-else>
      <div class="w-full flex justify-between pb-2 border-b" v-for="(input, index) in medicationMapper" :key="index">
            <div class="w-full flex space-x-2 items-center">
              <drug-icon />
              <div class="text-xs flex flex-col">
                <span class="font-semibold text-sm mb-2 text-primary">
                  {{input.medicationCode}}
                </span>
                <span class="">
                  <span class="text-gray-500"> <h3>{{input.dosageInstruction}} </h3></span>
                  <!-- <span class="text-gray-600">
                    | 45 respondent | 45 feedback |
                  </span> -->
                </span>
              </div>
            </div>
            <div class="text-xs text-primary">
              <span class="flex items-center">
                <chevron-right-icon/>
                <!-- Details
                <chevron-down-icon
                  class="ml-2 stroke-current cursor-pointer text-danger"
                /> -->
              </span>
            </div>
      </div>


      <div class="w-full flex justify-end pb-2">
        <div class="text-xs text-danger font-semibold">
          <span class="cursor-pointer" @click="$router.push(`/dashboard/provider/clinical/${patientId}/medications`)">
            View all
          </span>
        </div>
      </div>
    </div>
   
  </detail-card>
    <medication-modal   
        :columns="practitioner"
          v-model="showMedicationModal"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";
import Avatar from "@/components/avatar.vue";
import AddIcon from "@/components/icons/add.vue";
import DrugIcon from "@/components/icons/drug.vue";
import NodrugIcon from "@/components/icons/nodrug.vue";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import { namespace } from "vuex-class";
import { mapDisplay } from "@/plugins/definitions";
import { string } from "yup/lib/locale";
import MedicationModal from "@/views/dashboard/ehr/medication/medicationdialog.vue";
const request = namespace("request");



@Options({
  name: "MedicationCard",
  components: {
    DetailCard,
    Avatar,
    MedicationModal,
    AddIcon,
    DrugIcon,
    NodrugIcon,
    // ArrowRightIcon,
    ChevronRightIcon,
  },
})
export default class MedicationCard extends Vue {
  
  photo = require("@/assets/img/avatar.png");
  medicationMapper = (code: string) => string;
  dosageInstructions="";
    
  @request.State
  patientrequests!: any;


 @request.Action
  fetchOtherrequestsById!: (patientId: string) => Promise<void>;
  showMedicationModal= false;
 async showMedication(){
      this.showMedicationModal = true;
  }
  get newmedicationrequest () { 
  return this.patientrequests.slice(0, 3) 
  }
   get patientId() {
       return this.$route.params.id as string;
     }

   get totalMedication(){
      return this.patientrequests.length
    }
    oldclinicalStatus="";

  async created(){
     await this.fetchOtherrequestsById(this.patientId);
       const medicaitonCodeMapper = await mapDisplay("http://hl7.org/fhir/ValueSet/medication-codes");
     this.medicationMapper  = this.newmedicationrequest.map((medication:any) => {
       medication.Medications.map((codeme:any) =>{
         const clinicalStatus =  medicaitonCodeMapper(codeme.medicationDetails.medicationCode)
         this.oldclinicalStatus = clinicalStatus as string;
         this.dosageInstructions = codeme.medicationDetails.dosageInstruction;

          return{
            ...codeme,
            medicationCode: clinicalStatus
          }
       });
        return {
        ...medication,
        medicationCode: this.oldclinicalStatus,
        dosageInstruction: this.dosageInstructions,

        };
    });
    return this.medicationMapper;
  
  }

}
</script>
