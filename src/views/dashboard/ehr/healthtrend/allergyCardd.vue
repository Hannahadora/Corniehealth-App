<template>
  <detail-card height="313px" title="Allergies">
  
  </detail-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";

@Options({
  name: "AllergyCardd",
  components: {
    DetailCard
  },
})
export default class AllergyCardd extends Vue {
}
</script>
