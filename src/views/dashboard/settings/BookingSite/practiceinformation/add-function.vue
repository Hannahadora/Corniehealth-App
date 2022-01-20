<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col h-full bg-white">
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
      </cornie-card-title>
      <cornie-card-text class="p-4 flex-grow flex flex-col">
        <v-form class="flex-grow flex flex-col" @submit="submit">
          <h1 class="text-primary text-xl font-extrabold mb-5">
            Consultation Room
          </h1>
          <cornie-input
            class="w-full mb-6"
            label="Room Name"
            placeholder="--Enter--"
            v-model="roomName"
            :rules="required"
          />
          <cornie-input
            class="w-full mb-6"
            label="Room Number"
            placeholder="--Enter--"
            :rules="required"
            v-model="roomNumber"
            :type="number"
          />
          <!-- <input type="number"
          class="w-full mb-6"
            label="Room Number"
            placeholder="--Enter--"
            :rules="required"
            v-model="roomNumber"
            /> -->
          <div class="mb-6">
            <cornie-select
              class="w-full"
              label="Location"
              placeholder="--Select from Locations--"
              v-model="location"
              :items="all_locations"
              :rules="required"
            />
          </div>
          <cornie-select
            class="w-full"
            label="Custodian"
            placeholder="--Select from Practitioners--"
            v-model="custodian"
            :items="supervisoryFunctions"
          />
          <!-- <cornie-select
            class="w-full"
            label="Custodian"
            placeholder="--Select from Practitioners--"
            v-model="custodian"
            :items="items"
          /> -->
          <div>
            <h1 class="font-extrabold">Availability</h1>
            <p>Show Occupied Booked</p>
          </div>
          <!-- <custom-checkbox
            label="Automatically create a group for this function"
          /> -->
          <div class="flex">
            <div class="p-2">
              <custom-checkbox
                label="Yes"
                :readonly="viewOnly"
                v-model="occupiedYes"
              />
            </div>
            <!-- <custom-checkbox
              label="No"
              :readonly="viewOnly"
              v-model="occupiedNo"
            /> -->
          </div>
          <span class="flex-grow"></span>
          <div class="flex justify-end">
            <span
              @click="show = false"
              class="border-primary border-2 rounded-full text-black mr-2 py-1 px-2 focus:outline-none outline hover:bg-primary hover:text-white cursor-pointer"
            >
              Cancel
            </span>
            <cornie-btn
              type="submit"
              :loading="loading"
              class="bg-danger rounded-full text-white py-1 px-6 focus:outline-none hover:opacity-90"
            >
              Save
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
import IFunction from "@/types/IFunction";
import { CornieUser } from "@/types/user";
import { string } from "yup";
import { quantumClient } from "@/plugins/http";

import PractitionerSelect from "../components/practitioner-select.vue";
import EncounterSelect from "../components/encounter-select.vue";
import ILocation from "@/types/ILocation";
import AutoComplete from "@/components/autocomplete.vue";
import { cornieClient } from "@/plugins/http";
import CornieRadio from "@/components/cornieradio.vue";
import IAppointmentRoom from "@/types/IAppointmentRoom";

const hierarchy = namespace("hierarchy");
const user = namespace("user");
const location = namespace("location");
const AppointmentRoom = namespace("AppointmentRoom");

@Options({
  name: "AddFunction",
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    AddFunction,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,

    PractitionerSelect,
    EncounterSelect,
    AutoComplete,
    CornieRadio,
  },
})
export default class AddFunction extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;

  required = string().required();

  // @Prop({ type: Object, default: {} })
  // edit!: IFunction;

  @Prop({ type: Object, default: {} })
  edit!: any;

  functionName = "";
  hierarchy = "";
  supervisoryFunction = "";
  loading = false;

  roomName = "";
  roomNumber = 0;
  referenceEncounter = "";
  supervisoryFunctions = ["Darlington Onyemere"];
  custodian = "";
  the_location = "";
  location = "";
  occupiedYes = false;

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  @AppointmentRoom.Mutation
  setAppointmentrooms!: (f: IAppointmentRoom[]) => Promise<void>;

  @AppointmentRoom.Action
  addAppointmentRoom!: (f: IAppointmentRoom) => Promise<void>;

  @hierarchy.State
  categories!: { id: string; name: string }[];

  @user.Getter
  cornieUser!: CornieUser;

  @Watch("edit")
  // editing() {
  //   if (!this.edit?.id) return;
  //   const func = this.edit;
  //   this.functionName = func.name;
  //   this.hierarchy = func.hierarchy || "";
  //   this.supervisoryFunction = func.reportingTo || "";
  // }
  editing() {
    if (!this.edit.id) return;
    const func = this.edit;
    this.roomName = func.roomName;
    this.roomNumber = Number(func.roomNumber) || 0;
    // this.supervisoryFunction = func.reportingTo || "";
  }

  get all_locations() {
    return this.locations.map((location) => ({
      code: location.id,
      display: location.address,
    }));
  }
  get orgId() {
    return this.cornieUser.organizationId;
  }

  get items() {
    return this.locations.map((location) => ({
      ...location,
      address: location.address,
      state: location.state,
    }));
  }

  // get payload() {
  //   const payload: any = {
  //     orgId: this.orgId,
  //     name: this.functionName,
  //     hierarchyId: this.hierarchy,
  //     createdBy: this.cornieUser.id,
  //   };
  //   if (this.supervisoryFunction)
  //     payload.reportingTo = this.supervisoryFunction;
  //   if (this.edit?.id) payload.functionId = this.edit.id;
  //   return payload;
  // }
  get vipName() {
    return this.occupiedYes ? "Yes" : "No";
  }
  get payload() {
    const payload: any = {
      roomName: this.roomName,
      roomNumber: this.roomNumber,
      locationId: this.location,
      // custodian: this.custodian,
      custodian: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      availability: this.vipName,
      status: this.vipName == "Yes" ? "Available" : "Booked",
    };
    return payload;
  }

  async submit() {
    this.loading = true;
    if (this.edit.custodian) await this.update();
    else await this.create();
    this.loading = false;
  }

  async create() {
    console.log("gggg", this.payload);
    try {
      const { data } = await cornieClient().post(
        "/api/v1/appointment-rooms",
        this.payload
      );
      // const { appointmentrooms } = data;
      this.addAppointmentRoom(data);
      window.notify({ msg: "Appointment Room created", status: "success" });
    } catch (error) {
      console.error(error);
      window.notify({ msg: "Appointment Room not created", status: "error" });
    }
  }

  async update() {
    console.log("this.edit.id", this.edit.id);
    const url = `/api/v1/appointment-rooms/${this.edit.id}`;
    const payload = { ...this.payload, id: this.edit.id };
    try {
      const response = await cornieClient().put(url, payload);
      window.notify({ msg: "Appointment Room", status: "success" });
    } catch (error) {
      window.notify({ msg: "Appointment Room not Updated", status: "error" });
    }
  }

  //   async update() {
  //   try {
  //     const { data } = await cornieClient().put(
  //       "/api/v1/appointment-rooms",
  //       this.payload
  //     );
  //     // const { appointmentrooms } = data;
  //     // this.setAppointmentrooms([appointmentrooms]);
  //   } catch (error) {
  //     window.notify({ msg: "Appointment Room not updated", status: "error" });
  //   }
  // }

  // async update() {
  //   try {
  //     const { data } = await quantumClient().patch(
  //       "/org/functions",
  //       this.payload
  //     );
  //     const { appointmentrooms } = data;
  //     this.setAppointmentrooms([appointmentrooms]);
  //   } catch (error) {
  //     window.notify({ msg: "Function not updated", status: "error" });
  //   }
  // }

  // get supervisoryFunctions() {
  //   return this.functions.map((f) => ({ code: f.id, display: f.name }));
  // }

  @hierarchy.Action
  fetchCategories!: () => Promise<void>;

  created() {
    if (!this.categories.length) this.fetchCategories();
    if (!this.locations?.length) this.fetchLocations();
  }
}
</script>
