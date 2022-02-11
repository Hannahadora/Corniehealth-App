<template>
  <div class="container-fluid">
    <div class="w-full">
      <label class="flex capitalize mb-1 text-black text-sm font-semibold">
        <span> {{ label }} </span>
      </label>
    </div>
    <div class="w-full flex">
      <div class="w-6/12">
        <div class="w-11/12">
          <label class="file-picker flex flex-col w-full rounded-full">
            <input type="file" @change="fileSelected" name="upload" accept="application/pdf"/>
            <p class="flex items-center justify-between">
              <span><i class="fa fa-cloud-upload"></i> Choose file</span>
              <span class="mr-3"><upload-icon /></span>
            </p>
          </label>
        </div>
      </div>
      <div class="w-6/12">
        <div>
          <uploaded-file :fileName="fileName"  @cleartext="cleartext"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import UploadIcon from "@/components/icons/upload.vue";
import UploadedFile from "./uploadd-file.vue";
import { Prop } from "vue-property-decorator";
import { useHandleImage } from "@/composables/useHandleImage";

@Options({
  components: {
    UploadIcon,
    UploadedFile,
  },
})
export default class FilePicker extends Vue {
  @Prop({ type: String, default: "" })
  label!: string;

  rawFile: any = {};

  get fileName() {
    if (!this.rawFile || !this.rawFile?.name) return "No file";
    if (this.rawFile?.name?.length < 5) return this.rawFile.name;
    const splitted = this.rawFile?.name.split("");
    return `${splitted[0]}...${
      (splitted.slice(splitted?.length - 4), splitted?.length - 1)
    }`;
  }

  file = setup(() => useHandleImage());

  async fileSelected(e: any) {
    this.rawFile = e.target.files[0];

    await this.file.onChange(e);
    this.$emit("uploaded", this.file.url);
  }
  cleartext(){
    console.log("hello");
    this.rawFile = {} as any;
  }
}
</script>

<style scoped>
input[type="file"] {
  display: none;
}
.file-picker {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
