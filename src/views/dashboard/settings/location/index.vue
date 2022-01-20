<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-2">
      <span
        class="flex border-b-2 w-full font-bold text-lg text-primary py-2"
      >
        Location
      </span>
      <span class="w-full">
        <location-empty-state v-if="empty" />
        <location-existing-state v-else />
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
import { namespace } from "vuex-class";

const location = namespace("location");

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
    return this.locations.length < 1;
  }

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  async created() {
    if (this.locations.length < 1) await this.fetchLocations();
  }
}
</script>
