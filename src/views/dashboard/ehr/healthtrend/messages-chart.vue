<template>
  <chart-card title="Messages" height="439px"> </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";

@Options({
  name: "MessagesChart",
  components: {
    ChartCard,
  },
})
export default class MessagesChart extends Vue {}
</script>
