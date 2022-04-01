<template>
  <div class="w-full pb-80">
    <div class="w-full flex flex-col justify-center items-center h-96">
      <img src="@/assets/img/history.svg" />
      <h2 class="text-center mt-5 font-bold">
        No Medical | Family History on Record
      </h2>
      <span class="text-gray-400 text-sm">Family History added will be displayed here</span>
      <span class="flex justify-center w-full">
        <button
          class="bg-danger rounded-lg text-white mt-5 py-2 px-3 pl-12 pr-12 font-semibold focus:outline-none hover:opacity-90"
          @click="showHistory"
        >
          New History
        </button>
      </span>
    </div>
    <history-modal
      :columns="practitioner"
      @update:preferred="showHistory"
      v-model="showHistoryModal"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import Select from "@/components/newautocomplete.vue";
import SearchIcon from "@/components/icons/search.vue";
import IconInput from "@/components/IconInput.vue";
import HistoryModal from "./historyDialog.vue";
@Options({
  components: {
    ChevronDownIcon,
    Select,
    SearchIcon,
    IconInput,
    HistoryModal,
  },
})
export default class HistoryEmptyState extends Vue {
  showHistoryModal = false;
  async showHistory() {
    this.showHistoryModal = true;
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
