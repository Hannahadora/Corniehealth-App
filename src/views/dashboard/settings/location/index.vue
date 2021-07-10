<template>
  <router-view />
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mx-auto
        "
        >Location & Location Hierarchy
      </span>
      <span class="flex">
        <new-location v-if="addLocation" />
        <template v-else>
          <location-empty-state v-if="empty" />
          <location-existing-state v-else />
        </template>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LocationEmptyState from "./emptyState.vue";
import LocationExistingState from "./existingState.vue";
import NewLocation from "./newLocation.vue";
import { cornieClient } from "@/plugins/http";
import ILocation from "@/types/ILocation";

@Options({
  components: {
    LocationEmptyState,
    LocationExistingState,
    NewLocation,
  },
})
export default class Location extends Vue {
  addLocation = false;
  location = [] as ILocation[];
  get empty() {
    return this.location.length < 1;
  }

  async fetchLocations() {
    try {
      const response = await cornieClient().get("/api/v1/location/myOrg/myOrgLocations");
      if (response.success) this.location = [...response.data];
      else console.log(response.message);
    } catch (error) {
      console.log("failed to fetch locations");
    }
  }

  created() {
    this.fetchLocations();
  }
}
</script>
