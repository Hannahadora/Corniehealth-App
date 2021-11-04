<template>



   <vue-slide-bar v-model="simpleValue"/>
        <b>{{simpleValue}}%</b>
        <div>
          <button class="button" @click="simpleValue--">
            -
          </button>
          <button class="button" @click="simpleValue++">
            +
          </button>
        </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";

import VueSlideBar from 'vue-slide-bar'

@Options({
  name: "CustomRangeSlider",
  components: {
    // RangeSlider,
    VueSlideBar
  },
})

export default class CustomRangeSlider extends Vue {
  
  data() {
    return {
      sliderValue: 50
    };
  }
};
</script>

<style>

</style> 
