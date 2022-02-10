import Avatar from "@/components/avatar.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "cornie-avatar-field",
  components: {
    Avatar,
  },
  emits: ["update:modelValue"],
  setup(props) {
    const { url, placeholder, onChange } = useHandleImage(props.modelValue);
    return { url, placeholder, onChange };
  },
  data() {
    return {
      initalized: false,
    };
  },
  props: {
    modelValue: { type: String, default: "" },
    readonly: { type: Boolean, default: false },
  },
  watch: {
    url(newValue: string) {
      this.$emit("update:modelValue", newValue);
    },
    modelValue(value: string) {
      return
      if (this.url == value) return
      this.url = value;
    },
  },
});
