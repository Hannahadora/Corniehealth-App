<template>
  <div class="rounded-md">
    <modal :visible="visible" class="mx-14 w-4/12 p-0">
      <div class="block p-3">
        <h3 class="font-bold text-primary mb-4">Advanced Filters</h3>
        <h4 class="font-bold mb-6">Filter by Locations</h4>
        <div class="border border-gray-400 border-solid px-4 my-4">
          <li class="list-none my-4 flex cursor-pointer">
            <input
              class="mr-2"
              type="radio"
              id="location1"
              v-model="pickedLocation"
              value="1"
            />
            <label for="location1">All Outlets</label>
          </li>

          <li class="list-none my-4 flex cursor-pointer">
            <input
              class="mr-2"
              type="radio"
              id="location2"
              v-model="pickedLocation"
              value="2"
            />
            <label for="location2"> Ajah Warehouse </label>
          </li>
        </div>

        <span class="border border-gray-400 border-dashed flex"> </span>

        <h4 class="font-bold mb-6">Filter by Locations</h4>

        <div class="border border-gray-400 border-solid px-4 my-4">
          <li class="list-none my-4 flex cursor-pointer">
            <input
              class="mr-2"
              type="radio"
              id="category1"
              v-model="pickedCategory"
              value="1"
            />
            <label for="category1"> Supplier Invoice </label>
          </li>

          <li class="list-none my-4 flex cursor-pointer">
            <input
              class="mr-2"
              type="radio"
              id="category1"
              v-model="pickedCategory"
              value="1"
            />
            <label for="category1"> Supplier Invoice </label>
          </li>
        </div>

        <span class="border border-gray-400 border-dashed flex mb-16"> </span>

        <div class="my-8 flex justify-end">
          <span>
            <button
              class="
                border border-blue-800
                mr-8
                rounded-3xl
                px-6
                py-2
                placeholder-gray-400
                focus:outline-none
                focus:shadow-outline-blue
                focus:border-blue-300
                transition
                duration-150
                ease-in-out
                sm:text-sm
                sm:leading-5
                cursor-pointer
              "
              @click="show = false"
            >
              Cancel
            </button>
          </span>
          <span>
            <button
              type="submit"
              class="
                px-6
                py-2
                text-white
                appearance-none
                border-none
                bg-pink-600
                rounded-3xl
                placeholder-gray-400
                focus:outline-none
                focus:shadow-outline-blue
                focus:border-blue-300
                transition
                duration-150
                ease-in-out
                sm:text-sm
                sm:leading-5
                cursor-pointer
              "
            >
              Apply
            </button>
          </span>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import Modal from "@/components/modal.vue";

export default {
  name: "NewExchangeRate",
  components: {
    Modal,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {};
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
};
</script>
