<template>
  <div class="w-full order-first mt-5">
    <div class="grid grid-cols-1 grid-flow-col gap-4">
      <div>
        <div class="flex space-x-4 w-full justify-between px-3">
          <div
            class="float-left px-3 pl-7 pr-7 py-3 bg-primary border-primary font-semibold text-white uppercase sectionclass text-xs"
          >
            section {{ num1 }} of {{ num2 }}
          </div>
          <div class="float-right flex space-x-4">
            <chevron-down-icon
              class="w-full mt-3 cursor-pointer stroke-current text-primary"
              @click="expand = false"
              v-if="expand"
            />
            <chevron-right-icon
              class="w-full mt-3 cursor-pointer stroke-current text-primary"
              v-else
              @click="expand = true"
            />
            <div>
              <move-icon class="cursor-pointer mt-3" />
            </div>
          </div>
        </div>

        <div class="border-t-2 border-primary">
          <div v-if="expand" class="bg-white shadow">
            <slot name="default" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import ChevronDownIcon from "./icons/chevrondown.vue";
import InfoIcon from "./icons/info.vue";
import IPracticeform from "@/types/IPracticeform";
import AinfoIcon from "./icons/ainfo.vue";
import MoveIcon from "@/components/icons/move.vue";
import { FormValidationResult } from "vee-validate";
import Draggable from "vuedraggable";

const copy = (original: any) => JSON.parse(JSON.stringify(original));

@Options({
  name: "AccordionItem",
  components: {
    Draggable,
    ChevronRightIcon,
    ChevronDownIcon,
    InfoIcon,
    AinfoIcon,
    MoveIcon,
  },
})
export default class AccordionComponent extends Vue {
  // expand =  false;

  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: String, default: "" })
  num1!: string;

  @Prop({ type: String, default: "" })
  num2!: string;

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
<style scoped>
.sectionclass {
  position: relative;
  bottom: -2px;
  right: 12px;
}
</style>
