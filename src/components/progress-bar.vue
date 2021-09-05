<template>
  <div
    class="w-full rounded-r-xl rounded-l-xl"
    style="background-color: #f0f4fe"
  >
    <div
      :class="[color]"
      class="text-xs leading-none rounded-r-xl rounded-l-xl py-1"
      :style="{ width }"
    ></div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  name: "ProgressBar",
})
export default class ProgressBar extends Vue {
  @Prop({ type: String, default: "100%" })
  width!: string;

  @Prop({ type: String, default: "warning" })
  color!: string;
}
</script>
