<template>
  <div class="w-full pb-7">
    <!-- <div class="flex w-full justify-between mt-5 items-center">
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
    </div> -->
    <Table :columns="rawHeaders" v-model="items" class="tableu rounded-xl mt-5">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 pr-12cursor-pointer"
          @click="$router.push(`addroles/${item.id}`)"
        >
          <eye-icon class="mr-1 mt-1" />
          <span class="text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 pr-9 cursor-pointer"
          @click="$router.push(`addroles/${item.id}`)"
        >
          <edit-icon class="mr-2 1mt-1" />
          <span class="text-xs">Edit</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 pr-12 cursor-pointer"
          @click="remove(item.id)"
        >
          <delete-icon class="mr-2" />
          <span class="text-xs">Delete</span>
        </div>
      </template>
      <!-- <template #name="{ item }">
          <span class="rounded-full">
              {{ item }}
          </span>
      </template> -->
      <!-- <Table :headers="headers" :items="items" class="tableu rounded-xl mt-5"> -->
      <!-- <template #actions="{ item }">
      <template v-slot:item="{ item }">
        <span>
        <span v-if="getKeyValue(item).key == 'action'">
          <table-options>
            <li
              @click="
                $router.push(`addroles/${getKeyValue(item).value}`)
              "
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
              View
            </li>
            <li
              @click="
                $router.push(`addroles/${getKeyValue(item).value}`)
              "
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
              <edit-icon class="mr-3 mt-1" />
              Edit
            </li>
            <li
              @click="remove(getKeyValue(item).value)"
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
      </template> -->
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
// import Table from "@scelloo/cloudenly-ui/src/components/table";
import Table from "@/components/cornie-table/CornieTable.vue";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import { HoursOfOperation } from "@/types/IPractitioner";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import { Prop } from "vue-property-decorator";
import EditIcon from "@/components/icons/edit.vue";

const roles = namespace("roles");

interface IRole {
  name: string;
  description: string;
  isDefault: boolean;
  isSuperAdmin: boolean;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

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
    EyeIcon,
    ColumnFilter,
    TableOptions,
    EditIcon,
  },
})
export default class PractitionerExistingState extends Vue {
  showColumnFilter = false;
  query = "";

  @Prop()
  roless!: IRole[];

  @roles.State
  roles!: IRole[];

  @roles.Action
  deleteRole!: (id: string) => Promise<boolean>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Name",
      key: "name",
      show: true,
    },
    { title: "Description", key: "description", show: true },
    { title: "Members", key: "members", show: true },
    {
      title: "Date Created",
      key: "createdAt",
      show: true,
    },
    {
      title: "Date Updated",
      key: "updatedAt",
      show: true,
    },
    {
      title: "Address",
      key: "address",
      show: false,
    },
    {
      title: "Access Role",
      key: "accessRole",
      show: false,
    },
    {
      title: "Description",
      key: "description",
      show: false,
    },
    {
      title: "Physical Type",
      key: "physicalType",
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
    const practitioners = this.roles.map((role) => {
      //   const opHours = this.stringifyOperationHours(
      //     practitioner.hoursOfOperation
      //   );
      return {
        ...role,
        action: role.id,
        members: "",
        createdAt: new Date(role.createdAt).toLocaleDateString(),
        updatedAt: new Date(role.updatedAt).toLocaleDateString(),

        // hoursOfOperation: opHours,
      };
    });
    if (!this.query) return practitioners;
    return search.searchObjectArray(practitioners, this.query);
  }

  stringifyOperationHours(opHours: HoursOfOperation[]) {
    const [opHour, ...rest] = opHours;
    if (!opHour) return "All Day";
    return `${opHour.openTime} - ${opHour.closeTime}`;
  }

  async remove(id: string) {
    const confirmed = await window.confirmAction({
      message:
        "Are you sure you want to delete this group? This action cannot be undone.",
    });
    if (!confirmed) return;

    try {
      const response = await this.deleteRole(id);
      if (response) window.notify({ msg: "Role deleted", status: "success" });
    } catch (error) {
      window.notify({ msg: "Role not deleted", status: "error" });
      console.log(error);
    }
  }
}
</script>
