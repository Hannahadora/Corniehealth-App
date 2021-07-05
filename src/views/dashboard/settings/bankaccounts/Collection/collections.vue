<template>
  <div>
    <bank-empty-state v-if="empty" />
    <collection-existing-state />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BankEmptyState from "../emptyState.vue";
import CollectionExistingState from "./collectionexistingstate.vue";

@Options({
  components: {
    BankEmptyState,
    CollectionExistingState,
  },
})
export default class Collection extends Vue {
  // get empty() {
  // }
}
</script>
