<template>
  <detail-card height="313px" title="Appointments">
  
  </detail-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";

@Options({
  name: "AppointmentCardd",
  components: {
    DetailCard
  },
})
export default class AppointmentCardd extends Vue {
}
</script>
