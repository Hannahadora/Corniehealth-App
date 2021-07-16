<template>
  <div class="">
    <modal :visible="visible">
        <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-end">
                
                     
                    <div class="mt-3 text-center sm:mt-0  sm:text-left">
                        <h3 class="text-lg leading-6 text-primary font-medium" id="modal-title">
                            Remove Account
                        </h3>
                        <div class="mt-4">
                        <p class="text-sm leading-2 font-semibold">
                            Are you sure you want to remove this account? This action cannot be undone.
                        </p>
                        </div>
                    </div>
                    <close-icon class="items-end absolute right-5 top-5 cursor-pointer" @click="show = false" />
                </div>
            </div>
            <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
               
                <cornie-btn @click="deletePayment" class="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-danger text-base font-medium text-white focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm" type="submit">
                Proceed
                </cornie-btn>
                <button type="button" @click="show = false"  :loading="loading" class="mt-3 w-full inline-flex justify-center rounded-full border border-white-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
                </button>
            </div>
            </div>
        </div>
        </div>
     
    </modal>
  </div>
</template>
<script>
import Modal from "@/components/modal.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import CloseIcon from "@/components/icons/close.vue";
import { cornieClient } from "@/plugins/http";
import Swal from "sweetalert2";
export default {
  name: "extraModal",
  components: {
    Modal,
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
    paymentId: {
        type:String,
    }

  },
  data() {
    return {
    loading: false,
    };
  },
  methods: {
    async deletePayment() {
           this.loading = true;
      try {
        const response = await cornieClient().delete(`/api/v1/payments/${this.paymentId}`);
        if (response.success) {
            this.show= false;
            this.loading = false;
          Swal.fire({
                  title: response.message,
                  text: response.success,
                  icon: "success",
                  showCancelButton: false,
                  confirmButtonColor: "#0A4269",
                  confirmButtonText: "Okay, Thanks"
                });
        }
      } catch (error) {
          Swal.fire({
                  title: response.message,
                  text: error,
                  icon: "error",
                  showCancelButton: false,
                  confirmButtonColor: "#0A4269",
                  confirmButtonText: "Okay, Thanks"
                });
      }
    },
  },
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
