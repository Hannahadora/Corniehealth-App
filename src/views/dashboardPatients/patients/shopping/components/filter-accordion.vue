<template>
  <div>
    <div class="flex items-center justify-between p-3">
      <p class="text-sm">{{ title }}</p>
      <div v-if="!type2">
        <div v-if="showAccordionContent" class="flex">
          <p class="mr-3 text-xs text-danger" v-if="showText">See Less</p>
          <chevrondown-red
            class="cursor-pointer"
            @click="showAccordionContent = false"
          />
        </div>
        <div v-else class="flex">
          <p class="mr-3 text-xs text-danger" v-if="showText">See More</p>
          <chevronright-red
            class="cursor-pointer"
            @click="showAccordionContent = true"
          />
        </div>
      </div>
      <div v-else>
        <plus
          v-if="!showAccordionContent"
          class="cursor-pointer"
          @click="showAccordionContent = true"
        />
        <minus
          v-else
          class="cursor-pointer"
          @click="showAccordionContent = false"
        />
      </div>
    </div>
    <slot v-if="showAccordionContent"></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import Search from "@/components/icons/search.vue";
import ChevrondownRed from "@/components/icons/chevrondown-red.vue";
import ChevronrightRed from "@/components/icons/chevronright-red.vue";
import Plus from "@/components/icons/plus-icon-red.vue";
import Minus from "@/components/icons/minus-black.vue";

@Options({
  name: "ShoppingSideBar",
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
    CornieBtn,
    Search,
    ChevrondownRed,
    ChevronrightRed,
    Plus,
    Minus,
  },
})
export default class ShoppingSideBar extends Vue {
  @Prop({ type: String, default: "" })
  title!: string;
  @Prop({ type: Boolean, default: false })
  type2!: boolean;
  @Prop({ type: Boolean, default: false })
  showText!: boolean;

  loading: Boolean = true;
  showAccordionContent: Boolean = true;
}
</script>

<style scoped>
.sample-img {
  height: 110px;
  width: 200px;
}
</style>
