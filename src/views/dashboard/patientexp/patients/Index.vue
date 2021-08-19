<template>
  <card class="h-full flex items-center justify-center">
    <empty-state
      heading="There is currently no patient record!"
      subheading="Register new patients by clicking on the 'Register New' button"
    >
      <template #icon>
        <img src="@/assets/img/patients-and-doctors.svg" />
      </template>
      <template #actions>
        <div class="flex justify-center">
          <cornie-btn
            class="text-primary border-2 border-primary m-5"
            @click="hello"
          >
            Export Register
          </cornie-btn>
          <cornie-btn class="bg-danger text-white m-5" @click="registerPatient" >
            Register New
          </cornie-btn>
        </div>
      </template>
    </empty-state>
  </card>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import EmptyState from "@/components/EmptyState.vue";
import Card from "@/components/card.vue";
import CornieBtn from "@/components/CornieBtn.vue";

@Options({
  name: "Patients",
  components: {
    EmptyState,
    Card,
    CornieBtn,
  },
})
export default class Patients extends Vue {
  registerPatient() {
    this.$router.push({name: "New Patient"})
  }
}
</script>