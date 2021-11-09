<template>
  <cornie-dialog v-model="show" right class="w-8/12 h-full">
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <span class="pr-2 flex items-center cursor-pointer border-r-2">
              <cornie-icon-btn @click="show = false">
                <arrow-left-icon />
              </cornie-icon-btn>
            </span>

            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">
              {{ title }}
            </h2>
          </div>
          <dots-horizontal-icon class="mr-7" @click="isShow"/>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <span class="text-xs ml-3 text-gray-500 -mt-1">
        {{ subtext }}
      </span>
      <cornie-card-text class="overflow-y-auto">
        <slot />
      </cornie-card-text>

      <div class="flex justify-end mx-4 mt-auto mb-4">
        <slot name="actions" />
      </div>
    </cornie-card>
  </cornie-dialog>
  <!-- <add-progres-note  v-model="addingProgressnote2" /> -->
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieCard from "@/components/cornie-card";
import DeleteIcon from "@/components/icons/cancel.vue";
import { Prop, PropSync } from "vue-property-decorator";

import DotsHorizontalIcon from "@/components/icons/DotsHorizontalIcon.vue";


@Options({
  name: "ClinicalDialog",
  components: {
    ...CornieCard,
    CornieDialog,
    ArrowLeftIcon,
    DeleteIcon,
    DotsHorizontalIcon
  },
})
export default class AddCondition extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;

    addingProgressnote2 = false;


  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: String, default: "" })
  subtext!: string;
}
</script>
