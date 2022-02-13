<template>
  <cornie-btn
    @click="$emit('click')"
    class="text-primary font-semibold border rounded-full border-primary"
  >
    <slot />
  </cornie-btn>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "securitybutton",
  emits: ["click"],
  components: {},
})
export default class extends Vue {}
</script>
