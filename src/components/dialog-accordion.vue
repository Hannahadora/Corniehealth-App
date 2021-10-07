<template>
  <div class="shadow-md -mb-5 p-3 w-full h-auto">
    <div class="w-full">
      <div
        class="h-11 w-full flex items-center border-b-2 justify-between"
        :class="{
          'rounded-t-xl': first && expand,
        }"
      >
        <div
          class="font-bold text-sm text-black mb-1"
          :class="{ 'text-black': expand }"
        >
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
            :class="{ 'text-danger': expand }"
            @click="expand = false"
            v-if="expand"
          />
          <chevron-right-icon
            class="cursor-pointer stroke-current"
            :class="{ 'text-danger': expand }"
            v-else
            @click="expand = true"
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
import ChevronRightIcon from "@/components/icons/dialogchevronright.vue";
import ChevronDownIcon from "@/components/icons/dialogchevrondown.vue";

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

  expand = false;

  @Prop({ type: Boolean, default: false })
  opened!: boolean;

  @Watch("opened")
  toggled() {
    this.expand = this.opened;
  }

  @Prop({ type: String, default: "" })
  titledescription!: string;

  mounted() {
    this.expand = this.opened;
  }
}
</script>
