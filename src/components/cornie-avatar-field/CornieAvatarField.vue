<template>
  <div class="image-upload flex items-center">
    <avatar class="mr-2 h-20 w-20" v-if="url" :src="url" />
    <avatar class="mr-2 h-20 w-20" v-else :src="placeholder" />
    <br />
    <input
      type="file"
      accept="image/*"
      name="image"
      id="file"
      @change="onChange"
      hidden
    />
    <div class="flex flex-col">
      <label
        v-if="!readonly"
        for="file"
        :class="{
          'border-danger': Boolean(errorMessage),
          'border-primary': !Boolean(errorMessage),
        }"
        class="text-primary border px-7 py-1.5 rounded-3xl font-bold cursor-pointer"
      >
        {{ text }}
      </label>
      <span v-if="errorMessage" class="text-xs text-red-500 block">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import Avatar from "@/components/avatar.vue";
  import { useHandleImage } from "@/composables/useHandleImage";
  import { defineComponent, watch } from "@vue/runtime-core";
  import { useField } from "vee-validate";
  import { string } from "yup";

  export default defineComponent({
    name: "cornie-avatar-field",
    components: {
      Avatar,
    },
    emits: ["update:modelValue"],
    setup(props) {
      const rule = props.rules || string().url();
      const id = Math.random().toString(36).substring(2, 9);
      const fieldName = `avatar-field-${id}`;
      const { errorMessage, value } = useField(fieldName, rule);

      const { url, placeholder, onChange } = useHandleImage(props.modelValue);

      watch(url, (urlVal) => {
        value.value = urlVal || "";
      });
      return { url, placeholder, onChange, errorMessage };
    },
    data() {
      return {
        initalized: false,
      };
    },
    props: {
      modelValue: { type: String, default: "" },
      readonly: { type: Boolean, default: false },
      rules: { type: Object },
      text: { type: String, default: "Upload Image" },
    },
    watch: {
      url(newValue: string) {
        this.$emit("update:modelValue", newValue);
      },
      modelValue(value: string) {
        if (value == this.url) return;
        this.url = value;
      },
    },
  });
</script>
