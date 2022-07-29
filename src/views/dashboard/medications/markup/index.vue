<template>
  <div class="h-full flex justify-center">
    <div class="w-full">
      <span
        class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mx-auto"
      >
        Markup & Discount
      </span>
      <span class="w-full">
        <markup-empty-state v-if="empty" />
        <markup-existing-state v-else />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IGroup from "@/types/IGroup";
import { Options, Vue } from "vue-class-component";
import MarkupEmptyState from "./empty-state.vue";
import MarkupExistingState from "./existingState.vue";
import { namespace } from "vuex-class";
import  IMarkup  from "@/types/IMarkup";


const markup = namespace("markup");
@Options({
  name: "MarkupIndex",
  components: {
    MarkupEmptyState,
    MarkupExistingState,
  },
})
export default class MarkupIndex extends Vue {

  get empty() {
    return this.markups.length < 1;
  }

  @markup.State
  markups!: IMarkup[];

  @markup.Action
  fetchMarkups!: () => Promise<void>;

  async created() {
   await this.fetchMarkups();
  }
}
</script>
