<template>
  <div class="w-full flex flex-col">
    <span class="w-full flex justify-between items-center">
      <div class="flex items-center w-9/12">
        <div class="mb-1 w-1/3 mr-11 flex items-center">
          <div class="w-2 h-2 rounded-full mr-4" :style="{ background }"></div>
          <img :src="title" alt="" />
        </div>
        <div class="w-2/3">
          <progress-bar :width="`${percent}%`" :color="`bg-${color}`" />
        </div>
      </div>
      <slot name="label" v-if="$slots.label" />
      <div class="text-base flex items-center" v-else>
        <span class="font-bold mr-2">{{ percent }}%</span
        ><span>({{ total }})</span>
      </div>
    </span>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ProgressBar from "@/components/progress-bar.vue";
import { Prop } from "vue-property-decorator";

@Options({
  name: "RatingBar",
  components: {
    ProgressBar,
  },
})
export default class RatingBar extends Vue {
  @Prop({ type: Number, default: 100 })
  percent!: string;

  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: String, default: "" })
  total!: string;

  @Prop({ type: String, default: "blue-700" })
  color!: string;

  @Prop({ type: String, default: "blue-700" })
  background!: string;
}
</script>
