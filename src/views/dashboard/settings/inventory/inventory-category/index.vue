<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
        <inventory-category-empty-state v-if="categories.length == 0" />
        <inventory-category-existing-state
          :categories="categoryDisplay"
          v-else
        />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import { namespace } from "vuex-class";
  import inventoryCategoryEmptyState from "./emptyState.vue";
  import inventoryCategoryExistingState from "./existingState.vue";

  const inventory = namespace("inventorysettings");
  const practitioner = namespace("practitioner");

  @Options({
    components: {
      inventoryCategoryEmptyState,
      inventoryCategoryExistingState,
    },
  })
  export default class InventoryCategoryIndex extends Vue {
    empty = false;

    @inventory.Action
    getCategory!: () => Promise<void>;

    @inventory.State
    categories!: any[];

    @practitioner.State
    practitioners!: any[];

    @practitioner.Action
    fetchPractitioners!: () => Promise<void>;

    get categoryDisplay() {
      return this.categories.map((c) => {
        return {
          ...c,
          idc: c.id,
          managerId:
            this.getPdatails(c.manager)?.firstName +
            " " +
            this.getPdatails(c.manager)?.lastName,
          phone: c.phone,
          location:
            c.city == "not available" || c.state == "not available"
              ? "Not available"
              : c.city + ", " + c.state,
        };
      });
    }

    getPdatails(id: string) {
      let a = this.practitioners.find((p) => p.id == id);
      return a;
    }

    async mounted() {
      await this.fetchPractitioners();
      await this.getCategory();
    }
  }
</script>
