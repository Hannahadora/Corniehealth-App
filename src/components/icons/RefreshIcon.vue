<template>
  <svg
    width="20"
    height="14"
    viewBox="0 0 20 14"
    fill="none"
    :class="{ spinner: loading }"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.832 3.66732L12.4987 7.00065H14.9987C14.9987 9.75898 12.757 12.0007 9.9987 12.0007C9.15703 12.0007 8.35703 11.7923 7.66536 11.4173L6.4487 12.634C7.4737 13.284 8.69036 13.6673 9.9987 13.6673C13.682 13.6673 16.6654 10.684 16.6654 7.00065H19.1654L15.832 3.66732ZM4.9987 7.00065C4.9987 4.24232 7.24036 2.00065 9.9987 2.00065C10.8404 2.00065 11.6404 2.20898 12.332 2.58398L13.5487 1.36732C12.5237 0.717317 11.307 0.333984 9.9987 0.333984C6.31536 0.333984 3.33203 3.31732 3.33203 7.00065H0.832031L4.16536 10.334L7.4987 7.00065H4.9987Z"
      fill="#080056"
    />
  </svg>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  name: "RefreshIcon",
})
export default class RefreshIcon extends Vue {
  @Prop({ type: Boolean, default: false })
  loading!: boolean;
}
</script>

<style scoped>
.spinner {
  animation: rotate 2s linear infinite;
}
</style>
