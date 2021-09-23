<template>
  <chart-card height="313px" title="Current Medications">
  
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";

@Options({
  name: "MedicationCard",
  components: {
    ChartCard,
  },
})
export default class MedicationCard extends Vue {
}
</script>
