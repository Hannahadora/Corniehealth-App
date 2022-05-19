<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
      <img src="@/assets/img/inventory.svg" />
    <h3 class="text-center mt-5">
        No Material Record on Record<br />
    </h3>
    <button class="bg-danger rounded text-white mt-5 py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90" @click="showReturn = true">
      New Return
    </button>
  </div>
  <return-modal v-model="showReturn"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ReturnModal from "./components/returnModal.vue";


@Options({
  components: {
    ReturnModal
  },
})
export default class returnEmptyState extends Vue {
    showReturn  = false;
}
</script>
