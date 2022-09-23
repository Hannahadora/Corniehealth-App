<template>
  <clinical-dialog
    v-model="show"
    :title="'View Bill'"
    class="md:w-1/4 h-full w-full"
  >
  </clinical-dialog>
</template>
<script lang="ts">
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync } from "vue-property-decorator";

  @Options({
    components: {
      ClinicalDialog,
    },
  })
  export default class PayBill extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop()
    amount!: number;
  }
</script>
