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
          class="
            flex
            items-end
            justify-center
            min-h-screen
            pt-4
            px-4
            pb-20
            text-center
            sm:block
            sm:p-0
          "
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
            class="
              inline-block
              align-bottom
              bg-white
              rounded-lg
              text-left
              overflow-hidden
              shadow-xl
              transform
              transition-all
              sm:my-8
              sm:align-middle
              sm:max-w-sm
              sm:w-full
            "
          >
            <div class="bg-white px-2 pt-3 pb-2 sm:p-3 sm:pb-2">
              <div>
                <div class="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    class="text-lg leading-6 text-primary font-medium"
                    id="modal-title"
                  >
                    Deactivate Group
                  </h3>
                  <div class="mt-5">
                    <div class="mb-7">
                      <date-picker
                        label="Deactivation Date"
                        v-model="deactivateTillDate"
                        placeholder="--Enter--"
                        :rules="required"
                      />
                    </div>
                    <Textarea
                      class="mb-5"
                      label="Reason For Deactivating"
                      v-model="reasonsForDeactivation"
                    />
                  </div>
                </div>
                <close-icon
                  class="items-end absolute right-5 top-5 cursor-pointer"
                  @click="show = false"
                />
              </div>
            </div>
            <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <cornie-btn
                @click="deactivate"
                :loading="loading"
                class="
                  w-full
                  inline-flex
                  justify-center
                  rounded-full
                  border border-transparent
                  shadow-sm
                  px-4
                  py-2
                  bg-danger
                  text-base
                  font-medium
                  text-white
                  focus:outline-none
                  sm:ml-3
                  sm:w-auto
                  sm:text-sm
                "
                type="submit"
              >
                Proceed
              </cornie-btn>
              <button
                @click="$router.push('group')"
                type="button"
                class="
                  mt-3
                  w-full
                  inline-flex
                  justify-center
                  shadow-sm
                  px-4
                  py-2
                  bg-white
                  text-base
                  font-medium
                  text-gray-700
                  hover:bg-gray-50
                  focus:outline-none
                  sm:mt-0
                  sm:ml-3
                  sm:w-auto
                  sm:text-sm
                "
              >
                Cancel
              </button>
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
import CloseIcon from "@/components/icons/close.vue";
import { cornieClient } from "@/plugins/http";
import DatePicker from "@/components/daterangepicker.vue";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "memberModal",
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

  async deactivate() {
    this.loading = true;
    try {
      const response = await cornieClient().post(
        `/api/v1/group/deactivateActivateGroupAccount/${this.paymentId}`,
        this.payload
      );
      if (response.success) {
        this.loading = false;
        window.notify({ msg: response.errors!.summary, status: "success" });
        this.show = false;
      } else {
        window.notify({ msg: response.errors!.summary, status: "error" });
        this.show = false;
      }
    } catch (error) {
      this.loading = false;
      window.notify({ msg: error, status: "error" });
      this.show = false;
    }
  }
}
</script>
