<template>
<cornie-dialog v-model="show" center class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">

      <cornie-card-title class="w-full">
          <cornie-icon-btn @click="show = false">
            <arrow-left-icon />
          </cornie-icon-btn>

          <div class="w-full">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
              Availability
            </h2>
            <cancel-icon
              class="float-right cursor-pointer"
              @click="show = false"
            />
          </div>

      </cornie-card-title>

       <cornie-card-text class="flex-grow scrollable">
        <div v-if="available.length === 0">
          <span class="text-sm"
            >Practioner Availability is fetching, Choose Practitioner...</span
          >
        </div>
        <div v-else>
          <p class="text-sm mt-2">View {{ name }} available times this week</p>
          <div class="my-5 border-2 p-3 border-gray-200 w-full flex-col flex">
            <span
              class="items-center hover:bg-gray-100 mb-4 w-full flex justify-between"
              v-for="(input, index) in available"
              :key="index"
            >
              <p class="cursor-pointer float-left text-xs text-black">
                {{
                  new Date(input.startDate).toLocaleDateString("en-US", options)
                }}
              </p>
              <p class="cursor-pointer float-right text-xs text-gray-500">
                <span>{{ input.startTime }} </span>

                - {{ input.endTime }}
              </p>
            </span>
            <!-- <div v-for="(item,index) in columnsProxy" :key="index">
            </div>-->
          </div>
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
import Avatar from "@/components/avatar.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import DragIcon from "@/components/icons/draggable.vue";
import Draggable from "vuedraggable";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
@Options({
  components: {
    ...CornieCard,
    CornieIconBtn,
    CornieDialog,
    CancelIcon,
    Avatar,
    ArrowLeftIcon,
    DragIcon,
    Draggable,
    IconInput,
    SearchIcon
  },
})
export default class Aavailability extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Array, default: [] })
  available!: any;

  @Prop({ type: String, default: "" })
  name!: string;

  @Prop({ type: String, default: "" })
  practitionerId!: string;

  
}
</script>
