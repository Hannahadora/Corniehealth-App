<template>
  <clinical-dialog v-model="show" title="[Identifier]">
    <template #actions>
      <cornie-btn
        class="border-primary border px-6 mr-3 rounded-xl text-primary"
      >
        Edit
      </cornie-btn>
    </template>
  </clinical-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import ClinicalDialog from "./clinical-dialog.vue";

@Options({
  name: "ViewCondition",
  components: {
    ClinicalDialog,
  },
})
export default class ViewCondition extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;
}
</script>
