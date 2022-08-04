<template>
  <div
    :id="id"
    class="flex flex-col"
    :class="{
      'w-5/6': hovered,
      'w-3/4 ': !hovered,
      'bg-white': expand,
      'border-t-2  border-gray-200 py-4': hovered && hasChild
    }"
  >
    <div class="w-full flex justify-between items-center mx-auto">
      <component
        @click="hasChild ? (expand = !expand) : null"
        :is="!hasChild ? 'router-link' : 'span'"
        :to="to"
        active-class="py-2 px-3 rounded-full bg-danger"
        class="hover:bg-light-blue-600 hover:opacity-50 pa-2 w-full cursor-pointer flex items-center"
        :class="{
          'justify-center': !hovered,
          'rounded-full py-1 bg-danger': active && hasChild && !expand,
          'px-2': hovered && !hasChild,
          'uppercase': hasChild
        }"
      >
        <span class="" :class="{ 'mr-2': hovered }"><slot></slot></span>
        <span class="text-sm font-semibold whitespace-nowrap" v-if="hovered">
          {{ text }}
        </span>
        <cornie-spacer v-if="hovered" />
        <chevron-right-icon
          @click="expand = true"
          :id="`svg-${id}`"
          class="text-primary stroke-current cursor-pointer"
          v-if="showExpand && hasChild"
        />
        <chevron-down-icon
          @click="expand = false"
          class="text-primary stroke-current cursor-pointer"
          v-if="expand && hasChild"
        />
      </component>
    </div>
    <span
    v-if="expand && hasChild"
    class="flex flex-col items-start pl-0 mt-2 experience-links-con"
    :class="{
        'experience-links-con-max': showFullHeight,
        'experience-links-con-min': !showFullHeight,
    }"
    >
    <router-link
        v-for="(child, i) in children"
        :key="i"
        :to="child.to"
        class="flex space-x-3 text-xs w-full mt-3"
        active-class="py-1 rounded-2xl bg-danger"
    >

        <span class=""><component class="text-primary fill-current" :is="child.icon"></component></span>
        <span class="text-sm font-semibold whitespace-nowrap" v-if="hovered">
          {{  child.name }}
        </span>
         <cornie-spacer v-if="hovered" />
    </router-link>
    </span>
    <span
      v-if="hasSubsection && expand && text != 'Diagnostics'"
      @click="() => (showFullHeight = !showFullHeight)"
      class="px-3 pb-3 more cursor-pointer"
      :class="{'hidden': !showFullHeight}"
      >{{ showFullHeight ? "See less" : "See more" }}</span
    >
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import ChevronRightIcon from "./icons/chevronright.vue";
import ChevronDownIcon from "./icons/chevrondown.vue";
import CornieSpacer from "./CornieSpacer.vue";
import { clickOutside } from "@/plugins/utils";
import QuestionIcon from "./icons/questionair.vue";
import OnetimeIcon from "./icons/onetimeaccss.vue";
import HealthIcon from "./icons/healthaccess.vue";


type Child = { text: string; to: string };

@Options({
  components: {
    ChevronRightIcon,
    ChevronDownIcon,
    CornieSpacer,
    QuestionIcon,
    OnetimeIcon,
    HealthIcon
  },
})
export default class SidebarLink extends Vue {
  @Prop({ type: String, required: true })
  text!: string;

  @Prop({ type: String, required: false, default: "" })
  to!: string;

  @Prop({ type: Boolean, required: false, default: false })
  hovered!: boolean;

  @Prop({ type: Array, default: [] })
  children!: any;

  @Prop({ type: Boolean, default: false })
  hasSubsection!: boolean;

  expand = false;
  showFullHeight = false;

  id = "";

  @Watch("hovered")
  unhovered(status: boolean) {
    if (!status) {
      this.expand = false;
      this.showFullHeight = false;
    }
  }

  @Prop({ type: Boolean, default: false })
  opened!: boolean;

  @Watch("opened")
  toggled() {
    this.expand = this.opened;
  }
  get hasChild() {
    return this.children.length > 0;
  }
  get showExpand() {
    return this.hovered && !this.expand;
  }
  get active() {
    const currentRoute = this.$route.fullPath;

    return currentRoute.startsWith(this.$router.resolve(this.to).path);
  }
  mounted() {
    clickOutside(this.id, () => (this.expand = false));
  }
  created() {
    const slug = String(Math.random());
    this.id = `click-box-${slug}`;
  }
}
</script>

<style scoped>
.experience-links-con-max {
  height: 405px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.experience-links-con-min {
  height: 130px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.more {
  font-size: 14px;
  color: #ddd;
  font-weight: bold;
}
</style>
