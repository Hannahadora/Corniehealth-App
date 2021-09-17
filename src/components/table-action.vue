<template>
  <div
    @click="$emit('click')"
    class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: "TableAction",
};
</script>
