<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
        <goods-empty-state v-if="empty" />
        <goods-existing-state v-else />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import GoodsEmptyState from "./emptyState.vue";
import GoodsExistingState from "./existingState.vue";
import IGrn from "@/types/IGrn";

const grn = namespace("grn");

@Options({
  name: "GoodsIndex",
  components: {
    GoodsEmptyState,
    GoodsExistingState,
  },
})
export default class GoodsIndex extends Vue {

  get empty() {
    return this.grns.length < 1;
  }

  @grn.State
  grns!: IGrn[];

  @grn.Action
  fetchGrns!: () => Promise<void>;


  async created() {
    await this.fetchGrns();
  }
}
</script>
