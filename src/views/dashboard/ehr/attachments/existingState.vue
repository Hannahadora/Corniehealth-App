<template>
  <div class="w-full pb-80">
       <div>
            <span class="flex justify-end w-full mb-8">
              <button
                class="
                  bg-danger
                  rounded-full
                  text-white
                  mt-5
                  py-2
                  pr-12
                  pl-12
                  px-3
                  mb-5
                  font-semibold
                  focus:outline-none
                  hover:opacity-90
                "
                @click="showImpression('false')"
              >
                Add Attachments
              </button>
              
            </span>
            <cornie-table :columns="rawHeaders" v-model="items">
                <template #actions="{ item }">
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                    <newview-icon  class="text-yellow-500 fill-current"/>
                    <span class="ml-3 text-xs">View</span>
                  </div>
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showImpression(item.id)">
                      <edit-icon class="text-purple-600 fill-current" />
                      <span class="ml-3 text-xs">Edit</span>
                  </div>
                  <div class="flex items-center hover:bg-gray-100 p-3  cursor-pointer" @click="showStatus(item.id)">
                      <update-icon class="text-purple-800 fill-current" />
                      <span class="ml-3 text-xs">Update Status</span>
                  </div>
                    <div class="flex items-center hover:bg-gray-100 p-3  cursor-pointer" @click="showStatus(item.id)">
                      <update-icon class="text-purple-800 fill-current" />
                      <span class="ml-3 text-xs">Update Prognosis</span>
                  </div>
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"  @click="$router.push('/dashboard/provider/experience/add-appointment')">
                    <plus-icon class="text-green-400 fill-current"/>
                    <span class="ml-3 text-xs">Add Occurrence</span>
                  </div>
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"  @click="$router.push('/dashboard/provider/experience/add-appointment')">
                    <plus-icon class="text-green-400 fill-current"/>
                    <span class="ml-3 text-xs">Add Condition</span>
                  </div>
                   <!-- <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="destroy(item.id)">
                      <cancel-icon />
                      <span class="ml-3 text-xs"
                      >Cancel</span>
                    </div> -->
                </template>
            </cornie-table>
        </div>
    
      <attachment-modal 
       v-if="impressionId == 'false'"
        :columns="practitioner"
           @impression-added="impressionAdded"
          @update:preferred="showImpression"
          v-model="showImpressionModal"/>

     <attachment-modal
     v-else 
     :id="impressionId" 
        :columns="practitioner"
          @update:preferred="showImpression"
          v-model="showImpressionModal"/>
     <status-modal
            :id="impressionId" 
           :updatedBy="updatedBy" 
        :currentStatus="currentStatus" 
        :updateDate="update"
          @update:preferred="showStatus"
          v-model="showStatusModal"/>
        
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Prop } from "vue-property-decorator";
import IImpression from "@/types/IImpression";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import TimelineIcon from "@/components/icons/timeline.vue";
import DangerIcon from "@/components/icons/danger.vue";
import ShareIcon from "@/components/icons/share.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import PlusIcon from "@/components/icons/plus.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import MessageIcon from "@/components/icons/message.vue";
import AttachmentModal from "./attachmentDialog.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
 import StatusModal from "./status.vue";

const impression = namespace("impression");

@Options({
  components: {
    Table,
    CancelIcon,
    SortIcon,
    CheckinIcon,
    AttachmentModal,
    NewviewIcon,
    UpdateIcon,
    TimelineIcon,
    ShareIcon,
    ThreeDotIcon,
    StatusModal,
    DangerIcon,
    PlusIcon,
    SearchIcon,
    MessageIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EyeIcon,
    EditIcon,
    CornieTable,
    CardText,
    CornieDialog
  },
  
})
export default class AttachmentExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  selected = 1;
  showNotes = false;
  showImpressionModal= false;
  showStatusModal=false;
  impressionId="";
  tasknotes=[];
updatedBy= "";
currentStatus="";
update ="";

  // @Prop({ type: Array, default: [] })
  // impressions!: IImpression[];

  @impression.State
  impressions!: IImpression[];

  @impression.Action
  deleteImpression!: (id: string) => Promise<boolean>;

  @impression.Action
  fetchImpressions!: (patientId: string) => Promise<void>;


  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Date",
      key: "id",
      show: true,
    },
     { title: "Time", key: "createdAt", show: true },
    {
      title: "Title",
      key: "problem",
      show: true,
    },
     {
      title: "Format",
      key: "investigation",
      show: true,
    },
     {
      title: "finding code",
      key: "code",
      show: false,
    },
    {
      title: "Size",
      key: "prognosis",
      show: true,
    },
    {
      title: "status",
      key: "status",
      show: false,
    },
    {
      title: "Status Reason",
      key: "statusReason",
      show: false,
    },
    {
      title: "Period",
      key: "onsetPeriod",
      show: false,
    },
     {
      title: "description",
      key: "description",
      show: false,
    },
    {
      title: "subject",
      key: "subject",
      show: false,
    },
    {
      title: "encounter",
      key: "encounter",
      show: false,
    },
    //  {
    //   title: "Encounter",
    //   kwy: "encounter",
    //   show: false,
    // },
    //  {
    //   title: "Repitition",
    //   kwy: "repitition",
    //   show: false,
    // },
    //  {
    //   title: "Input Type",
    //   kwy: "inputType",
    //   show: false,
    // },
    //  {
    //   title: "Input Value",
    //   kwy: "inputValue",
    //   show: false,
    // },
    //  {
    //   title: "Output Type",
    //   kwy: "outputType",
    //   show: false,
    // },
    //  {
    //   title: "Output Value",
    //   kwy: "outputValue",
    //   show: false,
    // },

  ];

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }


  get items() {
    const impressions = this.impressions?.map((impression) => {
         (impression as any).createdAt= new Date(
         (impression as any).createdAt
       ).toLocaleDateString("en-US");
       (impression as any).updatedAt= new Date(
         (impression as any).updatedAt
       ).toLocaleDateString("en-US");
          this.updatedBy = impression.effective.assessor;
      this.currentStatus = impression.status;
        this.update = impression.updatedAt;
        return {
        ...impression,
         action: impression.id,
         keydisplay: "XXXXXXX",
         problem: impression.effective.problem,
         investigation: impression.investigation.item,
         prognosis: impression.findings.prognosis,
        assessor: impression.effective.assessor,
        };
    });

    if (!this.query) return impressions;
    return search.searchObjectArray(impressions, this.query);
  }

  async showStatus(value:string){
    this.showStatusModal = true;
    this.impressionId = value;
  }

  async showImpression(value:string){
      this.showImpressionModal = true;
      //this.stopEvent = true;
      this.impressionId = value;
  }
 get activePatientId() {
      const id = this.$route?.params?.id as string;
      return id;
  }


  impressionAdded() {
 this.impressions;
  this.fetchImpressions(this.activePatientId);
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this impression",
      title: "Delete impression"
    });
    if (!confirmed) return;

    if (await this.deleteImpression(id)) window.notify({ msg: "impression cancelled", status: "success" });
    else window.notify({ msg: "Impression not cancelled", status: "error" });
  }
 
      get sortImpressions (){
        return this.items.slice().sort(function(a, b){
          return (a.createdAt < b.createdAt) ? 1 : -1;
        });
      }
   
     created() {
          this.sortImpressions;
          this.fetchImpressions(this.activePatientId);
    }

}
</script>
<style>
.outline-primary{
    border: 2px solid #080056;
}
.status-accepted {
      background: #F3FCF8;
      color: #35BA83;    
  }
.status-inactive {
      background: #FFF1F0;
      color: #FE4D3C;
}
.status-warning{
  background: #FEFAF0;
  color: #F7B538;
}
</style>
