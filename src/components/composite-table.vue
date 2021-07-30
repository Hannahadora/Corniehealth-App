<template>
  <div class="w-full block">
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
    <Table
      :headers="compositeHeaders"
      :items="filteredItems"
      class="tableu rounded-xl mt-5"
    >
      <template v-slot:item="{ item }">
        <span v-if="Boolean($slots[getKeyValue(item).key])">
          <slot
            :name="getKeyValue(item).key"
            v-bind:item="{ ...getKeyValue(item) }"
          />
        </span>
        <span v-else> {{ getKeyValue(item).value }} </span>
      </template>
    </Table>
    <column-filter
      :columns="headers"
      v-model:preferred="preferredHeaders"
      v-model:visible="showColumnFilter"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Table from "@scelloo/cloudenly-ui/src/components/table";
import { first, getTableKeyValue } from "@/plugins/utils";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import search from "@/plugins/search";
import { Prop } from "vue-property-decorator";

type Header = {
  title: string;
  value: string;
  show: boolean;
  image?: string;
  action?: boolean;
};

@Options({
  name: "CompositeTable",
  components: {
    Table,
    ThreeDotIcon,
    SortIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
  },
})
export default class CompositeTable extends Vue {
  showColumnFilter = false;
  query = "";
  getKeyValue = getTableKeyValue;

  @Prop({ type: Array, default: [] })
  headers!: Header[];

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: Array, default: [] })
  items!: IIndexableObject[];

  preferredHeaders = [] as Header[];

  get filteredItems() {
    if (!this.query) return this.items;
    return search.searchObjectArray(this.items, this.query);
  }

  get compositeHeaders() {
    const preferred =
      this.preferredHeaders.length > 0 ? this.preferredHeaders : this.headers;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), this.actionHeader];
  }

  get actionHeader() {
    const header = this.headers.find((header) => Boolean(header.action));
    return header || { title: "", value: "action", image: true };
  }
}
</script>
