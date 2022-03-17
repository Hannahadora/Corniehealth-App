<template>
  <div>
    <div class="flex" v-if="!listmenu">
      <slot name="topleft" v-if="search">
        <span class="flex items-center" :class="{'mt-4' : !menu}">
          <sort-icon class="mr-5" v-if="menu"/>
          <icon-input
            class="border border-gray-600 py-2 rounded-full focus:outline-none"
            placeholder="Search Table"
            v-model="query"
          >
            <template v-slot:prepend>
              <search-icon />
            </template>
          </icon-input>
        </span>
      </slot>
      <cornie-spacer />
      <span class="flex justify-between items-center" v-if="menu">
        <dots-horizontal-icon class="mr-7" />
        <print-icon class="mr-7" />
        <refresh-icon
          :loading="refreshing"
          class="mr-7 cursor-pointer"
          @click="refresh"
        />
        <filter-icon class="cursor-pointer" @click="$emit('filter')" />
      </span>
    </div>

    <cornie-card class="mt-3 block table-card pb-2" flat>
      <table class="w-full h-full" style="border-radius: 5px">
        <thead class="bg-accent p-4 text-primary">
          <th class="text-left p-2" width="1" v-if="check">
            <cornie-checkbox @click="selectAll" v-model="selectedAll" />
          </th>
          <th class="text-left p-2" width="1">
            <span> # </span>
          </th>
          <template v-for="(column, index) in preferredColumns" :key="index">
            <th class="text-left p-3" v-if="column.show">
              <div class="flex items-center">
                <slot :name="`${column.key}-header`">
                  <span class="uppercase text-xs">
                    {{ column.title }}
                  </span>
                </slot>
                <filter-by-icon
                  v-if="!column.noOrder"
                  class="ml-2 cursor-pointer"
                  @click="setOrderBy(column.orderBy)"
                />
              </div>
            </th>
          </template>
          <th class="text-left p-2" width="1">
            <table-settings-icon
              class="text-primary cursor-pointer"
              @click="showColumnFilter = true"
            />
          </th>
        </thead>

        <tr
          v-for="(row, index) in filteredItems"
          :key="index"
          class="border-t-2 border-2 border-y-gray"
        >
          <td class="p-2" v-if="check">
            <cornie-checkbox @click="select(row)" :checked="isSelected(row)" />
          </td>
          <td class="p-2">{{ index + 1 }}</td>
          <template v-for="(column, index) in preferredColumns" :key="index">
            <td class="p-3 text-sm capitalize" v-if="column.show">
              <slot :name="column.key" :item="row" :index="index">
                {{ row[column.key] }}
              </slot>
            </td>
          </template>
          <td>
            <div class="flex justify-center">
              <cornie-menu top="30px" right="100%">
                <template #activator="{ on }">
                  <icon-btn v-on="on">
                    <dots-horizontal-icon v-on="on" />
                  </icon-btn>
                </template>
                <cornie-card-text :tablecard="true">
                  <slot name="actions" :item="row" :index="index" />
                </cornie-card-text>
              </cornie-menu>
            </div>
          </td>
        </tr>
      </table>
    </cornie-card>

    <column-filter
      :columns="columns"
      v-model:preferred="preferredColumns"
      v-model:visible="showColumnFilter"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableSettingsIcon from "@/components/icons/tablesetting.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import CornieSpacer from "@/components/CornieSpacer.vue";
import DotsHorizontalIcon from "@/components/icons/DotsHorizontalIcon.vue";
import DotsVerticalIcon from "@/components/icons/DotsVerticalIcon.vue";
import FilterByIcon from "@/components/icons/FilterByIcon.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieMenu from "@/components/CornieMenu.vue";
import Card from "@/components/cornie-card/CornieCard.vue";
import RefreshIcon from "@/components/icons/RefreshIcon.vue";
import search from "@/plugins/search";
import CornieCard from "@/components/cornie-card";

import { Prop, PropSync, Watch } from "vue-property-decorator";

interface IPage {
  data: any[];
  numberOfPages: number;
  previousPage: number;
  nextPage: number;
}

type Sorter = (a: any, b: any) => number;
type ItemLoader = (page: number) => Promise<IPage>;

interface IColumn {
  title: string;
  key: string | number;
  orderBy: Sorter;
}

function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "cornie-table",
  emits: ["refresh", "filter"],
  components: {
    SortIcon,
    IconInput,
    SearchIcon,
    TableSettingsIcon,
    PrintIcon,
    FilterIcon,
    CornieSpacer,
    DotsHorizontalIcon,
    DotsVerticalIcon,
    ColumnFilter,
    FilterByIcon,
    CornieCheckbox,
    IconBtn,
    CornieMenu,
    RefreshIcon,
    ...CornieCard,
  },
})
export default class CornieTable extends Vue {
  @Prop()
  columns!: IColumn[];

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @PropSync("modelValue", { type: Array, default: [] })
  items!: any[];

  @Prop({ type: Boolean, default: true })
  check!: boolean;

  @Prop({ type: Boolean, default: false })
  listmenu!: boolean;

  @Prop({ type: Boolean, default: false })
  refreshing!: boolean;

  @Prop({ type: Boolean, default: true })
  search!: boolean;

  @Prop({ type: Boolean, default: true })
  menu!: boolean;

  @PropSync("refreshing")
  refreshSync!: boolean;

  @PropSync("loader", { type: Function })
  loaderProp!: ItemLoader;

  query = "";

  orderBy: Sorter = () => 1;
  selectedItems: any[] = [];
  selectedAll = false;
  showColumnFilter = false;
  preferredColumns: IColumn[] = [];

  nextPage = 1;
  numberOfPages = 0;

  get filteredItems() {
    return this.items
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }

  refresh() {
    this.$emit("refresh");
    this.refreshSync = true;
  }

  setOrderBy(orderBy: Sorter) {
    this.orderBy = orderBy || this.orderBy;
  }

  isSelected(item: any): boolean {
    return !this.selectedItems.every((element: any) => element.id != item.id);
  }

  select(item: any) {
    if (this.isSelected(item))
      this.selectedItems = this.selectedItems.filter(
        (element: any) => element.id != item.id
      );
    else this.selectedItems.push(item);
  }

  async loadItems() {
    const response = await this.loaderProp(this.nextPage);
    this.nextPage = response.nextPage as number;
    this.numberOfPages = response.numberOfPages as number;
    this.items = response.data;
  }

  @Watch("selectedAll")
  onSelectedAllChange(newValue: boolean) {
    this.selectedItems = [];
    if (newValue)
      for (const item of this.filteredItems) this.selectedItems.push(item);
  }

  mounted() {
    this.preferredColumns = this.columns;
    if (this.loaderProp != null) this.loadItems();
  }
}
</script>

<style scoped>
.table-card {
  overflow-x: visible;
  overflow-y: visible !important;
  min-height: auto;
}
.table-card::-webkit-scrollbar {
  width: 5px !important;
  height: 5px !important;
}
.table-card::-webkit-scrollbar-track {
  background-color: #f0f4fe;
  border-radius: 2rem;
}
.table-card::-webkit-scrollbar-thumb {
  background-color: #949eb8;
  border-radius: 2rem;
  border-color: #949eb8;
}
</style>
