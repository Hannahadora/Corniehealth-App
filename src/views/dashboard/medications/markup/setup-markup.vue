<template>
  <cornie-dialog v-model="show" right class="w-4/6 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false" class="pr-2">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="flex justify-between w-full">
          <span
            class="text-primary font-extrabold text-lg border-l-2 border-gray-100 pl-2"
          >
            {{ isRoot ? "Setup" : "Edit" }} Markup & Discount
          </span>
          <close-icon @click="show = false" class="cursor-pointer" />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <markup-settings
          @markup-saved="show = false"
          @markup-canceled="show = false"
          @isRoot="handleIsRoot"
        />
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import MarkupSettings from "./markup-settings.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import { PropSync } from "vue-property-decorator";

@Options({
  name: "SetupMarkup",
  components: {
    ...CornieCard,
    CornieDialog,
    CloseIcon,
    CornieBtn,
    MarkupSettings,
    ArrowLeftIcon,
  },
})
export default class SetupMarkup extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  isRoot = false;

  handleIsRoot(val: boolean) {
    this.isRoot = val;
  }
}
</script>
