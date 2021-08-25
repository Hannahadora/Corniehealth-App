<template>
  <svg width="30" height="30" class="rotate">
    <circle
      cx="15"
      cy="15"
      r="11"
      class="progress"
      :stroke-dasharray="100"
      fill="none"
      stroke-width="4"
      :stroke="color"
    />
  </svg>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

Options({
  name: "cornie-circular-progress",
});
export default class CornieCircularProgress extends Vue {
  @Prop({ type: String, default: "" })
  color!: string;
}
</script>

<style>
@keyframes progress {
  from {
    stroke-dashoffset: 300;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes rotate {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
.progress {
  animation: progress 5s linear forwards infinite;
}
.rotate {
  animation: rotate 1s linear infinite;
}
</style>