<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-3/6">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <h2 class="font-bold text-lg text-primary ml-3 -mt-2">Reason for cancellation</h2>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <div class="w-full flex">
          <Textarea
            v-model="reason"
            placeholder="Start typing..."
            :rules="required"
            class="w-full"
          />
          <span></span>
        </div>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <div class="flex justify-end w-full mt-auto">
            <cornie-btn
              class="rounded mt-5  px-3 border border-primary focus:outline-none hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
              @click="show = false"
            >
              Cancel
            </cornie-btn>
            <cornie-btn
            @click="apply"
            :loading="loading"
            type="submit"
            class="
              bg-danger
              rounded
              text-white
              mt-5
              px-3
              focus:outline-none
              hover:opacity-90
              w-1/3
            "
          >
            Save
          </cornie-btn>
          </div>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
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

@Options({
  name: "cancel",
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
})
export default class Cancel extends Vue {

  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  appointmentId!: string;



  reason = "";
  loading = false;

  done(){
    this.show = false;
    this.$emit('setCancel');
  }

   async apply() {
      this.loading = true;
      try {
        const response = await cornieClient().post(
          "/api/v1/appointment/cancel",
          { reason: this.reason, appointmentId: this.appointmentId }
        );
        if (response.success) {
          window.notify({ msg: "Appointment cancelled", status: "success" });
          this.loading = false;
        this.done();
          this.$router.push("/dashboard/provider/experience/appointments");
        }
      } 
      catch (error) {
        this.loading = false;
        this.show = false;
        window.notify({ msg: "Sorry you are not a participant in this appointment", status: "error" });
        this.$router.push("/dashboard/provider/experience/appointments");
      }
    }


   mounted() {
   
  }
  async created() {
  
  }
}


</script>
