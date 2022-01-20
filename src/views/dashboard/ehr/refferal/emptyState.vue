<template>
  <div class="w-full pb-80">
    <div class="w-full flex flex-col justify-center items-center h-96">
      <img src="@/assets/reffer.svg" />
      <h3 class="text-center mt-5">
        There are no current referral for this patient <br />
        Add a new referral by clicking the button below
      </h3>
      <span class="flex justify-center w-full">
        <button
          class="bg-danger rounded-full text-white mt-5 py-2 px-3 pl-12 pr-12 font-semibold focus:outline-none hover:opacity-90"
          @click="showReffer"
        >
          New Request
        </button>
      </span>
    </div>
    <reffer-modal @update:preferred="showReffer" v-model="showRefferModal" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import Select from "@/components/newautocomplete.vue";
import SearchIcon from "@/components/icons/search.vue";
import IconInput from "@/components/IconInput.vue";
import RefferModal from "./refferDailog.vue";
@Options({
  components: {
    ChevronDownIcon,
    Select,
    SearchIcon,
    IconInput,
    RefferModal,
  },
})
export default class RefferEmptyState extends Vue {
  showRefferModal = false;
  async showReffer() {
    this.showRefferModal = true;
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
