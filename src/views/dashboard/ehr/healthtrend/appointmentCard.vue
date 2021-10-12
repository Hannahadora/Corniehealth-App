<template>
  <detail-card height="313px" title="Appointments">
  
  </detail-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";

@Options({
  name: "AppointmentCard",
  components: {
    DetailCard
  },
})
export default class AppointmentCard extends Vue {
}
</script>
