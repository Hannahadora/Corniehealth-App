<template>
  <cornie-dialog v-model="show" right v-bind="$attrs" :class="class">
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <span
              v-if="!noarrow"
              class="pr-2 flex items-center cursor-pointer border-r-2"
            >
              <cornie-icon-btn @click="show = false">
                <arrow-left-icon />
              </cornie-icon-btn>
            </span>

            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">
              {{ title }}
            </h2>
          </div>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <span class="text-xs ml-3 text-gray-500 -mt-1">
        {{ subtext }}
      </span>
      <cornie-card-text class="overflow-y-auto h-full">
        <slot />
      </cornie-card-text>

      <div class="flex justify-end mx-4 mt-auto mb-4">
        <slot name="actions" />
      </div>
      <div class="mx-4 mt-auto mb-4">
        <slot name="optionactions" />
      </div>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
  import CornieCard from "@/components/cornie-card";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import DeleteIcon from "@/components/icons/cancel.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync } from "vue-property-decorator";

  @Options({
    name: "ClinicalDialog",
    components: {
      ...CornieCard,
      CornieIconBtn,
      CornieDialog,
      ArrowLeftIcon,
      DeleteIcon,
    },
  })
  export default class AddCondition extends Vue {
    @Prop({ type: Boolean, default: false })
    modelValue!: boolean;

    @PropSync("modelValue")
    show!: boolean;

    @Prop({ type: String, default: "" })
    title!: string;

    @Prop({ type: String, default: "w-6/12 h-full" })
    class!: string;

    @Prop({ type: String, default: "" })
    subtext!: string;

    @Prop({ type: Boolean, default: false })
    noarrow!: boolean;
  }
</script>
