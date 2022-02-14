<template>
  <modal :visible="show">
    <div class="p-4 w-full">
      <span class="flex justify-between w-full">
        <h2 class="text-primary text-xl font-bold">Password strength</h2>
        <span
          @click="show = false"
          class="cursor-pointer flex items-center justify-center"
        >
          <close-icon class="fill-current text-primary" />
        </span>
      </span>
      <span class="mt-3 pb-4 text-sm border-b-2 flex flex-col">
        All passwords must satisfy these requirements. <br />
        Passwords Must have:
      </span>
      <ul class="text-sm mt-3 list-disc mx-8 my-4 mb-3">
        <li class="pb-3">Must have at least 1 upper case</li>
        <li class="pb-3">Must have at least 1 lower case</li>
        <li class="pb-3">Must have at least 1 number</li>
        <li class="pb-3">Must have at least 1 special character or symbol</li>
        <li class="pb-3">Must be at least 8 characters</li>
      </ul>
      <div class="px-4 py-3 sm:px-6 border-t-2 sm:flex sm:flex-row-reverse">
        <button
          @click="show = false"
          class="rounded-full border border-transparent shadow-sm pl-8 pr-8 px-4 py-2 bg-danger text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-autosm:text-sm"
          type="button"
        >
          Ok
        </button>
      </div>
    </div>
  </modal>
</template>
<script>
import Modal from "@/components/modal.vue";
import CloseIcon from "@/components/icons/CloseIconBlue.vue";

export default {
  name: "PasswordPolicy",
  components: {
    Modal,
    CloseIcon,
  },
  props: {
    visible: {
      required: true,
      type: Boolean,
    },
  },
  watch: {
    show(value) {},
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      },
    },
  },
};
</script>
