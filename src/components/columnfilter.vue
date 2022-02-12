<template>
  <div class="overflow-y-auto">
    <modal
      :visible="visible"
      style="height: 95%"
      class="w-4/12 flex flex-col overflow-y-auto ml-auto mr-2"
    >
      <div class="flex w-full overflow-y-auto rounded-t-lg p-2">
        <span class="block pr-2 border-r-2 mt-2">
          <arrow-left-icon
            class="stroke-current text-primary cursor-pointer"
            @click="show = false"
          />
        </span>
        <h2 class="font-bold text-primary mt-2 ml-3">Table Columns</h2>
      </div>
      <div class="flex flex-col p-3">
        <p class="text-xs mt-2">
          Choose headings to display on table, and the order you wish to display
          these columns.
        </p>
        <div class="flex justify-end mb-4">
          <svg
            @click="reset"
            class="text-xs mt-2 float-right cursor-pointer justify-end"
            width="21"
            height="9"
            viewBox="0 0 21 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 1C7.85 1 5.45 1.99 3.6 3.6L0 0V9H9L5.38 5.38C6.77 4.22 8.54 3.5 10.5 3.5C14.04 3.5 17.05 5.81 18.1 9L20.47 8.22C19.08 4.03 15.15 1 10.5 1Z"
              fill="#080056"
            />
          </svg>
        </div>
        <div>
          <draggable
            v-model="columnsProxy"
            item-key="id"
            class="my-2 border-2 w-full flex-col rounded-md flex"
          >
            <template #item="{ element, index }">
              <span
                v-if="element.show == true"
                class="items-center hover:bg-gray-100 w-full flex justify-between"
              >
                <label class="flex py-3 px-3">
                  <drag-icon class="cursor-pointer mr-2 mt-1 hover:shadow-lg" />
                  <span class="text-sm text-black">{{ element.title }}</span>
                  <input
                    v-model="columnsProxy[index].show"
                    type="checkbox"
                    @input="changed"
                    class="bg-primary focus-within:bg-danger px-6 shadow hidden"
                  />
                </label>
                <eye-icon
                  class="cursor-pointer mr-2 hover:shadow-lg"
                  @click="changedFalse(index)"
                />
              </span>
            </template>
          </draggable>
        </div>
        <span class="border-2 border-dashed"></span>
        <div>
          <draggable
            v-model="columnsProxy"
            item-key="id"
            class="my-2 border-2 w-full flex-col rounded-md flex"
          >
            <template #item="{ element, index }">
              <span
                v-if="element.show == false"
                class="items-center hover:bg-gray-100 w-full flex justify-between"
              >
                <label class="flex py-3 px-3">
                  <drag-icon class="cursor-pointer mr-2 mt-1 hover:shadow-lg" />
                  <span class="text-sm text-black">{{ element.title }}</span>
                </label>
                <lighteye-icon
                  class="cursor-pointer mr-2 hover:shadow-lg"
                  @click="changedTrue(index)"
                />
              </span>
            </template>
          </draggable>
        </div>
        <div class="flex justify-end w-full mt-auto">
          <button
            class="rounded mt-5 py-2 px-3 border border-primary focus:outline-none hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
            @click="show = false"
          >
            Cancel
          </button>
          <button
            @click="apply"
            class="bg-danger rounded text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90 w-1/3"
          >
            Apply
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import Modal from "@/components/modal.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import DragIcon from "@/components/icons/draggable.vue";
import eyeIcon from "@/components/icons/yelloweye.vue";
import lighteyeIcon from "@/components/icons/lighteye.vue";
import Draggable from "vuedraggable";

const copy = (original) => JSON.parse(JSON.stringify(original));

export default {
  name: "ColumnFilter",
  components: {
    Modal,
    eyeIcon,
    lighteyeIcon,
    DragIcon,
    ArrowLeftIcon,
    Draggable,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
    preferred: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      columnsProxy: [],
      getActive: [],
      getInactive: [],
    };
  },
  watch: {
    columns(val) {
      this.columnsProxy = copy(val);
    },
    visible() {
      const active = this.preferred.length > 0 ? this.preferred : this.columns;
      this.columnsProxy = copy([...active]);
    },
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
  methods: {
    changedFalse(index) {
      this.columnsProxy[index].show = false;
    },
    changedTrue(index) {
      this.columnsProxy[index].show = true;
    },
    apply() {
      this.$emit("update:preferred", copy([...this.columnsProxy]));
      this.show = false;
    },
    reset() {
      this.$emit("update:preferred", copy([...this.columns]));
      this.show = false;
    },
  },
  mounted() {
    this.columnsProxy = copy([...this.columns]);
  },
};
</script>
