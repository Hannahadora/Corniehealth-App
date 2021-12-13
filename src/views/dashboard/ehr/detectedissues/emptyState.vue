<template>
  <div class="w-full pb-80">
    <div class="w-full flex flex-col justify-center items-center h-96">
      <img src="@/assets/img/allergy.svg" />
      <h3 class="text-center mt-5">
        No Detected Issues.<br />
        [Benefit of adding new Detected Issues to the system]
      </h3>
      <span class="flex justify-center w-full">
        <button
          class="bg-danger rounded-full text-white mt-5 py-2 px-3 pl-12 pr-12 font-semibold focus:outline-none hover:opacity-90"
          @click="showIssues"
        >
          New Detected Issues
        </button>
      </span>
    </div>
    <issues-modal
      :columns="practitioner"
      @update:preferred="showIssues"
      v-model="showIssuesModal"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import Select from "@/components/newautocomplete.vue";
import SearchIcon from "@/components/icons/search.vue";
import IconInput from "@/components/IconInput.vue";
import IssuesModal from "./issuesdialog.vue";
@Options({
  components: {
    ChevronDownIcon,
    Select,
    SearchIcon,
    IconInput,
    IssuesModal,
  },
})
export default class IssuesEmptyState extends Vue {
  showIssuesModal = false;
  async showIssues() {
    this.showIssuesModal = true;
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
