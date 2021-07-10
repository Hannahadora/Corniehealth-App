<template>
  <div class="overflow-y-auto">
    <modal :visible="visible" class="mx-14 h-3/4 w-4/12 p-0 overflow-y-auto">
      <div
        class="flex bg-primary w-full h-3/4 overflow-y-auto rounded-t-lg p-2"
      >
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
        <span
          @click="reset"
          class="flex text-xs mt-2 text-danger cursor-pointer justify-end"
        >
          RESET TO DEFAULTS
        </span>
        <draggable
          v-model="columnsProxy"
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
                  v-model="columnsProxy[index].show"
                  type="checkbox"
                  @input="changed"
                  class="bg-primary focus-within:bg-danger px-6 shadow"
                />
                {{ element.title }}
              </label>
              <drag-icon class="cursor-pointer mr-2" />
            </span>
          </template>
        </draggable>
        <div class="flex justify-end w-full mt-3 mb-2">
          <button
            class="
              rounded-full
              mt-5
              py-2
              px-3
              border border-primary
              focus:outline-none
              hover:opacity-90
              w-1/3
              mr-2
              text-primary
              font-semibold
            "
            @click="show = false"
          >
            Cancel
          </button>
          <button
            @click="apply"
            class="
              bg-danger
              rounded-full
              text-white
              mt-5
              py-2
              px-3
              focus:outline-none
              hover:opacity-90
              w-1/3
            "
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
import Draggable from "vuedraggable";

const copy = (original) => JSON.parse(JSON.stringify(original));

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
    preferred: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      columnsProxy: [],
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
