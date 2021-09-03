<template>
  <div class="w-full pb-80">
    <ul class="nav nav-tabs nav-tabs-bottom widget_categories">
        <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(1)"  :class="{'active' :  selected === 1  }" :aria-selected="selected === 1">Upcoming</a></li>    
        <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(2)"  :class="{'active' :  selected === 2  }" :aria-selected="selected === 2">Active</a></li>
        <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(3)"  :class="{'active' :  selected === 3  }" :aria-selected="selected === 3">History</a></li>
    </ul>
      <div class="tab-content">
        <div class="tab-pane" v-if="selected == 1" :class="{'active' :  selected === 1  }" id="upcoming">     
            <div class="w-full flex flex-col justify-center items-center h-96">
              <img src="@/assets/img/task.svg" />
              <h3 class="text-center mt-5">
                  There’s currently no task!<br />
                  Adding a task...
              </h3>
                  <span class="flex justify-center w-full">
              <button
                  @click="$router.push('/dashboard/provider/experience/schedules')"
                  type="button"
                  class="
                  outline-primary
                  rounded-full
                  text-black
                  mt-5
                  mr-3
                  py-2
                  pr-14
                  pl-14
                  px-3
                  focus:outline-none
                  hover:bg-primary
                  hover:text-white
                  "
              >
                  My Slots
              </button>
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
                  @click="$router.push('/dashboard/provider/experience/add-requests')"
              >
                  New Tasks
              </button>
                  </span>
            </div>
        </div>
        <div class="tab-pane" v-if="selected == 2" :class="{'active' :  selected === 2  }" id="active">
        </div>
        <div class="tab-pane" v-if="selected == 3" :class="{'active' :  selected === 3  }" id="history">
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

     select(i:number) {
      this.selected = i;
    }
 
}
</script>
<style>
.outline-primary{
    border: 2px solid #080056;
}
</style>