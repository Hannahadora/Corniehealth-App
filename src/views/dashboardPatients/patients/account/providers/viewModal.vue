<template>
  <cornie-dialog v-model="show" right class="md:w-4/12 w-12/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Primary Doctor
          </h2>
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form class="container" ref="form">
            <div class="flex justify-between w-full">
                <div class="flex space-x-2">
                    <avatar :src="localSrc"/>
                    <p class="text-2xl text-primary font-bold">Dr. Sarah Smith | F</p>
                </div>
                <div class="flex space-x-3">
                    <edit-icon class="fill-current text-danger"/>
                    <span>Update</span>
                </div>
            </div>
            <div class="w-full flex space-x-4 mt-5 items-center">
                <doctor-icon/>
                <div>
                    <span class="text-bold font-semibold">Specialization</span>
                    <p class="text-gray-400 text-sm">Dentist</p>
                </div>
            </div>
             <div class="w-full flex space-x-4 mt-5 items-center">
                <reference-icon/>
                <div>
                    <span class="text-bold font-semibold">Reference Organisation</span>
                    <p class="text-gray-400 text-sm">Reddington Hospital</p>
                </div>
            </div>
             <div class="w-full flex space-x-4 mt-5 items-center">
                <phone-icon/>
                <div>
                    <span class="text-bold font-semibold">Phone Number</span>
                    <p class="text-gray-400 text-sm">+234 813 563 8883</p>
                </div>
            </div>
             <div class="w-full flex space-x-4 mt-5 items-center">
                <email-icon/>
                <div>
                    <span class="text-bold font-semibold">Email</span>
                    <p class="text-gray-400 text-sm">Mikeobi@reddington.com</p>
                </div>
            </div>
             <div class="w-full flex space-x-4 mt-5 items-center">
                <location-icon/>
                <div>
                    <span class="text-bold font-semibold">Address</span>
                    <p class="text-gray-400 text-sm">234 Admiralty Way Lekki, Lagos</p>
                </div>
            </div>
            
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
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { createDate } from "@/plugins/utils";
import { cornieClient } from "@/plugins/http";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import { string, date, number } from "yup";
import PhoneInput from "@/components/phone-input.vue";
import Avatar from "@/components/avatar.vue";
import EditIcon from "@/components/icons/editview.vue";

import DoctorIcon from "./icons/doc.vue";
import ReferenceIcon from "./icons/reference.vue";
import PhoneIcon from "./icons/phone.vue";
import EmailIcon from "./icons/email.vue";
import LocationIcon from "./icons/location.vue";

@Options({
  name: "viewProvider",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    PhoneInput,
    CornieDialog,
    SearchIcon,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,
    Avatar,
    EditIcon,
    DoctorIcon,
    ReferenceIcon,
    PhoneIcon,
    EmailIcon,
    LocationIcon
  },
})
export default class viewProvider extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;


  @Prop({ type: String, default: "" })
  id!: string;

  localSrc = require("../../../../../assets/img/placeholder.png");

  done() {
 
  }

  async created() {
 
  }
}
</script>

<style>
.border-r-0 {
  border-right-width: 0px !important;
}
.border-l-0 {
  border-left-width: 0px !important;
}
</style>
