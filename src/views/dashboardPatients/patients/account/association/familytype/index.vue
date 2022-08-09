<template>
  <div class="h-full flex justify-center">

        <!-- <family-empty-state/> -->
        <family-exisiting-state />
     
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
