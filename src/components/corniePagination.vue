<template>
<div>
  <div class="flex flex-row float-left justify-start w-100 space-x-5">
     <span> Rows per pages </span>
      <select name="limit" id="limit" class="space-x-5" v-model="limit" @click="changeLimit">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
    </div>
  <div class="flex flex-row justify-end mt-8 text-sm">
  
    <ul class="pagination space-x-4">
      <li class="pagination-item">
          {{ pageInfo.currentPage }}-{{pageInfo.numberOfPages}} of {{ pageInfo.numberOfPages }} Items
      </li>

      <li class="pagination-item">
        <button
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
          :class="{'arrowactive': isInLastPage}"
        >
        <previous-icon class="ml-1"/>
        </button>
      </li>

      <!-- Visible Buttons Start -->

      <li class="pagination-item" v-for="page in pages" :key="page.number">
        <button
          type="button"
          @click="onClickPage(page.number)"
          :disabled="page.isDisabled"
          :class="{ active: isPageActive(page.number) }"
        >
          {{ page.number }}
        </button>
      </li>

      <!-- Visible Buttons End -->

      <li class="pagination-item">
        <button type="button" @click="onClickNextPage" :disabled="isInLastPage" :class="{'arrowactive': !isInLastPage}">
          <next-icon class="ml-1"/>
        </button>
      </li>

      <!-- <li class="pagination-item">
        <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
          Last
        </button>
      </li> -->
    </ul>
  </div>
</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import PreviousIcon from "./icons/previous.vue";
import NextIcon from "./icons/next.vue";


@Options({
   components:{
    PreviousIcon,
    NextIcon
  },
})
export default class Paginator extends Vue {
 
  @Prop({ type: Array, required: true, default: [] })
  items!: any[];

  @Prop({ type: Number, default: 3 })
  maxVisibleButtons!: number;

  @Prop({ type: Number, default: 1 })
  totalPages!: number;

  @Prop({ type: Number, default: 1 })
  perPage!: number;

  @Prop({ type: Number , default: 1})
  currentPage!: number;

  @Prop({ type: Number , default: 1})
  total!: number;

  @Prop({ type: Object, default: {} })
  pageInfo!: any;

  limit = 10;

  get startPage() {
    // When on the first page
    if (this.pageInfo.currentPage === 1) {
      return 1;
    }

    // When on the last page
    if (this.pageInfo.currentPage === this.pageInfo.numberOfPages) {
      return this.pageInfo.numberOfPages - this.maxVisibleButtons;
    }

    // When inbetween
    return this.pageInfo.currentPage - 1;
  }
  get pages() {
    const range = [];

    for (
      let i = this.startPage;
      i <=
      Math.min(this.startPage + this.maxVisibleButtons - 1, this.pageInfo.numberOfPages);
      i++
    ) {
      range.push({
        number: i,
        isDisabled: i === this.pageInfo.currentPage,
      });
    }

    return range;
  }
  get isInFirstPage() {
    return this.pageInfo.currentPage === 1;
  }

  get isInLastPage() {
    return this.pageInfo.currentPage === this.pageInfo.numberOfPages;
  }

  onClickPreviousPage(): void {
     this.$emit('pagechanged', this.pageInfo.currentPage - 1);
  }
  onClickPage(page: number): void {
    this.$emit('pagechanged', {page});
  }
  onClickNextPage(): void {
    this.$emit('pagechanged', {page: this.pageInfo.currentPage + 1});
  }

  isPageActive(page: number) {
    return this.pageInfo.currentPage === page;
  }
  changeLimit(){
    this.$emit('pagechanged', {page:this.pageInfo.currentPage, limit:this.limit});
  }

}
</script>

<style scoped>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  color: #FE4D3C !important;
  background: none !important;
  border: none !important;
  font-weight:bold;
}
.arrowactive{
  background-color: #FE4D3C;
  border-radius: 30px;
  height: 30px;
  width: 30px; 
}
</style>
