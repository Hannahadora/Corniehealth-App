<template>
  <empty-state 
    heading="There is currently no patient record!" 
    subheading="Register new patients by clicking on the 'Register New' button"
  >
    <corniebtn>
      hello
    </corniebtn>
  </empty-state>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import EmptyState from "@/components/EmptyState.vue";

@Options({
  name: "Patients",
  components: {
    EmptyState
  }
})
export default class Patients extends Vue {

}
</script>