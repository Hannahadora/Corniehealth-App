<template>
    <cornie-dialog v-model="show" right class="w-4/12 h-full">
      <cornie-card height="100%" class="flex flex-col">
        <cornie-card-title class="w-full">
          <cornie-icon-btn @click="show = false" class="">
                  <arrow-left-icon />
          </cornie-icon-btn>
          <div class="w-full border-l-2 border-gray-100">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
                Temporary Access Link
            </h2>
    
          </div>
        </cornie-card-title>
  
        <cornie-card-text class="flex-grow scrollable">
          <v-form ref="form">
            <div class="mt-4">
                <div class="grid grid-cols-2 gap-4 w-full mb-7">
                   <date-time-picker
                   v-model:date="date"
        v-model:time="time"
                       label="Start Date/Time"
                       class="w-full"
                   />
                   <date-time-picker
                       label="End Date/Time"
                       class="w-full"
                   />
   
                </div>
                <div class="mb-7">
                   <cornie-select
                   :label="'Records'"
                   :placeholder="'--Select--'"
                   />
                </div>
                <div class="w-full mb-7">
                   <span class="text-sm flex space-x-2 items-center w-full text-semibold text-danger"><add-icon/> <span>Generate Link</span> </span>
                </div>
                <div class="border-2 border-gray-200 bg-blue-50 py-2 rounded px-4 mb-7">
                   <span class="text-sm text-gray-500">
                       www.corniehealth.com/patientportal/emmanuelukaegbu/<br>temporaryaccess/activated
                       -17022022/12;00hrs/expires-180220221/8:00hrs.
                   </span>
                </div>
                <div class="mb-7 w-full">
                   <cornie-input
                       :label="'Add invitees'"
                       :placeholder="'Enter email address to invite'"
                       class="w-full"
                   />
                </div>
                <div class="border-b-2 border-gray-200 border-dashed pb-5 mb-7">
                   <span class="text-sm text-semibold text-danger flex space-x-2 items-center w-full "><add-icon/> <span>Add</span> </span>
                </div>
                <div class="flex justify-between w-full">
                   <div>
                       <span class="font-semibold text-sm mb-0">
                           Sam John
                       </span>
                       <p class="text-xs text-gray-400">samjohn@reddington.ng</p>
                   </div>
                   <delete-icon class="text-danger fill-current"/>
                </div>
            </div>
          </v-form>
        </cornie-card-text>
        
        <cornie-card>
          <cornie-card-text class="flex justify-end overflow-auto">
            <cornie-btn
              @click="show = false"
              class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
            >
              Cancel
            </cornie-btn>
             <cornie-btn
              :loading="loading"
              @click="submit"
              class="text-white bg-danger px-6 rounded-xl"
             >
              Send
            </cornie-btn>
        
          </cornie-card-text>
        </cornie-card>
      </cornie-card>
  
    </cornie-dialog>
  </template>
  
  <script lang="ts">
  import { Options, Vue, setup } from "vue-class-component";
  import { Prop, PropSync, Watch } from "vue-property-decorator";
  import { cornieClient } from "@/plugins/http";
  import { namespace } from "vuex-class";


  import CornieCard from "@/components/cornie-card";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieSelect from "@/components/autocomplete.vue";
  import ChevronDown from "@/components/icons/chevrondown.vue";
  import CornieBtn from "@/components/CornieBtn.vue";
  import AddIcon from "@/components/icons/add-orange.vue";
  import DeleteIcon from "@/components/icons/delete.vue";

  import ILocation from "@/types/ILocation";
  import IPractitioner from "@/types/IPractitioner";
  import DateTimePicker from "@/components/date-time-picker.vue";
  
  const appointment = namespace("appointment");
  const location = namespace("location");
  const user = namespace("user");
  const practitioner = namespace("practitioner");
  
  
  @Options({
    name: "TempoaryaccessModal",
    components: {
      ...CornieCard,
      CornieIconBtn,
      ArrowLeftIcon,
      DeleteIcon,
      CornieDialog,
      CornieInput,
      CornieSelect,
      CornieBtn,
      ChevronDown,
      DateTimePicker,
      AddIcon,
    },
  })
  export default class TempoaryaccessModal extends Vue {
   @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;
  
    @Prop({ type: String, default: "" })
    id!: string;

    loading = false;

    date = "";
    time = "";
    get payload(){
       return {}
    }
  
     async submit() {
      this.loading = true;
    
      this.loading = false;
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
  