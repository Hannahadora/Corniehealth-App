<template>
  <div class="w-full" :class="{ 'order-first': expand }">
    <div
      class="h-11 w-full flex items-center justify-between px-3 border-2"
      :class="{ 'border-0 rounded-t-xl bg-primary border-primary': expand }"
    >
      <div class="font-semibold" :class="{ 'text-white': expand }">
        {{ title }}
      </div>
      <span class="flex items-center">
        <info-icon  class="cursor-pointer" :title="titledescription"  @click="expand = false" v-if="expand"  :class="{ 'fill-current text-white': expand }">
        </info-icon>
        <ainfo-icon  class="cursor-pointer" :title="titledescription"  v-else @click="expand = true" :class="{ 'fill-current text-white': expand }">
        </ainfo-icon>
        <span
          class="mr-3 cursor-pointer"
          :class="{ 'fill-current text-white': expand }"
        >
          <slot name="misc" />
        </span>
        <chevron-down-icon
          class="cursor-pointer stroke-current"
           :class="{ 'text-white': expand }"
          @click="expand = false"
          v-if="expand"
        />
        <chevron-right-icon
          class="cursor-pointer stroke-current"
           :class="{ 'text-white': expand }"
          v-else
          @click="expand = true"
        />
      </span>
    </div>
    <div v-if="expand"><slot name="default" /></div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import ChevronDownIcon from "./icons/chevrondown.vue";
import InfoIcon from "./icons/info.vue";
import AinfoIcon from "./icons/ainfo.vue";
import { FormValidationResult } from 'vee-validate';

@Options({
  name: "AccordionItem",
  components: {
    ChevronRightIcon,
    ChevronDownIcon,
    InfoIcon,
    AinfoIcon
  },
})
export default class AccordionComponent extends Vue {
 // expand =  false;
  @Prop({ type: String, default: "" })
  title!: string;

@Prop({ type: Boolean, default: false })
  opened!: boolean;

  @PropSync('opened')
  expand!: boolean;

  @Prop({ type: String, default: "" })
  titledescription!: string;

}
</script>
