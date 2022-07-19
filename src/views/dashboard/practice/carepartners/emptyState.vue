<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
     <img src="@/assets/img/empty-care-partners.svg" />
    <div class="flex flex-col justify-center items-center">
      <h3 class="text-center mt-5 font-bold">No care partners on record</h3>
      <p class="text-xs text-gray-400">
       You have no care partners on record
      </p>
    </div>
  </div>
   <carepartner-modal v-model="showCarepartner"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CarepartnerModal from "./PartnerModal.vue";
@Options({
  components: {CarepartnerModal },
})
export default class CarePartnerEmptyState extends Vue {
  showCarepartner = false;
}
</script>
