import Avatar from "@/components/avatar.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import { reactive } from "@vue/reactivity";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "cornie-avatar-field",
  components: {
    Avatar,
  },
  emits: ["update:modelValue"],
  setup() {
    const { url, placeholder, onChange } = useHandleImage();
    return { img: reactive({ url, placeholder, onChange }) };
  },
  props: {
    modelValue: { type: String, default: "" },
    readonly: { type: Boolean, default: false },
  },
  watch: {
    "img.url"(newValue: string) {
      this.$emit("update:modelValue", newValue);
    },
  },
  mounted() {
    this.img.url = this.modelValue;
  },
});
