<template>
  <cornie-dialog v-model="show" center class="w-1/3 h-2/5">
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <span class="pr-2 flex items-center cursor-pointer border-r-2">
              <cornie-icon-btn @click="show = false">
                <arrow-left-icon />
              </cornie-icon-btn>
            </span>
            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">history</h2>
          </div>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="overflow-y-auto">
        <div v-for="(value, i) in values" :key="i">
          <span
            class="block border-l-2 border-dotted ml-1 my-1 h-4"
            v-if="i != 0"
          />
          <span>{{ i + 1 }}</span>
          <span class="text-sm text-gray-400 ml-1">
            (29/04/2021, 09:00 - 29/04/2021, 09:30)
          </span>
        </div>
      </cornie-card-text>
      <div class="flex justify-end mr-2 mt-auto mb-1">
        <cornie-btn
          @click="show = false"
          class="text-white bg-danger px-9 rounded-xl"
        >
          Close
        </cornie-btn>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import { Prop, PropSync } from "vue-property-decorator";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieCard from "@/components/cornie-card";
import DeleteIcon from "@/components/icons/cancel.vue";

@Options({
  name: "StatusHistory",
  components: {
    CornieDialog,
    ArrowLeftIcon,
    ...CornieCard,
    DeleteIcon,
  },
})
export default class StatusHistory extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, required: true })
  active!: "clinical" | "verification";

  values = [1, 2, 3, 4, 5];
}
</script>
