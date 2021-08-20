<template>
  <button
    ref="btn"
    class="
      relative
      rounded-3xl
    "
    :disabled="loading"
  >
    <div :class="{invisible: loading}" class="px-5 py-2 flex items-center justify-center w-full h-full">
      <slot />
    </div>
    <div v-if="loading" class="absolute w-full h-full flex items-center justify-center" >
      <cornie-circular-progress :color="loadingColor"/>
    </div>
  </button>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import CornieCircularProgress from "./CornieCircularProgress.vue";

@Options({
  name: "cornie-btn",
  components: {
    CornieCircularProgress
  }
})
export default class CornieBtn extends Vue {
  @Prop({ type: Boolean, default: false })
  loading!: boolean;

  @Prop({ type: String, default: "white"})
  loadingColor!: string;

  @Prop()
  large!: boolean;
}
</script>

<style scoped>
  .invisible {
    visibility: hidden;
  }
</style>