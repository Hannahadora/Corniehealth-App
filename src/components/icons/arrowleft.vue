<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 18 14"
    :fill="fill"
    :stroke="stroke"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 1L1 7M1 7L7 13M1 7H17"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator"

@Options({})
export default class ArrowLeftIcon extends Vue {
  @Prop({ type: String, default: "18"})
  width!: string

  @Prop({ type: String, default: "14"})
  height!: string

  @Prop({ type: String, default: "none"})
  fill!: string

  @Prop({ type: String, default: "#0A4269"})
  stroke!: string
}
</script>
