<template>
  <div class="flex flex-row justify-end mt-8 text-sm">
    <ul class="pagination space-x-4">
      <li class="pagination-item">
          {{ currentPage }}-{{totalPages}} of {{ totalPages }} Items
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
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import PreviousIcon from "./icons/previous.vue";
import NextIcon from "./icons/next.vue"

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

  get startPage() {
    // When on the first page
    if (this.currentPage === 1) {
      return 1;
    }

    // When on the last page
    if (this.currentPage === this.totalPages) {
      return this.totalPages - this.maxVisibleButtons;
    }

    // When inbetween
    return this.currentPage - 1;
  }
  get pages() {
    const range = [];

    for (
      let i = this.startPage;
      i <=
      Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
      i++
    ) {
      range.push({
        number: i,
        isDisabled: i === this.currentPage,
      });
    }

    return range;
  }
  get isInFirstPage() {
    return this.currentPage === 1;
  }

  get isInLastPage() {
    return this.currentPage === this.totalPages;
  }

  onClickPreviousPage(): void {
     this.$emit('pagechanged', this.currentPage - 1);
    //this.handlePageChange(this.currentPage - 1);
  }
  onClickPage(page: number): void {
    this.$emit('pagechanged', page);
    //this.handlePageChange(page);
  }
  onClickNextPage(): void {
    this.$emit('pagechanged', this.currentPage + 1);
    //this.handlePageChange(this.currentPage + 1);
  }

  onClickFirstPage() {
    this.$emit("pagechanged", 1);
  }

  onClickLastPage() {
    this.$emit("pagechanged", this.totalPages);
  }

  isPageActive(page: number) {
    return this.currentPage === page;
  }

  paginate(totalItems: number, currentPage: number, itemsPerPage: number) {
    // calculate start and end index
    const startIndex =
      currentPage == 1 ? currentPage - 1 : (currentPage - 1) * itemsPerPage;

    const stopIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

    return { startIndex, stopIndex };
  }

  handlePageChange(page: number) {
    const pager = this.paginate(this.total, page, this.perPage);

    const pageData = this.items.slice(pager.startIndex, pager.stopIndex + 1);

    this.$emit("pagechanged", {page, pageData });
    console.log(pageData, 'pageData')
  }

  Mounted() {
    if (this.items && this.items.length) {
      this.handlePageChange(this.currentPage);
    }
  }
}
</script>

<style>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  color: #FE4D3C;
  font-weight:bold;
}
.arrowactive{
  background-color: #FE4D3C;
  border-radius: 30px;
  height: 30px;
  width: 30px; 
}
</style>
