<template>
  <div class="w-full" :class="{relative: showDatalist}" :id="id" @click="showDatalist = !showDatalist" >
    <label
      v-if="label"
      class="block uppercase text-xs mb-1 font-bold"
      :for="`${id}-inputfield`"
    >
      {{ label }}
      <span class="text-danger">
        {{required? "*" : ""}}
      </span>
    </label>
    <div
      class="bg-white flex border border-gray-200 rounded-lg"
      v-bind="$attrs"
    >
      <span v-if="Boolean($slots.selected)">
        <slot name="selected" :item="selectedItem" />
      </span>
      <input
        v-else
        :placeholder="$attrs.placeholder || ''"
        disabled
        :value="displayVal"
        class="
          bg-transparent
          p-2
          appearance-none
          outline-none
          w-full
          text-gray-800
        "
      />

      <div
        class="
          text-gray-300
          py-1
          pr-3
          flex
          items-center
          border-gray-200
        "
      >
        <chevron-down-icon />
      </div>
    </div>
  <div
    :class="{ hidden: !showDatalist }"
    class="
      absolute
      shadow
      bg-white
      top-100
      z-50
      w-full
      lef-0
      rounded
      max-h-select
      overflow-y-auto
      mt-2
    "
  >
    <div class="flex flex-col w-full p-2">
      <div
        v-for="(item, i) in items"
        :key="i"
        @click="selected(item)"
        class="
          cursor-pointer
          w-full
          border-gray-100
          rounded-xl
          hover:bg-white-cotton-ball
        "
      >
        <template v-if="Boolean($slots.item)">
          <slot name="item" v-bind:item="item" />
        </template>
        <div
          v-else
          class="
            flex
            w-full
            items-center
            p-2
            pl-2
            border-transparent border-l-2
          "
        >
          {{ item.display || item }}
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script lang="ts">
import { nextTick } from "vue";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import ChevronDownIcon from "./icons/chevrondown.vue";

@Options({
  components: {
    ChevronDownIcon,
  },
})
export default class CornieSelect extends Vue {
  @Prop({ type: Array, default: [] })
  items!: any[];

  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  modelValueSync!: string;

  @Prop({ type: String })
  label!: string;

  @Prop({type: Boolean})
  required!: boolean;

  showDatalist = false;
  id = "";

  get displayVal() {
    if (!this.modelValue || this.items.length < 1) return;

    const selected = this.selectedItem;
    return selected?.display || selected || "";
  }

  get selectedItem() {
    const selected = this.items.find(
      (item) => item.code == this.modelValue || item == this.modelValue
    );
    return selected;
  }

  selected(item: any) {
    nextTick(() => {
      this.showDatalist = false;
      this.modelValueSync = item.code || item;
    });
  }

  mounted() {
    document.addEventListener("click", (e) => {
      const select = document.getElementById(this.id);
      let targetElement: any = e.target; // clicked element
      do {
        if (targetElement == select || targetElement.id?.includes(this.id)) {
          return;
        }
        targetElement = (targetElement as any).parentNode;
      } while (targetElement);
      this.showDatalist = false;
    });
  }

  created() {
    const slug = String(Math.random());
    this.id = `click-box-${slug}`;
  }
}
</script>
<style scoped>
.top-100 {
  top: 100%;
}
.bottom-100 {
  bottom: 100%;
}
.max-h-select {
  max-height: 300px;
}
</style>
