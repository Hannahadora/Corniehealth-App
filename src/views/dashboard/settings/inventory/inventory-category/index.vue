<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
        <inventory-category-empty-state v-if="empty" />
        <inventory-category-existing-state v-else />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import inventoryCategoryEmptyState from "./emptyState.vue";
import inventoryCategoryExistingState from "./existingState.vue";
import { IOrganization } from "@/types/IOrganization";

import { namespace } from "vuex-class";

const organization = namespace("organization");
const inventory = namespace('inventorysettings')
const location = namespace("location");

@Options({
  components: {
    inventoryCategoryEmptyState,
    inventoryCategoryExistingState
  }
})

export default class InventoryCategoryIndex extends Vue {
  empty = false

  @organization.State
  organizationInfo!: IOrganization;

  @organization.Action
  fetchOrgInfo!: () => Promise<void>;

  @inventory.Action
  getAllCategories!: (id: string) => void

  @location.Action
  fetchLocations!: () => Promise<void>;

  async mounted() {
    await this.fetchOrgInfo().then(async () => {
      await this.fetchLocations()
    }).then(async () => {
      console.log('organization', this.organizationInfo)
      const t = await this.getAllCategories(this.organizationInfo.id)
    })
  }
}
</script>