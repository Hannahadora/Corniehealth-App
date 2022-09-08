<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-2">
      <span class="flex border-b-2 w-full font-bold text-lg text-primary py-2">
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
  import { Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  // import AddLocation from "./addLocation.vue";
  import LocationEmptyState from "./empty-state.vue";
  import LocationExistingState from "./existing-state.vue";

  const sublocation = namespace("sublocation");

  @Options({
    name: "SubLocationIndex",
    components: {
      LocationEmptyState,
      LocationExistingState,
      // AddLocation,
    },
  })
  export default class LocationIndex extends Vue {
    addLocation = false;
    locationToUpdate = {} as ILocation;

    get empty() {
      return this.locations.length < 1;
    }

    get locationId() {
      return this.$route.params.id.toString();
    }

    @sublocation.State
    locations!: ILocation[];

    @sublocation.Action
    fetchLocations!: (id: string) => Promise<void>;

    async mounted() {
      await this.fetchLocations(this.locationId);
    }
    async created() {
      await this.fetchLocations(this.locationId);
    }

    @Watch("$route")
    async fetchL() {
      await this.fetchLocations(this.locationId);
    }
  }
</script>
