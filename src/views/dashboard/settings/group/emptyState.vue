<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/Group.svg" />
    <h3 class="text-center font-extrabold text-lg mt-5">
      There are no groups added
    </h3>
    <button
      class="bg-danger rounded-md text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90"
      @click="$router.push('/dashboard/provider/add-group')"
    >
      Add a Group
    </button>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class GroupEmptyState extends Vue {}
</script>
