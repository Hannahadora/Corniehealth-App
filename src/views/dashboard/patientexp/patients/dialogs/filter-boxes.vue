<template>
  <div class="px-3 w-full">
    <div class="w-full flex items-center px-1 justify-between mb-3">
      <span class="text-primary font-bold text-sm"> {{ title }} </span>
      <chevron-down-icon
        class="text-primary stroke-current cursor-pointer"
        @click="show = false"
        v-if="show"
      />
      <chevron-right-icon
        class="text-primary stroke-current cursor-pointer"
        @click="show = true"
        v-else
      />
    </div>
    <cornie-card
      height="250px"
      flat
      class="border px-2 overflow-auto"
      :class="{ hidden: !show }"
    >
      <search-input class="fixed" v-if="searchable" v-model="query" />
      <div>
        <cornie-check label="Show All" v-model="all" />
        <cornie-check
          v-for="item in items"
          :key="item"
          v-model="options[item]"
          :label="item"
        />
      </div>
    </cornie-card>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import SearchInput from "@/components/search-input.vue";
import CornieCard from "@/components/cornie-card";
import CornieCheck from "@/components/custom-checkbox.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";

@Options({
  name: "AdvancedFilterBoxes",
  components: {
    ...CornieCard,
    ChevronDownIcon,
    SearchInput,
    CornieCheck,
    ChevronRightIcon,
  },
})
export default class FilterBoxes extends Vue {
  @Prop({ type: Array, default: [] })
  items!: string[];

  @Prop({ type: Boolean, default: true })
  searchable!: boolean;

  @Prop({ type: Array, default: [] })
  modelValue!: string[];

  @PropSync("modelValue")
  selected!: string[];

  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: Boolean, default: false })
  opened!: boolean;

  show = false;

  query = "";

  all = false;

  options = {};

  @Watch("all")
  showAll() {
    this.setOptions();
  }

  @Watch("options", { deep: true })
  changed() {
    const selected: string[] = [];
    let all = true;
    Object.entries(this.options).forEach(([key, val]) => {
      if (val) selected.push(key);
      else all = false;
    });
    this.selected = selected;
    if (!all) this.all = false;
  }

  setOptions() {
    const options: any = {};
    this.items.forEach((key) => (options[key] = this.all));
    this.selected?.forEach((key) => (options[key] = true));
    this.options = options;
  }

  mounted() {
    this.show = this.opened;
    this.all = this.selected?.length ? false : true;
    this.setOptions();
  }
}
</script>
