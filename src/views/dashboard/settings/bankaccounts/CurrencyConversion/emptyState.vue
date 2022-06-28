<template>
  <div class="w-1/2 h-2/3 flex flex-col justify-center items-center">
    <img src="@/assets/img/nocurrency.svg" />
    <h3 class="text-center text-black mt-5">No collection account recorded</h3>
    <h4 class="text-black text-center">Add new account</h4>
    <button
      class="bg-danger rounded-lg text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90"
      @click="showNewExchangeRateModal = true"
    >
      <bank-add-icon class="mt-1 mr-2" />
      New Exchange Rate
    </button>

    <new-exchange-rate v-model="showNewExchangeRateModal" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NewExchangeRate from "./newExchangeRate.vue";

@Options({
  components: {
    NewExchangeRate,
  },
})
export default class emptyState extends Vue {
  showNewExchangeRateModal = false;
}
</script>
