<template>
  <div class="flex flex-col">
    <h2 class="text-primary text-xl font-bold">Upload File</h2>
    <div
      class="
        flex flex-col
        w-full
        justify-center
        items-center
        border-2 border-dashed
        rounded-md
        mt-4
        p-4
      "
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
            class="text-danger cursor-pointer mt-2 font-semibold"
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
      @click.stop="upload"
      :disabled="uploading"
      @click="showupload"
      :class="{
        'bg-danger text-white': !uploading,
        ' bg-gray-300 text-black': uploading,
      }"
      class="rounded-lg w-ful p-2 font-semibold mt-3"
    >
      <upload-icon v-if="uploading" class="mr-2" />
      {{ uploading ? "Uploading..." : "Upload Now" }}
    </cornie-btn>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import FileIcon from "@/components/icons/file-type.vue";
import { uploadFile } from "@/plugins/uploader";
import ProgressBar from "@/components/progress-bar.vue";
import UploadIcon from "@/components/icons/upload.vue";
import { Prop, PropSync } from "vue-property-decorator";

@Options({
  name: "FileUploader",
  components: {
    FileIcon,
    ProgressBar,
    UploadIcon,
  },
})
export default class Uploader extends Vue {
  @Prop({ type: String })
  modelValue!: string;

  @PropSync("modelValue")
  fileUrl!: string;

  @Prop({ type: Object})
  meta!: any;
  @PropSync("meta")
  metaData!: any;

  file = {} as File;

  xhr!: XMLHttpRequest;

  progress = 0;

  fileInfo = {} ;

  uploading = false;

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

  setmeta(){
    const fileExt = this.file.type;
    const fileSize = this.file.size;
    const fileInfo = { fileSize, fileExt};
    this.metaData = fileInfo;
  }
    // showupload(){
    //   this.$emit('show-parent', this.fileInfo)
    // }
  cancel() {
    this.uploading = false;
    this.xhr?.abort();
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
