<template>
  <div class="bg-white shadow-md p-3 mt-2 mb-2 rounded w-full h-full">
    <div class="w-full">
      <div
        @click="handle"
        class="h-11 w-full border-b-2 cursor-pointer flex items-center justify-between"
        :class="{
          'bg-white': expand,
          'rounded-t-xl': first && expand,
        }"
      >
        <div class="font-bold text-base mb-1" :class="{ 'text-black': expand }">
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
            :class="{ 'text-primary': expand }"
            @click="hide"
            v-if="expand"
          />
          <chevron-right-icon
            class="cursor-pointer stroke-current"
            :class="{ 'text-primary': expand }"
            v-else
            @click="expanded"
          />
        </span>
      </div>
      <div v-if="expand"><slot name="default" /></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import ChevronDownIcon from "./icons/chevrondownprimary.vue";

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

  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  expand = true;

  expanded() {
    this.expand = true;
    this.$emit("update:modelValue", true);
  }

  hide() {
    this.expand = false;
    this.$emit("update:modelValue", false);
  }

  @Prop({ type: String, default: "" })
  titledescription!: string;

  handle() {
    if (this.expand) this.hide();
    else this.expanded();
  }
  created() {
    this.expand = Boolean(this.modelValue);
  }
}
</script>
