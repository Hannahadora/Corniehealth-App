<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
          <h2 class="font-bold text-lg text-primary ml-3 -mt-2">Medication</h2>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
         <span class="text-danger text-xs p-3 uppercase float-right font-semibold mb-4">{{medications.length}} added</span>
       <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Medication Details" v-model="openedS">
               <div class="w-full mt-5 pb-5">
                  <cornie-select
                  class="w-full"
                  :items="['code']"
                  v-model="medication.medicationDetails.medicationCode"
                  label="medication code"
                  placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="w-full"
                    :items="['reason']"
                    label="medication reference"
                    v-model="medication.medicationDetails.medicationReference"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="['Continuous','Acute','Seasonal']"
                    v-model="medication.medicationDetails.courseOfTherapyType"
                    label="course of therapy type"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="['reason']"
                    v-model="medication.medicationDetails.dosageInstruction"
                    label="dosage instruction"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                   <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="['reason']"
                    label="initial fill"
                    v-model="medication.medicationDetails.initialFill"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                   <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="[0,2,4]"
                    label="quantity"
                    v-model="medication.medicationDetails.quantity"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <date-picker  placeholder="autofill" label="Duration" v-model="medication.medicationDetails.duration"  class="mb-5 w-full"/>
                </div>
        </accordion-component>
        <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Refill Info" v-model="openedS">
              <div class="w-full mt-5 pb-5">
                <date-picker  placeholder="autofill" v-model="medication.refillInfo.dispenseInterval" label="dispense interval"  class="w-full mb-5 required"
                    :rules="required"/>

                  <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="[7,9,9]"
                    v-model="medication.refillInfo.numberOfRepeatsAllowed"
                    label="number of repeats allowed"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="[8,5,8]"
                    v-model="medication.refillInfo.quantity"
                    label="quantity"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="[5,3,9]"
                    v-model="medication.refillInfo.expectedSupplyDuration"
                    label="expected supply duration"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
        </accordion-component>
        <accordion-component class="shadow-none rounded-none  border-none  text-primary" title="Substitution Allowed" v-model="openedS">
              <div class="w-full mt-5 pb-5">
                  <cornie-select
                    class="required w-full"
                    :rules="required"
                    :items="['reason']"
                    label="Code"
                    v-model="medication.substitutionAllowed.code"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="w-full"
                    :items="['reason']"
                    label="reason"
                     v-model="medication.substitutionAllowed.reason"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
        </accordion-component>
       <span class="text-danger text-xs p-3 uppercase float-right font-semibold  cursor-pointer" @click="addMedication">Add</span>

      <div v-for="(input, index) in updatedmedications" :key="`-${index}`">
        <div class="mt-10 mb-1">   
          <div class="grid grid-cols-2 p-3">
            <p class="text-sm font-semibold text-black">{{input.medicationDetails.medicationCode}}</p>
            <div class="w-full flex flex-wrap float-right justify-between">
              <span><d-edit class="text-primary fill-current ml-20 cursor-pointer" @click="editMedication(input.id,index)"/></span> 
              <span><c-delete class=" text-danger fill-current cursor-pointer" @click="removeMedication(input.id,index,medications)"/></span> 
            </div>
          </div>
        </div>
      </div>
        </v-form>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="apply"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieDatePicker from "@/components/datepicker.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { Insurance, IPatient } from "@/types/IPatient";
import NoteIcon from "@/components/icons/graynote.vue";
import { cornieClient } from "@/plugins/http";
import DEdit from "@/components/icons/aedit.vue";
import CDelete from "@/components/icons/adelete.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "./accordion-medication-list.vue";
import DatePicker from "@/components/daterangepicker.vue";
import Period from "@/types/IPeriod";
import { duration } from 'moment';
import IRequest ,{ Medications } from "@/types/IRequest";

const emptyMedication: Medications = {
   // requestId: "",
     medicationDetails:{
          medicationCode: "",
          medicationReference: "",
          courseOfTherapyType: "",
          dosageInstruction: "",
          initialFill: "",
          quantity: 0,
          duration: { start: "", end: "" }
        },
         refillInfo:{
            dispenseInterval: {} as Period,
            numberOfRepeatsAllowed: 0,
            quantity: 0,
            expectedSupplyDuration: 0,
          },
          substitutionAllowed:{
              code: "",
              reason: "",
          },
};

@Options({
  name: "notes",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
    DEdit,
    CDelete,
    CornieDialog,
    SearchIcon,
    AccordionComponent,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieDatePicker,
    CornieBtn,
  },
})
export default class Medication extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Array,  default: () => [] })
  available!: object;

 @Prop({ type: String, default: '' })
  taskId!: string;

 @Prop({ type: String, default: '' })
  requestId!: string;

loading=  false;
notes='';
availableFilter= false;
profileFilter=false;
updatedmedications=[];
 newmedications=[];
 // medication =[];

 medication = { ...emptyMedication };
   medications: Medications[] = [];
  async apply() {
    this.loading = true
   await this.editMedication();
    this.loading = false
  }
  // async setRequest() {
  //    this.medication = JSON.parse(JSON.stringify({ ...this.request }));
  // }
   get payload() {
     const model = JSON.parse(JSON.stringify({ ...this.medications }));
    return model;
  }
    addMedication(){
      this.medications.push({ ...this.medication });
      window.notify({ msg: "Medication Added", status: "success" });
    }
    removeMedication(id:string,index:number){
      this.medications.splice(index, 1);
    }
    async fetchMedication() {
    const id = this.requestId;
      const AllNotes = cornieClient().get(`/api/v1/requests/medications/${id}`);
      const response = await Promise.all([AllNotes]);
      this.updatedmedications = response[0].data;
    }

async editMedication() {
    const id = this.requestId;
    const url = `/api/v1/requests/medications/${id}`;
    const payload = this.payload ;
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Medication Updated", status: "success" });
        this.$router.push("/dashboard/provider/experience/requests");
      }
    } catch (error) {
      window.notify({ msg: "Medication not Updated", status: "error" });
    }
  }
 
  created() {
 
  }
}
</script>

<style></style>
