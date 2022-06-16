<template>
  <div class="w-full p-4 flex flex-col overflow-y-scroll h-screen">
    <div class="flex items-center border-b-2 pb-3">
      <avatar class="w-4 h-4 mr-4" :src="patient.photo" />
      <span>{{ patient.name }}</span>
    </div>
    <v-form @submit="submit" class="w-full">
      <div class="w-full mt-3 grid grid-cols-1 gap-y-3 pb-20 mb-3">
        <div class="w-full grid grid-cols-2 gap-x-2">
          <date-picker label="Date" v-model="date" />
          <time-picker label="Time" class="" v-model="time" />
        </div>
        <practitioner-select
          @selected="(e) => (practitioner = e)"
          label="Physician"
          v-model="practitionerId"
          :rules="requiredRule"
        />
        <cornie-select
          :rules="requiredRule"
          label="Room"
          v-model="roomId"
          :items="rooms"
        />
        <hr class="w-full border-dashed border-t-2" />
        <cornie-text-area label="Note" :rows="3" full v-model="note" />
        <div class="flex w-full flex-col">
          <span
            class="text-xs mb-3 font-semibold text-primary"
            v-if="practitionerId"
          >
            All patients for {{ practitionerName }}
          </span>
          <queue
            v-for="(patient, index) in queue"
            :name="patient.patient"
            :photo="patient.image"
            :queueNo="patient.queueNo"
            :key="index"
          />
        </div>
      </div>

      <div class="w-full block absolute p-3 bg-white h-16 bottom-0 right-0">
        <div class="flex justify-end my-auto gap-x-3">
          <cornie-btn
            @click="$emit('close')"
            class="text-primary border-2 rounded-lg border-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            class="bg-danger text-white rounded-lg"
            type="submit"
            :loading="loading"
          >
            Check-in
          </cornie-btn>
        </div>
      </div>
    </v-form>
  </div>
</template>
<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import TimePicker from "@/components/cornie-time.vue";
import CustomDropdown from "@/components/cornieselect.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import DatePicker from "@/components/datepicker.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieTextArea from "@/components/textarea.vue";
import { Prop, Watch } from "vue-property-decorator";
import { useAppointmentRooms } from "../composables/useAppointmentRoom";
import Avatar from "@/components/avatar.vue";
import PractitionerSelect from "@/components/practitioner-select.vue";
import IPractitioner from "@/types/IPractitioner";
import { QueuedPatient, getPractitionerQueue } from "../helper/queue";
import { printPractitioner, splitDate, splitTime } from "@/plugins/utils";
import Queue from "./queue.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { string } from "yup";

const today = splitDate(new Date());
const now = splitTime(new Date());

const user = namespace("user");
const visits = namespace("visits");

@Options({
  components: {
    Avatar,
    PractitionerSelect,
    TimePicker,
    CornieInput,
    CustomDropdown,
    DeleteIcon,
    DatePicker,
    CornieSelect,
    CornieTextArea,
    Queue,
  },
})
export default class CheckIn extends Vue {
  @Prop({ required: true, type: Object })
  patient!: any;

  room = setup(() => useAppointmentRooms());

  practitioner = {} as IPractitioner;

  practitionerId = "";
  date = today;
  time = now;
  roomId = "";
  note = "";

  requiredRule = string().required();

  queue = [] as QueuedPatient[];

  loading = false;

  @user.Getter
  authCurrentLocation!: string;

  @visits.Mutation
  addVisit!: (visit: any) => void;

  get practitionerName() {
    return this.practitioner?.id
      ? printPractitioner(this.practitioner)
      : undefined;
  }

  @Watch("practitionerId")
  async practitionerPicked(newId: string, oldId: string) {
    if (oldId == newId || !this.practitionerId) return;
    const queue = await getPractitionerQueue(this.practitionerId);
    this.queue = queue;
  }
  get rooms() {
    return this.room.locationRooms.map((room) => ({
      code: room.id,
      display: room.roomName,
    }));
  }

  get payload() {
    return {
      patientId: this.patient?.id,
      practitionerId: this.practitionerId,
      roomId: this.roomId,
      notes: this.note || undefined,
      locationId: this.authCurrentLocation,
    };
  }

  async submit() {
    this.loading = true;
    try {
      const { data } = await cornieClient().post(
        "/api/v1/visit/check-in",
        this.payload
      );
      this.addVisit(data);
      window.notify({ msg: "Check in successful", status: "success" });
      this.$emit("close");
    } catch (error) {
      window.notify({ msg: "Patient not checked in", status: "error" });
    }
    this.loading = false;
  }
}
</script>
<style>
.dashed-bottom {
  border-bottom: 1px dashed #667499;
}

.h-scrren {
  height: 100vh;
  overflow: scroll;
  padding-bottom: 40px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.h-scrren::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.h-scrren {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
