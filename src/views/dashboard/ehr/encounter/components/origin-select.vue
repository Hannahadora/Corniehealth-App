<template>
  <div class="container w-full p-4" style="max-width: 100%">
    <div class="w-full my-3 px-2">
      <p class="text-2xl font-semibold flex justify-between">
        <span>Origin</span>
        <span><cancel-icon /></span>
      </p>
    </div>
    <div
      class="w-full my-3 p-2 mx-2 mt-3"
      style="border-bottom: 1px dashed #c5c4d4"
    >
      <p class="text-sm uppercase font-semibold my-1">Reference</p>
      <div class="w-full">
        <div class="w-full flex flex-wrap">
          <div class="w-3/12">
            <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio h-6 w-6"
                :value="'Planned'"
              />
              <span class="ml-2 text-base">Location</span>
            </label>
          </div>
          <div class="w-3/12">
            <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio h-6 w-6"
                :value="'Active'"
              />
              <span class="ml-2 text-base">Organisation</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full my-3">
      <div class="w-full p-2">
        <search-input />
      </div>
      <div class="w-full">
        <div
          class="w-full"
          style="max-height: 300px; overflow-y: scroll; overflow-x: hidden"
        >
          <a
            class="text-gray-700 block py-2 text-sm flex items-center justify-between"
            role="menuitem"
            tabindex="-1"
            id="menu-item-0"
          >
            <span class="mx-2 text-sm">Fufu and soup</span>
            <span><input type="checkbox" class="h-3 w-3" name="" id="" /></span>
          </a>
          <a
            class="text-gray-700 block py-2 text-sm flex items-center justify-between"
            role="menuitem"
            tabindex="-1"
            id="menu-item-0"
          >
            <span class="mx-2 text-sm">Fufu and soup</span>
            <span><input type="checkbox" class="h-3 w-3" name="" id="" /></span>
          </a>
          <a
            class="text-gray-700 block py-2 text-sm flex items-center justify-between"
            role="menuitem"
            tabindex="-1"
            id="menu-item-0"
          >
            <span class="mx-2 text-sm">Fufu and soup</span>
            <span><input type="checkbox" class="h-3 w-3" name="" id="" /></span>
          </a>
          <a
            class="text-gray-700 block py-2 text-sm flex items-center justify-between"
            role="menuitem"
            tabindex="-1"
            id="menu-item-0"
          >
            <span class="mx-2 text-sm">Fufu and soup</span>
            <span><input type="checkbox" class="h-3 w-3" name="" id="" /></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import MultiSelect from "@/views/dashboard/schedules/components/apply-to.vue";
import SearchInput from "@/components/search-input.vue";
import CancelIcon from "@/components/icons/close.vue";

@Options({
  components: {
    SearchInput,
    MultiSelect,
    CancelIcon,
  },
})
export default class OriginSelect extends Vue {}
</script>

<style></style>
