<template>
  <div class="h-full flex justify-center">
    <div class="w-full">
      <span class="w-full">
        <family-empty-state/>
        <!-- <family-existing-state /> -->
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ISpecial from "@/types/ISpecial";
import { namespace } from "vuex-class";
import FamilyEmptyState from "./emptyState.vue";
import FamilyExisitingState from "./exisitngState.vue";


@Options({
  name: "familytypeIndex",
  components: {
    FamilyEmptyState,
    FamilyExisitingState,
  },
})
export default class familytypeIndex extends Vue {

 

}
</script>
