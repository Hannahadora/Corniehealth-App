<template>
  <div class="mt-10 w-full">
    <div class="w-full flex items-center justify-between">
      <div class="">
        <h3 class="font-semibold">{{ title }}</h3>
        <span class="text-sm mt-2 flex items-center">
          {{ text }}
          <tooltip top class="ml-2">
            {{ tooltip }}
          </tooltip>
        </span>
      </div>
      <sec-btn v-if="!showActions" @click="showActions = true">
        Set Up
      </sec-btn>
    </div>
    <div class="w-full mt-8" v-if="showActions">
      <div class="flex w-full items-center">
        <hr class="flex-grow border-gray-400 mr-2" />
        <cancel-icon
          @click="showActions = false"
          class="fill-current text-primary cursor-pointer"
        />
      </div>
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Tooltip from "./tooltip.vue";
import SecBtn from "./sec-button.vue";
import CancelIcon from "@/components/icons/cancel.vue";

@Options({
  name: "SecurityAction",
  components: {
    Tooltip,
    CancelIcon,
    SecBtn,
  },
})
export default class SecurityAction extends Vue {
  @Prop({ type: String })
  title!: string;

  @Prop({ type: String })
  text!: string;

  @Prop({ type: String })
  tooltip!: string;

  showActions = false;
}
</script>
