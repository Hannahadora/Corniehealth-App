<template>
  <div class="w-full">
    <cornie-input
      class="w-full mb-2"
      :label="$attrs.label"
      :placeholder="$attrs.placeholder"
      @keyenter="add"
      v-model="tag"
    />
    <span class="w-full flex flex-wrap">
      <tags
        @remove="remove(tag)"
        :value="tag"
        v-for="(tag, i) in tags"
        :key="i"
        class="my-2"
      />
    </span>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import CornieInput from "./cornieinput.vue";
import Tags from "./Tags.vue";

@Options({
  name: "TagInput",
  components: {
    Tags,
    CornieInput,
  },
})
export default class TagInput extends Vue {
  @Prop({ type: Array, default: [] })
  modelValue!: string[];

  @PropSync("modelValue")
  tags!: string[];

  tag = "";

  remove(tag: string) {
    const tags = this.tags.filter((t) => t != tag);
    this.tags = tags;
  }

  add() {
    if (!this.tag) return;
    this.tags = [...this.tags, this.tag];
    this.tag = "";
  }
}
</script>
