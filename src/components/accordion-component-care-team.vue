<template>
  <div class="w-full">
    <div
      @click="handle"
      class="cursor-pointer h-11 w-full flex items-center justify-between border-b-2"
      :class="{
        'border-0  text-base text-jet_black font-bold': expanded,
        'rounded-t-xl': first && expanded,
      }"
    >
      <div class="font-bold" :class="{ 'text-jet_black': expanded }">
        {{ title }}
      </div>
      <span class="flex items-center">
        <span
          class="mr-3 cursor-pointer"
          :class="{ 'fill-current text-white': expanded }"
        >
          <slot name="misc" v-bind:expanded="expanded" />
        </span>
        <chevron-down-icon
          class="cursor-pointer stroke-current"
          :class="{ 'text-jet_black': expanded }"
          @click="hide"
          v-if="expanded"
        />
        <chevron-right-icon
          class="cursor-pointer stroke-current"
          :class="{ 'text-jet_black': expanded }"
          v-else
          @click="expand"
        />
      </span>
    </div>
    <div v-if="expanded"><slot name="default" /></div>
  </div>
</template>
<script lang="ts">
  import ChevronRightIcon from "@/components/icons/chevronright.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop, Watch } from "vue-property-decorator";
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

    @Prop({ type: Boolean, default: false })
    modelValue!: boolean;

    expanded = false;

    expand() {
      this.expanded = true;
      this.$emit("update:modelValue", true);
    }

    hide() {
      this.expanded = false;
      this.$emit("update:modelValue", false);
    }

    @Prop({ type: String, default: "" })
    titledescription!: string;

    @Watch("modelValue")
    updateVisibility() {
      this.expanded = this.modelValue;
    }
    handle() {
      if (this.expanded) this.hide();
      else this.expand();
    }
    created() {
      this.expanded = Boolean(this.modelValue);
    }
  }
</script>
