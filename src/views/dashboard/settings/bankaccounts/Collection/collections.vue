<template>
  <div class="block h-screen justify-center">
    <add-collection v-if="addAccount" />
    <template v-else>
      <bank-empty-state v-if="empty" msg="No Collection Accounts" />
      <collection-existing-state v-else @add-account="addAccount = true" />
    </template>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BankEmptyState from "../emptyState.vue";
import CollectionExistingState from "./collectionexistingstate.vue";
import ICollection from "@/types/ICollection";
import { cornieClient } from "@/plugins/http";
import AddCollection from "./addCollection.vue";

@Options({
  components: {
    BankEmptyState,
    CollectionExistingState,
    AddCollection,
  },
})
export default class Collection extends Vue {
  addAccount = false;
  collections = [] as ICollection[];

  get empty() {
    return this.collections.length < 1;
  }

  async fetchCollections() {
    try {
      const response = await cornieClient().get(
        "/api/v1/collection/myOrg/getMyOrgCollections"
      );
      if (response.success) this.collections = response.data || [];
      else alert(response.errors!.summary);
    } catch (error) {
      alert("failed to fetch collections");
    }
  }

  created() {
    this.fetchCollections();
  }
}
</script>
