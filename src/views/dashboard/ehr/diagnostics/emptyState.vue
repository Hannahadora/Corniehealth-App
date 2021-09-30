<template>
  <div class="w-full pb-80">  
    <div class="w-full flex flex-col justify-center items-center h-96">
        <img src="@/assets/diagnostics.svg" />
        <h3 class="text-center mt-5">
            There are no current diagnosis for this patient <br>
            Add a new diagnosis by clicking the button below
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
                @click="showDiagnostic"
            >
            New Request
            </button>
        </span>
    </div>
         <diagnostic-modal   
          @update:preferred="showDiagnostic"
          v-model="showDiagnosticModal"/>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import Select from "@/components/newautocomplete.vue";
import SearchIcon from "@/components/icons/search.vue";
import IconInput from "@/components/IconInput.vue";
import DiagnosticModal from "./diagnosticdialog.vue";
@Options({
  components: {
    ChevronDownIcon,
    Select,
    SearchIcon,
    IconInput,
    DiagnosticModal,
  },
})
export default class DiagnosticsEmptyState extends Vue {
   showDiagnosticModal= false;
 async showDiagnostic(){
      this.showDiagnosticModal = true;
  }
}
</script>
<style>
.outline-primary{
    border: 2px solid #080056;
}
</style>