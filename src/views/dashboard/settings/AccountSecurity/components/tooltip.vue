<template>
  <cornie-tooltip class="cursor-pointer">
    <template #activator="{ on }"> <info-icon v-on="on" /> </template>
    <slot />
  </cornie-tooltip>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTooltip from "@/components/CornieTooltip.vue";
import InfoIcon from "@/components/icons/info-blue-bg.vue";

@Options({
  name: "SecurityTooltip",
  components: {
    CornieTooltip,
    InfoIcon,
  },
})
export default class extends Vue {}
</script>
