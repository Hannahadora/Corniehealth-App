<template>
  <li
    @click="$emit('click', $event)"
    class="
      list-none
      flex
      my-1
      py-3
      items-center
      text-xs
      font-semibold
      text-gray-700
      hover:bg-gray-100
      rounded-md
      hover:text-gray-900
      cursor-pointer
    "
  >
    <slot />
  </li>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "TableOptionContent",
})
export default class TableOption extends Vue {}
</script>
