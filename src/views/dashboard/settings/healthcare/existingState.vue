<template>
    <div class="w-full pb-7">
    <span class="flex justify-end w-full">
      <button
        class="
          bg-danger
          rounded-full
          text-white
          mt-5
          py-2
          px-3
          pl-10
          pr-10
          focus:outline-none
          hover:opacity-90
        "
        @click="$router.push('add-health-service')"
      >
        Add New
      </button>
    </span>
      <cornie-table :columns="rawHeaders" v-model="items">
      <template #actions="{ item }">
         <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
             @click="$router.push(`add-health-service/${item.id}`)"
        >
          <edit-icon class="mr-3 text-yellow-300 fill-current" /> 
          <span class="ml-3 text-xs">Edit</span>
        </div>
        
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteItem(item.id)"
        >
          <delete-icon/>
          <span class="ml-3 text-xs">Delete Healthcare</span>
        </div>
      </template>
    </cornie-table>
    <!-- <Table :headers="headers" :items="items" class="tableu rounded-xl mt-5">
      <template v-slot:item="{ item }">
        <span v-if="getKeyValue(item).key == 'action'">
          <table-options>
            <li
              @click="$router.push(`add-health-service/${getKeyValue(item).value}`)"
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
              <eye-icon class="mr-3 mt-1" />
              View & Edit
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
              <delete-icon class="mr-3" /> Delete Healthcare
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
    /> -->
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
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import IHealthcare from "@/types/IHealthcare";
import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import { namespace } from "vuex-class";
import CornieTable from "@/components/cornie-table/CornieTable.vue";



const healthcare = namespace("healthcare");
@Options({
  components: {
    Table,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    DeleteIcon,
    CornieTable,
    EyeIcon,
    ColumnFilter,
    TableOptions,
  },
})

export default class HealthcareExistingState extends Vue {
    showColumnFilter = false;
    query = "";
    
  loading = false;


  @healthcare.State
  healthcares!: IHealthcare[];

  @healthcare.Action
  deleteHealthcare!: (id: string) => Promise<boolean>;

    getKeyValue = getTableKeyValue;
    preferredHeaders = [];
    rawHeaders = [
    {
      title: "Name",
      key: "name",
      show: true,
    },
    
    {
      title: "Location",
      key: "address",
      show: true,
    },
    {
      title: "Communication",
      key: "communication",
      show: false,
    },
    {
      title: "Phone",
      key: "phone",
      show: false,
    },
    {
      title: "Provison Code",
      key: "provisionCode",
      show: true,
    },
      {
      title: "Type",
      key: "type",
      show: true,
    },
    {
      title: "Comment",
      key: "comment",
      show: false,
    },
     {
      title: "Programs",
      key: "programs",
      show: false,
    },
     {
      title: "Specialty",
      key: "specialty",
      show: false,
    },
     {
      title: "Category",
      key: "category",
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
    const healthcares = this.healthcares.map((healthcare) => {
        return {
        ...healthcare,
         action: healthcare.id,
        };
    });
    
    if (!this.query) return healthcares;
    return search.searchObjectArray(healthcares, this.query);
  }
 
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this healthcare service",
      title: "Delete Healthcare Servcie"
    });
    if (!confirmed) return;

    if (await this.deleteHealthcare(id)) window.notify({ msg: "Healthcare service deleted", status: "success" });
    else window.notify({ msg: "Healthcare service not deleted", status: "error" });
  }
 

 
}
</script>
