<template>
  <div class="flex flex-row justify-between pa-3 mt-8 text-sm">
    <span class="text-gray-400"> Showing {{ page }} of {{ numOfPages }} </span>
    <div class="flex flex-row">
      <span @click="switchPage(-1)" class="mx-1 cursor-pointer">
        Previous
      </span>
      <span
        v-for="p in numOfPages"
        :key="p"
        @click="page = p"
        :class="{
          'justify-center flex shadow-md rounded-md bg-blue-700': p == page,
        }"
        class="mx-1 cursor-pointer w-6 h-6"
      >
        {{ p }}
      </span>
      <span @click="switchPage(1)" class="mx-1 cursor-pointer w-6 h-6">
        Next
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Options({})
export default class Paginator extends Vue {
  @Prop({ type: Array, required: true, default: [] })
  items!: any[];

  @Prop({ type: Number, default: 10 })
  itemsPerPage!: number;

  @Prop({ type: Array, required: true, default: [] })
  pagedItems!: any[];

  page = 1;

  get pageItems() {
    if (this.chunkedItems.length < this.page) return [];
    return this.chunkedItems[this.page - 1];
  }

  @Watch("pageItems")
  pageUpdated(val: any[]) {
    this.$emit("update:pagedItems", val);
  }

  get numOfPages() {
    return this.chunkedItems.length;
  }

  get chunkedItems() {
    let chunks = [] as Array<any[]>;
    this.items.forEach((item) => {
      let cur = chunks.pop() || [];
      if (cur.length >= this.itemsPerPage) {
        chunks.push(cur);
        cur = [];
      }
      cur.push(item);
      chunks.push(cur);
    });
    return chunks;
  }

  switchPage(num: number) {
    const newPage = this.page + num;
    console.log(newPage, 'New{age');
    if (newPage < 1) return;
    if (newPage > this.numOfPages) return;
    this.page = newPage;
  }
}
</script>
