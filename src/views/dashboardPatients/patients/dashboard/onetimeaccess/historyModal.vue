<template>
    <cornie-dialog v-model="show" right class="w-4/12 h-full">
      <cornie-card height="100%" class="flex flex-col">
        <cornie-card-title class="w-full">
          <cornie-icon-btn @click="show = false" class="">
                  <arrow-left-icon />
          </cornie-icon-btn>
          <div class="w-full border-l-2 border-gray-100">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
                Access History
            </h2>
    
          </div>
        </cornie-card-title>
  
        <cornie-card-text class="flex-grow scrollable">
          <v-form ref="form">
            <div class="mt-4 py-4 px-8" v-if="accessHistory.length === 0">
              <h3 class="text-center font-bold"> No Access History !!</h3>
            </div>
           <div class="mt-4" v-else>
            <cornie-table
                :columns="rawHeaders"
                v-model="items"
                :check="false"
                :fixeHeight="true"
                :menu="false"
                :listmenu="true"
                class="hidden md:block"
            >
            
            </cornie-table>
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
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import DateTimePicker from "@/components/date-time-picker.vue";

  import IOnetimeaccess from "@/types/IOnetimeaccess";

  const onetimeaccess = namespace("onetimeaccess");
  
  @Options({
    name: "ViewAccessHistoryModal",
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
      CornieTable
    },
  })
  export default class ViewAccessHistoryModal extends Vue {
   @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;
  
    @Prop({ type: String, default: "" })
    id!: string;

    @Prop({ type: String, default: [] })
    accessHistory!: any[];

    @onetimeaccess.State
    onetimeacesshistory!: IOnetimeaccess[];
  
    @onetimeaccess.Action
    fetchOnetimeaccessHistory!: (accessId : string) => Promise<void>;

    loading = false;

    rawHeaders = [
      { title: "date", key: "date", show: true, noOrder:true },
      { title: "time", key: "time", show: true , noOrder:true},
      {
        title: "duration",
        key: "duration",
        show: true,
         noOrder:true
      }
    ];
   
    get payload(){
       return {}
    }
  
     async submit() {
      this.loading = true;
    
      this.loading = false;
    }
    // get items() {
    //   return [{
    //       date: "21/01/21",
    //       time: "09:00AM",
    //       duration: "30 Mins"
    //   }]
    // }
    
    get items() {
      const accessHistory = this.accessHistory.map((history:any) => {
           (history as any).createdAt = new Date(
          (history as any).createdAt
        ).toLocaleDateString("en-US");
        return {
          ...history,
        };
      });
      return accessHistory
    }
    get accessId(){
      return this.id
    }

  
    async created() {
      //this.fetchOnetimeaccessHistory(this.accessId);
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
  