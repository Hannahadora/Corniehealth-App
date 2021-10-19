<template>
  <div class="w-full pb-80">  
    <div class="w-full flex flex-col justify-center items-center h-96">
        <img src="@/assets/history.svg" />
        <h3 class="text-center mt-5">
There are no current family medical history for this patient <br>
Add new history by clicking the button below
        </h3>
            <span class="flex justify-center w-full">
        <button
            class="
            bg-danger
            rounded-full
            text-white
            mt-5
            py-2
            px-3
            pl-12
            pr-12
            font-semibold
            focus:outline-none
            hover:opacity-90
            "
            @click="showHistory"
        >
           New History
        </button>
            </span>
    </div>
         <history-modal   
        :columns="practitioner"
          @update:preferred="showHistory"
          v-model="showHistoryModal"/>
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
   showHistoryModal= false;
 async showHistory(){
      this.showHistoryModal = true;
  }
}
</script>
<style>
.outline-primary{
    border: 2px solid #080056;
}
</style>