<template>
  <div
    class="w-full rounded-r-xl rounded-l-xl"
    style="background-color: #f0f4fe"
  >
    <div
      :class="[color]"
      class="
        text-xs
        w-full
        leading-none
        flex
        justify-center
        items-center
        rounded-r-xl rounded-l-xl
        py-1.5
        px-auto
      "
      :style="{ width }"
    >
      <slot />
    </div>
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
