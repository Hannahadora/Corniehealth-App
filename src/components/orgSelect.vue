<template>
  <select
    v-model="modelValueSync"
    class="
      w-full
      px-3
      py-2
      border border-gray-300
      rounded-md
      placeholder-gray-400
      focus:outline-none
      focus:shadow-outline-blue
      focus:border-blue-300
      transition
      duration-150
      ease-in-out
      sm:text-sm
      sm:leading-5
    "
  >
    <slot></slot>
  </select>
</template>

<script>
export default {
  name: "OrgSelect",
  props: {
    id: String,
    modelValue: String,
    placeholder: String,
  },
  computed: {
    modelValueSync: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
};
</script>
