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
                <div class="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    class="text-lg leading-6 text-primary font-medium"
                    id="modal-title"
                  >
                    My Patients (2)
                  </h3>
                  <div class="mt-5">
                    <div class="dflex space-x-4">
                      <div class="w-10 h-10">
                        <avatar
                          class="mr-2 object-cover object-center w-full h-full visible group-hover:hidden"
                          :src="localSrc"
                        />
                      </div>
                      <div class="w-full">
                        <p class="text-xs text-dark font-semibold">
                          Samuel Aneme
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <close-icon
                  class="items-end absolute right-5 top-5 cursor-pointer"
                  @click="show = false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script lang="ts">
import Modal from "@/components/modal.vue";
import Textarea from "@/components/textarea.vue";
import { Prop, PropSync } from "vue-property-decorator";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import { string } from "yup";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { cornieClient } from "@/plugins/http";
import DatePicker from "@/components/daterangepicker.vue";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "PateintModal",
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
  },
})
export default class memberModal extends Vue {
  @Prop({ type: Boolean, required: true, default: false })
  visible!: boolean;

  @Prop({ type: String, default: "" })
  paymentId!: string;

  @PropSync("visible", { type: Boolean, required: true, default: false })
  show!: boolean;

  loading = false;
  reasonsForDeactivation = "";
  deactivateTillDate = "";
  localSrc = require("../../../../assets/img/placeholder.png");
  required = string().required();

  get classes() {
    return this.show ? ["flex"] : ["hidden"];
  }
  get payload() {
    return {
      reasonsForDeactivation: this.reasonsForDeactivation,
      deactivateTillDate: this.deactivateTillDate,
    };
  }
}
</script>
