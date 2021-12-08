<template>
  <cornie-card class="flex flex-col" height="100%">
    <cornie-card-text>
      <h1
        class="
          font-extrabold
          text-lg text-primary
          border-b-2 border-gray
          py-3
          mx-3
        "
      >
        Patients
      </h1>
    </cornie-card-text>
    <cornie-card-text class="flex-grow flex items-center justify-center">
      <cornie-empty-state
        heading="There is currently no patient record!"
        subheading="Register new patients by clicking on the 'Register New' button"
      >
        <template #icon>
          <img src="@/assets/img/patients-and-doctors.svg" />
        </template>
        <template #actions>
          <div class="flex justify-center">
            <cornie-btn class="text-primary border-2 border-primary m-5">
              Export Register
            </cornie-btn>
            <cornie-btn
              class="bg-danger text-white m-5"
              @click="registerNew = true"
            >
              Register New
            </cornie-btn>
          </div>
        </template>
      </cornie-empty-state>
    </cornie-card-text>
    <registration-dialog v-model="registerNew" />
  </cornie-card>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import CornieEmptyState from "@/components/CornieEmptyState.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieCard from "@/components/cornie-card/CornieCard.vue";
import CornieCardTitle from "@/components/cornie-card/CornieCardTitle.vue";
import CornieCardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";

import RegistrationDialog from "./registration-dialog.vue";

@Options({
  name: "PatientEmptyState",
  components: {
    CornieEmptyState,
    CornieCard,
    CornieCardText,
    CornieCardTitle,
    CornieBtn,
    CornieDialog,
    RegistrationDialog,
  },
})
export default class EmptyState extends Vue {
  registerNew = false;
}
</script>
