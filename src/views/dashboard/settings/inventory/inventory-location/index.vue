<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
        <inventory-location-empty-state v-if="inventoryLocations.length == 0" />
        <inventory-location-existing-state :location="location" v-else />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import { namespace } from "vuex-class";
  import inventoryLocationEmptyState from "./emptyState.vue";
  import inventoryLocationExistingState from "./existingState.vue";

  const inventory = namespace("inventorysettings");
  const practitioner = namespace("practitioner");

  @Options({
    components: {
      inventoryLocationEmptyState,
      inventoryLocationExistingState,
    },
  })
  export default class InventoryLocationIndex extends Vue {
    empty = true;

    @inventory.Action
    getAllLocations!: () => Promise<void>;

    @inventory.State
    inventoryLocations!: any[];

    @practitioner.Action
    fetchPractitioners!: () => Promise<void>;

    @practitioner.State
    practitioners!: any[];

    get location() {
      return this.inventoryLocations.map((l: any) => {
        return {
          ...l,
          manager:
            this.getPdatails(l.manager).firstName +
            " " +
            this.getPdatails(l.manager).lastName,
          address: l.address ? l.address : "Not available",
          city: l.city && l.state ? l.city + "/" + l.state : "Not available",
          phone: l.phone,
          email: l.email,
          status: l.status,
          country: l.country || "Not available",
        };
      });
    }

    getPdatails(id: string) {
      return this.practitioners.find((p) => p.id == id);
    }

    async mounted() {
      await this.getAllLocations();
      await this.fetchPractitioners();
    }
  }
</script>
