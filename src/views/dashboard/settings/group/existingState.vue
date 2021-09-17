<template>
  <div class="w-full">
    <span class="flex justify-end w-full">
      <button
        class="
          bg-danger
          rounded-full
          text-white
          mt-5
          py-2
          pr-5
          pl-5
          px-3
          focus:outline-none
          hover:opacity-90
        "
        @click="$router.push('/dashboard/provider/add-group')"
      >
        Add a Group
      </button>
      
    </span>
    <div class="flex w-full justify-between mt-5 items-center">
      <span class="flex items-center">
        <sort-icon class="mr-5" />
        <icon-input
          class="border border-gray-600 rounded-full focus:outline-none"
          type="search"
          v-model="query"
        >
          <template v-slot:prepend>
            <search-icon />
          </template>
        </icon-input>
      </span>
      <span class="flex justify-between items-center">
        <print-icon class="mr-7" />
        <table-refresh-icon class="mr-7" />
        <filter-icon class="cursor-pointer" @click="showColumnFilter = true" />
      </span>
    </div>
    <Table :headers="headers" :items="sortGroups" class="tableu rounded-xl mt-5">
      <template v-slot:item="{ item }">
        <span v-if="getKeyValue(item).key == 'action'">
          <table-options>
            <li
              @click="$router.push(`/dashboard/provider/view-group/${getKeyValue(item).value}`)"
              class="
                list-none
                items-center
                flex
                text-xs
                font-semibold
                text-gray-700
                hover:bg-gray-100
                hover:text-gray-900
                cursor-pointer
                my-1 -m-6 p-5 py-2
              "
            >
                <eye-icon class="mr-3" /> View
            </li>
            <li
              @click="$router.push(`/dashboard/provider/add-group/${getKeyValue(item).value}`)"
              class="
                list-none
                items-center
                flex
                text-xs
                font-semibold
                text-gray-700
                hover:bg-gray-100
                hover:text-gray-900
                cursor-pointer
                 my-1 -m-6 p-5 py-2
              "
            >
              
              <edit-icon class="mr-3" /> Edit
            </li>
            <li
              @click="displayMember(getKeyValue(item).value)"
              class="
                list-none
                items-center
                flex
                text-xs
                font-semibold
                text-gray-700
                hover:bg-gray-100
                hover:text-gray-900
                cursor-pointer
                my-1 -m-6 p-5 py-2
              "
            >
              
              <span class="mr-3 text-2xl bold text-primary">+</span> Add member
            </li>
            <li
             v-if="item.data.groupStatusDetails.active == true"
              @click="showDeactivateGroup(getKeyValue(item).value)"
              class="
                list-none
                flex
                 my-1 -m-6 p-5 py-2
                items-center
                text-xs
                font-semibold
                text-gray-700
                hover:bg-gray-100
                hover:text-gray-900
                cursor-pointer
              "
            >
               <close-icon class="mr-3" /> Deactivate
            </li>
            <li
            v-if="item.data.groupStatusDetails.active == false"
              @click="activateGroup(getKeyValue(item).value)"
              class="
                list-none
                flex
                 my-1 -m-6 p-5 py-2
                items-center
                text-xs
                font-semibold
                text-gray-700
                hover:bg-gray-100
                hover:text-gray-900
                cursor-pointer
              "
            >
               <close-icon class="mr-3" /> Activate
            </li>
            <li
              @click="deleteItem(getKeyValue(item).value)"
              class="
                list-none
                flex
                 my-1 -m-6 p-5 py-2
                items-center
                text-xs
                font-semibold
                text-gray-700
                hover:bg-gray-100
                hover:text-gray-900
                cursor-pointer
              "
            >
              <delete-icon class="mr-3" /> Delete
            </li>
          </table-options>
        </span>
        <span v-else> {{ getKeyValue(item).value }} </span>
      </template>
    </Table>
    <column-filter
      :columns="rawHeaders"
      v-model:preferred="preferredHeaders"
      v-model:visible="showColumnFilter"
    />
       <member-modal v-model:visible="showMemberModal" :paymentId="paymentId"/>
        <deactivate-modal v-model:visible="showDeativateModal" :paymentId="paymentId"/>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
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
import IGroup from "@/types/IGroup";
import DeleteIcon from "@/components/icons/delete.vue";
import MemberModal from "./memberModal.vue";
import DeactivateModal from "./deactivateModal.vue";
import EyeIcon from "@/components/icons/eye.vue";
import EditIcon from "@/components/icons/edit.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

const group = namespace("group");

@Options({
  components: {
    Table,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    CloseIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EyeIcon,
    EditIcon,
    MemberModal,
    DeactivateModal
  },
  
})
export default class GroupExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  showMemberModal = false;
  showDeativateModal = false;
  paymentId ="";

  @group.State
  groups!: IGroup[];

  @group.Action
  deleteGroup!: (id: string) => Promise<boolean>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Name", value: "name", show: true },
    {
      title: "Quantity",
      value: "quantity",
      show: true,
    },
    {
      title: "Type",
      value: "type",
      show: true,
    },
    {
      title: "Status",
      value: "status",
      show: false,
    },
    {
      title: "Managing Entity",
      value: "managingEntity",
      show: true,
    },
    {
      title: "Characteristics Code",
      value: "characteristicsCode",
      show: false,
    },
    {
      title: "Code",
      value: "code",
      show: false,
    },
    {
      title: "Value Range",
      value: "valueRange",
      show: false,
    },
    {
      title: "Period",
      value: "period",
      show: false,
    },
    {
      title: "Value Boolean",
      value: "valueBoolean",
      show: false,
    },
    {
      title: "Value Reference",
      value: "valueRef",
      show: false,
    },
    {
      title: "Exclude",
      value: "exclude",
      show: false,
    },
    {
      title: "Member Period",
      value: "memberPeriod",
      show: false,
    },
    {
      title: "Member Status",
      value: "memberStatus",
      show: false,
    },
    {
      title: "Member Entity",
      value: "memberEntity",
      show: false,
    },
    {
      title: "Value Quantity",
      value: "valueQuantity",
      show: false,
    },
    {
      title: "Value Codeable Concept",
      value: "valueCodeableConcept",
      show: false,
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
    const groups = this.groups.map((group) => {
       (group as any).period = new Date(
         (group as any).period 
       ).toLocaleDateString("en-US");
       (group as any).memberPeriod = new Date(
         (group as any).memberPeriod 
       ).toLocaleDateString("en-US");

       
        return {
        ...group,
         action: group.id,
        };
    });
    if (!this.query) return groups;
    return search.searchObjectArray(groups, this.query);
  }

 
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this group",
      title: "Delete Group"
    });
    if (!confirmed) return;

    if (await this.deleteGroup(id)) window.notify({ msg: "Group deleted", status: "error" });
    else window.notify({ msg: "Group not deleted", status: "error" });
  }
   async displayMember(id: string) {
     console.log("Hello i m here");
    const group = await this.groups.find((d) => d.id == id);
    this.showMemberModal = true;
    this.paymentId = id;
  }
  async showDeactivateGroup(id: string) {
    const payment = await this.groups.find((d) => d.id == id);
    this.showDeativateModal = true;
    this.paymentId = id;
  }
async activateGroup(id:string) {
   const confirmed = await window.confirmAction({
      message: "You are about to activate this Group",
      title: "Activate Group"
    });
    if (!confirmed) {
      return;
    }else{
        try {
          const response = await cornieClient().post(`/api/v1/group/deactivateActivateGroupAccount/${id}`,{});
          if (response.success) {
            window.notify({ msg: "Group activated", status: "success" });
          } 
        } catch (error) {
          window.notify({ msg: "Group not activated", status: "error" });
          console.error(error);
        }
      }
    }
      get sortGroups (){
        return this.items.slice().sort(function(a, b){
          return (a.createdAt < b.createdAt) ? 1 : -1;
        });
      }
     async created() {
      console.log(this.items);
    }

}
</script>
<style>
.outline-primary{
    border: 2px solid #080056;
}
</style>
