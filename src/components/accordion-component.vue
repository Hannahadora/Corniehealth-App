<template>
  <div class="w-full" :class="{ 'order-first': expand }">
    <div
      class="h-11 w-full flex items-center bg-primary justify-between px-3 border-2"
      :class="{ 'border rounded-t-xl bg-primary border-primary': expand }"
    >
      <div class="font-semibold" :class="{ 'text-white': expand }">
        <slot name="title" />
      </div>
      <span class="flex items-center">
        <info-icon/>
        <span
          class="mr-3 cursor-pointer"
          :class="{ 'fill-current text-white': expand }"
        >
          <slot name="misc" />
        </span>
        <chevron-down-icon
          class="cursor-pointer stroke-current text-white"
          @click="expand = false"
          v-if="expand"
        />
        <chevron-right-icon
          class="cursor-pointer stroke-current text-white"
          v-else
          @click="expand = true"
        />
      </span>
    </div>
    <div v-if="expand" class="w-full border-2"><slot name="default" /></div>
  </div>
</template>
<script>
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import ChevronDownIcon from "./icons/chevrondown.vue";
import InfoIcon from "./icons/info.vue";
export default {
  name: "AccordionItem",
  components: {
    ChevronRightIcon,
    ChevronDownIcon,
    InfoIcon
  },
  data() {
    return {
      expand: false,
    };
  },
};
</script>
