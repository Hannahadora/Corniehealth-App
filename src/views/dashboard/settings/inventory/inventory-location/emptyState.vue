<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/empty-requests.svg" />
    <div class="flex flex-col text-center justify-center items-center">
      <h3 class="font-bold text-2xl">No Locations Record</h3>
      <p> Add a new Location by clicking on “Add new Button” below
      </p>
    </div>
    <button
      class="bg-danger rounded text-white mt-5 py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90"
      @click="showInventory = true">
      Add new
    </button>
  </div>
  <inventory-location-modal v-model="showInventory" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InventoryLocationModal from "./locationModal.vue";
@Options({
  components: {
    InventoryLocationModal
  }
})

export default class LocationEmptyState extends Vue {
  showInventory = false
}
</script>