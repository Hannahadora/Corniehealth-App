<template>
  <detail-card height="313px" title="Patient History">
  
  </detail-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";

@Options({
  name: "HistoryCardd",
  components: {
    DetailCard
  },
})
export default class HistoryCardd extends Vue {
}
</script>
