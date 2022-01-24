<template>
  <cornie-dialog v-model="show" center class="h-auto w-auto">
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <h2 class="font-bold text-lg text-primary -mt-0.5">
              {{ title }}
            </h2>
          </div>
        </div>
      </cornie-card-title>
      <cornie-card-text class="overflow-y-auto">
        <slot />
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import "./cornie-table/CornieTable";
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieCard from "@/components/cornie-card";
import DeleteIcon from "@/components/icons/cancel.vue";
import DotsHorizontalIcon from "@/components/icons/horizontal.vue";
import { Prop, PropSync } from "vue-property-decorator";
import CornieMenu from "@/components/CornieMenu.vue";
import Card from "@/components/cornie-card/CornieCard.vue";
import IconBtn from "@/components/CornieIconBtn.vue";

@Options({
  name: "BigDialog",
  components: {
    ...CornieCard,
    CornieDialog,
    CornieMenu,
    ArrowLeftIcon,
    DeleteIcon,
    DotsHorizontalIcon,
    Card,
    IconBtn,
  },
})
export default class AddCondition extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @Prop({ type: Boolean, default: false })
  horizontal!: boolean;

  @PropSync("modelValue")
  show!: boolean;

  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: String, default: "" })
  subtext!: string;

  showStatus() {
    // this method emits the value of newItemEvent
    this.$emit("view:status");
  }
}
</script>
