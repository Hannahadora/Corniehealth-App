<template>
  <div class="flex w-full justify-between">
    <input
      v-for="i in length"
      :key="i"
      maxlength="1"
      :class="[customClass]"
      class="max-w-xs md:w-16 w-12 rounded mb-2 border py-4 px-4 text-center focus:outline-none"
      placeholder="--"
      @keyup="keyPressed(i - 1)"
      :ref="`input${i - 1}`"
      required
      v-model="model[i - 1].val"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Options({})
export default class MultiInput extends Vue {
  @Prop({ type: Number, default: 4 })
  length!: number;

  /**
   * css classes that will be applied to the individual input fields.
   * This is a good place to change border color to
   * reflect success or failure of the code filled in.
   */
  @Prop({ type: String, default: "" })
  customClass!: string;

  model: any[] = [];

  @Prop({ default: "", type: String })
  modelValue!: string;

  setModel() {
    for (let i = 0; i < this.length; i++) {
      this.model[i] = { val: "" };
    }
  }

  @Watch("model", { deep: true })
  inputChanged() {
    const modelValue = this.model.reduce((prev, curr) => prev + curr.val, "");
    this.$emit("update:modelValue", modelValue);
  }

  @Watch("length")
  lengthChanged() {
    this.setModel();
  }
  created() {
    this.setModel();
  }

  keyPressed(index: number) {
    let next: any;
    if (this.model[index].val) {
      [next] = (this.$refs[`input${index + 1}`] as any[]) || [];
    } else {
      [next] = (this.$refs[`input${index - 1}`] as any[]) || [];
    }
    return next?.focus();
  }
}
</script>
<style scoped>
.max-w-rem {
  max-width: 2.5rem;
}
</style>
