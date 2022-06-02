<template>
  <div class="">
    <modal :visible="visible">
      <div
        class="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
            >&#8203;</span
          >
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full"
          >
            <div class="bg-white px-2 pt-3 pb-2 sm:p-3 sm:pb-2">
              <div>
                <div class="mt-5 text-center sm:mt-0 sm:text-left">
                  <div class="d-flex w-full">
                    <h3
                      class="text-lg leading-6  text-primary font-bold"
                      id="modal-title"
                    >
                      My Patients ({{ patients.length  }})
                    </h3>
                     <close-icon
                      class="items-end absolute right-5 top-4 cursor-pointer fill-current text-primary"
                      @click="show = false"
                    />
                  </div>
                  <div class="mt-5 my-5" v-for="(item, index) in patients" :key="index">
                    <div class="dflex space-x-4">
                      <div class="w-10 h-10">
                        <avatar
                          v-if="item.profilePhoto"
                          class="mr-2 object-cover object-center w-full h-full visible group-hover:hidden"
                          :src="item.profilePhoto"
                        />
                         <avatar
                          v-else
                          class="mr-2 object-cover object-center w-full h-full visible group-hover:hidden"
                          :src="localSrc"
                        />
                      </div>
                      <div class="w-full">
                        <p class="text-xs text-dark font-semibold">
                          {{ item.firstname +' '+ item.lastname}}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, PropSync } from "vue-property-decorator";
import { cornieClient } from "@/plugins/http";
import { Options, Vue } from "vue-class-component";
import { IPatient } from "@/types/IPatient";


import Modal from "@/components/modal.vue";
import Textarea from "@/components/textarea.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import CloseIcon from "@/components/icons/CloseIconBlue.vue";
import DatePicker from "@/components/daterangepicker.vue";

import Avatar from "@/components/avatar.vue";

const patients = namespace("patients");

@Options({
  name: "patientDialog",
  components: {
    Modal,
    CornieInput,
    DatePicker,
    CornieSelect,
    ArrowLeftIcon,
    CloseIcon,
    EyeIcon,
    DeleteIcon,
    Textarea,
    Avatar
  },
})
export default class patientDialog extends Vue {
  @Prop({ type: Boolean, required: true, default: false })
  visible!: boolean;

  @Prop({ type: String, default: "" })
  paymentId!: string;

  @PropSync("visible", { type: Boolean, required: true, default: false })
  show!: boolean;

  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  loading = false;
  reasonsForDeactivation = "";
  deactivateTillDate = "";
  localSrc = require("../../../../assets/img/placeholder.png");
  required = string().required();

  orgPatients = [];

  get classes() {
    return this.show ? ["flex"] : ["hidden"];
  }
  get payload() {
    return {
      reasonsForDeactivation: this.reasonsForDeactivation,
      deactivateTillDate: this.deactivateTillDate,
    };
  }

  async created(){
    await this.fetchPatients();
  }


}
</script>
