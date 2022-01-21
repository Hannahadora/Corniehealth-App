<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <domain-dialog v-model="addNewDomain" center title="Create New Domain">
      <add-domain
        @close-add-domain-diag="addNewDomain = false"
        :id="''"
      ></add-domain>
    </domain-dialog>
    <img src="@/assets/img/empty-domain.svg" />
    <h3 class="text-center mt-5">You have no domains on record</h3>
    <button
      class="bg-danger rounded-md text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90"
      @click="addNewDomain = true"
    >
      Create New Domain
    </button>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AddDomain from "./addDomain.vue";
import DomainDialog from "@/components/domain-dialog.vue";

@Options({
  components: {
    AddDomain,
    DomainDialog,
  },
})
export default class DomainEmptyState extends Vue {
  addNewDomain = false as boolean;
}
</script>
