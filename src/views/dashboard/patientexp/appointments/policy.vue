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
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-end">
                <div class="mt-3 text-center sm:mt-0 sm:text-left">
                  <div class="grid grid-cols-2 gap-4 mt-10">
                    <p class="text-sm text-primary font-bold">
                      MRN No: <span class="text-black font-medium">mrn</span>
                    </p>
                    <p class="text-sm text-primary font-bold">
                      Gender: <span class="text-black font-medium">Male</span>
                    </p>
                    <p class="text-sm text-primary font-bold">
                      D.O.B:
                      <span class="text-black font-medium"
                        >D.O.B: 12 April, 1989</span
                      >
                    </p>
                    <p class="text-sm text-primary font-bold">
                      Profile Type:
                      <span class="text-black font-medium">XXXXX</span>
                    </p>
                    <p class="text-sm text-primary font-bold">
                      Policy Expiry:
                      <span class="text-black font-medium">XXXXX</span>
                    </p>
                    <p class="text-sm text-primary font-bold">
                      Payer: <span class="text-black font-medium">XXXXX</span>
                    </p>
                    <p class="text-sm text-primary font-bold">
                      Policy No:
                      <span class="text-black font-medium">XXXXX</span>
                    </p>
                  </div>
                </div>
                <h3
                  class="items-start absolute top-5 bottom-8 text-lg leading-6 text-danger font-medium"
                  id="modal-title"
                >
                  Darlington Onyemere
                </h3>
                <close-icon
                  class="items-end absolute right-5 bottom-8 top-5 cursor-pointer"
                  @click="show = false"
                />
              </div>
            </div>
            <div class="px-4 py-3 sm:px-6 justify-center text-center w-full">
              <span class="text-sm font-medium text-primary"
                >View Policy Coverage</span
              >
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import Modal from "@/components/modal.vue";
import CornieInput from "@/components/cornieinput.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { cornieClient } from "@/plugins/http";

export default {
  name: "patientsModal",
  components: {
    Modal,
    CornieInput,
    ArrowLeftIcon,
    CloseIcon,
    EyeIcon,
    DeleteIcon,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    patients: {
      type: Array,
    },
    MRN: {
      type: String,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {},
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
};
</script>
