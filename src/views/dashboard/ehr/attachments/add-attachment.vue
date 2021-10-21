<template>
  <clinical-dialog
    v-model="show"
    title="New Condition"
    subtext="All Fields are required"
    class=""
  >
    <v-form ref="form">
      <div class="grid grid-cols-2 gap-3">
        <cornie-input
          :rules="required"
          v-model="title"
          label="Title"
          placeholder="--Enter--"
        />
      </div>
      <uploader v-model="file" />
      <cornie-text-area
        :rules="required"
        v-model="comment"
        label="Comments (Optional)"
      />
    </v-form>
    <template #actions>
      <cornie-btn
        @click="show = false"
        class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
      >
        Cancel
      </cornie-btn>
      <cornie-btn
        :loading="loading"
        @click="submit"
        class="text-white bg-danger px-6 rounded-xl"
      >
        Save
      </cornie-btn>
    </template>
  </clinical-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ClinicalDialog from "@/components/clinical-dialog.vue";
import { Prop, PropSync } from "vue-property-decorator";
import CornieInput from "@/components/cornieinput.vue";
import CornieTextArea from "@/components/textarea.vue";
import Uploader from "./uploader.vue";
import { string } from "yup";

@Options({
  name: "AddAttachment",
  components: {
    ClinicalDialog,
    Uploader,
    CornieInput,
    CornieTextArea,
  },
})
export default class AddAttachment extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;

  loading = false;

  required = string().required();
  title = "";
  file = "";
  comment = "";

  get payload() {
    return {};
  }

  async validate() {
    const { valid } = await (this.$refs.form as any).validate();
    return valid && Boolean(this.file);
  }

  async submit() {
    const valid = await this.validate();
    if (!valid) return;
  }
}
</script>
