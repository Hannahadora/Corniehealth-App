<template>
  <div class="containerr-fluid w-full">
    <div class="w-full">
      <div class="w-full flex justify-center">
        <div class="w-10/12">
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            class="w-full slide"
            name=""
            id=""
            style="width: 100%"
          />
        </div>
        <!-- <div class="w-10/12">
                    <range-slider />
                </div> -->
      </div>
      <div class="w-full flex justify-center">
        <div class="w-10/12 flex justify-between">
          <a
            v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
            :key="i"
            class=""
            style="height: 10px; border: 0.5px solid #c2c7d6"
          ></a>
        </div>
      </div>
      <div class="w-full flex">
        <div class="w-1/12">
          <span class="under-text">Min</span>
        </div>
        <div class="w-10/12">
          <div class="w-full flex justify-between">
            <a
              v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
              :key="i"
              style="font-size: 14px"
              >{{ i }}</a
            >
          </div>
        </div>
        <div class="w-1/12">
          <span class="flex justify-end under-text">Max</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RangeSlider from "@/components/range.vue";
import { Prop, PropSync } from "vue-property-decorator";
@Options({
  components: {
    RangeSlider,
  },
})
export default class RangePicker extends Vue {
   @Prop({ type: String })
  modelValue!: string;

  @PropSync("modelValue")
  valueSync!: string;
}
</script>

<style scoped>
.under-text {
  font-family: Inter;
  font-style: italic;
  font-weight: 500;
  font-size: 10px;
  line-height: 16px;
  /* identical to box height, or 160% */

  letter-spacing: 0.02em;

  /* Greys/Blue Yonder */

  color: #667499;
}

.slide {
  /* background: #FF0000 !important; */
  border-radius: 30px;
  /* color: red; */
  /* -webkit-appearance: none;
        appearance: none; */
  width: 100%;
  /* height: 25px; */
  background: #d3d3d3;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #fe4d3c;
}

input[type="range"]:focus::-ms-fill-lower {
  background: #f2f7ff;
}

input[type="range"]:focus::-ms-fill-upper {
  background: #fe4d3c;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  animate: 0.2s;
  background: #fe4d3c;
  border-radius: 5px;
  box-shadow: none;
  border: 0;
}

input[type="range"]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 1px solid #fe4d3c;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #fe4d3c;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}
</style>
