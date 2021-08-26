<template>
  <div class="w-full">
    <div
      class="h-11 w-full flex items-center justify-between px-3 border-2"
      :class="{
        'border-0 bg-primary border-primary': expand,
        'rounded-t-xl': expand,
      }"
    >
      <div class="font-semibold" :class="{ 'text-white': expand }">
        {{ title }}
      </div>
      <span class="flex items-center">
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
import { Prop, Watch ,PropSync} from "vue-property-decorator";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import ChevronDownIcon from "./icons/chevrondown.vue";

@Options({
  name: "AccordionItem",
  components: {
    ChevronRightIcon,
    ChevronDownIcon,
  },
})
export default class AccordionComponent extends Vue {
  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: Boolean, default: false })
  first!: boolean;

 // expand = false;

  @Prop({ type: Boolean, default: "" })
  modelValue!: boolean;

  @PropSync("modelValue")
  expand!: boolean;

  // @Prop({ type: Boolean, default: false })
  // opened!: boolean;

  @Watch("opened")
  toggled() {
    this.expand
  }
  @Prop({ type: String, default: "" })
  titledescription!: string;
}
</script>
