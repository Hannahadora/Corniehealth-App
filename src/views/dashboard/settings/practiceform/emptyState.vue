<template>
<div>
  <div class="flex w-full justify-between mt-5 mb-7 items-center">
      <span class="flex items-center mb-2">
        <icon-input
          class="border border-gray-600 rounded-full focus:outline-none" placeholder="--search--" type="search" v-model="query">
          <template v-slot:prepend>
            <search-icon />
          </template>
        </icon-input>
      </span>
       <span class="flex justify-end w-full">
          <div class="dropdown inline-block relative">
            <button class="bg-danger rounded-full text-white mt-5 py-2  pr-5 pl-5 px-3 focus:outline-none hover:opacity-90 inline-flex items-center">
              <span class="mr-1">Create New Form </span>
              <chevron-down-icon class="text-white mb-2 stroke-current mt-1 ml-1"/>
            </button>
            <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
              <li class="">
                   <Select v-model="showDatalist" :items="['Blank form','Demographics Template','Insurance Information Template','New Patient Medical History Template','COVID-19 Screening Template']"></Select>
              </li>
            </ul>
          </div>
        </span>
    </div>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/Forms.svg" />
    <h3 class="text-center mt-5 text-black">Practice forms helps in ......</h3>
  </div>
</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import Select from "@/components/newautocomplete.vue";
import SearchIcon from "@/components/icons/search.vue";
import IconInput from "@/components/IconInput.vue";
@Options({
  components: {
    ChevronDownIcon,
    Select,
    SearchIcon,
    IconInput
    
  },
})
export default class PracticeEmptyState extends Vue {}
</script>
