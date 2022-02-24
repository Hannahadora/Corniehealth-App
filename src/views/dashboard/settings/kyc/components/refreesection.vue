<template>
  <div class="w-full">
   <accordion-component
            :title="'Nominate Referees'"
            :spanText="'(Refree accepts a minimum of 2 refrees, however you can nominate up to 4 refrees)'"
            :opened="true"
            @add="nominateRefree = true"
            :add="getLength"
            :spanCaption="true"
            :showAddExisting="getLength"
            :expandsection="getLength"
            :expandText="'Select existing practitioner'"
            :showAdd="true"
             @selectExisting="showPractitoner"
          >
          <cornie-table :columns="rawHeaders" v-model="sortRefress" :listmenu="true" :check="false">
            <template #actions="{ item }">
              <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"  @click="showEditRefree(item.id)">
               <edit-icon class="text-purple-700 fill-current"/>
                <span class="ml-3 text-xs">Edit</span>
              </div>
              <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="deleteItem(item.id)">
                <delete-icon class="text-danger fill-current" />
                <span class="ml-3 text-xs">Delete</span>
              </div>
            </template>
            <template #status="{ item }">
                <span class="bg-green-100 text-green-700 rounded p-1 text-xs" v-if="item.status === 'completed'">{{ item.status }}</span>
                <span class="bg-yellow-100 text-yellow-600 rounded p-1 text-xs" v-if="item.status === 'pending'">{{ item.status }}</span>
                <span class="bg-red-100 text-red-600 rounded p-1 text-xs" v-if="item.status === 'declined'">{{ item.status }}</span>
            </template>
             <template #phone="{ item }">
                <span>
                    {{item.phone?.dialCode +''+ item.phone?.number}} 
                </span>
            </template>
          </cornie-table>
   </accordion-component>
     <nominate-refree
        @refree-added="refreeadded"
        v-model="nominateRefree"
        :id="id"
        :refreeId="refreeId"


      />
      <exisiting-practitioner v-model="showExisitingPractioner"  :id="id"  @refree-added="refreeadded"/>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
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
import ITask from "@/types/ITask";
import AccordionComponent from "@/components/form-accordion.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/edit.vue";
import IKyc from "@/types/IKyc";
import IKycref from "@/types/IKycref";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import NominateRefree from "./refreesModal.vue";
import ExisitingPractitioner from "./exsitingPractitioner.vue"

import DirectorModal from "./directorModal.vue";

const kyc = namespace("kyc");

@Options({
  components: {
    AccordionComponent,
    SortIcon,
    ThreeDotIcon,
    DirectorModal,
    ExisitingPractitioner,
    NominateRefree,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EditIcon,
    CornieTable,
    CardText,
    CornieDialog,
  },
})

export default class DirectorState extends Vue {
 @Prop({ type: Array, default: [] })
  refrees!: [];

@Prop({ type: String, default: "" })
  id!: string;

  @kyc.Action
  deleteRefree!: (id: string) => Promise<boolean>;

 @kyc.Action
  fetchKycs!: () => Promise<void>;

  @kyc.State
  orgKyc!: IKyc;

  @kyc.Mutation
  addreferees!: (orgKyc: IKycref) => void;

  query = "";
  refreeId = "";
  nominateRefree = false;
  particularOfDirectors = [] as any;
  showExisitingPractioner = false;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Name",
      key: "name",
      show: true,
      noOrder: true
    },
     {
      title: "Email",
      key: "email",
      show: true,
      noOrder: true
    },
     {
      title: "mobile",
      key: "phone",
      show: true,
      noOrder: true
    },
     {
      title: "Status",
      key: "status",
      show: true,
      noOrder: true
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
    const directors = this.refrees?.map((director: any) => {
      return {
        ...director,
        // action: director?.id,
        // name: director?.fullName,
        // date: Date.now()

      };
    });
   return directors; 
  }

  showPractitoner(){
      this.showExisitingPractioner  = true;
  }

  async showEditRefree(value:string){
    this.refreeId = value;
    this.nominateRefree = true;  
  }

  get getLength() {
    const percentage = this.refrees.length;
    if (percentage > 4) {
      return false
    }
    if (percentage < 4) {
       return true
    }
  }
 

async refreeadded() {
    this.addreferees([this.addreferees] as any);
    await this.fetchKycs();
    this.nominateRefree = false;
    // console.log(this.orgKyc.referees);
   }
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this refree",
      title: "Delete refree",
    });
    if (!confirmed) return;

    if (await this.deleteRefree(id))
      window.notify({ msg: "Refree deleted", status: "success" });
      else window.notify({ msg: "Refree not deleted", status: "error" });
  }

 get sortRefress() {
    return this.items?.slice().sort(function (a:any, b:any) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }

  directorData(value:any){
    this.particularOfDirectors = value;
  }

  async created() {
   await this.fetchKycs();
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
.status-accepted {
  background: #f3fcf8;
  color: #35ba83;
}
.status-inactive {
  background: #fff1f0;
  color: #fe4d3c;
}
.status-warning {
  background: #fefaf0;
  color: #f7b538;
}
</style>
