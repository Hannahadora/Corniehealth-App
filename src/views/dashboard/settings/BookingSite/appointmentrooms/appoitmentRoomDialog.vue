<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col h-full bg-white">
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Consultation Room
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <v-form class="flex-grow flex flex-col" @submit="submit">
          <cornie-input
            class="w-full mb-5"
            label="Room Name"
            placeholder="--Enter--"
            v-model="roomName"
            :rules="required"
          />
          <cornie-input
            class="w-full mb-5"
            label="Room Number"
            placeholder="--Enter--"
            :rules="required"
            v-model="roomNumber"
            :type="number"
          />

          <div class="mb-5">
            <cornie-select
              class="w-full"
              label="Location"
              placeholder="--Select from Locations--"
              v-model="locationId"
              :items="allLocation"
              :rules="required"
            />
          </div>
          <cornie-select
            class="w-full mb-5"
            label="Custodian"
            placeholder="--Select from Practitioners--"
            v-model="custodian"
            :items="allPractitioner"
          />

          <div>
            <h1 class="font-bold mb-2 text-sm">Availability</h1>
            <p class="text-xs font-semibold">Show Occupied Booked</p>
          </div>
          <!-- <custom-checkbox
            label="Automatically create a group for this function"
          /> -->
          <div class="flex space-x-4 mt-2 mb-8">
            <div class="">
              <cornie-radio
                label="Yes"
                name="checkbox"
                value="Yes"
                checked
                :readonly="viewOnly"
                v-model="availability"
              />
            </div>
            <div class="">
              <cornie-radio
                label="No"
                value="No"
                name="checkbox"
                :readonly="viewOnly"
                v-model="availability"
              />
            </div>
          </div>

          <div class="flex justify-end">
            <cornie-btn
              @click="show = false"
              class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
            >
              Cancel
            </cornie-btn>
            <cornie-btn
              :loading="loading"
              type="submit"
              class="text-white bg-danger px-3 rounded-xl"
            >
              {{newaction}}
            </cornie-btn>
          </div>
        </v-form>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import { namespace } from "vuex-class";
import { CornieUser } from "@/types/user";
import { string } from "yup";
import AutoComplete from "@/components/autocomplete.vue";
import { cornieClient } from "@/plugins/http";
import CornieRadio from "@/components/cornieradio.vue";
import IAppointmentRoom from "@/types/IAppointmentRoom";


const hierarchy = namespace("hierarchy");
const orgFunctions = namespace("OrgFunctions");
const user = namespace("user");
const appointmentRoom = namespace("appointmentRoom");

@Options({
  name: "AppointmentRoomDialog",
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
    AutoComplete,
    CornieRadio,
  },
})
export default class AppointmentRoomDialog extends Vue {
 @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

 @Prop({ type: String, default: "" })
  id!: string;

  required = string().required();

  loading = false;

  roomName = "";
  roomNumber = 0;
  custodian = "";
  locationId = "";
  availability = "Yes";
  status = "Available";

  location = [];
  practitioner = [];


@appointmentRoom.Action
  getAppointmentRoomById!: (id: string) => IAppointmentRoom;


  @appointmentRoom.Mutation
  setAppointmentrooms!: (f: IAppointmentRoom[]) => Promise<void>;

  @appointmentRoom.Action
  addAppointmentRoom!: (f: IAppointmentRoom) => Promise<void>;

  @user.Getter
  cornieUser!: CornieUser;


  async submit() {
    this.loading = true;
    if (this.id) await this.updateAppointmentRoom();
    else await this.create();
    this.loading = false;
  }

 @Watch("id")
  idChanged() {
    this.setAppointmentRoom();
  }
  get newaction() {
    return this.id ? "Update" : "Save";
  }


    async setAppointmentRoom() {
    const appointmentRoom = await this.getAppointmentRoomById(this.id);
    if (!appointmentRoom) return;
    this.roomName = appointmentRoom.roomName;
    this.roomNumber = appointmentRoom.roomNumber;
    this.custodian = appointmentRoom.custodian;
    this.locationId = appointmentRoom.locationId;
    this.availability = appointmentRoom.availability;
    this.status = appointmentRoom.status;
  
  }

  get payload() {
    return {
      roomName: this.roomName,
      roomNumber: this.roomNumber,
      custodian: this.custodian,
      locationId: this.locationId,
      availability: this.availability,
      status: this.status,
    };
  }
done() {
    this.$emit("room-added");
    this.show = false;
  }

  async create() {
    try {
      const { data } = await cornieClient().post(
        "/api/v1/appointment-rooms",
        this.payload
      );
      window.notify({ msg: "Appointment Room created", status: "success" });
      this.done();
    } catch (error) {
      window.notify({ msg: "Appointment Room not created", status: "error" });
    }
  }
  async updateAppointmentRoom() {
    const url = `/api/v1/appointment-rooms/${this.id}`;
    const payload = {
      ...this.payload,
    };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({
          msg: "Appointment Room  updated",
          status: "success",
        });
        this.done();
      }
    } catch (error) {
      window.notify({
        msg: "Appointment Type Room  updated",
        status: "error",
      });
    }
  }
    get allLocation() {
    if (!this.location || this.location.length === 0) return [];
    return this.location.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }
  get allPractitioner() {
    if (!this.practitioner || this.practitioner.length === 0) return [];
    return this.practitioner.map((i: any) => {
      return {
        code: i.id,
        display: i.firstName + " " + i.lastName,
      };
    });
  }
  async fetchLocation() {
    const AllLocation = cornieClient().get(
      "/api/v1/location/myOrg/getMyOrgLocations"
    );
    const response = await Promise.all([AllLocation]);
    this.location = response[0].data;
  }

  async fetchPractitioner() {
    const AllPractitioner = cornieClient().get("/api/v1/practitioner");
    const response = await Promise.all([AllPractitioner]);
    this.practitioner = response[0].data;
  }
 
  @hierarchy.Action
  fetchCategories!: () => Promise<void>;

 async created() {
    await this.fetchPractitioner();
    await this.fetchLocation();
  }
}
</script>
