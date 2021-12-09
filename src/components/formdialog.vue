<template>
  <cornie-dialog v-model="show" center class="h-full w-6/12">
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <span class="pr-2 flex items-center cursor-pointer border-r-2">
              <cornie-icon-btn @click="show = false">
                <arrow-left-icon />
              </cornie-icon-btn>
            </span>

            <h2 class="font-bold text-xl text-primary ml-3 -mt-0.5">
              {{ title }}
            </h2>
          </div>
          <div class="flex justify-center" v-if="horizontal">
            <cornie-menu top="30px" right="100%">
              <template #activator="{ on }">
                <icon-btn v-on="on">
                  <dots-horizontal-icon class="mr-2 cursor-pointer" />
                </icon-btn>
              </template>
              <card-text>
                <slot name="menuactions" />
              </card-text>
            </cornie-menu>
          </div>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <span class="text-xs ml-3 text-gray-500 mt-2">
        {{ subtext }}
      </span>
      <cornie-card-text class="overflow-y-auto">
        <slot />
      </cornie-card-text>

      <div>
        <slot name="actions" />
      </div>
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
    console.log("fdjkfj");
    // this method emits the value of newItemEvent
    this.$emit("view:status");
  }
}
</script>
