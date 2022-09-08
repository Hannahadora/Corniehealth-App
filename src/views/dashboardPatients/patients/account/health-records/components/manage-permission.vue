<template>
  <clinical-dialog v-model="show" title="Manage Permissions"> </clinical-dialog>
</template>
<script lang="ts">
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
  import { Options, Vue } from "vue-class-component";
  import { PropSync } from "vue-property-decorator";

  @Options({
    component: {
      ClinicalDialog,
    },
  })
  export default class managePermissions extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;
  }
</script>
