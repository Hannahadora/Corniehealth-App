<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
          <span class="pr-2 flex items-center cursor-pointer border-r-2">
            <cornie-icon-btn @click="show = false">
            <arrow-left-icon />
            </cornie-icon-btn>
          </span>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Update Storage Info
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">

             <cornie-input
                label="Location"
                class="w-full mb-4"
                placeholder="--Autofilled--"
                :disabled="true"
                :modelValue="LocationName"
               
               
              />
               <cornie-input
                label="Building No"
                class="w-full mb-4"
                placeholder="--Enter--"
                v-model="condition"
                 :rules="required"
              />
              <cornie-input
                label="Room No"
                class="w-full mb-4"
                placeholder="--Enter--"
                v-model="room"
                 :rules="required"
              />
              <cornie-input
                label="Shelf No"
                class="w-full mb-4"
                placeholder="--Enter--"
                v-model="shelf"
                 :rules="required"
              />
              <cornie-input
                label="Rack No"
                class="w-full mb-4"
                placeholder="--Enter--"
                v-model="rack"
                 :rules="required"
              />
              <cornie-input
                label="Bin No"
                class="w-full mb-4"
                placeholder="--Enter--"
                v-model="bin"
                 :rules="required"
              />


        </v-form>
      </cornie-card-text>
      
      <cornie-card>
        <cornie-card-text class="flex justify-end">

          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>
   
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { string } from "yup";

import ILocation from "@/types/ILocation";

import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import DEdit from "@/components/icons/aedit.vue";
import RangeSlider from "@/components/range.vue";
import CDelete from "@/components/icons/adelete.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";


const user = namespace("user");
const location = namespace("location");

@Options({
  name: "storageInfo",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    RangeSlider,
    DEdit,
    CDelete,
    CancelIcon,
    InfoIcon,
    CornieDialog,
    SearchIcon,
    AccordionComponent,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    MainCornieSelect,
  },
})
export default class storageInfo extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: {} })
  item!: any;

  @user.Getter
  authCurrentLocation!: string;

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

   required = string().required();

  locationId = "";
  room = "";
  rack = "";
  bin = "";
  condition = "";
  shelf ="";

  loading = false;

    get payload() {
    return {
      locationId: this.authCurrentLocation,
      room: this.room,
      rack: this.rack,
      bin: this.bin,
      condition: this.condition,
      shelf: this.shelf
    };
  }
 
 async submit() {
    this.loading = true;
     await this.CreateStorage();
    this.loading = false;
  }

  async CreateStorage() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    try {
      const response = await cornieClient().post(
        `/api/v1/inventory/stock/store/${this.item.productId}`,
        this.payload
      );
      if (response.success) {
        window.notify({
          msg: "Storage info updated Successfully",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error?.response?.data?.message, status: "error" });
    }
  }
   done() {
    this.show = false;
    this.$emit("stockAdded");
  }

  get LocationName() {
    const pt = this.locations.find((i: any) => i.id === this.authCurrentLocation);
    return pt ? `${pt.name}` : "";
  }

  
  created() {
    this.fetchLocations();
  }
}
</script>

<style></style>
