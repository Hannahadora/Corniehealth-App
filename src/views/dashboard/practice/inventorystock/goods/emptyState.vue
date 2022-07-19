<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
      <img src="@/assets/img/inventory.svg" />
    <h3 class="text-center mt-5">
        No Goods Receive Note on Record<br />
    </h3>
    <button @click="showGRN = true" class="bg-danger rounded text-white mt-5 py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90">
      New Supply
    </button>
  </div>
  <grn-modal v-model="showGRN" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import GrnModal from "./components/grnModal.vue";

@Options({
  components: {
    GrnModal
  },
})
export default class grnEmptyState extends Vue {
    showGRN  = false;
}
</script>
