<template>
    <cornie-dialog v-model="show" right class="w-full h-screen">
      <cornie-card height="100%" class="flex flex-col">
        <cornie-card-title class="w-full">
          <cornie-icon-btn @click="show = false" class="">
                  <arrow-left-icon />
          </cornie-icon-btn>
          <div class="w-full border-l-2 border-gray-100">
           <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">Invite</h2>
    
          </div>
        </cornie-card-title>
  
        <cornie-card-text class="flex-grow scrollable">
          <v-form ref="form">
           <div class="w-full py-4 px-8">
                <div>
                    <h2 class="text-primary font-bold text-3xl mb-7">
                        Invite Friends to Join Cornie Health
                    </h2>
                    <p class="text-justify  mb-5">
                        Refer a friend or family member to us and they will each get N250. You will also get N250 for each friend that makes their first transaction on Cornie Health.
                    </p>
                    <div class="mb-5">
                        <cornie-input
                        :label="'Email'"
                        :placeholder="'--Enter Email Address(s)--'"
                        />
                        <span class="text-xs text-gray-400 font-semibold italic">Separate multiple emails with commas</span>
                    </div>
                    <div class="mb-5">
                        <cornie-btn
                            class="text-white bg-danger px-6 rounded-xl"
                            >
                            Invite
                            </cornie-btn>
                    </div>
                    <div class="mb-5">
                        <span class="text-sm font-bold">Share with more friends and earn more money!</span>
                    </div>
                    <div class="flex w-full space-x-3">
                        <fb-icon/>
                        <tw-icon/>
                        <gb-icon/>
                        <lk-icon/>
                        <link-icon/>

                    </div>
                </div>
                <div>
                    <img src="@/assets/img/invite.svg" class="w-full"/>
                </div>
           </div>
          </v-form>
        </cornie-card-text>
       
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
  import CancelIcon from "@/components/icons/CloseIcon.vue";


  import FbIcon from './icons/fb.vue';
  import TwIcon from './icons/tw.vue';
  import GbIcon from './icons/gb.vue';
  import LkIcon from './icons/lk.vue';
  import LinkIcon from './icons/link.vue';
  
  import ILocation from "@/types/ILocation";
  import IPractitioner from "@/types/IPractitioner";
  import DateTimePicker from "@/components/date-time-picker.vue";

  
  const appointment = namespace("appointment");
  const location = namespace("location");
  const user = namespace("user");
  const practitioner = namespace("practitioner");
  
  
  @Options({
    name: "RefferalInviteModal",
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
      CancelIcon,
      FbIcon,
      TwIcon,
      GbIcon,
      LkIcon,
      LinkIcon
    },
  })
  export default class RefferalInviteModal extends Vue {
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
  