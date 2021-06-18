<template>
  <modal :visible="show" class="h-1/2 w-1/4">
    <div class="flex justify-center flex-col p-4 w-full">
      <span class="flex justify-between w-full">
        <h2 class="text-primary text-xl font-semibold">Password strength</h2>
        <span
          @click="show = false"
          class="cursor-pointer flex items-center justify-center"
        >
          <close-icon />
        </span>
      </span>
      <p class="mt-3 pb-4 text-sm border-b border-primary">
        All passwords must satisfy these requirements. <br />
        Passwords Must have:
      </p>
      <ul class="text-sm mt-3 list-disc mx-4 mb-3 border-b">
        <li>Must have at least 1 upper case</li>
        <li>Must have at least 1 lower case</li>
        <li>Must have at least 1 number</li>
        <li>Must have at least 1 special character or symbol</li>
        <li>Must be at least 8 characters</li>
      </ul>
    </div>
  </modal>
</template>
<script>
import Modal from "@/components/modal.vue";
import CloseIcon from "@/components/icons/close.vue";

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
    show(value) {
      console.log(value);
    },
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
