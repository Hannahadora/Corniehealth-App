<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/empty-domain.svg" />
    <h3 class="text-center mt-5">You have no domains on record</h3>
    <button
      class="
        bg-danger
        rounded-full
        text-white
        mt-5
        py-2
        px-3
        focus:outline-none
        hover:opacity-90
      "
       @click="$router.push('add-domain')"
    >
      Create New Domain
    </button>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class DomainEmptyState extends Vue {}
</script>
