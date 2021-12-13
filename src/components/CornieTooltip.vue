<template>
  <span class="tooltip-activator" ref="activator">
    <slot name="activator" :on="{ mouseover, mouseout }" />
    <div
      class="bg-primary p-1 text-white tooltip rounded"
      :style="{ opacity: show ? 1 : 0 }"
      ref="tooltip"
    >
      <div
        class="flex items-center"
        :class="{
          'flex-col': top,
          'flex-col-reverse': bottom,
          'flex-row': left,
          'flex-row-reverse': right,
        }"
      >
        <div class="text-xs p-1 flex-grow">
          <slot />
        </div>
        <div class="tooltip-pointer bg-primary rounded" ref="tooltipPointer" />
      </div>
    </div>
  </span>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Ref, Prop, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";

@Options({
  name: "cornie-tooltip",
  components: {
    ...CornieCard,
  },
})
export default class CornieTooltip extends Vue {
  @Prop({ type: Boolean, default: false })
  top!: boolean;

  @Prop({ type: Boolean, default: false })
  left!: boolean;

  @Prop({ type: Boolean, default: false })
  right!: boolean;

  @Prop({ type: Boolean, default: false })
  bottom!: boolean;

  show = false;
  timeout: number | undefined = undefined;

  @Ref()
  activator!: HTMLDivElement;

  @Ref()
  tooltip!: HTMLDivElement;

  @Ref()
  tooltipPointer!: HTMLDivElement;

  mouseover() {
    this.timeout = setTimeout(() => (this.show = true), 100);
  }

  mouseout() {
    clearTimeout(this.timeout);
    this.show = false;
  }

  @Watch("show")
  onShowChanged(newValue: boolean) {
    if (newValue)
      this.$nextTick().then(() => {
        if (this.top) {
          this.tooltip.style.bottom = "calc(100% + 5px)";
          this.tooltip.style.top = "";
          this.tooltip.style.left = `-${
            (this.tooltip.clientWidth - this.activator.clientWidth) / 2
          }px`;
          this.tooltipPointer.style.margin = "0 0 -7px 0";
        } else if (this.bottom) {
          this.tooltip.style.top = "calc(100% + 5px)";
          this.tooltip.style.bottom = "";
          this.tooltip.style.left = `-${
            (this.tooltip.clientWidth - this.activator.clientWidth) / 2
          }px`;
          this.tooltipPointer.style.margin = "-7px 0 0 0";
        } else if (this.left) {
          this.tooltip.style.right = "calc(100% + 5px)";
          this.tooltip.style.left = "";
          this.tooltip.style.top = `-${
            (this.tooltip.clientHeight - this.activator.clientHeight) / 2
          }px`;
          this.tooltipPointer.style.margin = "0 -7px 0 0";
        } else if (this.right) {
          this.tooltip.style.left = "calc(100% + 5px)";
          this.tooltip.style.right = "";
          this.tooltip.style.top = `-${
            (this.tooltip.clientHeight - this.activator.clientHeight) / 2
          }px`;
          this.tooltipPointer.style.margin = "0 0 0 -7px";
        }
      });
  }

  mounted() {}
}
</script>

<style scoped>
.tooltip {
  position: absolute;
  overflow: visible;
  z-index: 10;
  word-wrap: unset;
}

.tooltip-pointer {
  position: relative;
  padding: 7px;
  transform: rotateZ(45deg);
}

.tooltip-activator {
  position: relative;
}
</style>
