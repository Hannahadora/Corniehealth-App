<template>
  <div class="flex items-center inline-block cursor:pointer" v-bind="$attrs" @click="check">
    <radio-on v-if="computedChecked"/>
    <radio-off v-else />
    <label class="ml-2">
      {{ label }}
    </label>
  </div>
</template>
<script lang="ts">
import RadioOff from "@/components/icons/RadioOff.vue"
import RadioOn from "@/components/icons/RadioOn.vue"
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  name: "CornieRadio",
  inheritAttrs: false,
  components: {
    RadioOff,
    RadioOn
  },
})
export default class CornieRadio extends Vue {

  @Prop()
  label!: string;

  @Prop()
  value!: string | number;

  @Prop()
  checked!: Boolean;

  @Prop()
  modelValue!: string | number;

  @Prop()
  name!: string;

  get computedChecked(): boolean {
    return this.modelValue == this.value;
  }

  check() {
    this.$emit("update:modelValue", this.value);
  }

  mounted() {
    if(this.checked) this.$emit("update:modelValue", this.value);
  }
};
</script>
