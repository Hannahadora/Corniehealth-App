<template>
  <input
    :id="id"
    :placeholder="placeholder"
    v-model="modelValueSync"
    :type="type"
    class="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
  />
</template>
<script>
export default {
  name: "OrgInput",
  props: {
    id: String,
    modelValue: String,
    placeholder: String,
    type: String,
  },
  watch: {
    modelValueSync(val) {
      console.log(val);
    },
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
