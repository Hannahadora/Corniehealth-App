<template>
  <detail-card height="313px" title="Patient History">
  
  </detail-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";

@Options({
  name: "HistoryCard",
  components: {
    DetailCard
  },
})
export default class HistoryCard extends Vue {
}
</script>
