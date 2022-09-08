<template>
    <cornie-dialog v-model="show" right class="w-4/12 h-full">
      <cornie-card height="100%" class="flex flex-col">
        <cornie-card-title class="w-full">
          <cornie-icon-btn @click="show = false" class="">
                  <arrow-left-icon />
          </cornie-icon-btn>
          <div class="w-full border-l-2 border-gray-100">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
                View Comments
            </h2>
    
          </div>
        </cornie-card-title>
  
        <cornie-card-text class="flex-grow scrollable">
          <v-form ref="form">
            <div class="mt-4">
                <span class="text-gray-500 uppercase font-bold mb-5">Dr. EBUBE OGE . <span class="font-light">8-Sep-2021 8:00PM</span> </span>
                <p class="text-justify w-full items-center mb-5 text-sm text-gray-500 mt-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc, venenatis massa, elementum rhoncus scelerisque augue quis auctor. Sodales in ante venenatis tortor viverra turpis sed nulla mus.
                </p>
                <div class="flex mb-5 w-full space-x-2 justify-end float-left">
                        <reply-icon/>
                        <span class="text-danger font-semibold text-sm">Reply</span>
                </div>
                <div class="border-b-2 border-dashed border-gray-200 pb-5">
                    <text-area :placeholder="'Type here'"/>
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
  import ReplyIcon from "@/components/icons/reply.vue"
  import TextArea from "@/components/textarea.vue";

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
      ReplyIcon,
      TextArea,
    },
  })
  export default class TempoaryaccessModal extends Vue {
   @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;
  
    @Prop({ type: String, default: "" })
    id!: string;

    loading = false;
   
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
  