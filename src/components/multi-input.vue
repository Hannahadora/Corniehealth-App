<template>
  <div class="flex w-full justify-between">
    <input
      v-for="i in length"
      :key="i"
      maxlength="1"
      class="max-w-rem rounded mb-2 border-primary border-2 py-2 px-4"
      placeholder="--"
      @keydown="keyPressed(i - 1)"
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
    console.log(modelValue);
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
      next = this.$refs[`input${index + 1}`];
    } else {
      next = this.$refs[`input${index - 1}`];
    }
    next?.focus();
  }
}
</script>
<style scoped>
.max-w-rem {
  max-width: 3rem;
}
</style>
