<template>
  <cornie-dialog v-model="show" right class="w-2/5 h-full">
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
              Add Notes
            </h2>
          </div>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="overflow-y-auto">
        <div>
          <cornie-text-area class="w-full" />
          <span class="w-full flex justify-end">
            <cornie-btn class="text-white bg-danger px-9 rounded-xl">
              Add
            </cornie-btn>
          </span>
        </div>
        <div
          class="w-full flex space-x-4 mb-3"
          v-for="(note, index) in notes"
          :key="index"
        >
          <div>
            <note-icon class="mt-3" />
          </div>
          <div>
            <span class="text-gray-400 text-xs">
              8-Sep-2021 8:00PM •
              <span class="font-semibold uppercase ml-1">Dr. EBUBE OGE</span>
            </span>
            <p class="text-gray-400 text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis
              egestas at sociis sodales nunc metus, commodo, viverra sit.
              Bibendum sagittis neque blandit varius.
            </p>
          </div>
        </div>
      </cornie-card-text>
      <div class="flex justify-end mr-2 mt-auto mb-1">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
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
import CornieTextArea from "@/components/textarea.vue";
import NoteIcon from "@/components/icons/graynote.vue";

@Options({
  name: "AddNotes",
  components: {
    CornieTextArea,
    CornieDialog,
    ArrowLeftIcon,
    ...CornieCard,
    DeleteIcon,
    NoteIcon,
  },
})
export default class AddNotes extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  notes = [1, 2, 3, 4, 5, 6];
}
</script>
