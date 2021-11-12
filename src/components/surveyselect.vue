<template>
   <span class="relative">
    <div class="bg-white rounded-t p-1 shadow">
       <icon-input
                autocomplete="off"
                class="border border-gray-600 rounded-full focus:outline-none"
                type="search"
                placeholder="Search"
                v-model="query"
              >
                <template v-slot:prepend>
                  <search-icon />
                </template>
              </icon-input>
      <div
        :class="{ hidden: showDatalist }"
        class="
          flex flex-col
          max-h-52
          overflow-y-auto
          bg-white
          z-10
          px-1
          p-4
          w-52
          py-2
        "
          >
        <div
          class="flex flex-row px-1 divide-y-2 divide-solid cursor-pointer hover:bg-gray-100 rounded-full"
           v-for="(item, i) in processedItems"
                :key="i"
                @click="selected(item)"
        >
          <div class="ml-2 text-left text-sm font-medium my-2">
            <span class="cursor-pointer">{{ item.display || item }}</span>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<script lang="ts">
import search from "@/plugins/search";
import { nextTick } from "@vue/runtime-core";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import IconInput from "@/components/IconInput.vue";
import CornieInput from "./cornieinput.vue";
import SearchIcon from "@/components/icons/search.vue";
@Options({
  inheritAttrs: false,
  components: {
    CornieInput,
    IconInput,
    SearchIcon
  },
})
export default class AutoComplete extends Vue {
  @Prop({ type: Array, default: [] })
  items!: any[];

  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  modelValueSync!: string;

  //displayVal = "";

  showDatalist = false;
   query = "";

 @Prop({ type: Function })
  filter!: (item: any, query: string) => boolean;

  customFilter(item: any) {
    if (this.filter) return this.filter(item, this.query);
    if (typeof item === "string" || item instanceof String)
      return item.includes(this.query);
    const { code, display }: { code: string; display: string } = item;
    return (
      `${code}`.toLowerCase().includes(this.query.toLowerCase()) ||
      `${display}`.toLowerCase().includes(this.query.toLowerCase())
    );
  }

  @Watch("query")
  searched(query: string) {
    this.$emit("query", query);
  }
 get processedItems() {
    if (!this.query) return this.items;
    return this.items.filter(this.customFilter);
  }

 get displayVal() {
    if (!this.modelValue || this.items.length < 1) return;

    const selected = this.selectedItem;
    return selected?.display || selected || "";
  }


  get selectedItem() {
    const selected = this.items.find(
      (item) => item.code == this.modelValue || item == this.modelValue
    );
    console.log('jjjj', this.modelValue);
    return selected;
  }


  selected(item: any) {
   // this.displayVal = item.display || item;
     nextTick(() => {
      this.showDatalist = false;
      this.modelValueSync = item.code || item;
    });
     if(item == 'Blank Survey'){
            this.$router.push({path: '/dashboard/settings/practise-management/add-statisfaction-survey' })
        }

     if(item == 'Others'){
            this.$emit('createdquestions','Others');
        }
     if(item == 'Habits'){
            this.$emit('createdquestions','Habits');
        }
     if(item == 'Diet Template'){
            this.$emit('createdquestions', 'Diet');
        }
     if(item == 'Exercise'){
            this.$emit('createdquestions', 'Exercise');
        }
     if(item == 'Sleep'){
            this.$emit('createdquestions', 'Sleep');
        }
  }
}
</script>
