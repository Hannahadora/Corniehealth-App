<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-3/3">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full pt-5">
        <div class="w-full flex space-x-4">
          <div class="border-r-2 border-gray-200">
            <arrow-left-icon
              class="cursor-pointer mr-2"
              @click="show = false"
            />
          </div>
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Appointment Confirmation
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">

        <div>
            <div class="mb-4 mt-4">
                <cornie-radio  label="Confirm on Payment" name="confirm" />
            </div>
            <div class="mb-4">
                <cornie-radio  label="Confirm with Insurance" name="confirm" />
            </div>
            <div class="mb-4">
                <cornie-radio  label="Confirm without Payment" name="confirm" />
            </div>
            <div class="mb-4">
                <cornie-radio  label="Any" name="confirm" />
            </div>

        </div>
       
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
import { Options, Vue , setup} from "vue-class-component";
import FileIcon from "@/components/icons/file-type.vue";
import { uploadFile } from "@/plugins/uploader";
import ProgressBar from "@/components/progress-bar.vue";
import UploadIcon from "@/components/icons/upload.vue";
import { Prop, PropSync } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CheckIcon from "@/components/icons/authcheck.vue";
import CornieRadio from "@/components/cornieradio.vue";


@Options({
  name: "confirmAppoinmentModal",
  components: {
    FileIcon,
    ProgressBar,
    UploadIcon,
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CheckIcon,
    CornieDialog,
    Textarea,
    CornieBtn,
    CornieRadio
  },
})
export default class confirmAppoinmentModal extends Vue {
 @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;
 

  async created(){
  
  }
}
</script>
