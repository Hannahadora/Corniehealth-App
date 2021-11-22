<template>
  <div class="w-full pb-80 h-full">
    <ul class="nav nav-tabs nav-tabs-bottom widget_categories">
        <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(1)"  :class="{'active' :  selected === 1  }" :aria-selected="selected === 1">Practice Forms</a></li>    
        <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(2)"  :class="{'active' :  selected === 2  }" :aria-selected="selected === 2">Questionnaires</a></li>
        <!-- <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(3)"  :class="{'active' :  selected === 3  }" :aria-selected="selected === 3">Satisfaction Surveys</a></li> -->
    </ul>
      <div class="tab-content">
        <div class="tab-pane" v-if="selected == 1" :class="{'active' :  selected === 1  }" id="Practice Forms">     
            <div class="w-full flex flex-col justify-center items-center h-full mt-40">
             <img src="@/assets/img/Forms.svg" />
              <h3 class="text-center mt-5">
                 You have no practice form to display.
              </h3>
                  <span class="flex justify-center w-full">
                    <div class="dropdown inline-block relative">
                        <button class="bg-danger rounded-full font-semibold text-white text-sm mt-5 py-3  pr-8 pl-8 px-3 focus:outline-none hover:opacity-90 inline-flex items-center">
                        <span class="mr-1">Create New </span>
                        <chevron-down-icon class="text-white mb-2 stroke-current mt-2 ml-1"/>
                        </button>
                        <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
                        <li class="">
                            <Select v-model="showDatalist" :items="['Blank form','Demographics Template','Insurance Information Template','New Patient Medical History Template','COVID-19 Screening Template']"></Select>
                        </li>
                        </ul>
                    </div>
                </span>
            </div>
        </div>
        <div class="tab-pane" v-if="selected == 2" :class="{'active' :  selected === 2  }" id="Questionnaires">
             <div class="w-full flex flex-col justify-center items-center h-full mt-40">
             <img src="@/assets/img/Forms.svg" />
              <h3 class="text-center mt-5">
                You have no satisfactory surveys to display.
              </h3>
                  <span class="flex justify-center w-full">
                    <div class="dropdown inline-block relative">
                        <button class="bg-danger rounded-full font-semibold text-white text-sm mt-5 py-3  pr-8 pl-8 px-3 focus:outline-none hover:opacity-90 inline-flex items-center">
                        <span class="mr-1">Create New </span>
                        <chevron-down-icon class="text-white mb-2 stroke-current mt-2 ml-1"/>
                        </button>
                        <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
                        <li class="">
                            <select-survey v-model="showDatalist" :items="['Blank form','Demographics Template','Insurance Information Template','New Patient Medical History Template','COVID-19 Screening Template']"></select-survey>
                        </li>
                        </ul>
                    </div>
                </span>
            </div>
        </div>
        <!-- <div class="tab-pane" v-if="selected == 3" :class="{'active' :  selected === 3  }" id="Satisfaction Survey">
          
        </div> -->
      </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import Select from "@/components/formselect.vue";
import SearchIcon from "@/components/icons/search.vue";
import IconInput from "@/components/IconInput.vue";
import SelectSurvey from "@/components/surveyselect.vue";

@Options({
  components: {
    ChevronDownIcon,
    Select,
    SearchIcon,
    SelectSurvey,
    IconInput,
  },
})
export default class FormsEmptyState extends Vue {
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