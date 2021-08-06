<template>
  <div class="w-full my-2 h-full overflow-y-auto">
      <div class="container-fluid bg-white p-4 sm:p-2 h-full">
        <div class="w-full border-b-2 curved flex py-2">
            <div class="container-fluid flex font-semibold text-xl py-2">
                <h2>Shifts</h2>
            </div>
        </div>

        <Overlay :show="show">
            <Modal :bigger="true">
              <template v-slot:header>
                <h3 class="text-xl flex justify-between leading-6 font-medium text-gray-900 mb-5 capitalize modal_titlee cursor-pointer" id="modal-title">
                    <span>Night Shift_DT</span>
                    <span @click="() => show = false" class="lowercase pb-1 cursor-pointer font-normal bg-primary text-white flex items-center justify-center" style="width: 20px;height:20px;border-radius:50%">×</span>
                </h3>
              </template>

              <template v-slot:body>
                <p class="text-base text-gray-500 my-3">
                  Practitioners assigned to this shift
                </p>
                <div class="w-full">
                  <div class="container flex flex-col" style="max-height: 400px;overflow-y:scroll">
                    <span class="text-base text-gray-500">W. E Somebod</span>
                    <span class="text-base text-gray-500">W. E Somebod</span>
                    <span class="text-base text-gray-500">W. E Somebod</span>
                    <span class="text-base text-gray-500">W. E r3r3</span>
                  </div>
                </div>
              </template>
            </Modal>
        </Overlay>

        <div class="w-full curved flex py-2 justify-end my-6">
            <div class=".w-full flex font-semibold text-xl py-2 justify-end">
                <Button :loading="false">
                    <router-link :to="{ name: 'New Shift'}" style="background: #FE4D3C" class="bg-red-500 hover:bg-blue-700 focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                        New Shift
                    </router-link>
                </Button>
            </div>
        </div>
          <div class="w-full pb-7">
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
            <Table :headers="headers" :items="items" class="tableu rounded-xl mt-5 primary-bg">
            <template v-slot:item="{ item }">
                <span v-if="getKeyValue(item).key == 'action'">
                <table-options>
                    <li
                    @click="
                        $router.push({ name: 'New Shift', query: { shiftId: getKeyValue(item).value } })
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
                        $router.push({ name: 'New Shift' })
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
                    Create Schedule
                    </li>
                    <li
                    @click="
                        $router.push({ name: 'New Shift', query: { shiftId: getKeyValue(item).value } })
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
                    Edit Schedule
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
                    <delete-icon class="mr-3" /> Deactivate
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
      </div>
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
// import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import EditIcon from '@/components/icons/edit.vue'
import Button from '@/components/globals/corniebtn.vue'

import Overlay from '../settings/rolesprivileges/components/overlay.vue'
import Modal from '../settings/rolesprivileges/components/modal.vue'


const shifts = namespace("shifts");

interface IRole {
    name: string,
    description: string,
    isDefault: boolean,
    isSuperAdmin: boolean,
    id: string,
    createdAt: Date,
    updatedAt: Date,
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
    Button,
    Overlay,
    Modal,
  },
})
export default class PractitionerExistingState extends Vue {
  showColumnFilter = false;
  show = false;
  query = "";

  @shifts.State
  shifts!: any[];

  @shifts.Action
  getShifts!: () => Promise<void>;

  @shifts.Action
  deleteShift!: (id: string) => Promise<boolean>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Name",
      value: "name",
      show: true,
    },
    { title: "No. of Days", value: "numberOfDays", show: true },
    { title: "Time Zone", value: "timeZone", show: true },
    {
      title: "Schedule",
      value: "schedule",
      show: true,
    },
    {
      title: "Status",
      value: "status",
      show: false,
    },
    // {
    //   title: "Members",
    //   value: "practitioners",
    //   show: true,
    // },
    {
      title: "Type",
      value: "type",
      show: true,
    },
    {
      title: "Access Role",
      value: "accessRole",
      show: false,
    },
    {
      title: "Gender",
      value: "gender",
      show: false,
    },
    {
      title: "Description",
      value: "description",
      show: false,
    },
    {
      title: "Physical Type",
      value: "physicalType",
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
    // if (this.shifts.length === 0 ) return this.shifs;
    const shifts = this.shifts.map((shift: any) => {
      return {
        ...shift,
        action: shift.id,
        practitioners: shift.practitioners.length,
        numberOfDays: shift.days.length,
        status: shift.status
      };
    });
    return shifts;
    // if (!this.query) return shifts;
    // return search.searchObjectArray(shifts, this.query);
  }

  async remove(id: string) {
    const confirmed = await window.confirmAction({
      message: "Are you sure you want to deactivate this shift? This action cannot be undone.",
    });
    if (!confirmed) return;

    try {
        const response = await this.deleteShift(id);
        if (response) window.notify({ msg: "Shift eactivated", status: "success" });
        this.getShifts()
    } catch (error) {
        window.notify({ msg: "Shift could not deactivated", status: "error" });
        console.log(error)
    }
  }

  created() {
    this.getShifts();
  }

}
</script>
