<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-5/6">
    <cornie-card height="100%" class="flex flex-col">

      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>

        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Profile
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>

      </cornie-card-title>

      <cornie-card-text>
        <div class="w-full dflex space-x-4">
          <div class="w-10 h-10">
            <avatar class="mr-2" v-if="image" :src="image" />
            <avatar class="mr-2" v-else :src="localSrc" />
          </div>
          <div class="w-full">
            <p class="text-xs text-black font-semibold">
              {{ name }}
            </p>
            <p class="text-xs text-gray-500 font-meduim">
              {{ type }}
            </p>
          </div>
        </div>
        <div class="my-5 border-2 p-3 border-gray-200 w-full flex-col flex">
          <span class="items-center mb-5 w-full flex justify-between">
            <p class="cursor-pointer float-left text-xs text-black">
              Provider ID
            </p>
            <p class="cursor-pointer float-right text-xs text-gray-500">
              {{ profileId }}
            </p>
          </span>
          <span class="items-center mb-5 w-full flex justify-between">
            <p class="cursor-pointer float-left text-xs text-black">Status</p>
            <p class="cursor-pointer float-right text-xs text-gray-500">
              {{ activeState }}
            </p>
          </span>
          <span class="items-center mb-5 w-full flex justify-between">
            <p class="cursor-pointer float-left text-xs text-black">
              Specialty
            </p>
            <p class="cursor-pointer float-right text-xs text-gray-500">
              {{ type }}
            </p>
          </span>
          <span class="items-center mb-5 w-full flex justify-between">
            <p class="cursor-pointer float-left text-xs text-black">
              Total Patients Seen
            </p>
            <p class="cursor-pointer float-right text-xs text-gray-500">0</p>
          </span>
          <span class="items-center mb-5 w-full flex justify-between">
            <p class="cursor-pointer float-left text-xs text-black">Rating</p>
            <p class="cursor-pointer float-right text-xs text-gray-500">
              <vue3-star-ratings
                v-model="rating"
              />
            </p>
          </span>
        </div>
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <div class="flex justify-end w-full mt-auto">
            <button
              class="rounded mt-5 py-2 px-3 border border-primary focus:outline-none hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
              @click="show = false"
            >
              Close
            </button>
          </div>
        </cornie-card-text>
      </cornie-card>

    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import IPractitioner from "@/types/IPractitioner";
import { Options, Vue } from "vue-class-component";
import { Prop,PropSync } from "vue-property-decorator";
import Modal from "@/components/practitionermodal.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import DragIcon from "@/components/icons/draggable.vue";
import Draggable from "vuedraggable";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import vue3starRatings from "vue3-star-ratings";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import Avatar from "@/components/avatar.vue";

@Options({
  components: {
     Modal,
    DragIcon,
    ArrowLeftIcon,
    Draggable,
    IconInput,
    SearchIcon,
    vue3starRatings,
    Avatar,
    ...CornieCard,
    CornieIconBtn,
    CornieDialog,
    CancelIcon,
  },
})
export default class ActorsList extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Array, default: [] })
  available!: any;

  @Prop({ type: Array, default: [] })
  profile!: any;

  @Prop({ type: Array, default: [] })
  practitionerprofile!: any;

  @Prop({ type: String, default: "" })
  name!: string;

  @Prop({ type: String, default: "" })
  profileId!: string;

  @Prop({ type: String, default: "" })
  activeState!: string;

  @Prop({ type: String, default: "" })
  type!: string;

  @Prop({ type: String, default: "" })
  image!: string;

   rating =  4;
   localSrc = require("../assets/img/placeholder.png");

  
}
</script>

<style>
.dflex {
  display: -webkit-box;
}
</style>
