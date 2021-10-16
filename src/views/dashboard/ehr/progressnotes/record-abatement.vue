<template>
  <clinical-dialog v-model="show" title="Record Abatement">
    <v-form class="w-full p-3">
      <timeable-picker />
      <measurable />
      <span class="grid grid-cols-2 gap-3 mt-3 border-t-2 pt-5 border-dashed">
        <practitioner-select
          :rules="required"
          v-model="asserter"
          label="Asserter"
        />
      </span>
    </v-form>
    <template #actions>
      <cornie-btn
        @click="show = false"
        class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
      >
        Cancel
      </cornie-btn>
      <cornie-btn class="text-white bg-danger px-7 rounded-xl">
        Save
      </cornie-btn>
    </template>
  </clinical-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ClinicalDialog from "./clinical-dialog.vue";
import TimeablePicker from "./timeable.vue";
import Measurable from "./measurable.vue";
import { Prop, PropSync } from "vue-property-decorator";
import PractitionerSelect from "./practitioner-select.vue";
import IPractitioner from "@/types/IPractitioner";
import { namespace } from "vuex-class";

const user = namespace("user");

@Options({
  name: "RecordAbatement",
  components: {
    ClinicalDialog,
    TimeablePicker,
    Measurable,
    PractitionerSelect,
  },
})
export default class RecordAbatement extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;

  asserter = "";

  @user.Getter
  authPractitioner!: IPractitioner;

  created() {
    this.asserter = this.authPractitioner?.id || "";
  }
}
</script>
