<template>
  <div class="px-3 w-full">
    <div class="w-full flex items-center px-1 justify-between mb-3">
      <span class="text-primary font-bold text-sm"> {{ title }} </span>
      <chevron-down-icon
        class="text-primary stroke-current cursor-pointer"
        @click="show = false"
        v-if="show"
      />
      <chevron-right-icon
        class="text-primary stroke-current cursor-pointer"
        @click="show = true"
        v-else
      />
    </div>
    <div
      class="w-full px-2 flex items-center justify-between"
      :class="{ hidden: !show }"
    >
      <span class="w-2/5 block">
        <date-picker :left="true" v-model="startSync" label="FROM" />
      </span>
      <span class="w-2/5 block">
        <date-picker :right="true" v-model="endSync" label="TO" />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import DatePicker from "@/components/datepicker.vue";
import { Prop, PropSync } from "vue-property-decorator";

@Options({
  name: "DateFilter",
  components: {
    ChevronDownIcon,
    ChevronRightIcon,
    DatePicker,
  },
})
export default class DateFilter extends Vue {
  show = false;

  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: String, default: "" })
  start!: string;

  @PropSync("start")
  startSync!: string;

  @Prop({ type: String, default: "" })
  end!: string;

  @PropSync("end")
  endSync!: string;

  @Prop({ type: Boolean, default: false })
  opened!: boolean;

  mounted() {
    this.show = this.opened;
  }
}
</script>
