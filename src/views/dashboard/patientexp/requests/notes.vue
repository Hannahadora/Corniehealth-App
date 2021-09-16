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
          Make Notes
        </span>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <p class="text-sm mb-5">Some subtext if necessary.</p>
        <v-form ref="form">
              <div class="my-2  w-full  flex">
            <Textarea
            label="Notes"
            v-model="notes"
            placeholder="--Enter--"
            :rules="required"
          />
          <span></span>
        </div>
        </v-form>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="save"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieDatePicker from "@/components/datepicker.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { Insurance, IPatient } from "@/types/IPatient";

import { cornieClient } from "@/plugins/http";


@Options({
  name: "notes",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieDatePicker,
    CornieBtn,
  },
})
export default class EmergencyDontactDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

 @Prop({ type: String, default: "" })
  taskId!: string;

loading=  false;
notes='';
availableFilter= false;
profileFilter=false;

 
  async save() {
      this.loading = true;
    await this.submit();
    this.loading = false;
  }

 
  async submit() {
    await this.createNew();
  }

  async createNew() {
    const response = await cornieClient().post(
      "/api/v1/task/notes",
       {text:this.notes, taskId:this.taskId}
    );
    return response.data;
  }

 
  created() {
   
  }
}
</script>

<style></style>
