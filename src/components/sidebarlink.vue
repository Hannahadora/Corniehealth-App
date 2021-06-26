<template>
  <div
    :id="id"
    class="flex flex-col"
    :class="{
      'w-5/6': hovered,
      'w-3/4 ': !hovered,
      'bg-white rounded-lg bg-opacity-20 p-2': expand,
    }"
  >
    <div class="w-full flex justify-between items-center mx-auto">
      <router-link
        :to="to"
        active-class="py-1 px-2 rounded-2xl bg-danger"
        class="
          hover:bg-light-blue-600
          hover:opacity-50
          pa-2
          w-full
          flex
          items-center
        "
        :class="{ 'justify-center': !hovered }"
      >
        <span class="" :class="{ 'mr-2': hovered }"><slot></slot></span>
        <span class="text-sm font-semibold whitespace-nowrap" v-if="hovered">
          {{ text }}
        </span>
      </router-link>
      <chevron-right-icon
        @click="expand = true"
        :id="`svg-${id}`"
        class="text-white stroke-current cursor-pointer"
        v-if="showExpand && hasChild"
      />
      <chevron-down-icon
        @click="expand = false"
        class="text-white stroke-current cursor-pointer"
        v-if="expand && hasChild"
      />
    </div>
    <span
      v-if="expand && hasChild"
      class="flex flex-col items-start pl-6 border-t-2 mt-2"
    >
      <router-link
        v-for="(child, i) in children"
        :key="i"
        :to="child.to"
        class="text-sm font-light"
      >
        {{ child.text }}
      </router-link>
    </span>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import ChevronRightIcon from "./icons/chevronright.vue";
import ChevronDownIcon from "./icons/chevrondown.vue";

type Child = { text: string; to: string };

@Options({
  components: {
    ChevronRightIcon,
    ChevronDownIcon,
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
  children!: Child[];

  expand = false;

  id = "";

  @Watch("hovered")
  unhovered(status: boolean) {
    if (!status) this.expand = false;
  }

  get hasChild() {
    return this.children.length > 0;
  }
  get showExpand() {
    return this.hovered && !this.active && !this.expand;
  }
  get active() {
    const currentRoute = this.$route.fullPath;

    return currentRoute == this.$router.resolve(this.to).path;
  }
  mounted() {
    document.addEventListener("click", (e) => {
      const sidebarlink = document.getElementById(this.id);
      let targetElement: any = e.target; // clicked element

      do {
        if (
          targetElement == sidebarlink ||
          targetElement.id?.includes(this.id)
        ) {
          return;
        }
        targetElement = (targetElement as any).parentNode;
      } while (targetElement);
      this.expand = false;
    });
  }
  created() {
    const slug = String(Math.random());
    this.id = `click-box-${slug}`;
  }
}
</script>
