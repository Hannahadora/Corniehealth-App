<template>
  <div class="w-full order-first mt-5">
   <div class="grid  grid-cols-1 grid-flow-col gap-4">
        <div>
            <div class="h-11 w-full flex items-center justify-between px-3 border-2 border-0 rounded-t-xl bg-primary border-primary">
            <div class="font-semibold text-white uppercase">
                {{ title }}
            </div>
            <span class="flex items-center">
                <p class="text-white">{{titledescription}}</p>
                <span
                class="mr-3 cursor-pointer" :class="{ 'fill-current text-white': expand }">
                <slot name="misc" />
                </span>
            <info-icon  class="cursor-pointer fill-current text-white"></info-icon>
            </span>
            </div>
            <div><slot name="default" /></div>
        </div>
         <move-icon class="cursor-pointer mt-3"/> 
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync,Watch } from "vue-property-decorator";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import ChevronDownIcon from "./icons/chevrondown.vue";
import InfoIcon from "./icons/info.vue";
import IPracticeform from "@/types/IPracticeform";
import AinfoIcon from "./icons/ainfo.vue";
import MoveIcon from "@/components/icons/move.vue";
import { FormValidationResult } from 'vee-validate';
import Draggable from "vuedraggable";

const copy = (original:any) => JSON.parse(JSON.stringify(original));

@Options({
  name: "AccordionItem",
  components: {
    Draggable,
    ChevronRightIcon,
    ChevronDownIcon,
    InfoIcon,
    AinfoIcon,
    MoveIcon
  },
})
export default class AccordionComponent extends Vue {
 // expand =  false;
  
  @Prop({ type: String, default: "" })
  title!: string;



@Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync('modelValue')
  expand!: boolean;

  @Prop({ type: String, default: "" })
  titledescription!: string;

}
</script>
