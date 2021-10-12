<template>
  <detail-card height="313px" title="Recent Diagnostic Report">
  
  </detail-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";

@Options({
  name: "DiagnosticCardd",
  components: {
    DetailCard
  },
})
export default class DiagnosticCardd extends Vue {
}
</script>
