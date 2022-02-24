<template>
  <button ref="btn" class="relative rounded" :disabled="loading || invalid" :rules="rules">
    <div
      :class="{ invisible: loading }"
      class="px-3 py-2 pl-8 pr-8 flex items-center justify-center w-full h-full"
    >
      <slot />
    </div>
    <div
      v-if="loading"
      class="absolute w-full h-full flex items-center justify-center"
      style="top: 0; left: 0; right: 0; bottom: 0"
    >
      <cornie-circular-progress :color="loadingColor" />
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
    CornieCircularProgress,
  },
})
export default class CornieBtn extends Vue {
  @Prop({ type: Boolean, default: false })
  loading!: boolean;

  @Prop({ type: Boolean, default: false })
  invalid!: boolean;

  @Prop({ type: Object })
  rules!: any;

  @Prop({ type: String, default: "white" })
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
