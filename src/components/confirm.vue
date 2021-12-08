<template>
  <div class="">
    <modal v-model:visible="show">
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
                  <h3
                    class="text-lg leading-6 text-primary font-medium"
                    id="modal-title"
                  >
                    {{ title }}
                  </h3>
                  <div class="mt-4">
                    <p class="text-sm leading-2 font-semibold">
                      {{ message }}
                    </p>
                  </div>
                </div>
                <close-icon
                  class="items-end absolute right-5 top-5 cursor-pointer"
                  @click="cancelled"
                />
              </div>
            </div>
            <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <cornie-btn
                @click="approved"
                class="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-danger text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                type="submit"
              >
                {{ yes }}
              </cornie-btn>
              <cornie-btn
                type="button"
                @click="cancelled"
                class="mt-3 w-full inline-flex justify-center rounded-full border border-white-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {{ no }}
              </cornie-btn>
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
import CloseIcon from "@/components/icons/CloseIcon.vue";

export default {
  name: "Confirm",
  components: {
    Modal,
    ArrowLeftIcon,
    CloseIcon,
  },
  data() {
    return {
      loading: false,
      resolve: (value) => null,
      yes: "Proceed",
      no: "Cancel",
      message:
        "Are you sure you want to do this? This action cannot be undone.",
      title: "Confirm this action",
      show: false,
    };
  },
  methods: {
    approved() {
      this.show = false;
      this.resolve(true);
      this.reset();
    },
    cancelled() {
      this.show = false;
      this.resolve(false);
      this.reset();
    },
    reset() {
      this.yes = "Proceed";
      this.no = "Cancel";
      this.message =
        "Are you sure you want to do this? This action cannot be undone.";
      this.title = "Confirm this action";
    },
    confirm(setup = {}) {
      this.message = setup.message || this.message;
      this.yes = setup.yes || this.yes;
      this.no = setup.no || this.no;
      this.title = setup.title || this.title;
      this.show = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
      });
    },
  },
  created() {
    window.confirmAction = this.confirm;
  },
};
</script>
