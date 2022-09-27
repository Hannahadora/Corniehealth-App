<template>
  <div>
    <div class="flex w-full font-medium mt-5">
      <div class="flex justify-start float-left w-full">
        <div class="flex-1 flex">
          <template v-for="(tab, index) in items" :key="`tab-${index}`">
            <div
              class="rounded cursor-pointer w-20 h-8 p-1 text-center"
              style="background: #f0f1f5"
            >
              <span
                class="flex hover:bg-gray-300 hover:bg-opacity-20 mt-0.5 justify-center text-center"
                :class="
                  syncedValue == index
                    ? [
                        'border-gray-100 pt-1 h-6 cursor-pointer rounded-md w-full text-center bg-white',
                      ]
                    : ['text-black']
                "
                :style="syncedValue == index ? ['margin-top: -1px;'] : []"
                @click="syncedValue = index"
              >
                <span class="text-center text-xs">
                  {{ tab }}
                </span>
              </span>
            </div>
          </template>
        </div>
        <div class="flex">
          <p class="text-sm mr-2">
            {{ new Date(dDate).toLocaleDateString("en-US", options) }}
          </p>
          <span class="flex space-x-4 mr-4">
            <arrow-left
              @click="$emit('left', syncedValue)"
              class="cursor-pointer"
            />
            <arrow-right
              @click="$emit('right', syncedValue)"
              class="cursor-pointer"
            />
          </span>
        </div>
      </div>
      <div class="flex float-left justify-start"></div>

      <div class="w-full" v-if="!showDate">
        <span class="flex space-x-2 justify-end float-right">
          <!-- <dots-horizontal-icon /> -->
          <span class="text-sm text-primary mt-1 font-bold flex space-x-2">
            <filter-icon
              class="cursor-pointer mr-2 h-4 w-4"
              @click="$emit('filter')"
            />
            Filter
          </span>
          <cornie-menu top="30px" class="cursor-pointer">
            <!-- <template #activator="{ on }">
                    <icon-btn v-on="on">
                      <span class="bg-danger flex text-white rounded-lg py-1.5 px-4 text-sm">
                          <span class="text-lg -mt-1.5 mr-1">+</span> Create
                        </span>
                    </icon-btn>
                  </template> -->
            <cornie-card-text>
              <slot name="actions" />
            </cornie-card-text>
          </cornie-menu>
        </span>
      </div>
    </div>
    <tab :vnode="$slots.default()[syncedValue]" />
  </div>
</template>

<script lang="ts">
  import CornieCard from "@/components/cornie-card";
  import DotsHorizontalIcon from "@/components/icons/DotsHorizontalIcon.vue";
  import FilterIcon from "@/components/icons/filter.vue";
  import FilterByIcon from "@/components/icons/FilterByIcon.vue";
  import ArrowLeft from "@/components/icons/grayarrow.vue";
  import ArrowRight from "@/components/icons/orangearrow.vue";
  import CornieMenu from "@/components/newMenu.vue";
  import { VNode } from "@vue/runtime-core";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync } from "vue-property-decorator";

  @Options({
    name: "tab",
  })
  class Tab extends Vue {
    @Prop()
    vnode!: VNode;

    render() {
      return this.vnode;
    }
  }

  @Options({
    name: "tabs",
    components: {
      Tab,
      FilterByIcon,
      DotsHorizontalIcon,
      FilterIcon,
      ArrowLeft,
      ArrowRight,
      CornieMenu,
      ...CornieCard,
    },
  })
  export default class Tabs extends Vue {
    @Prop()
    items!: string[];

    @PropSync("modelValue", { type: Number, default: 0 })
    syncedValue!: number;

    @Prop({ type: String, default: "" })
    dDate!: string;

    @Prop({ type: Boolean, default: false })
    showDate!: boolean;

    isActive(index: number): boolean {
      return index == this.syncedValue;
    }
    options = {
      weekday: "long", //to display the full name of the day, you can use short to indicate an abbreviation of the day
      day: "numeric",
      month: "long", //to display the full name of the month
      year: "numeric",
    };
    mounted() {}
  }
</script>
