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
        @click="$router.push('add-group')"
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
    <Table :headers="headers" :items="items" class="tableu rounded-xl mt-5">
      <template v-slot:item="{ item }">
        <span v-if="getKeyValue(item).key == 'action'">
          <table-options>
            <li
              @click="$router.push(`add-group/${getKeyValue(item).value}`)"
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
                my-1
                py-3
              "
            >
              
                <eye-icon class="mr-3" /> View
            </li>
            <li
              @click="$router.push(`add-group/${getKeyValue(item).value}`)"
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
                my-1
                py-3
              "
            >
              
              <edit-icon class="mr-3" /> Edit
            </li>
            <li
              @click="$router.push(`add-group/${getKeyValue(item).value}`)"
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
                my-1
                py-3
              "
            >
              
              <span class="mr-3 text-2xl bold text-primary">+</span> Update status
            </li>
            <li
              @click="$router.push(`add-group/${getKeyValue(item).value}`)"
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
                my-1
                py-3
              "
            >
              
              <span class="mr-3 text-2xl bold text-primary">+</span> Add member
            </li>
            <li
             v-if="item.data.status == 'active'"
              @click="deactivateGroup(getKeyValue(item).value)"
              class="
                list-none
                flex
                my-1
                py-3
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
            v-if="item.data.status == 'inactive'"
              @click="activateGroup(getKeyValue(item).value)"
              class="
                list-none
                flex
                my-1
                py-3
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
                my-1
                py-3
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
import EyeIcon from "@/components/icons/eye.vue";
import EditIcon from "@/components/icons/edit.vue";
import CloseIcon from "@/components/icons/close.vue";
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
    EditIcon
  },
  
})
export default class GroupExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";

  @group.State
  groups!: IGroup[];

  @group.Action
  deleteGroup!: (id: string) => Promise<boolean>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Identifier", value: "name", show: true },
    { title: "Name", value: "name", show: true },
    {
      title: "Quantity",
      value: "quantity",
      show: true,
    },
    {
      title: "Type",
      value: "type",
      show: false,
    },
    {
      title: "Status",
      value: "state",
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
  async deactivateGroup(id:string) {
   const confirmed = await window.confirmAction({
      message: "You are about to deactivate this group",
      title: "Deactivate group"
    });
    if (!confirmed) {
      return;
    }else{
        try {
          const response = await cornieClient().post(`/api/v1/group/deactivateActivateGroupAccount/${id}`,{});
          if (response.success) {
            window.notify({ msg: "Group deactivated", status: "success" });
          } 
        } catch (error) {
          window.notify({ msg: "Group not deactivated", status: "error" });
          console.error(error);
        }
      }
    }
 async activateGroup(id:string) {
   const confirmed = await window.confirmAction({
      message: "You are about to activate this group",
      title: "Activate group"
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

}
</script>
<style>
.outline-primary{
    border: 2px solid #0A4269;
}
</style>
