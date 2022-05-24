<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
      <img src="@/assets/img/inventory.svg" />
    <h3 class="text-center mt-5">
        No Material Request on Record<br />
    </h3>
    <button  @click="showRequest = true" class="bg-danger rounded text-white mt-5 py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90">
      New Request
    </button>
  </div>
   <request-modal v-model="showRequest" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RequestModal from "./components/requestModal.vue";

@Options({
  components: {
    RequestModal
  },
})
export default class inventoryEmptyState extends Vue {
    showRequest  = false;
}
</script>
