<template>
  <div class="flex flex-row justify-between pa-3 mt-8 text-sm">
   
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Options({})
export default class Paginator extends Vue {
  @Prop({ type: Array, required: true, default: [] })
  items!: any[];

  @Prop({ type: Number, default: 3 })
  maxVisibleButtons!: number;

  @Prop({ type: Number})
  totalPages!: number;

  @Prop({ type: Number })
  perPage!: number;

  @Prop({ type: Number })
  currentPage!: number;




}
</script>
