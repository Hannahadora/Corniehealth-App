<template>
  <cornie-dialog v-model="show" right class="lg:w-5/12 w-full h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white overflow-y-scroll"
    >
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Upload Prescription
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <div>Upload your document for approval.</div>
        <v-form class="flex-grow flex flex-col" @submit="save">
          <uploader v-model="form.file" v-model:meta="form.fileInfo" />

          <div class="mt-6 w-full grid grid-cols-2 space-x-4">
            <cornie-input
              label="Prescriber Name"
              v-model="form.prescriberName"
              placeholder="--Enter--"
              class=""
            />
            <cornie-input
              label="Email"
              v-model="form.email"
              placeholder="--Enter--"
            />
          </div>
        </v-form>
      </cornie-card-text>

      <div class="flex items-center justify-end mt-6 mb-6 px-6">
        <cornie-btn
          class="border-primary border-2 px-3 py-1 mr-3 rounded-lg text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          @click="save"
          :loading="loading"
          type="submit"
          class="text-white bg-danger px-3 py-1 rounded-lg"
        >
          Upload
        </cornie-btn>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import PlusIcon from "@/components/icons/plus.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import { namespace } from "vuex-class";
import { CornieUser } from "@/types/user";
import { string } from "yup";
import AutoComplete from "@/components/autocomplete.vue";
import { cornieClient } from "@/plugins/http";
import CornieRadio from "@/components/cornieradio.vue";
import { IPatient } from "@/types/IPatient";
import Uploader from "./uploader.vue";
const cartStore = namespace("cart");

@Options({
  name: "UploadPrescription",
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
    AutoComplete,
    CornieRadio,
    CancelRedBg,
    PlusIcon,
    Uploader,
  },
})
export default class UploadPrescription extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: {} })
  observation!: any;

  @cartStore.Mutation
  updatePrescriptionUpload!: (item: any) => void;

  loading = false;
  form = {
    file: "",
    email: "",
    prescriberName: "",
    fileInfo: "",
  };

  save() {
    this.show = false;
    this.$emit("getFormData", this.form);
    this.updatePrescriptionUpload(this.form);
  }

  created() {
    this.$emit("getFormData", this.form);
  }
}
</script>

<style scoped>
td {
  padding: 16px;
}
</style>
