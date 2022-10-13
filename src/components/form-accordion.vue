<template>
  <div
    class="rounded-lg bg-white p-3 mb-2 mt-5 w-full cursor-pointer"
    :class="{ 'shadow-xl': !addborder }"
  >
    <div class="w-full">
      <div class="flex space-x-4 w-full">
        <div
          class="h-11 w-full flex items-center justify-between cursor-pointer"
          :class="{
            'text-primary': expand,
            'border-b-2 border-gray-200': !addborder,
          }"
          @click="expand = !expand"
        >
          <div
            contenteditable="true"
            :value="editabetitle"
            @input="$emit('update:modelValue', $event.target.innerText)"
            class="flex space-x-4 cursor-pointer font-bold text-sm text-black uppercase mb-1"
            v-if="editabetitle"
            :class="{ 'text-black': expand, capitalize: !addborder }"
          >
            <edit-icon class="mr-3" /> {{ editabetitle }}
          </div>
          <div
            class="font-bold text-sm text-black mb-1"
            v-else
            :class="{ 'text-black': expand }"
          >
            {{ title }}
            <span class="capitalize text-xs text-blue-400" v-if="spanCaption">{{
              spanText
            }}</span>
            <span class="text-xs text-gray-500" v-if="grayCaption"
              >(Optional)</span
            >
          </div>
          <div class="flex space-x-6 justify-end items-end">
            <span
              class="mr-3 cursor-pointer"
              :class="{ 'fill-current text-white': expand }"
            >
              <slot name="misc" />
            </span>
            <div
              class="flex space-x-3 cursor-pointer"
              v-if="add"
              @click="$emit('add')"
            >
              <add-icon class="w-3 h-3" />
              <span class="text-xs font-medium"> Add New</span>
            </div>
            <div
              class="flex space-x-3 cursor-pointer"
              v-if="expandsection"
              @click="$emit('selectExisting')"
            >
              <expand-icon class="w-5 h-5" />
              <span class="text-xs font-medium">{{ expandText }}</span>
            </div>
            <div
              class="flex space-x-3 -mt-4 cursor-pointer"
              v-if="question"
              @click="$emit('showonequestion')"
            >
              <question-icon class="-mt-4" />
              <span class="-mt-4 text-sm"> Add question</span>
            </div>
            <div v-if="text">
              <display-icon
                class="-mt-4 cursor-pointer"
                @click="$emit('showdisplay')"
              />
            </div>
            <div v-if="text2">
              <display-icon
                class="-mt-4 cursor-pointer"
                @click="$emit('anotherdisplay')"
              />
            </div>
            <div v-if="image">
              <image-icon class="-mt-4 cursor-pointer" />
            </div>
            <div v-if="video">
              <video-icon class="-mt-4 cursor-pointer" />
            </div>

            <div v-if="expand" class>
              <ToggleCheckIcon v-if="check" :modelValue="true" />
              <chevron-down-icon
                v-else
                class="cursor-pointer stroke-current -mt-4"
                :class="{ 'text-primary': expand }"
                @click="expand = false"
              />
            </div>
            <div v-else>
              <ToggleCheckIcon v-if="check" :modelValue="false" />
              <chevron-right-icon
                v-else
                class="cursor-pointer stroke-current -mt-4"
                :class="{ 'text-primary': expand }"
                @click="expand = true"
              />
            </div>
          </div>
        </div>
        <move-icon class="cursor-pointer mt-1 float-right" v-if="move" />
      </div>

      <div v-if="expand"><slot name="default" /></div>
    </div>
  </div>
</template>
<script lang="ts">
  import AddIcon from "@/components/icons/add.vue";
  import QuestionIcon from "@/components/icons/addform.vue";
  import ChevronRightIcon from "@/components/icons/chevronright.vue";
  import ExpandIcon from "@/components/icons/expandgreen.vue";
  import EditIcon from "@/components/icons/formedit.vue";
  import ImageIcon from "@/components/icons/formimage.vue";
  import DisplayIcon from "@/components/icons/formtext.vue";
  import VideoIcon from "@/components/icons/formvideo.vue";
  import GroupIcon from "@/components/icons/groupform.vue";
  import MoveIcon from "@/components/icons/move.vue";
  import ToggleCheckIcon from "@/components/ToogleCheck.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop, Watch } from "vue-property-decorator";
  import ChevronDownIcon from "./icons/chevrondownprimary.vue";

  @Options({
    name: "AccordionItem",
    components: {
      ChevronRightIcon,
      ChevronDownIcon,
      MoveIcon,
      GroupIcon,
      QuestionIcon,
      DisplayIcon,
      ToggleCheckIcon,
      ImageIcon,
      VideoIcon,
      EditIcon,
      AddIcon,
      ExpandIcon,
    },
  })
  export default class AccordionComponent extends Vue {
    @Prop({ type: String, default: "" })
    title!: string;

    @Prop({ type: String, default: "" })
    editabetitle!: string;

    @Prop({ type: String, default: "Select existing director" })
    expandText!: string;

    @Prop({ type: Boolean, default: false })
    first!: boolean;

    @Prop({ type: Boolean, default: false })
    opened!: boolean;

    @Prop({ type: Boolean, default: false })
    question!: boolean;

    @Prop({ type: Boolean, default: false })
    spanCaption!: boolean;

    @Prop({ type: Boolean, default: false })
    text!: boolean;

    @Prop({ type: Boolean, default: false })
    spanText!: boolean;

    @Prop({ type: Boolean, default: false })
    check!: boolean;

    @Prop({ type: Boolean, default: false })
    grayCaption!: boolean;

    @Prop({ type: Boolean, default: false })
    addborder!: boolean;

    @Prop({ type: Boolean, default: false })
    text2!: boolean;

    @Prop({ type: Boolean, default: false })
    image!: boolean;

    @Prop({ type: Boolean, default: false })
    video!: boolean;

    @Prop({ type: Boolean, default: false })
    move!: boolean;

    @Prop({ type: Boolean, default: false })
    add!: boolean;

    @Prop({ type: Boolean, default: false })
    expandsection!: boolean;

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
<style scoped>
  :focus-visible {
    outline: unset !important;
  }
</style>
