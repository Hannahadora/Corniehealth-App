<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/empty-requests.svg" />
    <h3 class="text-center mt-5">
      You have no inventory<br />
      Add a new inventory by clicking on “Add new Button” below
    </h3>
    <button
      class="bg-danger rounded text-white mt-5 py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90"
      @click="showInventory = true">
      Add new
    </button>
  </div>
  <inventory-modal v-model="showInventory" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InventoryModal from "./inventoryModal.vue";

@Options({
  components: {
    InventoryModal
  },
})
export default class inventoryEmptyState extends Vue {
  showInventory = false;
}
</script>
