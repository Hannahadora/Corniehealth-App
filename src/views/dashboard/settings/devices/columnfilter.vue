<template>
  <div class="">
    <modal :visible="visible" class="mx-14 w-4/12 p-0">
      <div class="flex bg-primary w-full rounded-t-lg p-2">
        <span class="block pr-2 border-r-2">
          <arrow-left-icon
            class="stroke-current text-white cursor-pointer"
            @click="show = false"
          />
        </span>
      </div>
      <div class="block p-3">
        <h2 class="font-semibold text-primary">Table Columns</h2>
        <p class="text-xs mt-2">
          Choose headings to display on table, and the order you wish to display
          these columns.
        </p>
        <span class="flex text-xs mt-2 text-danger cursor-pointer justify-end">
          RESET TO DEFAULTS
        </span>
        <draggable
          v-model="columnsSync"
          item-key="id"
          class="my-2 border-2 w-full flex-col rounded-md flex"
        >
          <template #item="{ element, index }">
            <span
              class="
                items-center
                hover:bg-gray-100
                w-full
                flex
                justify-between
                hover:shadow-lg
              "
            >
              <label class="py-3 px-3">
                <input
                  v-model="columnsSync[index].selected"
                  type="checkbox"
                  @input="changed"
                  class="bg-primary focus-within:bg-danger px-6 shadow"
                />
                {{ element.name }}
              </label>
              <drag-icon class="cursor-pointer mr-2" />
            </span>
          </template>
        </draggable>
      </div>
    </modal>
  </div>
</template>
<script>
import Modal from "@/components/modal.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import DragIcon from "@/components/icons/draggable.vue";
import Draggable from "vuedraggable";

export default {
  name: "ColumnFilter",
  components: {
    Modal,
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
  },
  data() {
    return {};
  },
  computed: {
    columnsSync: {
      get() {
        return this.columns;
      },
      set(cols) {
        this.$emit("update:columns", cols);
      },
    },
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
    changed() {
      const proxy = this.columnsSync;
      this.columnsSync = proxy;
    },
  },
};
</script>
