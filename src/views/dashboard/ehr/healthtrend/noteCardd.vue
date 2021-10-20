<template>
  <detail-card height="313px" title="Notes">
  
  </detail-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";

@Options({
  name: "NoteCardd",
  components: {
    DetailCard
  },
})
export default class NoteCardd extends Vue {
}
</script>
