<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-2/3">
    <cornie-card height="100%" class="flex flex-col">
        <cornie-card-title  class="w-full pt-5">
          <div class="w-full flex space-x-4">
              <div class=" border-r-2 border-gray-200">

             <arrow-left-icon class="cursor-pointer mr-2"  @click="show = false"/>
              </div>
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">Upload File</h2>
            <cancel-icon class="float-right cursor-pointer" @click="show = false"/>
          </div>
      </cornie-card-title>
  <cornie-card-text class="flex-grow scrollable">
  <div class="flex w-full flex-col">
    <div
      class="flex flex-col w-full justify-center items-center border-2 border-dashed rounded-md mt-4 p-4"
      @dragover.prevent
      @drop.prevent="handleDrop"
      style="min-height: 8rem"
    >
      <div
        v-if="filename"
        class="w-full justify-center items-center flex flex-col"
      >
        <span class="flex items-center">
          <file-icon class="w-5 h-10 mr-2" />
          <span class="text-sm"> {{ filename }} </span>
        </span>
        <span
          v-if="uploading"
          class="flex items-center w-48 justify-center flex-col"
        >
          <progress-bar :width="`${progress}`" color="bg-success">
            <span class="mx-auto"> {{ progress }}% </span>
          </progress-bar>
          <span
            @click="cancel"
            class="text-danger cursor-pointer mt-2 font-semibold "
          >
            Cancel
          </span>
        </span>
      </div>
      <div v-else class="w-full justify-center items-center flex flex-col">
        <file-icon />
        <span class="text-sm mt-4"> Drag and drop items here </span>
        <span class="text-gray-500 font-semibold text-sm mt-4">OR</span>
        <label for="file-attachments" class="cursor-pointer mt-3">
          Browse Files
        </label>
        <input
          type="file"
          @change="changed"
          name="attachments"
          id="file-attachments"
          hidden
        />
      </div>
    </div>
    <cornie-btn
      type="button"
      @click="shownewupload"
      class="rounded-full w-ful p-1 font-semibold mt-3 bg-danger text-white"
    >
      Upload Now
    </cornie-btn>
  </div>
  </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
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

@Options({
  name: "FileUploader",
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
  },
})
export default class Uploader extends Vue {
@PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String })
  modelValue!: string;

  @Prop({ type: Boolean , default: false})
  shownewupladmodal!: boolean;

  @PropSync("modelValue")
  fileUrl!: string;

  @Prop({ type: Object })
  meta!: any;
  @PropSync("meta")
  metaData!: any;

  file = {} as File;

  xhr!: XMLHttpRequest;

  progress = 0;

  fileInfo = {};

  uploading = false;
  //shownewupladmodal= false;

  get filename() {
    return this.file?.name;
  }

  handleDrop(e: any) {
    const droppedFiles = e.dataTransfer.files;
    if (!droppedFiles) return;
    const file = [...droppedFiles].pop();
    this.file = file;
  }

  changed(e: any) {
    const imageFile = e.target.files[0];
    this.file = imageFile;
  }

  setmeta() {
    const fileExt = this.file.type;
    const fileSize = this.file.size;
    const fileInfo = { fileSize, fileExt };
    this.metaData = fileInfo;
  }
  // showupload(){
  //   this.$emit('show-parent', this.fileInfo)
  // }
  cancel() {
    this.uploading = false;
    this.xhr?.abort();
  }
  shownewupload(){
    //    this.$router.push(
    //       "/dashboard/provider/settings/ratings"
    //     );
   this.$emit('show-rating');
   this.shownewupladmodal = true;
      this.show = false;
  }

  async upload() {
    if (!this.file?.name) return;
    this.uploading = true;
    const url = await this.execUpload();
    if (url) {
      this.fileUrl = url as string;
      this.setmeta();
    }
    this.uploading = false;
    this.progress = 0;
  }

  async execUpload() {
    try {
      const file = uploadFile(
        { file: this.file },
        (progress) => (this.progress = progress),
        (xhr) => (this.xhr = xhr)
      );
      window.notify({ msg: "File uploaded", status: "success" });
      return file;
    } catch (error) {
      window.notify({ msg: "File not uploaded", status: "error" });
    }
  }
}
</script>
