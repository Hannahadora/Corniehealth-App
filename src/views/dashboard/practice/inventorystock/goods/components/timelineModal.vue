<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
             View Timeline
          </h2>

        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <div>
            
                    
            <ol class="relative">
                <li class="mb-10 ml-4 flex" v-for="(item, index) in timeline"  :key="index">
                    <div class="absolute w-12  m-12 h-12 bg-gray-100 rounded-full mt-3 -left-3 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <div class="absolute border-l-4 left-14 top-3.5  border-gray-100 dark:border-gray-700 w-32 h-full" style=""></div>
                    <cornie-card width="70%" height="100%" class="flex-col p-3 rounded-lg ml-32">
                        <cornie-card-text>   
                            <div class="flex space-x-4 w-full">
                            
                                <checkin-icon v-if="item.action == 'Checked in' || item.action == 'Checked out'"/>
                                <encounter-icon v-if="item.action == 'Encounter'"/>
                                <lab-icon v-if="item.action == 'Lab'"/>
                                <medication-icon v-if="item.action == 'Medication'"/>
                                <payment-icon v-if="item.action == 'Payment'"/>
                                <visit-icon v-if="item.action == 'Visit'" />
                                <div>
                                    <h5 class="text-lg font-bold text-primary upp">{{ item.action }}</h5>
                                    <span class="text-sm">{{ new Date(item.createdAt).toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric',hour12: true}) }}</span>
                                    <p class="text-sm text-blue-400 cursor-pointer">View Details</p>
                                </div>
                            
                            </div>
                        </cornie-card-text>
                    </cornie-card>
                   
                </li>
            </ol>

            
            </div>

           
        </v-form>
      </cornie-card-text>
      
      <cornie-card>
        <cornie-card-text class="flex justify-end overflow-auto">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Close
          </cornie-btn>
     
        </cornie-card-text>
      </cornie-card>
    </cornie-card>

  </cornie-dialog>
  <payment-modal  v-model="showPayment"/>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";




import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import DatePicker from "@/components/datepicker.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CornieRadio from "@/components/cornieradio.vue";
import AddIcon from "@/components/icons/add-orange.vue";
import PhoneInput from "@/components/phone-input.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import TextArea from "@/components/textarea.vue";
import Avatar from "@/components/avatar.vue";
import SplitButton from "@/components/split-button.vue";
import ChevronDown from "@/components/icons/chevrondown.vue";


const appointment = namespace("appointment");
const location = namespace("location");
const user = namespace("user");
const practitioner = namespace("practitioner");


@Options({
  name: "timelineModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    DatePicker,
    PhoneInput,
    CancelIcon,
    DeleteIcon,
    TextArea,
    Avatar,
    CornieDialog,
    CornieRadio,
    CornieInput,
    CornieSelect,
    CornieBtn,
    SplitButton,
    ChevronDown,
  },
})
export default class timelineModal extends Vue {
 @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  patientId!: string;

  @Prop({ type: Array, default: [] })
  timeline!: object;

  @Prop({ type: Object, default: {} })
  patient!: object;

 
   @user.State
   currentLocation!: string;

  loading = false;
  practitioner= [];
  onepatient = [] as any;
  date = "";
  showPayment = false;

  roomId = "";
  notes = "";
  startTime = "";

   done(){
        this.show = false;
    }

  async created() {
 
  }
}
</script>

<style>
.border-r-0 {
    border-right-width: 0px !important;
}
.border-l-0 {
    border-left-width: 0px !important;
}
</style>
