<template>
  <div class="block h-screen">
    <bank-empty-state v-if="empty" />
    <collection-existing-state v-else />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BankEmptyState from "../emptyState.vue";
import CollectionExistingState from "./collectionexistingstate.vue";
import ICollection from "@/types/ICollection";
import { cornieClient } from "@/plugins/http";

@Options({
  components: {
    BankEmptyState,
    CollectionExistingState,
  },
})
export default class Collection extends Vue {
  collections = [] as ICollection[];

  get empty() {
    return this.collections.length < 1;
  }

  async fetchCollections() {
    try {
      const response = await cornieClient().get(
        "/api/v1/collection/myOrg/getMyOrgCollections"
      );
      if (response.success) this.collections = [...response.data];
      else console.log(response.message);
    } catch (error) {
      console.log("failed to fetch collections");
    }
  }

  created() {
    this.fetchCollections();
  }
}
</script>
