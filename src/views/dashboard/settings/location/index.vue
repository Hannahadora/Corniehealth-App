<template>
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
      >
        {{ pageTitle }}
      </span>
      <span class="w-full">
        <add-location v-if="addLocation" />
        <template v-else>
          <location-empty-state
            v-if="empty"
            @add-location="addLocation = true"
          />
          <location-existing-state
            v-else
            @add-location="addLocation = true"
            @update-location="updateLocation"
          />
        </template>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import ILocation from "@/types/ILocation";
import { Options, Vue } from "vue-class-component";
import LocationEmptyState from "./emptyState.vue";
import LocationExistingState from "./existingState.vue";
import AddLocation from "./addLocation.vue";

@Options({
  name: "LocationIndex",
  components: {
    LocationEmptyState,
    LocationExistingState,
    AddLocation,
  },
})
export default class LocationIndex extends Vue {
  addLocation = false;
  locationToUpdate = {} as ILocation;
  get empty() {
    return false;
  }

  get pageTitle() {
    if (!this.addLocation) return "Location & Location Hierarchy";
    if (this.locationToUpdate.id) return "Update Location";
    return "New Location";
  }
  updateLocation(loc: ILocation) {
    console.log(loc);
  }
}
</script>
