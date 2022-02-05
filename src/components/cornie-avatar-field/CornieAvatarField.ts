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
    console.log("original ", props.modelValue);
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
      if (this.initalized) this.$emit("update:modelValue", newValue);
    },
    modelValue(value: string) {
      if (this.initalized) return;
      this.url = value;
      this.initalized = true;
    },
  },
});
