<template>
    <div class="w-full pb-7">
      <span class="flex justify-end w-full">
      <button
        class="bg-danger rounded-lg text-white mt-5 mb-5 py-3 px-5 text-sm font-semibold focus:outline-none hover:opacity-90"
        @click="showAccessModal = true"
      >
      Generate a Temporary Access Link
      </button>
    </span>
      <cornie-table
        :columns="rawHeaders"
        v-model="sortAccess"
        :check="false"
        :fixeHeight="true"
        class="hidden md:block"
      >
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showViewhistory(item.id)"
          >
            <eye-icon class="text-yellow-400 fill-current" />
            <span class="ml-3 text-xs">View Access History</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showComments(item.id)"
          >
            <eye-icon class="text-green-600 fill-current" />
            <span class="ml-3 text-xs">View Comments</span>
          </div>
          <!-- <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showAccess(item.id)"
          >
            <plus-icon  class="text-primary fill-current"/>
            <span class="ml-3 text-xs">New Access </span>
          </div> -->
          <div
          v-if="item.status == 'active'"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="deleteItem(item.id)"
          >
            <cancel-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs">Revoke Access</span>
          </div>
          <div
            v-else
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="activateAccess(item.id)"
          >
            <plus-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs">Activate Access</span>
          </div>
        </template>
        <template #status="{item}">
            <span
              :class="{
                'bg-green-200 text-green-600': item.status == 'active',
                ' bg-red-500 text-red-400': item.status == 'inactive',
              }"
              class="text-center rounded-md p-1 bg-opacity-20"
            >
              {{ item.status }}
            </span>
        </template>
        <template #start="{item}">
          <div class="block w-full">
            <p class="">
               {{ new Date(item.startDate).toLocaleDateString('en-US')}}
            </p>
            <span class="">
               {{ item.startTime}}
            </span>
          </div>
        </template>
        <template #end="{item}">
          <div class="block w-full">
            <p class="">
               {{ new Date(item.endDate).toLocaleDateString('en-US')}}
            </p>
            <span class="">
               {{ item.endTime }}
            </span>
          </div>
        </template>
        <template #email="{ item }">
           <span class="">
            {{ item.invitees.join(' ,')}}
           </span>
        </template>
        <template #access>
           <span class="">
            5
            <span class="text-blue-500 underline">View</span>
           </span>
        </template>
        <template #patientName="{item}">
           <span class="text-blue-500">{{ item.patientName}}</span>
        </template>
      </cornie-table>
      <div class="block md:hidden">
          <div class="mb-5">
              <search-section :placeholder="'Search Table'"/>
          </div>
          <div class="bg-white shadow-lg py-2 px-8 w-full rounded-lg h-full">
              <div class="justify-between flex mb-5 border-b-2 py-2 border-gray-200">
                  <p class="text-primary">#</p>
                  <p>1</p>
              </div>
              <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                  <p class="text-primary uppercase font-bold text-sm">request date</p>
                  <p>22/01/20</p>
              </div>
               <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                  <p class="text-primary uppercase font-bold text-sm">referral id</p>
                  <p>A1XCD45</p>
              </div>
               <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                  <p class="text-primary uppercase font-bold text-sm">category</p>
                  <p>Counselling</p>
              </div>
               <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                  <p class="text-primary uppercase font-bold text-sm">specialty</p>
                  <p>XXXXXX</p>
              </div>
               <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                  <p class="text-primary uppercase font-bold text-sm">requester</p>
                  <p>XXXXXX</p>
              </div>
  
               <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                  <p class="text-primary uppercase font-bold text-sm">performer</p>
                  <p>XXXXXX</p>
              </div>
              <div class="justify-between flex mb-5 border-b-2 border-gray-200">
                  <p class="text-primary">status</p>
                  <p class="bg-yellow-100 text-yellow-500 rounded py-1 text-sm px-2">On-Hold</p>
              </div>
              <div class="flex w-full justify-center py-2">
                      <DotsHorizontalIcon/>
              </div>
  
  
          </div>
  
      </div>
    </div>
    <new-modal v-model="Shownewmodal"/>
    <comment-modal v-model="showComment" :accessComments="onetimeaccesscomments"/>
    <access-history v-model="viewHistoryModal" :id="accessId"/>
    <access-modal v-model="showAccessModal" @accesssaved="accesssaved" :accessHistory="onetimeacesshistory"/>
  </template>
  <script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import { cornieClient } from "@/plugins/http";
  import search from "@/plugins/search";
  import { getTableKeyValue } from "@/plugins/utils";
  import { Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import  ISpecialistrefferal  from "@/types/ISpecialistrefferal";
  
  import ThreeDotIcon from "@/components/icons/threedot.vue";
  import SortIcon from "@/components/icons/sort.vue";
  import SearchIcon from "@/components/icons/search.vue";
  import PrintIcon from "@/components/icons/print.vue";
  import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
  import FilterIcon from "@/components/icons/filter.vue";
  import IconInput from "@/components/IconInput.vue";
  import ColumnFilter from "@/components/columnfilter.vue";
  
  import TableOptions from "@/components/table-options.vue";
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import DeleteIcon from "@/components/icons/deactivate.vue";
  import CancelIcon from "@/components/icons/cancel-red-bg.vue"
  import PlusIcon from "@/components/icons/add.vue";
  import EyeIcon from "@/components/icons/newview.vue";
  import EditIcon from "@/components/icons/edit.vue";
  import CheckIn from "@/components/icons/checkin.vue";
  import SearchSection from "@/components/search-input.vue";
  import DotsHorizontalIcon from "@/components/icons/DotsHorizontalIcon.vue";
  
  import ChevronDownIcon from "@/components/icons/chevrondown.vue";
  import { Codeable } from "@/types/misc";
  import { getDropdown } from "@/plugins/definitions";

  import NewModal from "./newAccessModal.vue";
  import CommentModal from "./viewCommentModal.vue";
  import AccessHistory from "./historyModal.vue";
  import AccessModal from "./temporaryaccessModal.vue";

  import IOnetimeaccess from "@/types/IOnetimeaccess";

  const onetimeaccess = namespace("onetimeaccess");
  
  @Options({
    components: {
      CornieTable,
      SortIcon,
      ThreeDotIcon,
      SearchIcon,
      PrintIcon,
      TableRefreshIcon,
      FilterIcon,
      EditIcon,
      PlusIcon,
      IconInput,
      DeleteIcon,
      EyeIcon,
      ColumnFilter,
      TableOptions,
      ChevronDownIcon,
      CancelIcon,
      CheckIn,
      SearchSection,
      DotsHorizontalIcon,
      NewModal,
      CommentModal,
      AccessHistory,
      AccessModal
    },
  })
  export default class OnetimeAccessExistingState extends Vue {
    showAccessModal = false;
    showComment = false;
    viewHistoryModal = false;
    query = "";
    selectedItem = {};
  

    refreshing = false;
    Shownewmodal = false;
    showMember = false;
    familyId = "";
    accessId = "";
  
    dropdowns = {} as IIndexableObject;
    Specilaitems: Codeable[] = [];
  
     
    @onetimeaccess.State
    onetimeaccesses!: IOnetimeaccess[];
  
    @onetimeaccess.Action
    fetchOnetimeaccess!: () => Promise<void>;

    @onetimeaccess.State
    onetimeacesshistory!: IOnetimeaccess[];
  
    @onetimeaccess.Action
    fetchOnetimeaccessHistory!: (accessId : string) => Promise<void>;

    
    @onetimeaccess.State
    onetimeaccesscomments!: IOnetimeaccess[];
  
    @onetimeaccess.Action
    fetchOnetimeaccessComments!: (accessId : string) => Promise<void>;
  
  
    rawHeaders = [
      { title: "date", key: "createdAt", show: true, noOrder:true },
      { title: "email", key: "email", show: true , noOrder:true},
      {
        title: "start datetime",
        key: "start",
        show: true,
         noOrder:true
      },
      {
        title: "End Datetime",
        key: "end",
        show: true,
         noOrder:true
      },
      {
        title: "access history",
        key: "access",
        show: true,
         noOrder:true
      },
       {
        title: "Status",
        key: "status",
        show: true,
         noOrder:true
      },
  
    ];
  
    showView(value:any){
      this.viewHistoryModal = true;
      this.selectedItem = value;
    }
  
  
  //  get items() {
  //     return [{
  //         date: "22/01/20",
  //         email: "james@reddington.com",
  //         startdate: "22/01/19 09:00AM",
  //         endate: "22/01/19 10:00AM",
  //         requester: "XXXXXX",
  //         performer: "XXXXXX",
  //     }]
  //   }
  
    get items() {
      const onetimeaccesses = this.onetimeaccesses.map((onetimeaccesse:any) => {
           (onetimeaccesse as any).createdAt = new Date(
          (onetimeaccesse as any).createdAt
        ).toLocaleDateString("en-US");
        return {
          ...onetimeaccesse,
        };
      });
      if (!this.query) return onetimeaccesses;
      return search.searchObjectArray(onetimeaccesses, this.query);
    }
    async setRefs() {
      const reference = "http://hl7.org/fhir/ValueSet/c80-practice-codes";
      const ref = reference.trim();
      const defs = await getDropdown(ref);
      if (defs && Array.isArray(defs)) {
        this.Specilaitems = defs;
      } else {
        window.notify({
          status: "error",
          msg: `Cannot get definitions for ${reference}`,
        });
      }
    }
  
    getspecialtyname(id: string) {
      const pt = this.Specilaitems.find((i: any) => i.code === id);
      return pt ? `${pt.display}` : "";
    }

    showAccess(value:string){
      this.accessId = value;
      this.showAccessModal = true;
    }

    async showViewhistory(value:string){
      this.viewHistoryModal = true;
      this.accessId = value;

      await this.fetchOnetimeaccessHistory(value);

    }

    async showComments(value:string){
      this.accessId = value;
      this.showComment = true;

      await this.fetchOnetimeaccessComments(value)


    }    
    get sortAccess() {
      return this.items.slice().sort(function (a, b) {
        return a.createdAt < b.createdAt ? 1 : -1;
      });
    }
  
    showMemberModal(value:string){
      this.showMember = true;
      this.familyId = value;
    }
    async accesssaved(){
      await this.fetchOnetimeaccess();
    }

    async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "This access link is still active. Do you want to proceed and revoke it?",
      title: "Revoke Access",
    });
    if (!confirmed) {
      return;
    } else {
      try {
        const response = await cornieClient().patch(
          `/api/v1/patient-portal/one-time-access/revoke/${id}/`,
          {}
        );
        if (response.success) {
          window.notify({ msg: "Onetime Access Activated Successfully", status: "success" });
          await this.fetchOnetimeaccess();
        }
      } catch (error) {
        window.notify({ msg: "Onetime Access not Activated", status: "error" });
      }
    }
  }
  

  async activateAccess(id: string) {
    const confirmed = await window.confirmAction({
      message: "This access link is still Inactive. Do you want to proceed and activate it?",
      title: "Activate Access",
    });
    if (!confirmed) {
      return;
    } else {
      try {
        const response = await cornieClient().patch(
          `/api/v1/patient-portal/one-time-access/activate/${id}/`,
          {}
        );
        if (response.success) {
          window.notify({ msg: "Onetime Access Revoked Successfully", status: "success" });
          await this.fetchOnetimeaccess();
        }
      } catch (error) {
        window.notify({ msg: "Onetime Access not Revoked", status: "error" });
      }
    }
  }
  
    async created() {
      await this.fetchOnetimeaccess();
    }
  }
  </script>
  