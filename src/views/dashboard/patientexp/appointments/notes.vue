<template>
  <div class="overflow-y-auto bg-white">
    <modal
      :visible="visible"
      style="height: 95%"
      class="w-4/12 flex flex-col overflow-y-auto ml-auto mr-2"
    >
      <div class="flex w-full overflow-y-auto rounded-t-lg p-5">
        <span class="block pr-2 border-r-2">
          <arrow-left-icon
            class="stroke-current text-primary cursor-pointer"
            @click="show = false"
          />
        </span>
          <h2 class="font-bold text-lg text-primary ml-3 -mt-2">Make Notes</h2>
      </div>
      <div class="flex flex-col p-3">
        <p class="text-sm mt-2">
         Some subtext if necessary
        </p>
        <div class="my-2  w-full  flex">
            <Textarea
            label="Notes"
            v-model="notes"
            placeholder="--Enter--"
            :rules="required"
          />
          <span></span>
        </div>
        <div class="flex justify-end w-full mt-auto">
          <button
            class="
              rounded-full
              mt-5
              py-2
              px-3
              border border-primary
              focus:outline-none
              hover:opacity-90
              w-1/3
              mr-2
              text-primary
              font-semibold
            "
            @click="show = false"
          >
            Cancel
          </button>
          <cornie-btn
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
          </cornie-btn>
        </div>
      </div>
    </modal>
       <availability
            v-model:visible="availableFilter"
        />
        <profile
            v-model:visible="profileFilter"
        />
  </div>
</template>
<script>
import Modal from "@/components/practitionermodal.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import DragIcon from "@/components/icons/draggable.vue";
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
    Modal,
    DragIcon,
    Textarea,
    ArrowLeftIcon,
    Draggable,
    Availability,
    IconInput,
    SearchIcon,
    Profile
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
      notes:'',
      availableFilter: false,
      profileFilter:false,
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
        const response = await cornieClient().post("/api/v1/appointment/notes", {text:this.notes, appointmentId:this.appointmentId});
        if (response.success) {
            window.notify({ msg: "Notes created", status: "success" });
            this.loading = false;
           this.show = false;
            this.$router.push("/dashboard/provider/experience/appointments");
        }
        } catch (error) {
          this.loading = false;
         this.show = false;
          console.log(error);
        window.notify({ msg: "Notes not created", status: "error" });
        this.$router.push("/dashboard/provider/experience/appointments");
        }
    },
    reset() {
      this.$emit("update:preferred", copy([...this.columns]));
      this.show = false;
    },
    showAvailable(){
      this.availableFilter = true;
    },
    showProfile(){
        this.profileFilter = true;
    }
  },
  mounted() {
    this.columnsProxy = copy([...this.columns]);
  },
};
</script>
