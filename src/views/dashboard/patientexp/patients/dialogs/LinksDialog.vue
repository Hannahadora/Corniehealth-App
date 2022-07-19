<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <span
          class="text-primary font-extrabold text-lg border-l-2 border-gray-100 pl-2"
        >
          Link
        </span>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <p class="text-sm mb-5">Please click the dropdown to select a link.</p>
        <v-form ref="form" class="grid grid-cols-1 gap-y-4">
          <cornie-select
            label="Link"
            class="w-full"
            placeholder="Select One"
            :items="linkOptions"
            v-model="link"
          />
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
            @click="submit"
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
import { PropSync, Prop, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieDatePicker from "@/components/CornieDatePicker.vue";
import CornieBtn from "@/components/CornieBtn.vue";

import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import PeriodPicker from "@/components/daterangepicker.vue";
import AutoComplete from "@/components/autocomplete.vue";

@Options({
  name: "guarantor-dialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    AutoComplete,
    ArrowLeftIcon,
    CornieDialog,
    CornieInput,
    CornieSelect,
    PeriodPicker,
    CorniePhoneInput,
    CornieDatePicker,
    CornieBtn,
  },
})
export default class EmergencyDontactDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  link = "";
  allLinks = [] as any;

  linkOptions = [
    "Father",
    "Mother",
    "Sibling",
    "Grand Father",
    "Grand Mother",
    "Uncle",
    "Aunt",
  ];

  loading = false;

  async submit() {
    // this.allLinks.push({links: this.link})
     window.notify({
        msg: `Link created successfully`,
        status: "success",
      });
    this.$emit('links', this.link);
    this.show = false;
   
  }

  created() {}
}
</script>

<style></style>
