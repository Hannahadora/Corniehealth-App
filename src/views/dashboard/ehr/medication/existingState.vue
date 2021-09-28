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
                @click="showMedication('false')"
              >
               New Request
              </button>
              
            </span>
            <cornie-table :columns="rawHeaders" v-model="sortAllergys">
                <template #actions="{ item }">
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/add-task/${item.id}`)">
                    <newview-icon  class="text-yellow-500 fill-current"/>
                    <span class="ml-3 text-xs">View</span>
                  </div>
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"  @click="$router.push('/dashboard/provider/experience/add-appointment')">
                    <plus-icon class="text-green-400 fill-current"/>
                    <span class="ml-3 text-xs">Add Occurrence</span>
                  </div>
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showAllergy(item.id)">
                      <edit-icon class="text-purple-600 fill-current" />
                      <span class="ml-3 text-xs">Edit</span>
                  </div>
                </template>
                 <template #asserter="{ item }">
                          <p class="cursor-pointer">{{ item.asserter }}</p>
                </template>
                 <template #recorder="{ item }">
                        <p class="cursor-pointer">{{ item.asserter }}</p>
                </template>
            </cornie-table>
    </div>
    
      <allergy-modal 
       v-if="allergyId == 'false'"
        :columns="practitioner"
           @allergy-added="allergyAdded"
          @update:preferred="showAllergy"
          v-model="showAllergyModal"/>

     <allergy-modal
     v-else 
     :id="allergyId" 
        :columns="practitioner"
          @update:preferred="showAllergy"
          v-model="showAllergyModal"/>

        
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
import IRequest from "@/types/IRequest";
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
import MedicationModal from "./medicationdialog.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

const request = namespace("request");

const emptyRequest: IRequest = {
  requestInfo: {},
  requestDetails: {},
  subject: {},
  performer: {},
  medicationAdministration: {},
  fufillment: {},
  history: {},
  medications: [],


};
@Options({
  components: {
    Table,
    CancelIcon,
    SortIcon,
    CheckinIcon,
    MedicationModal,
    NewviewIcon,
    UpdateIcon,
    TimelineIcon,
    ShareIcon,
    ThreeDotIcon,
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
export default class AllergyExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  selected = 1;
  showNotes = false;
  showRequestModal= false;
  requestId="";
  tasknotes=[];

  @Prop({ type: Array, default: [] })
  allergys!: IRequest[];

  // @allergy.State
  // allergys!: IRequest[];
  

  @request.State
  practitioners!: any[];

  @request.Action
  deleteRequest!: (id: string) => Promise<boolean>;

  @request.Action
  getPractitioners!: () => Promise<void>;

  @request.Action
  fetchRequests!: () => Promise<void>;

 getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
     {
      title: "identifier",
      key: "id",
      show: true,
    },
    { title: "Date Requested", key: "createdAt", show: true },
    {
      title: "rEQUISITION id",
      key: "id",
      show: true,
    },
    {
      title: "Patient",
      key: "patient",
      show: true,
    },
    {
      title: "Requester",
      key: "requester",
      show: true,
    },
    {
      title: "Dispenser",
      key: "dispenser",
      show: true,
    },
    {
      title: "Performer",
      key: "performer",
      show: true,
    },
    {
      title: "Status",
      key: "completeStatus",
      show: true,
    },
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
    const allergys = this.allergys.map((allergy) => {
       (allergy as any).onSet.onsetPeriod.start = new Date(
         (allergy as any).onSet.onsetPeriod.start 
       ).toLocaleDateString("en-US");
         (allergy as any).onSet.onsetPeriod.end = new Date(
         (allergy as any).onSet.onsetPeriod.end 
       ).toLocaleDateString("en-US");
         (allergy as any).createdAt= new Date(
         (allergy as any).createdAt
       ).toLocaleDateString("en-US");
        return {
        ...allergy,
         action: allergy.id,
         keydisplay: "XXXXXXX",
        };
    });
    if (!this.query) return allergys;
    return search.searchObjectArray(allergys, this.query);
  }
getPractitionerName(id: string){
   const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : '';
}
  async showRequest(value:string){
      this.showRequestModal = true;
      //this.stopEvent = true;
      this.requestId = value;
  }

  allergyAdded() {
    console.log('HJGHFS');
 this.allergys;
  this.fetchRequests();
  }
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this allergy",
      title: "Delete allergy"
    });
    if (!confirmed) return;

    if (await this.deleteRequest(id)) window.notify({ msg: "Allergy cancelled", status: "success" });
    else window.notify({ msg: "Allergy not cancelled", status: "error" });
  }
 
      get sortAllergys (){
        return this.items.slice().sort(function(a, b){
          return (a.createdAt < b.createdAt) ? 1 : -1;
        });
      }
   
     async created() {
          this.getPractitioners();
          this.sortAllergys;
          this.fetchRequests();
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
