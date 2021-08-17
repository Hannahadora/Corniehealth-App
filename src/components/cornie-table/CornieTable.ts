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
import IconBtn from "@/components/iconbtn.vue";
import CornieMenu from "@/components/CornieMenu.vue";
import RefreshIcon from "@/components/icons/RefreshIcon.vue";

import { Prop, PropSync, Watch } from "vue-property-decorator";

type Sorter = (a: any, b: any) => number;

interface IColumn {
  title: string;
  key: string | number;
  orderBy: Sorter;
}

@Options({
  name: "cornie-table",
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
  },
})
export default class CornieTable extends Vue {
  @Prop()
  columns!: IColumn[];

  @Prop({ type: Function, default: (item: any, query: string) => true })
  filter!: (item: any, query: string) => boolean;

  query = "";
  orderBy: Sorter = (a: any, b: any) => -1;
  selectedItems: any[] = [];
  selectedAll = false;

  get filteredItems() {
    return this.syncedModelValue
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
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

  @Watch("selectedAll")
  onSelectedAllChange(newValue: boolean) {
    this.selectedItems = [];
    if (newValue)
      for (const item of this.filteredItems) this.selectedItems.push(item);
  }

  @PropSync("modelValue", { type: Array, default: [] })
  syncedModelValue!: any[];
}
