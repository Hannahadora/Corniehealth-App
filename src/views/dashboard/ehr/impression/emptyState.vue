<template>
  <div class="w-full pb-80">
    <div class="w-full flex flex-col justify-center items-center h-96">
      <div class="w-1/2 flex flex-col items-center justify-center">
        <img src="@/assets/img/no-impression.svg" />
        <h3 class="text-center mt-8 text-2xl font-bold">
          No Impressions on Record
        </h3>
        <p class="text-base text-center" style="color: #667499">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum
          aenean mattis mi diam eget.
        </p>
        <span class="flex justify-center w-full mt-8">
          <button
            class="bg-danger rounded-xl text-white mt-5 py-2 px-3 pl-12 pr-12 font-semibold focus:outline-none hover:opacity-90"
            @click="showImpression"
          >
            Clinical Impression
          </button>
        </span>
      </div>
    </div>
    <impression-modal
      :columns="practitioner"
      @update:preferred="showImpression"
      v-model="showImpressionModal"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import Select from "@/components/newautocomplete.vue";
import SearchIcon from "@/components/icons/search.vue";
import IconInput from "@/components/IconInput.vue";
import ImpressionModal from "./impressionDialog.vue";
@Options({
  components: {
    ChevronDownIcon,
    Select,
    SearchIcon,
    IconInput,
    ImpressionModal,
  },
})
export default class ImpressionsEmptyState extends Vue {
  showImpressionModal = false;
  async showImpression() {
    this.showImpressionModal = true;
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
