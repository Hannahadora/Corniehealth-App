<template>
  <div class="h-full flex justify-center">
    <div class="w-full">
      <span class="w-full">
        <!-- <org-empty-state/> -->
        <org-exisiting-state />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ISpecial from "@/types/ISpecial";
import { namespace } from "vuex-class";
import OrgEmptyState from "./emptyState.vue";
import OrgExisitingState from "./exisitngState.vue";


@Options({
  name: "orgainizationIndex",
  components: {
    OrgEmptyState,
    OrgExisitingState,
  },
})
export default class orgainizationIndex extends Vue {

 

}
</script>
