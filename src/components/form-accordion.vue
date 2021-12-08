<template>
<div class="bg-white shadow-md p-3 mb-2 mt-5 w-full">
  <div class="w-full">
      <div class="flex space-x-4 w-full">
        <div class="h-11 w-full border-b-2 border-gray-200 flex items-center justify-between">
            <div contenteditable="true" :value="editabetitle" 
    @input="$emit('update:modelValue', $event.target.innerText)"  class="flex space-x-4 cursor-pointer font-bold text-sm text-black uppercase mb-1" v-if="editabetitle" :class="{ 'text-black': expand }">
                <edit-icon class="mr-3"/> {{ editabetitle }}
            </div>
            <div class="font-bold text-sm text-black uppercase mb-1" v-else :class="{ 'text-black': expand }">
                {{ title }}
            </div>
            <div class="flex space-x-6 justify-end items-end">
                <span
                class="mr-3 cursor-pointer"
                :class="{ 'fill-current text-white': expand }"
                >
                <slot name="misc" />
                </span>
                <div class="flex space-x-3  -mt-4 cursor-pointer" v-if="question"  @click="$emit('showonequestion')">
                            <question-icon class="-mt-4"/> 
                            <span class="-mt-4 text-sm"> Add question</span>
                    </div>
                    <div  v-if="text">
                        <display-icon class="-mt-4  cursor-pointer" @click="$emit('showdisplay')"/>
                    </div>
                    <div  v-if="text2">
                        <display-icon class="-mt-4  cursor-pointer" @click="$emit('anotherdisplay')"/>
                    </div>
                    <div v-if="image">
                        <image-icon class="-mt-4  cursor-pointer"/>
                    </div>
                    <div v-if="video">
                        <video-icon class="-mt-4 cursor-pointer"/>
                    </div>
                
                    <div   v-if="expand" class>
                        <chevron-down-icon
                        class="cursor-pointer stroke-current -mt-4"
                        :class="{ 'text-primary': expand }"
                            @click="expand = false"
                        />
                    </div>
                    <div  v-else>
                        <chevron-right-icon
                        class="cursor-pointer stroke-current -mt-4"
                        :class="{ 'text-primary': expand }"
                            @click="expand = true"
                        />
                    </div>

            </div>
        </div>
        <move-icon class="cursor-pointer mt-1 float-right" v-if="move"/>
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
import MoveIcon from "@/components/icons/move.vue";
import GroupIcon from "@/components/icons/groupform.vue";
import QuestionIcon from "@/components/icons/addform.vue";
import DisplayIcon from "@/components/icons/formtext.vue";
import ImageIcon from "@/components/icons/formimage.vue";
import VideoIcon from "@/components/icons/formvideo.vue";
import EditIcon from "@/components/icons/formedit.vue";

@Options({
  name: "AccordionItem",
  components: {
    ChevronRightIcon,
    ChevronDownIcon,
    MoveIcon,
    GroupIcon,
    QuestionIcon,
    DisplayIcon,
    ImageIcon,
    VideoIcon,
    EditIcon,
  },
})
export default class AccordionComponent extends Vue {
  @Prop({ type: String, default: "" })
  title!: string;

   @Prop({ type: String, default: "" })
  editabetitle!: string;

  @Prop({ type: Boolean, default: false })
  first!: boolean;

 @Prop({ type: Boolean, default: false })
  opened!: boolean;

@Prop({ type: Boolean, default: false })
  question!: boolean;

  @Prop({ type: Boolean, default: false })
  text!: boolean;

   @Prop({ type: Boolean, default: false })
  text2!: boolean;

  @Prop({ type: Boolean, default: false })
  image!: boolean;

  @Prop({ type: Boolean, default: false })
  video!: boolean;

    @Prop({ type: Boolean, default: false })
  move!: boolean;

  @Watch("opened")
  toggled() {
    this.expand = this.opened;
  }

  expand = false;

 

  @Prop({ type: String, default: "" })
  titledescription!: string;

   mounted() {
    this.expand = this.opened;
  }
}
</script>
