<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <span
          class="
            text-primary
            font-extrabold
            text-lg
            border-l-2 border-gray-100
            pl-2
          "
        >
          Check In
        </span>
      </cornie-card-title>

      <check-in :patientId="patientId" @close="show = false" />
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CheckIn from "@/views/dashboard/visits/components/checkin-noappointment.vue";

@Options({
  name: "checkin-dialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    CheckIn,
  },
})
export default class CheckInDialog extends Vue {
  @PropSync("modelValue")
  show!: boolean;

  @Prop({ type: String, required: true })
  patientId!: string;
}
</script>

<style></style>
