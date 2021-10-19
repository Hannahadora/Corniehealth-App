<template>
  <div class="w-full flex flex-col">
    <span class="w-full flex justify-between items-center">
      <span class="font-semibold text-blue-yonder mb-1">
        {{ title }}
        <span class="text-danger ml-1 text-xs">
          {{ subtitle }}
        </span>
      </span>
      <slot name="label" v-if="$slots.label" />
      <span :class="[`text-${color}`]" v-else>{{ percent }}%</span>
    </span>
    <progress-bar :width="`${percent}%`" :color="`bg-${color}`" />
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
  subtitle!: string;

  @Prop({ type: String, default: "warning" })
  color!: string;
}
</script>
