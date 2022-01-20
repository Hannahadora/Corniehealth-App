<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <h2 class="font-bold text-lg text-primary ml-3 -mt-2">Make Notes</h2>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <p class="text-sm mt-2">Some subtext if necessary</p>
        <div class="my-2 w-full flex">
          <Textarea
            label="Notes"
            v-model="notes"
            placeholder="--Enter--"
            :rules="required"
          />
          <span></span>
        </div>
        <span class="text-danger" @click="apply">Add</span>
        <div class="w-full flex space-x-4">
          <note-icon />
          <div>
            <span class="text-gray-600">8-Sep-2021</span>
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis
              egestas at sociis sodales nunc metus, commodo, viverra sit.
              Bibendum sagittis neque blandit varius.
            </p>
          </div>
        </div>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <div class="flex justify-end w-full mt-auto">
            <button
              class="rounded-full mt-5 py-2 px-3 border border-primary focus:outline-none hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
              @click="show = false"
            >
              Cancel
            </button>
            <!-- <cornie-btn
            @click="apply"
            :loading="loading"
            type="submit"
            class="
              bg-danger
              rounded-full
              text-white
              mt-5
              py-2
              px-3
              focus:outline-none
              hover:opacity-90
              w-1/3
            "
          >
            Save
          </cornie-btn>-->
          </div>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>
<script>
import Modal from "@/components/practitionermodal.vue";
import CornieCard from "@/components/cornie-card";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import DragIcon from "@/components/icons/draggable.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import Draggable from "vuedraggable";
import IconInput from "@/components/IconInput.vue";
import Availability from "@/components/availability.vue";
import Profile from "@/components/profile.vue";
import SearchIcon from "@/components/icons/search.vue";
import Textarea from "@/components/textarea.vue";
import { cornieClient } from "@/plugins/http";

const copy = (original) => JSON.parse(JSON.stringify(original));

export default {
  name: "ParticipantFilter",
  components: {
    ...CornieCard,
    CornieDialog,
    CornieIconBtn,
    Modal,
    DragIcon,
    Textarea,
    ArrowLeftIcon,
    Draggable,
    Availability,
    IconInput,
    SearchIcon,
    Profile,
    NoteIcon,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
    appointmentId: {
      type: String,
    },
    preferred: {
      type: Array,
      required: true,
      default: () => [],
    },
    available: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      columnsProxy: [],
      practitioners: [],
      loading: false,
      notes: "",
      availableFilter: false,
      profileFilter: false,
    };
  },
  watch: {
    columns(val) {
      this.columnsProxy = copy(val);
    },
    visible() {
      const active = this.preferred.length > 0 ? this.preferred : this.columns;
      this.columnsProxy = copy([...active]);
    },
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
  methods: {
    async apply() {
      this.loading = true;
      try {
        const response = await cornieClient().post(
          "/api/v1/appointment/notes",
          { text: this.notes, appointmentId: this.appointmentId }
        );
        if (response.success) {
          window.notify({ msg: "Notes created", status: "success" });
          this.loading = false;
          this.show = false;
          this.$router.push("/dashboard/provider/experience/appointments");
        }
      } catch (error) {
        this.loading = false;
        this.show = false;
        window.notify({ msg: "Notes not created", status: "error" });
        this.$router.push("/dashboard/provider/experience/appointments");
      }
    },

    reset() {
      this.$emit("update:preferred", copy([...this.columns]));
      this.show = false;
    },
    showAvailable() {
      this.availableFilter = true;
    },
    showProfile() {
      this.profileFilter = true;
    },
  },
  mounted() {
    this.columnsProxy = copy([...this.columns]);
  },
};
</script>
