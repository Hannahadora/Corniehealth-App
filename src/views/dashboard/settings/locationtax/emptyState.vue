<template>
  <div class="w-full pb-80">
    <ul class="nav nav-tabs nav-tabs-bottom widget_categories">
      <ul class="nav nav-tabs nav-tabs-bottom widget_categories">
        <li class="nav-item cursor-pointer">
          <a
            class="nav-link"
            @click="select(1)"
            :class="{ active: selected === 1 }"
            :aria-selected="selected === 1"
            >Location</a
          >
        </li>
        <li class="nav-item cursor-pointer">
          <a
            class="nav-link"
            @click="select(2)"
            :class="{ active: selected === 2 }"
            :aria-selected="selected === 2"
            >Tax</a
          >
        </li>
      </ul>
    </ul>
    </ul>
      <div class="tab-content">
        <div class="tab-pane" v-if="selected == 1" :class="{'active' :  selected === 1  }" id="Location">     
            <div class="w-full flex flex-col justify-center items-center h-96">
             <img src="@/assets/img/empty-location.svg" />
    <h3 class="text-center mt-5">You have no locations</h3>
    <button
      class="
        bg-danger
        rounded-full
        text-white
        mt-5
        py-2
        px-3
        focus:outline-none
        hover:opacity-90
      "
        @click="$router.push('/dashboard/provider/settings/add-location')"
    >
      New Location
    </button>
            </div>
        </div>
        <div class="tab-pane" v-if="selected == 2" :class="{'active' :  selected === 2  }" id="Tax">
         <div class="w-full flex flex-col justify-center items-center h-96">
              <img src="@/assets/img/task.svg" />
              <h3 class="text-center mt-5">
                  There’s currently no active tax!<br />
                  Adding a tax...
              </h3>
                  <span class="flex justify-center w-full">
              <button
                  class="
                  bg-danger
                  rounded-full
                  text-white
                  mt-5
                  py-2
                  px-3
                  pl-12
                  pr-12
                  font-semibold
                  focus:outline-none
                  hover:opacity-90
                  "
                  @click="$router.push('/dashboard/settings/practise-management/add-tax')"
              >
                  New Tax
              </button>
                  </span>
            </div>
        </div>
      </div>
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
    IconInput,
  },
})
export default class TasksEmptyState extends Vue {
  selected = 1;

  select(i: number) {
    this.selected = i;
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
