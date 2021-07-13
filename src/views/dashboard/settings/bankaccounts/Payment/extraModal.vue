<template>
  <div class="">
    <modal :visible="visible" class="mx-14 w-2/12 p-0">
      <div class="flex bg-primary w-full rounded-t-lg p-2">
        <span class="block pr-2 border-r-2">
          <arrow-left-icon
            class="stroke-current text-white cursor-pointer"
            @click="show = false"
          />
        </span>
      </div>
      <div class="block p-3">
        <li class="list-none my-4 flex cursor-pointer">
          <eye-icon class="mr-3" /> View & Edit
        </li>
        <li class="list-none my-4 flex cursor-pointer">
          <close-icon class="mr-3" /> Deactivate Account
        </li>
        <li class="list-none my-4 flex cursor-pointer">
          <delete-icon class="mr-3" /> Delete Account
        </li>
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

  },
  data() {
    return {};
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
