<template>
  <cornie-dialog v-model="show" center class="w-5/12 h-2/3">
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <span class="pr-2 flex items-center cursor-pointer border-r-2">
              <cornie-icon-btn @click="show = false">
                <arrow-left-icon />
              </cornie-icon-btn>
            </span>

            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">
              Update Status
            </h2>
          </div>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <div class="w-full">
          <div class="container content-con">
            <div class="w-full py-3">
              <cornie-input
                disabled
                :modelValue="currentStatus"
                label="Current Status"
                class="w-full mb-4"
              />
              <cornie-input
                disabled
                :modelValue="updatedBy"
                label="Updated By"
                class="w-full mb-4"
              />
              <date-picker
                disabled
                :modelValue="updatedAt"
                label="Date Last Updated"
                class="w-full mb-4"
              />
              <cornie-select
                label="Update Status"
                :items="[
                  'unknown',
                  'preliminary',
                  'final',
                  'entered-in-error',
                  'corrected',
                ]"
                v-model="newStatus"
                class="w-full mt-4"
                :rules="required"
              />
            </div>
          </div>
        </div>
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
            @click="apply"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Update
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieCard from "@/components/cornie-card";
import DeleteIcon from "@/components/icons/cancel.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import DatePicker from "@/components/datepicker.vue";
import { string } from "yup";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import CornieIconBtn from "@/components/CornieIconBtn.vue";

import IVital, { IBloodPressure, IHabit } from "@/types/IVital";

const vital = namespace("vitals");

@Options({
  name: "VitalsStatusUpdate",
  components: {
    CornieDialog,
    ArrowLeftIcon,
    CornieIconBtn,
    DatePicker,
    ...CornieCard,
    CornieSelect,
    CornieInput,
    DeleteIcon,
  },
})
export default class StatusUpdate extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: <any>{} })
  vital!: IVital;

  newStatus = "";
  loading = false;
  expand = false;
  isVisible = "";

  required = string().required();

  get updatedAt() {
    return new Date(this.vital?.updatedAt).toLocaleDateString("en-NG");
  }

  get currentStatus() {
    return this.vital?.status;
  }

  get updatedBy() {
    return `${this.vital.practitioner?.lastName} ${this.vital.practitioner?.firstName}`;
  }

  done() {
    this.$emit("status-updated");
    this.show = false;
  }
  async updateStatus() {
    const id = this.id;
    const url = `/api/v1/vitals/signs/status/${id}`;
    const body = {
      status: this.newStatus,
    };
    try {
      const response = await cornieClient().put(url, body);
      if (response.success) {
        window.notify({ msg: "Status Updated", status: "success" });
        this.done();
      }
    } catch (error) {
      window.notify({ msg: "Status Not Updated", status: "error" });
      this.loading = false;
    }
  }

  async apply() {
    this.loading = true;
    await this.updateStatus();
    this.loading = false;
  }

  async created() {}
}
</script>
