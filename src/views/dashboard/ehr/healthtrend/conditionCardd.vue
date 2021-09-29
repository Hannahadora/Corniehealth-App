<template>
  <detail-card height="313px" title="Current Conditions">
  
  </detail-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";

@Options({
  name: "conditionCardd",
  components: {
    DetailCard
  },
})
export default class conditionCardd extends Vue {
}
</script>
