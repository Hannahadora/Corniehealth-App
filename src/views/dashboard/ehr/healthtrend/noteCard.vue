<template>
  <detail-card height="337px" title="Notes"> </detail-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";

@Options({
  name: "NoteCard",
  components: {
    DetailCard,
  },
})
export default class NoteCard extends Vue {}
</script>
