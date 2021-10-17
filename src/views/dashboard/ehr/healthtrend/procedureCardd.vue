<template>
  <detail-card height="313px" title="Recent Procedures">
  
  </detail-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";

@Options({
  name: "ProcedureCardd",
  components: {
    DetailCard
  },
})
export default class ProcedureCardd extends Vue {
}
</script>
