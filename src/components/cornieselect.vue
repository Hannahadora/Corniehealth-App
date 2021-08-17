<template>
  <div class="flex flex-col items-center w-11/12">
    <div class="w-full flex flex-col items-center">
      <div class="w-full">
        <div class="flex flex-col items-center relative" :id="id">
          <div class="w-full" @click="showDatalist = !showDatalist">
            <label
              v-if="label"
              class="block uppercase mb-1 text-xs font-bold"
              :for="`${id}-inputfield`"
            >
              {{ label }}
            </label>
            <div
              v-bind="$attrs"
              class="p-1 bg-white flex border border-gray-200 rounded-lg"
            >
              <span v-if="Boolean($slots.selected)">
                <slot name="selected" :item="selectedItem" />
              </span>
              <input
                v-else
                placeholder="--Select--"
                disabled
                :value="displayVal"
                class="
                  bg-transparent
                  p-1
                  pl-2
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
                  pr-1
                  flex
                  items-center
                  border-gray-200
                "
              >
                <chevron-down-icon />
              </div>
            </div>
          </div>
          <div
            :class="{ hidden: !showDatalist }"
            class="
              absolute
              shadow
              bg-white
              top-100
              z-40
              w-full
              lef-0
              rounded
              max-h-select
              overflow-y-auto
              mt-2
              svelte-5uyqqj
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
                    relative
                  "
                >
                  {{ item.display || item }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { clickOutside } from "@/plugins/utils";
import { nextTick } from "vue";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import ChevronDownIcon from "./icons/chevrondownprimary.vue";

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
    clickOutside(this.id, () => {
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
::placeholder {
  font-size: 0.8em;
  font-weight: 300;
  color: #667499;
  font-style: italic;
}
</style>
