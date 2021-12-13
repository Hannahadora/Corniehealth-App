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
          <cornie-text-area v-model="note" class="w-full" rows="4" />
          <span class="w-full flex justify-end mt-2">
            <cornie-btn
              @click="submit"
              :loading="loading"
              class="text-white bg-danger px-9 rounded-xl"
            >
              Add
            </cornie-btn>
          </span>
        </div>
        <div
          class="w-full flex space-x-4 mb-3"
          v-for="(note, index) in items"
          :key="index"
        >
          <div>
            <note-icon class="mt-3" />
          </div>
          <div>
            <span class="text-gray-400 text-xs">
              {{ note.date }} •
              <span class="font-semibold uppercase ml-1">
                {{ note.practitioner }}
              </span>
            </span>
            <p class="text-gray-400 text-xs">
              {{ note.note }}
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
import { namespace } from "vuex-class";
import { ConditionNote, ICondition } from "@/types/ICondition";
import { printPractitioner } from "@/plugins/utils";
import { cornieClient } from "@/plugins/http";
import ObjectSet from "@/lib/objectset";
import Conditions from "./index.vue";

const condition = namespace("condition");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
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

  @Prop({ type: Object })
  condition!: ICondition;

  note = "";
  loading = false;

  @condition.Mutation
  setPatientConditions!: ({
    patientId,
    conditions,
  }: {
    patientId: string;
    conditions: ICondition[];
  }) => Promise<void>;

  _notes: ConditionNote[] = [];

  get items() {
    let notes = this.condition.notes || [];
    const noteSet = new ObjectSet([...notes, this._notes], "id");
    return [...noteSet].map((note) => ({
      note: note.note,
      practitioner: printPractitioner(note.Practitioner!!),
      date: this.printDate(note.createdAt!!),
    }));
  }

  printDate(dateString: string) {
    const date = new Date(dateString);
    const month = date.getMonth();
    const monthStr = months[month];
    const localeDate = `${date.getDate()}-${monthStr}-${date.getFullYear()}`;
    const localeTime = `${date.getHours()}:${date.getMinutes()}`;
    return `${localeDate} ${localeTime}`;
  }

  get payload() {
    return {
      note: this.note,
      conditionId: this.condition.id,
    };
  }

  async submit() {
    if (!this.note) return;
    this.loading = true;
    try {
      const { data } = await cornieClient().post(
        "/api/v1/condition/note",
        this.payload
      );
      ;
      this.updateCondition(data);
      window.notify({ status: "success", msg: "Note added" });
    } catch (error) {
      window.notify({ status: "error", msg: "Note not added" });
    }
    this.loading = false;
  }

  updateCondition(note: ConditionNote) {
    this._notes = [...this._notes, note];
    const notes = this.condition.notes || [];
    ;
    const noteSet = new ObjectSet([...notes, note], "id");
    const condition: ICondition = JSON.parse(JSON.stringify(this.condition));
    condition.notes = [...noteSet];
    this.setPatientConditions({
      patientId: condition.patientId,
      conditions: [condition],
    });
  }
}
</script>
