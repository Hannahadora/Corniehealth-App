<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
      <img src="@/assets/img/inventory.svg" />
    <h3 class="text-center mt-5">
        No Inventories on Record<br />
    </h3>
    <button class="bg-danger rounded text-white mt-5 py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90" @click="showMedication = true">
      Add New
    </button>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
  },
})
export default class inventoryEmptyState extends Vue {
    showMedication  = false;
}
</script>
