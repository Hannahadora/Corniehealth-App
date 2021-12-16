<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <span
          class="text-primary font-extrabold text-lg border-l-2 border-gray-100 pl-2"
        >
          Make Notes
        </span>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <p class="text-sm mb-5">Some subtext if necessary.</p>
        <v-form ref="form">
          <div class="my-2 w-full">
            <Textarea
              class="w-full text-xs"
              v-model="notes"
              placeholder="Text Area"
              :rules="required"
            />
            <span></span>
          </div>
          <span
            class="text-danger float-right mb-5 font-semibold uppercase text-xs cursor-pointer"
            @click="save"
          >
            Add
          </span>
          <div
            class="w-full flex space-x-4 mb-3"
            v-for="(item, index) in requestnotes"
            :key="index"
          >
            <div>
              <note-icon class="mt-3" />
            </div>
            <div>
              <span class="text-gray-400 text-xs">
                {{ new Date(item.createdAt).toDateString() }}
              </span>
              <p class="text-gray-400 text-xs">{{ item.text }}</p>
            </div>
          </div>
        </v-form>
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Close
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieDatePicker from "@/components/datepicker.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { Insurance, IPatient } from "@/types/IPatient";
import NoteIcon from "@/components/icons/graynote.vue";
import { cornieClient } from "@/plugins/http";

@Options({
  name: "notes",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    CornieDialog,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieDatePicker,
    CornieBtn,
  },
})
export default class Notes extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  requestId!: string;

  @Prop({ type: Array, default: () => [] })
  requestnotes!: any[];

  loading = false;
  notes = "";
  availableFilter = false;
  profileFilter = false;
  tasknote = [];
  newtasknotes = [];

  async save() {
    this.loading = true;
    await this.submit();
    this.loading = false;
  }

  async submit() {
    await this.createNew();
  }

  async createNew() {
    try {
      const response = await cornieClient().post("/api/v1/requests/notes", {
        text: this.notes,
        requestId: this.requestId,
      });
      if (response.success) {
        window.notify({ msg: "Notes created", status: "success" });
        this.loading = false;
      }
    } catch (error) {
      this.loading = false;
      this.show = false;
      window.notify({ msg: "Notes not created", status: "error" });
      this.$router.push("/dashboard/provider/experience/requests");
    }
  }

  async created() {
    this.requestnotes;
  }
}
</script>

<style></style>
