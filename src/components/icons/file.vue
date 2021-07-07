<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z"
      fill="#F2F7FF"
    />
    <path
      d="M14 2H6C4.89 2 4 2.89 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2ZM12 19L8 15H10.5V12H13.5V15H16L12 19ZM13 9V3.5L18.5 9H13Z"
      fill="#0A4269"
    />
  </svg>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class FileIcon extends Vue {}
</script>
